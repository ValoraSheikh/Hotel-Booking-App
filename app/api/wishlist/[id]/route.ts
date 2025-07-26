import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import Wishlist from "@/models/Wishlist.model";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, props: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const roomId = params.id;

    if (!roomId) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const wishlist = await Wishlist.findOne({ user: session.user.id });

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 }
      );
    }

    if (wishlist.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Probhited" }, { status: 403 });
    }

    await Wishlist.updateOne(
      { user: session.user.id },
      { $pull: { rooms: roomId } }
    );

    return NextResponse.json(
      { message: "Wishlist successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
