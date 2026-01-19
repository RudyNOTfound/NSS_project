import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email, name } = await req.json();

    // 1. Save a "Pending" record in your database
    await connectMongoDB();
    const newDonation = await Donation.create({
      name: name || "Guest",
      email: email || "guest@example.com",
      amount: amount, // Amount in dollars
      status: "pending",
      paymentId: "waiting_for_stripe", 
    });

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // Change to "lkr" if you specifically want Sri Lankan Rupees
            product_data: {
              name: "Donation to HopeGive",
            },
            unit_amount: Math.round(amount * 100), // Stripe expects cents (e.g., $10.00 = 1000)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect URLs
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/donate/success?session_id={CHECKOUT_SESSION_ID}&donation_id=${newDonation._id}`,
      // UPDATE THIS LINE:
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/donate/cancel?donation_id=${newDonation._id}`,
      
      // Metadata helps us track this later
      metadata: {
        donationId: newDonation._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}