import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { donationId, sessionId } = await req.json();
    
   
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent; 

    await connectMongoDB();


    await Donation.findByIdAndUpdate(donationId, {
      status: "success",
      paymentId: paymentId, 
    });

    return NextResponse.json({ message: "Confirmed" }, { status: 200 });
  } catch (error) {
    console.error("Confirmation Error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}