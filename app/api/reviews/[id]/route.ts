import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import { updateRoomAverageRating } from "@/lib/updateRoomRating";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const roomId = review.room; // Save before deleting
    await review.deleteOne();

    await updateRoomAverageRating(roomId);

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, props: PageProps) {
  const params = await props.params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const review = await Review.findById(params.id);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // 🛡️ Ensure the user owns the review
    if (review.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { rating, comment } = body;

    if (!rating && !comment) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (comment && comment.length > 100) {
      return NextResponse.json(
        { error: "Comment cannot exceed 100 characters" },
        { status: 400 }
      );
    }

    // ✅ Apply updates
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    await updateRoomAverageRating(review.room);

    return NextResponse.json(
      { message: "Review updated", review },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
