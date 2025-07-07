import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model"; // assuming it's set up
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can create rooms" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await req.json();

    const {
      title,
      description,
      price,
      images,
      capacity,
      size,
      beds,
      services,
      featured = false,
      roomNumber,
      isAvailable = true,
    } = body;

    // Optional: Basic validation
    if (
      !title ||
      !description ||
      !price ||
      !roomNumber ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !Array.isArray(services)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newRoom = await Room.create({
      title,
      description,
      price,
      images,
      capacity,
      size,
      beds,
      services,
      featured,
      roomNumber,
      isAvailable,
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const rooms = await Room.find()

    if (!rooms || rooms.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(rooms, { status: 201 });
  } catch (error) {
    console.error("Having error in getting rooms", error);
    return NextResponse.json(
      {
        error: "Failed while getting rooms",
      },
      { status: 400 }
    );
  }
}
