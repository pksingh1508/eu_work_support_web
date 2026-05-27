import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeWebhookEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe/server";
import {
  hasProcessedStripeWebhookEvent,
  recordStripeWebhookEvent,
  storeStripePayment,
  upgradeAppUserToPro,
  upsertStripeCustomer,
} from "@/lib/supabase/payments";

export const runtime = "nodejs";

const fulfilledEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  const payload = await request.text();
  const stripe = getStripe();
  const env = getStripeWebhookEnv();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature.";

    return NextResponse.json(
      { ok: false, error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  try {
    const alreadyProcessed = await hasProcessedStripeWebhookEvent(event.id);

    if (alreadyProcessed) {
      return NextResponse.json({ ok: true, duplicate: true, eventId: event.id });
    }

    if (event.type === "checkout.session.async_payment_failed") {
      await recordStripeWebhookEvent({ event, status: "skipped" });
      return NextResponse.json({ ok: true, skipped: true, eventId: event.id });
    }

    if (!fulfilledEvents.has(event.type)) {
      await recordStripeWebhookEvent({ event, status: "skipped" });
      return NextResponse.json({ ok: true, skipped: true, eventId: event.id });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillCheckoutSession(event, session);
    await recordStripeWebhookEvent({ event, status: "processed" });

    return NextResponse.json({ ok: true, eventId: event.id });
  } catch (error) {
    console.error("Unable to process Stripe webhook", error);

    try {
      await recordStripeWebhookEvent({
        errorMessage: error instanceof Error ? error.message : "Unknown webhook error.",
        event,
        status: "failed",
      });
    } catch (recordError) {
      console.error("Unable to record failed Stripe webhook", recordError);
    }

    return NextResponse.json(
      { ok: false, error: "Unable to process Stripe webhook." },
      { status: 500 },
    );
  }
}

async function fulfillCheckoutSession(
  event: Stripe.Event,
  session: Stripe.Checkout.Session,
) {
  if (session.mode !== "payment") {
    throw new Error(`Unexpected Checkout mode: ${session.mode ?? "unknown"}.`);
  }

  if (session.payment_status !== "paid") {
    throw new Error(
      `Checkout Session ${session.id} is not paid. Current status: ${session.payment_status}.`,
    );
  }

  if (typeof session.amount_total !== "number" || !session.currency) {
    throw new Error(`Checkout Session ${session.id} is missing payment totals.`);
  }

  const metadata = session.metadata ?? {};
  const appUserId = metadata.app_user_id;
  const clerkUserId = metadata.clerk_user_id;
  const plan = metadata.plan;
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    metadata.app_user_email ??
    null;

  if (!appUserId || !clerkUserId || plan !== "PRO" || !email) {
    throw new Error(`Checkout Session ${session.id} is missing required metadata.`);
  }

  const customerId = getStripeObjectId(session.customer);

  if (customerId) {
    await upsertStripeCustomer({
      appUserId,
      clerkUserId,
      email,
      stripeCustomerId: customerId,
    });
  }

  await storeStripePayment({
    appUserId,
    clerkUserId,
    email,
    event,
    priceId: metadata.stripe_price_id,
    session,
  });

  await upgradeAppUserToPro(appUserId);
}

function getStripeObjectId(value: string | { id?: string } | null) {
  if (!value) {
    return null;
  }

  return typeof value === "string" ? value : value.id ?? null;
}
