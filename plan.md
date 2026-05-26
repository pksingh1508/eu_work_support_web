# Implementation Plan

## Project Context

- Framework: Next.js `16.2.6` with the App Router in `src/app`.
- Styling: Tailwind CSS `4`.
- Current app state: starter landing page only.
- Next.js rule followed: API work will use App Router Route Handlers in `src/app/api/**/route.ts`, as documented in `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`.
- Secrets rule followed: all Clerk, Brevo, Stripe, and Supabase secrets stay server-side in root `.env.local`; only publishable browser keys use `NEXT_PUBLIC_`.

## Information Needed Before Coding

Collect these details first so the implementation does not need guessing:

- App name, tagline, screenshots, app store links, pricing amount, currency, and PRO feature list for the landing page.
- Brevo sender email, sender name, API key, and the exact email template/copy for sending the website payment link.
- Clerk publishable key, secret key, webhook signing secret, enabled sign-up fields, and production domain settings.
- Supabase project URL, service role key, `app_users` table schema, and the rule that connects Clerk users to `app_users` rows.
- Stripe publishable key, secret key, webhook signing secret, product/price IDs, success URL, cancel URL, and payment table schema.
- Deployment URL that Stripe and Clerk webhooks will call in production.

## Phase 1: Baseline Setup

Goal: prepare safe foundations before adding business logic.

1. Add required packages after confirming exact libraries:
   - `@clerk/nextjs`
   - `@supabase/supabase-js`
   - `stripe`
   - optional validation helper such as `zod`
2. Create `.env.example` with required keys only, no real secrets:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `BREVO_API_KEY`
   - `BREVO_SENDER_EMAIL`
   - `BREVO_SENDER_NAME`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRO_PRICE_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Create server-only helper modules:
   - `src/lib/env.ts` for required environment validation.
   - `src/lib/supabase/server.ts` for a Supabase service-role client used only inside Route Handlers/webhooks.
   - `src/lib/stripe/server.ts` for the Stripe server client.
4. Run `pnpm run build` to confirm the starter project still compiles.

Done when: dependencies install, env validation exists, server helpers compile, and build passes.

## Phase 2: Professional Landing Page

Goal: replace the starter page with a polished page that explains the mobile-app payment flow.

1. Update `src/app/layout.tsx` metadata with the app name, description, and social preview basics.
2. Replace `src/app/page.tsx` with a landing page containing:
   - Hero section with the mobile app name, clear value proposition, and primary call to action.
   - Pricing section for Free vs PRO.
   - Workflow section: mobile app -> email link -> website account -> Stripe payment -> mobile login.
   - Trust/FAQ section explaining that payment happens securely on the website.
   - CTA that sends users to sign up or payment entry point.
3. Update `src/app/globals.css` for the final color system, page background, and responsive polish.
4. Add real app screenshots/assets to `public/` when available.
5. Test responsive behavior at mobile, tablet, and desktop sizes.

Done when: the first screen looks like a real product website, copy is accurate, and build passes.

## Phase 3: Brevo Email API Route

Goal: create a backend endpoint that sends the website link to a mobile-app user by email.

1. Create `src/app/api/send-payment-link/route.ts`.
2. Accept only `POST` requests with a validated JSON body:
   - `email`
   - optional `name`
   - optional app-specific context if needed later
3. Generate the website URL from `NEXT_PUBLIC_SITE_URL`, for example:
   - sign-up URL
   - or a checkout-start URL if the account already exists
4. Call Brevo at `https://api.brevo.com/v3/smtp/email` with:
   - `api-key: process.env.BREVO_API_KEY`
   - sender from env
   - recipient email from request
   - subject and HTML/text content
5. Return safe JSON responses:
   - `200` with `{ ok: true }` on success
   - `400` for invalid email/body
   - `500` for provider failure without exposing secrets
6. Add abuse protection before production:
   - rate limit by IP/email
   - optional shared secret if this endpoint is called only by the mobile app/backend

Done when: a local request sends a Brevo email successfully and invalid input is rejected.

## Phase 4: Clerk Authentication

Goal: allow users to create an account with email and password on the website.

1. Wrap the app with Clerk provider in `src/app/layout.tsx`.
2. Add Clerk middleware if required by the current Clerk/Next integration.
3. Create auth pages:
   - `src/app/sign-up/[[...sign-up]]/page.tsx`
   - `src/app/sign-in/[[...sign-in]]/page.tsx`
4. Configure sign-up to use email and password.
5. After sign-up, redirect users to the payment page or pricing/checkout page.
6. Verify the automatic Supabase `app_users` creation path:
   - if already handled externally, document the exact Clerk webhook/database trigger.
   - if not yet implemented, create a Clerk webhook route in `src/app/api/webhooks/clerk/route.ts`.
7. Make `app_users` lookup reliable by storing Clerk user ID and email in Supabase.

Done when: a new user can sign up, the Clerk user exists, and the matching `app_users` row exists with `user_plan = 'Free'`.

## Phase 5: Stripe Checkout

Goal: let the newly created user start a secure Stripe payment for PRO.

1. Create a protected page such as `src/app/checkout/page.tsx`.
2. Create `src/app/api/stripe/create-checkout-session/route.ts`.
3. Require an authenticated Clerk user in the route.
4. Look up the user's `app_users` row by Clerk user ID or email.
5. Create a Stripe Checkout Session with:
   - `mode: "payment"` or `mode: "subscription"` after final pricing decision.
   - `line_items` using `STRIPE_PRO_PRICE_ID`.
   - `customer_email` or Stripe customer ID.
   - metadata containing Clerk user ID and Supabase app user ID.
   - success and cancel URLs.
6. Redirect the browser to Stripe Checkout.
7. Handle already-PRO users by skipping checkout and showing current plan.

Done when: an authenticated Free user can reach Stripe Checkout and metadata includes enough data for the webhook.

## Phase 6: Stripe Webhook and Plan Upgrade

Goal: verify successful payment and upgrade the user from Free to PRO.

1. Create `src/app/api/webhooks/stripe/route.ts`.
2. Read the raw request body with `await request.text()`.
3. Verify the `stripe-signature` header using `STRIPE_WEBHOOK_SECRET`.
4. Handle successful payment events:
   - for one-time payment: `checkout.session.completed`
   - for subscription: also handle subscription lifecycle events if subscriptions are chosen
5. Validate that the event contains expected metadata and payment status.
6. Update Supabase `app_users.user_plan` from `Free` to `PRO`.
7. Store payment details in the payment table:
   - Stripe event ID
   - Checkout session ID
   - payment intent or subscription ID
   - Clerk user ID
   - app user ID
   - email
   - amount
   - currency
   - status
   - raw event/payment metadata if the schema allows it
8. Make the webhook idempotent:
   - ignore duplicate Stripe event IDs already stored.
   - never downgrade a PRO user because of a duplicate or delayed event.
9. Return `200` quickly after processing.

Done when: Stripe CLI test events verify signature, update the user to PRO, and insert one payment record without duplicates.

## Phase 7: Success and Failure Pages

Goal: give users clear website feedback after Stripe redirects.

1. Create `src/app/payment/success/page.tsx`.
2. Create `src/app/payment/cancel/page.tsx`.
3. On success, show a clear message that payment is received and the user can return to the mobile app with the same email.
4. Optionally poll or refresh the user plan if the webhook is still processing.
5. On cancel, let the user retry checkout.

Done when: users understand what happened after returning from Stripe.

## Phase 8: Mobile-App Integration Contract

Goal: make the mobile app and website agree on the flow.

1. Mobile app collects an email and calls the Brevo email route or a backend route that calls it.
2. Email sends the website link.
3. Website account must use the same email as the mobile app login.
4. Supabase `app_users` uses email and/or Clerk user ID to expose plan status to the mobile app.
5. Mobile app login checks `app_users.user_plan`.
6. If `user_plan = 'PRO'`, unlock paid content.
7. If `user_plan = 'Free'`, show the payment-link flow again.

Done when: the same email can move through mobile -> email -> website -> payment -> mobile unlock.

## Phase 9: Testing Checklist

Run these checks after each phase, not only at the end:

1. `pnpm run build`
2. Manual landing page review on mobile and desktop.
3. Brevo route test with valid and invalid email.
4. Clerk sign-up test with a new email.
5. Supabase verification that `app_users` row is created correctly.
6. Stripe checkout test card payment.
7. Stripe webhook signature verification using Stripe CLI.
8. Duplicate webhook event test for idempotency.
9. Mobile login test against a Free user and a PRO user.

## Build Order

Implement in this order:

1. Baseline setup.
2. Landing page.
3. Brevo email route.
4. Clerk sign-up.
5. Supabase user verification.
6. Stripe checkout.
7. Stripe webhook and payment storage.
8. Success/cancel pages.
9. End-to-end test with a fresh email.

This order keeps each piece testable before the next piece depends on it.
