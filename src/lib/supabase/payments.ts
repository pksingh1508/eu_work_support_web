import type Stripe from "stripe";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

type StripeWebhookStatus = "processed" | "skipped" | "failed";

export async function hasProcessedStripeWebhookEvent(stripeEventId: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("stripe_webhook_events")
    .select("stripe_event_id, processing_status")
    .eq("stripe_event_id", stripeEventId)
    .maybeSingle<{ stripe_event_id: string; processing_status: StripeWebhookStatus }>();

  if (error) {
    throw new Error(`Unable to check Stripe webhook event: ${error.message}`);
  }

  return data?.processing_status === "processed" || data?.processing_status === "skipped";
}

export async function recordStripeWebhookEvent({
  event,
  status,
  errorMessage,
}: {
  event: Stripe.Event;
  status: StripeWebhookStatus;
  errorMessage?: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("stripe_webhook_events").upsert(
    {
      api_version: event.api_version,
      error_message: errorMessage ?? null,
      event_type: event.type,
      livemode: event.livemode,
      payload: event,
      processed_at: new Date().toISOString(),
      processing_status: status,
      stripe_event_id: event.id,
    },
    { onConflict: "stripe_event_id" },
  );

  if (error) {
    throw new Error(`Unable to record Stripe webhook event: ${error.message}`);
  }
}

export async function upsertStripeCustomer({
  appUserId,
  clerkUserId,
  email,
  stripeCustomerId,
}: {
  appUserId: string;
  clerkUserId: string;
  email: string;
  stripeCustomerId: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("app_stripe_customers").upsert(
    {
      app_user_id: appUserId,
      clerk_user_id: clerkUserId,
      email,
      stripe_customer_id: stripeCustomerId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_customer_id" },
  );

  if (error) {
    throw new Error(`Unable to store Stripe customer: ${error.message}`);
  }
}

export async function storeStripePayment({
  event,
  session,
  appUserId,
  clerkUserId,
  email,
  priceId,
}: {
  event: Stripe.Event;
  session: Stripe.Checkout.Session;
  appUserId: string;
  clerkUserId: string;
  email: string;
  priceId?: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("app_payments").upsert(
    {
      amount_subtotal: session.amount_subtotal,
      amount_total: session.amount_total,
      app_user_id: appUserId,
      checkout_status: session.status,
      clerk_user_id: clerkUserId,
      currency: session.currency,
      email,
      mode: session.mode,
      paid_at: new Date().toISOString(),
      payment_status: session.payment_status,
      plan: "PRO",
      purchase_type: "one_time_lifetime",
      raw_event: event,
      raw_session: session,
      stripe_checkout_session_id: session.id,
      stripe_customer_id: getStripeId(session.customer),
      stripe_event_id: event.id,
      stripe_payment_intent_id: getStripeId(session.payment_intent),
      stripe_price_id: priceId ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_checkout_session_id" },
  );

  if (error) {
    throw new Error(`Unable to store Stripe payment: ${error.message}`);
  }
}

export async function upgradeAppUserToPro(appUserId: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("app_users")
    .update({
      updated_at: new Date().toISOString(),
      user_plan: "PRO",
    })
    .eq("clerk_user_id", appUserId)
    .is("deleted_at", null)
    .select("clerk_user_id")
    .maybeSingle<{ clerk_user_id: string }>();

  if (error) {
    throw new Error(`Unable to upgrade app user: ${error.message}`);
  }

  if (!data) {
    throw new Error("Unable to upgrade app user: app_users row was not found.");
  }
}

function getStripeId(value: string | Stripe.DeletedCustomer | Stripe.Customer | Stripe.PaymentIntent | null) {
  if (!value) {
    return null;
  }

  return typeof value === "string" ? value : value.id;
}
