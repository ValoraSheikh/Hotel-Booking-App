import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import Room from "@/models/Room.model";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

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

    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // ✅ Prevent duplicate review by same user for same room
    const alreadyReviewed = await Review.findOne({
      room,
      user: session.user.id,
    });

    if (alreadyReviewed) {
      return NextResponse.json(
        { error: "You have already reviewed this room" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      user: session.user.id,
      room,
      rating,
      comment,
    });

    return NextResponse.json({ message: "Review added", review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
