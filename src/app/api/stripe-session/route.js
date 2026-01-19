import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email, name } = await req.json();

    await connectMongoDB();

    // 1. Create Initial Record in Database
    // We start with a placeholder, but we will update it in milliseconds
    const newDonation = await Donation.create({
      name: name || "Guest",
      email: email || "guest@example.com",
      amount: amount, 
      status: "pending",
      paymentId: "generating_id...", 
    });

    // 2. Create the Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Donation to NSS_PROJECT",
            },
            unit_amount: Math.round(amount * 100), 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/donate/success?session_id={CHECKOUT_SESSION_ID}&donation_id=${newDonation._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/donate/cancel?donation_id=${newDonation._id}`,
      metadata: {
        donationId: newDonation._id.toString(),
      },
    });

    // 3. ✅ CRITICAL UPDATE: Immediately save the Session ID
    // Now, even if they close the tab (Pending) or Cancel (Failed), 
    // we have the valid 'cs_test_...' ID in the database.
    await Donation.findByIdAndUpdate(newDonation._id, {
      paymentId: session.id, 
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}