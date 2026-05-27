import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeCheckoutEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe/server";
import { getAppUserForClerkAccount } from "@/lib/supabase/app-users";

export const runtime = "nodejs";

type CheckoutResponse =
  | {
      ok: true;
      alreadyPro?: boolean;
      url: string;
    }
  | {
      ok: false;
      code: string;
      error: string;
    };

export async function POST() {
  const { userId } = await auth.protect();
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    null;

  try {
    const appUser = await getAppUserForClerkAccount({
      clerkUserId: userId,
      email,
    });

    if (!appUser) {
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          code: "app_user_not_found",
          error:
            "Your account is still syncing. Please wait a moment, then try checkout again.",
        },
        { status: 409 },
      );
    }

    if (appUser.user_plan?.toUpperCase() === "PRO") {
      return NextResponse.json<CheckoutResponse>({
        ok: true,
        alreadyPro: true,
        url: "/payment/success?already_pro=1",
      });
    }

    const checkoutEmail = appUser.email ?? email;

    if (!checkoutEmail) {
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          code: "missing_email",
          error:
            "Your account does not have an email address. Please update your account before checkout.",
        },
        { status: 409 },
      );
    }

    const env = getStripeCheckoutEnv();
    const stripe = getStripe();
    const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const metadata = {
      app_user_email: checkoutEmail,
      app_user_id: appUser.clerk_user_id,
      clerk_user_id: userId,
      plan: "PRO",
      product: "eu_work_support_pro_lifetime",
      purchase_type: "one_time_lifetime",
      stripe_price_id: env.STRIPE_PRO_PRICE_ID,
    };

    const session = await stripe.checkout.sessions.create({
      cancel_url: `${siteUrl}/payment/cancel`,
      client_reference_id: appUser.clerk_user_id,
      consent_collection: {
        terms_of_service: "required",
      },
      customer_creation: "always",
      customer_email: checkoutEmail,
      custom_text: {
        submit: {
          message:
            "EU Work Support PRO is a one-time $50 digital purchase for lifetime access. Refund requests are reviewed under our Refund & Cancellation Policy.",
        },
        terms_of_service_acceptance: {
          message: `I agree to the [EU Work Support Terms & Conditions](${siteUrl}/terms-and-conditions), [Privacy Policy](${siteUrl}/privacy-policy), and [Refund & Cancellation Policy](${siteUrl}/refund-and-cancellation-policy).`,
        },
      },
      line_items: [
        {
          price: env.STRIPE_PRO_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata,
      mode: "payment",
      payment_intent_data: {
        metadata,
      },
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.url) {
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          code: "missing_checkout_url",
          error: "Stripe did not return a checkout URL. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json<CheckoutResponse>({
      ok: true,
      url: session.url,
    });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json<CheckoutResponse>(
        {
          ok: false,
          code: "stripe_error",
          error: error.message,
        },
        { status: error.statusCode ?? 502 },
      );
    }

    console.error("Unable to create Stripe Checkout Session", error);

    return NextResponse.json<CheckoutResponse>(
      {
        ok: false,
        code: "checkout_session_failed",
        error: "Unable to start checkout. Please try again.",
      },
      { status: 500 },
    );
  }
}
