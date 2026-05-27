import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { CheckoutButton } from "@/components/checkout/checkout-button";
import { SiteFooter } from "@/components/site/site-footer";
import { getAppUserForClerkAccount } from "@/lib/supabase/app-users";

export default async function CheckoutPage() {
  const { userId } = await auth.protect();
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    null;
  const appUser = await getAppUserForClerkAccount({ clerkUserId: userId, email });
  const isPro = appUser?.user_plan?.toUpperCase() === "PRO";
  const isSyncing = !appUser;

  return (
    <>
      <main className="min-h-screen bg-[#f6f8fc] px-5 py-10 sm:px-8">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
          <Link href="/" className="text-lg font-bold text-slate-950">
            EU Work Support
          </Link>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase text-[#0069c9]">
                Lifetime PRO
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950">
                Unlock every EU Work Support guide for a one-time $50 payment.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Complete payment securely on Stripe. After the payment webhook is
                verified, this account will be upgraded from Free to PRO.
              </p>

              <div className="mt-8">
                {isPro ? (
                  <Link
                    href="/payment/success?already_pro=1"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0069c9] px-6 text-base font-semibold text-white transition hover:bg-[#0058aa]"
                  >
                    View PRO status
                  </Link>
                ) : (
                  <CheckoutButton disabled={isSyncing} />
                )}
              </div>

              {isSyncing ? (
                <p className="mt-4 max-w-xl text-sm leading-6 text-amber-700">
                  Your Clerk account is ready, but the Supabase app_users row has
                  not appeared yet. Wait a few seconds, then refresh this page.
                </p>
              ) : null}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Order summary</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <dt className="text-slate-600">Plan</dt>
                  <dd className="font-semibold text-slate-950">PRO Lifetime</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <dt className="text-slate-600">Payment type</dt>
                  <dd className="font-semibold text-slate-950">One-time</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <dt className="text-slate-600">Current plan</dt>
                  <dd className="font-semibold text-slate-950">
                    {appUser?.user_plan ?? "Syncing"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 text-lg">
                  <dt className="font-bold text-slate-950">Total</dt>
                  <dd className="font-bold text-slate-950">$50</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <p>
                  Email:{" "}
                  <span className="font-medium text-slate-950">
                    {appUser?.email ?? email ?? "Not available"}
                  </span>
                </p>
                <p className="mt-2">
                  Clerk user ID:{" "}
                  <span className="break-all font-mono text-slate-950">{userId}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
