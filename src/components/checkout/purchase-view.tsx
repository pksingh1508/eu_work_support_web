import Image from "next/image";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { pricingPlans } from "@/components/landing/landing-content";
import {
  CheckIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";
import { AccountSyncWatcher } from "./account-sync-watcher";
import { CheckoutButton } from "./checkout-button";
import { CheckoutSteps } from "./checkout-steps";
import { SwitchAccountButton } from "./switch-account-button";

type PurchaseViewProps = {
  email: string | null;
  currentPlan: string | null;
  isSyncing: boolean;
};

const includedFeatures = pricingPlans[0]?.features ?? [];

export function PurchaseView({ email, currentPlan, isSyncing }: PurchaseViewProps) {
  return (
    <>
      <CheckoutSteps current={1} />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-12">
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal immediate y={12} duration={0.5}>
            <p className="section-kicker">Lifetime PRO</p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            className="mt-5 text-balance text-[clamp(2.2rem,4.2vw,3.5rem)] font-black leading-[1] tracking-[-0.055em] text-ink"
            text="Unlock every EU Work Support guide for a one-time $50 payment."
            highlight={["$50"]}
            immediate
            delay={0.1}
            stagger={0.04}
          />
          <Reveal immediate delay={0.35} y={16}>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Complete payment securely on Stripe. As soon as Stripe confirms
              your payment, this account is upgraded from Free to PRO.
            </p>
          </Reveal>
        </div>

        <Reveal
          immediate
          delay={0.2}
          y={32}
          as="aside"
          aria-label="Order summary"
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[30px] border border-ink/[0.08] bg-white shadow-[0_30px_80px_-30px_rgba(16,29,54,0.35)]">
              <div className="relative overflow-hidden bg-ink px-6 py-6 text-white sm:px-8 sm:py-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.5),transparent)]"
                />
                <div className="relative flex items-center justify-between gap-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-mint-light">
                    Order summary
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200">
                    <LockIcon className="h-3 w-3" />
                    Secure checkout
                  </span>
                </div>
                <div className="relative mt-5 flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                    <Image src="/assets/logo.png" alt="" width={40} height={40} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold">EU Work Support PRO</p>
                    <p className="text-sm text-slate-300">Lifetime access</p>
                  </div>
                  <p className="text-2xl font-black tracking-[-0.03em]">$50</p>
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <dl className="space-y-3.5 text-sm">
                  <SummaryRow label="Plan" value="PRO Lifetime" />
                  <SummaryRow label="Payment type" value="One-time" />
                  <SummaryRow label="Renewal" value="None" />
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Current plan</dt>
                    <dd>
                      {isSyncing ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                          Syncing
                        </span>
                      ) : (
                        <span className="rounded-full bg-surface-tint px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-ink/10">
                          {currentPlan ?? "Free"}
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="my-6 border-t border-dashed border-ink/15" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-bold text-ink">Total due today</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      One-time payment · No subscription
                    </p>
                  </div>
                  <p className="text-4xl font-black tracking-[-0.05em] text-ink">
                    $50
                  </p>
                </div>

                <div className="mt-6">
                  <CheckoutButton disabled={isSyncing} />
                  {isSyncing ? <AccountSyncWatcher /> : null}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/[0.07] bg-surface p-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-sm font-black uppercase text-white"
                  >
                    {email?.[0] ?? "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Paying as
                    </p>
                    <p className="truncate text-sm font-bold text-ink">
                      {email ?? "Email not available"}
                    </p>
                  </div>
                  <SwitchAccountButton />
                </div>

                <p className="mt-5 flex items-start gap-2.5 text-xs leading-5 text-slate-500">
                  <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />
                  Payments are processed securely by Stripe. EU Work Support
                  never stores your card details.
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              Questions before paying?{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="font-bold text-brand-strong hover:text-brand-deep"
              >
                Contact support
              </a>
            </p>
          </div>
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal
            immediate
            delay={0.3}
            y={24}
            className="rounded-[28px] border border-ink/[0.08] bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(16,29,54,0.25)] backdrop-blur sm:p-8"
          >
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
              Everything included
            </h2>
            <RevealGroup
              as="ul"
              immediate
              delay={0.45}
              stagger={0.07}
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {includedFeatures.map((feature) => (
                <RevealItem
                  as="li"
                  key={feature}
                  y={12}
                  className="flex items-center gap-3 rounded-2xl bg-surface-tint/80 px-4 py-3.5 text-sm font-semibold text-slate-700 sm:last:odd:col-span-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-soft text-mint-deep">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal
            immediate
            delay={0.45}
            y={20}
            className="mt-4 flex items-start gap-4 rounded-[24px] border border-brand/15 bg-brand-soft/60 p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(57,121,232,0.7)]">
              <SmartphoneIcon className="h-5 w-5" />
            </span>
            <p className="text-sm leading-6 text-slate-600">
              <b className="text-ink">Use this same email in the mobile app.</b>{" "}
              After payment, sign in to EU Work Support with{" "}
              <span className="break-all font-semibold text-ink">
                {email ?? "your account email"}
              </span>{" "}
              and PRO unlocks automatically.
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-bold text-ink">{value}</dd>
    </div>
  );
}
