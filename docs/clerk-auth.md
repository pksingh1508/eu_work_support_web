# Clerk Authentication

This website uses Clerk for email/password account creation before payment.

## Routes

- `/sign-up` renders Clerk's hosted sign-up component and redirects to `/checkout`.
- `/sign-in` renders Clerk's hosted sign-in component and redirects to `/checkout`.
- `/checkout` is protected by Clerk in `src/proxy.ts`.

## Supabase Sync

`app_users` rows are created outside this Next.js app by the existing Clerk webhook shown in the Clerk dashboard.

- Endpoint: Supabase Edge Function at `https://pzhftvzciyeyltgsvqsh.supabase.co/functions/v1/cler...`
- Subscribed events: `user.created`, `user.updated`, `user.deleted`
- Expected table: `public.app_users`
- Required join key: `app_users.clerk_user_id = Clerk user id`
- Expected starting plan: `user_plan = 'Free'`

Phase 5 should look up the authenticated Clerk user in `app_users` before creating a Stripe Checkout session.
