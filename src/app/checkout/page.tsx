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

  if (isPro) {
    const accountEmail = appUser?.email ?? email ?? "Your account email";

    return (
      <>
        <main className="relative min-h-screen overflow-hidden bg-[#f8fbff] px-5 py-6 text-[#101d36] sm:px-8 sm:py-8 lg:px-12">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="absolute -left-44 top-1/3 h-[420px] w-[420px] rounded-full bg-[#5bd6ac]/15 blur-[100px]" />
          <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#3979e8]/15 blur-[110px]" />

          <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1160px] flex-col">
            <header className="flex items-center justify-between gap-4">
              <Link href="/" className="inline-flex min-w-0 items-center gap-3">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#3979e8] text-sm font-black text-white shadow-[0_10px_28px_rgba(57,121,232,.3)]">
                  <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#5bd6ac]" />
                  <span className="relative">EU</span>
                </span>
                <span className="truncate font-extrabold tracking-[-0.02em]">EU Work Support</span>
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-[#245fc7]">
                <span aria-hidden="true">←</span>
                <span className="hidden sm:inline">Back to home</span>
                <span className="sm:hidden">Home</span>
              </Link>
            </header>

            <div className="my-auto grid grid-cols-1 items-stretch gap-5 py-12 lg:grid-cols-2 lg:gap-6 lg:py-16">
              <div className="relative overflow-hidden rounded-[32px] bg-[#101d36] p-7 text-white shadow-[0_32px_90px_rgba(16,29,54,.2)] sm:p-10 lg:p-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#3979e8]/35 blur-[70px]" />
                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#5bd6ac]/15 blur-[80px]" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#78e0be]/20 bg-[#5bd6ac]/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#78e0be]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5bd6ac]/20 text-[11px]">✓</span>
                    PRO access active
                  </div>
                  <h1 className="mt-7 max-w-[10ch] text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-5xl xl:text-6xl">
                    You&apos;re already PRO.
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                    Your lifetime access is active on this account. There is nothing
                    else to purchase, and you will never be charged a renewal fee.
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Connected account</p>
                    <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">{accountEmail}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Use this same email when signing in to the mobile app.</p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.euworksupport.app"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#5bd6ac] px-6 text-sm font-extrabold text-[#101d36] transition-colors hover:bg-[#78e0be]"
                    >
                      Open Android app
                      <span aria-hidden="true">↗</span>
                    </a>
                    <Link href="/" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10">
                      Explore the website
                    </Link>
                  </div>
                  <p className="mt-4 text-xs text-slate-400">iOS app coming soon</p>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#101d36]/[0.08] bg-white p-7 shadow-[0_22px_70px_rgba(16,29,54,.08)] sm:p-9 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#245fc7]">Your access</p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#101d36]">Lifetime PRO</h2>
                  </div>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dff8ef] text-[#138466]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-[#f8fbff] px-5">
                  {[
                    ["Status", "Active"],
                    ["Renewal", "None"],
                    ["Amount due", "$0"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-5 py-4 text-sm">
                      <dt className="font-medium text-slate-500">{label}</dt>
                      <dd className={`font-extrabold ${label === "Status" ? "text-[#138466]" : "text-[#101d36]"}`}>{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-400">Everything unlocked</h3>
                  <ul className="mt-5 space-y-4">
                    {[
                      "All country and document guides",
                      "Every app page and available data",
                      "Saved resources across your journey",
                      "EU Work Support assistance",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff] text-[11px] font-black text-[#3979e8]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 border-t border-slate-100 pt-6">
                  <p className="text-sm leading-6 text-slate-500">
                    Need help accessing PRO in the app?{" "}
                    <a href="mailto:office@euworksupport.eu" className="font-bold text-[#245fc7] hover:text-[#174da9]">Contact support</a>.
                  </p>
                </div>
              </aside>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

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
