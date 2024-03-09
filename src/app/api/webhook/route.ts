import stripe from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("stripe-signature") as string;
  let event: Stripe.Event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return;

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse("Webhook error", { status: 400 });
  }

  console.log(event.type);

  //
  return NextResponse.json({ received: true });
}
