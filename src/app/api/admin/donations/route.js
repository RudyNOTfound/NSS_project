import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
   
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();


    const donations = await Donation.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}