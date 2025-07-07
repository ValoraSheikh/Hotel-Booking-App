import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import Contact from "@/models/ContactUs.model";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // ✅ fixed destructure
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can delete contact" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const deletedContsct = await Contact.findByIdAndDelete(id);

    if (!deletedContsct) {
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