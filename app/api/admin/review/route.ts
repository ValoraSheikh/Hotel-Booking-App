import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const reviews = await Review.find({})
      .populate("user", "name email")
      .populate("room", "title") // Or whatever field identifies the room
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Admin GET reviews error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
