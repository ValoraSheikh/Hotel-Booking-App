import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking.model";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const bookings = await Booking.find()
      .populate("user", "name email") // select name & email only
      .populate("room", "title price")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Admin GET all bookings error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


