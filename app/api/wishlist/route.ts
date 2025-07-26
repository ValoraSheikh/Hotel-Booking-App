import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Wishlist from "@/models/Wishlist.model";
import User from "@/models/User.model";

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

    if (!roomId) {
      return NextResponse.json(
        { error: "Missing userId and roomId is required" },
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
