import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking.model";
import Room from "@/models/Room.model";
import { authOptions } from "../auth/[...nextauth]/options";
import { RateLimiterMemory } from "rate-limiter-flexible";

export const bookingRateLimiter = new RateLimiterMemory({
  points: 5, // 5 bookings
  duration: 60 * 5, // per 5 minutes
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "You must be logged in to perform this action" },
      { status: 401 }
    );
  }

  try {
    const key = session.user.id; // or use IP fallback if session not available
    await bookingRateLimiter.consume(key);
  } catch {
    return NextResponse.json(
      { error: "Too many booking attempts. Please wait and try again later." },
      { status: 429 }
    );
  }

  try {
    await dbConnect();

    const body = await req.json();
    const { phoneNo, room, checkIn, checkOut, guests, totalPrice } = body;

    if (!phoneNo || !room || !checkIn || !checkOut || !guests || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return NextResponse.json(
        { error: "Invalid date range" },
        { status: 400 }
      );
    }

    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // const overlappingBooking = await Booking.findOne({
    //   room,
    //   status: "booked",
    //   $or: [
    //     { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
    //     { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
    //     {
    //       $and: [
    //         { checkIn: { $lte: new Date(checkIn) } },
    //         { checkOut: { $gte: new Date(checkOut) } },
    //       ],
    //     },
    //   ],
    // });

    // if (overlappingBooking) {
    //   return NextResponse.json(
    //     { error: "Room is already booked for selected dates" },
    //     { status: 409 }
    //   );
    // }

    const newBooking = await Booking.create({
      user: session.user.id,
      phoneNo,
      room,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized access",
      },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const bookings = await Booking.find({ user: session.user.id })
      .populate("room") // Populate room details
      .sort({ createdAt: -1 }); // Sort recent first

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
