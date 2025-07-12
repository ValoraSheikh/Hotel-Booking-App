import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import Room from "@/models/Room.model";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { updateRoomAverageRating } from "@/lib/updateRoomRating";
import User from "@/models/User.model";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 600, // per 10 minutes (600 seconds)
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Step 1: Ensure session is valid and user has email
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 2: Rate limit by user email or IP
    await rateLimiter.consume(session.user.email); // safer than using ID directly
  } catch {
    return NextResponse.json(
      { error: "Too many review attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    await dbConnect();

    // Step 3: Get request payload
    const body = await req.json();
    const { room, rating, comment } = body;

    if (!room || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Step 4: Find room
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Step 5: Find user from email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 6: Check if user has already reviewed the room
    const alreadyReviewed = await Review.findOne({
      room,
      user: user._id,
    });

    if (alreadyReviewed) {
      return NextResponse.json(
        { error: "You have already reviewed this room" },
        { status: 400 }
      );
    }

    // Step 7: Create the review
    const review = await Review.create({
      user: user._id,
      room,
      rating,
      comment,
    });

    // Optional: update room rating
    await updateRoomAverageRating(room);

    return NextResponse.json(
      { message: "Review added", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("room");

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ room: roomId })
      .populate("user", "name") // Show user name only
      .sort({ createdAt: -1 }); // Most recent first

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
