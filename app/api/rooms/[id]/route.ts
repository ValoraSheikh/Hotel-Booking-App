import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import Room from "@/models/Room.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

type PageProps = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing room ID" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    await dbConnect();

    const room = await Room.findById(id).lean();

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.log("Room error:", error);
    return NextResponse.json(
      { error: "Failed to get room with id" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: PageProps) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can create rooms" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "room deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can update rooms" },
        { status: 401 }
      );
    }

    await dbConnect();

    const room = await Room.findById(id).lean();
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const body = await request.json();

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Room updated successfully",
        room: updatedRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}
