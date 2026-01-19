import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req) {
  try {
    const { donationId } = await req.json();
    await connectMongoDB();

    // Mark as failed
    await Donation.findByIdAndUpdate(donationId, {
      status: "failed",
    });

    return NextResponse.json({ message: "Marked as failed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}