import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect from "@/lib/db"
import { authOptions } from "../../auth/[...nextauth]/options"
import User from "@/models/User.model"

export async function GET() {
  await dbConnect()

  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const users = await User.find().select("-password").lean()
  return NextResponse.json(users)
}
