import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
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

    // 1. Get Total Users
    const totalUsers = await User.countDocuments();

    // 2. Get All Donations to calculate stats
    const allDonations = await Donation.find({});

    // 3. Calculate Stats
    let totalRaised = 0;
    let statusCounts = {
      success: 0,
      pending: 0,
      failed: 0
    };

    allDonations.forEach(d => {
      const amount = Number(d.amount) || 0;
      const status = d.status ? d.status.toLowerCase() : 'pending';

      if (status === 'success') {
        totalRaised += amount;
        statusCounts.success++;
      } else if (status === 'pending') {
        statusCounts.pending++;
      } else if (status === 'failed') {
        statusCounts.failed++;
      }
    });

    return NextResponse.json({ 
      totalUsers, 
      totalRaised, 
      totalDonationsCount: allDonations.length,
      statusCounts 
    }, { status: 200 });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}