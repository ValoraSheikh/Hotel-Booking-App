import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Contact from "@/models/ContactUs.model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { firstName, lastName, phone, message } = body;

    if (!firstName || !lastName || !phone || !message) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      phone,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        room: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact", { error });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can get contacts" },
        { status: 401 }
      );
    }

    await dbConnect();

    const rooms = await Contact.find().lean();

    return NextResponse.json(
      {
        success: true,
        rooms,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Having error in getting Contact", error);
    return NextResponse.json(
      {
        error: "Failed while getting Contact",
      },
      { status: 400 }
    );
  }
}
