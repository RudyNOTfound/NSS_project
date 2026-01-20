import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // Import your auth options

export async function GET(req) {
  try {
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    
    await connectMongoDB();

    
    const donations = await Donation.find({ email: userEmail })
      .sort({ createdAt: -1 });

    return NextResponse.json({ donations }, { status: 200 });

  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}