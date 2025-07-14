import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import { updateRoomAverageRating } from "@/lib/updateRoomRating";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function DELETE(
  req: NextRequest,
  { params }: PageProps
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const roomId = review.room;
    await review.deleteOne();

    await updateRoomAverageRating(roomId);

    return NextResponse.json(
      { message: "Review deleted successfully by admin" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin DELETE review error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
