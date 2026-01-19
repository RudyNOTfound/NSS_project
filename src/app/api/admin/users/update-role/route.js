import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(req) {
  try {
    // 1. Security Check
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, newRole } = await req.json();

    // 2. Safety Check: Prevent admin from demoting themselves
    // (Optional, but highly recommended)
    if (session.user.email === (await User.findById(userId)).email) {
       return NextResponse.json({ error: "You cannot change your own role." }, { status: 403 });
    }

    await connectMongoDB();

    // 3. Update the user
    await User.findByIdAndUpdate(userId, { role: newRole });

    return NextResponse.json({ message: "Role updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}