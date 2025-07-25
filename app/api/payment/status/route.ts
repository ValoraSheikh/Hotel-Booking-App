import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Env, StandardCheckoutClient } from "pg-sdk-node";
import Booking from "@/models/Booking.model";
import dbConnect from "@/lib/db";

const client = StandardCheckoutClient.getInstance(
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!,
  Number(process.env.CLIENT_VERSION || 1),
  Env.SANDBOX
);

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const merchantOrderId = searchParams.get("merchantOrderId");
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId is required" },
        { status: 400 }
      );
    }

    if (!merchantOrderId) {
      return NextResponse.json(
        { error: "merchantOrderId is required" },
        { status: 400 }
      );
    }
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const { state } = await client.getOrderStatus(merchantOrderId);

    let status = "failed";
    if (state === "COMPLETED") status = "success";
    else if (state === "PENDING") status = "pending";

    if (status === "success") {
      booking.merchantOrderId = merchantOrderId
      booking.paymentStatus = "success";
      await booking.save();
    }


    return NextResponse.json({ paymentStatus: status });
  } catch (error) {
    console.error(
      "💥 Status error:",
      error instanceof Error ? error.message : error
    );
  }
}
