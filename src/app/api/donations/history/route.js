import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // Import your auth options

export async function GET(req) {
  try {
    // 1. Check who is logged in
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    // 2. Connect to DB
    await connectMongoDB();

    // 3. Find donations for this specific email
    // Sort by 'createdAt' descending (-1) so newest appear first
    const donations = await Donation.find({ email: userEmail })
      .sort({ createdAt: -1 });

    return NextResponse.json({ donations }, { status: 200 });

  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}