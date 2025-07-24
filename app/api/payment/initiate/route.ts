import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
} from "pg-sdk-node";

const client = StandardCheckoutClient.getInstance(
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!,
  Number(process.env.CLIENT_VERSION || 1),
  Env.SANDBOX // change this to PRODUCTION for live
);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();

    const body = await req.json();
    const { amount, redirectUrl, merchantOrderId } = body;

    if (!amount || !redirectUrl || !merchantOrderId) {
      return NextResponse.json({
        error: "Missing Amount and redirectUrl is required.",
      });
    }

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(redirectUrl)
      .build();

    const response = await client.pay(request);

    return NextResponse.json(
      { redirectUrl: response.redirectUrl },
      { status: 200 }
    );
  } catch (err) {
    console.error("Payment initiate POST error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
