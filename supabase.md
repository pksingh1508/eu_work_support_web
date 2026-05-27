# Supabase SQL

Run this SQL in the Supabase SQL Editor before testing the Stripe webhook.

```sql
alter table public.app_users
  alter column user_plan set default 'Free';

create table if not exists public.app_stripe_customers (
  id uuid primary key default gen_random_uuid(),
  app_user_id text not null references public.app_users(clerk_user_id) on update cascade on delete restrict,
  clerk_user_id text not null,
  email text not null,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_payments (
  id uuid primary key default gen_random_uuid(),
  app_user_id text not null references public.app_users(clerk_user_id) on update cascade on delete restrict,
  clerk_user_id text not null,
  email text not null,
  plan text not null default 'PRO',
  purchase_type text not null default 'one_time_lifetime',
  stripe_event_id text not null unique,
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text unique,
  stripe_customer_id text,
  stripe_price_id text,
  amount_subtotal integer,
  amount_total integer not null check (amount_total >= 0),
  currency text not null,
  payment_status text not null,
  checkout_status text,
  mode text not null default 'payment',
  paid_at timestamptz,
  raw_session jsonb not null default '{}'::jsonb,
  raw_event jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_payments_plan_check check (plan in ('PRO')),
  constraint app_payments_purchase_type_check check (purchase_type in ('one_time_lifetime')),
  constraint app_payments_mode_check check (mode = 'payment')
);

create table if not exists public.stripe_webhook_events (
  stripe_event_id text primary key,
  event_type text not null,
  livemode boolean not null default false,
  api_version text,
  processing_status text not null default 'processed',
  processed_at timestamptz,
  error_message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint stripe_webhook_events_processing_status_check
    check (processing_status in ('processed', 'skipped', 'failed'))
);

create index if not exists app_stripe_customers_app_user_id_idx
  on public.app_stripe_customers(app_user_id);

create index if not exists app_payments_app_user_id_idx
  on public.app_payments(app_user_id);

create index if not exists app_payments_clerk_user_id_idx
  on public.app_payments(clerk_user_id);

create index if not exists app_payments_email_idx
  on public.app_payments(email);

create index if not exists app_payments_payment_status_idx
  on public.app_payments(payment_status);

create index if not exists stripe_webhook_events_event_type_idx
  on public.stripe_webhook_events(event_type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_app_stripe_customers_updated_at on public.app_stripe_customers;
create trigger set_app_stripe_customers_updated_at
before update on public.app_stripe_customers
for each row
execute function public.set_updated_at();

drop trigger if exists set_app_payments_updated_at on public.app_payments;
create trigger set_app_payments_updated_at
before update on public.app_payments
for each row
execute function public.set_updated_at();

alter table public.app_stripe_customers enable row level security;
alter table public.app_payments enable row level security;
alter table public.stripe_webhook_events enable row level security;
```

These tables are intended for server-side access through the Supabase service role key only. Do not add public read/write RLS policies for payment records unless you intentionally build a user-facing billing history screen later.
