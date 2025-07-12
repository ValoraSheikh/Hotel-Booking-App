import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking.model";
import Room from "@/models/Room.model";
import { authOptions } from "../auth/[...nextauth]/options";
// import { RateLimiterMemory } from "rate-limiter-flexible";
import User from "@/models/User.model";
// import mongoose from "mongoose";;

// export const bookingRateLimiter = new RateLimiterMemory({
//   points: 5, // 5 bookings
//   duration: 60 * 5, // per 5 minutes
// });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    await dbConnect()

    const userEmail = session.user.email
    const userRecord = await User.findOne({ email: userEmail }).select("_id")
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json()
    const { phoneNo, room, checkIn, checkOut, guests, totalPrice } = body
    // … your existing validations …

    const roomExists = await Room.findById(room)
    if (!roomExists) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    const newBooking = await Booking.create({
      user: userRecord._id,     // use the MongoDB ObjectId
      phoneNo,
      room,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    })

    return NextResponse.json({ booking: newBooking }, { status: 201 })
  } catch (err) {
    console.error("Booking POST error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    // Lookup MongoDB user using session email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch bookings linked to the MongoDB _id
    const bookings = await Booking.find({ user: user._id })
      .populate("room")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
