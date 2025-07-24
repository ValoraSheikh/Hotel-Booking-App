import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Env, StandardCheckoutClient } from "pg-sdk-node";

const client = StandardCheckoutClient.getInstance(
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!,
  Number(process.env.CLIENT_VERSION || 1),
  Env.SANDBOX
);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {

    const { searchParams } = new URL(req.url);
    const merchantOrderId = searchParams.get("merchantOrderId");

    if (!merchantOrderId) {
      console.log("⚠️  No merchantOrderId in payload:", merchantOrderId);
      return NextResponse.json(
        { error: "merchantOrderId is required" },
        { status: 400 }
      );
    }

    console.log("🔎 Checking status for order:", merchantOrderId);

    const { state } = await client.getOrderStatus(merchantOrderId);

    const status = state === "COMPLETED" ? "success" : "failed";

    

    console.log("➡️ Returning status:", status);
    return NextResponse.json({ status });
  } catch (error) {
    console.error("💥 Status function error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
