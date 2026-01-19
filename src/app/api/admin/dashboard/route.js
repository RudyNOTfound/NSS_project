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

    // 1. Fetch Stats
    const totalUsers = await User.countDocuments();
    const pendingDonations = await Donation.countDocuments({ status: "pending" });

    // 2. Financial Calculations (Total & This Month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const allDonations = await Donation.find({ status: "success" });
    
    let totalRaised = 0;
    let thisMonthRaised = 0;

    allDonations.forEach(d => {
      const amount = Number(d.amount);
      totalRaised += amount;
      if (new Date(d.createdAt) >= startOfMonth) {
        thisMonthRaised += amount;
      }
    });

    // 3. Fetch Recent Users (Limit 5)
    const recentUsers = await User.find({}, "name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // 4. Fetch Recent Donations (Limit 5)
    const recentDonations = await Donation.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalRaised,
        thisMonthRaised,
        pendingDonations
      },
      recentUsers,
      recentDonations
    }, { status: 200 });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}