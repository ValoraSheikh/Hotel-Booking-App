import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking.model";

type PageProps = {
  params: {
    id: string;
  };
};

export async function GET(
  req: NextRequest,
  { params }: PageProps
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await dbConnect();

    const booking = await Booking.findById(id).populate("room");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await dbConnect();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Prevent cancelling if already cancelled or completed
    if (booking.status === "cancelled" || booking.status === "completed") {
      return NextResponse.json(
        { error: `Booking already ${booking.status}` },
        { status: 400 }
      );
    }

    booking.status = "cancelled";
    await booking.save();

    return NextResponse.json(
      { message: "Booking cancelled", booking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
