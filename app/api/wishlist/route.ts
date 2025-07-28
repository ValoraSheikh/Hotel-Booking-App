import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Wishlist from "@/models/Wishlist.model";
import User from "@/models/User.model";
import "@/models/Room.model";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized access only looged in user can success" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await req.json();

    const { roomId } = body;

    console.log("💩", body);
    console.log("🐱‍🚀", roomId);

    if (!roomId) {
      return NextResponse.json(
        { error: "Missing roomId is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: user._id },
      { $addToSet: { rooms: roomId } }, // ✅ add roomId only if not already present
      { upsert: true, new: true } // ✅ create if not exists, return updated
    );

    return NextResponse.json(
      { message: "Room added to wihlist", wishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/wishlist", { error });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized access only logged-in users can access this" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlist = await Wishlist.findOne({ user: user._id })
      .populate("rooms")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { wishlist: wishlist?.rooms || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/wishlist", { error });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { roomId } = body;

    console.log("PATCH request body:", body);

    if (!roomId) {
      return NextResponse.json({ error: "Room ID missing" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });

    const wishlist = await Wishlist.findOne({ user: user._id });

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 }
      );
    }

    console.log("Removing roomId from wishlist:", roomId);

    await Wishlist.updateOne(
      { user: user._id },
      { $pull: { rooms: new mongoose.Types.ObjectId(roomId) } }
    );

    return NextResponse.json(
      { message: "Wishlist successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Internal Error:", error);
    if (error instanceof Error) {
      console.error("🔥 Message:", error.message);
      console.error("🔥 Stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
