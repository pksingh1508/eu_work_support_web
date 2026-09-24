import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { SiteFooter } from "@/components/site/site-footer";
import { SubpageHeader } from "@/components/site/subpage-header";
import {
  ArrowUpRightIcon,
  CheckIcon,
  MailIcon,
  UndoIcon,
} from "@/components/ui/icons";
import { PendingLink } from "@/components/ui/pending-link";
import { supportEmail } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Checkout canceled | EU Work Support",
};

const reassurances = [
  "No charge was made",
  "Your account is still ready",
  "PRO stays a one-time $50",
];

export default function PaymentCancelPage() {
  return (
    <>
      <main className="relative min-h-screen bg-surface text-ink">
        <PageBackdrop />
        <SubpageHeader />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 lg:pb-28 lg:pt-16">
          <Reveal
            immediate
            y={32}
            className="relative overflow-hidden rounded-[36px] border border-ink/[0.08] bg-white px-6 py-10 text-center shadow-[0_40px_100px_-40px_rgba(16,29,54,0.35)] sm:px-12 sm:py-14"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(57,121,232,0.12),transparent_70%)]"
            />
            <div className="relative">
              <Reveal
                immediate
                scale={0.6}
                y={0}
                delay={0.1}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand ring-8 ring-brand-soft/50"
              >
                <UndoIcon className="h-9 w-9" />
              </Reveal>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-strong">
                Checkout canceled
              </p>
              <AnimatedHeading
                as="h1"
                className="mt-4 text-balance text-[clamp(2.1rem,5vw,3.5rem)] font-black leading-[1.02] tracking-[-0.05em] text-ink"
                text="No payment was taken."
                highlight={["No"]}
                immediate
                delay={0.25}
              />
              <Reveal immediate delay={0.45} y={12}>
                <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                  You can return to checkout whenever you are ready to unlock
                  lifetime PRO access.
                </p>
              </Reveal>
              <Reveal
                immediate
                delay={0.55}
                y={12}
                className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <PendingLink
                  href="/checkout"
                  className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl bg-ink px-6 text-base font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(16,29,54,0.7)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong"
                  iconClassName="h-5 w-5"
                >
                  Try checkout again
                </PendingLink>
                <Link
                  href="/"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-ink/10 bg-white px-6 text-base font-bold text-ink transition-colors hover:border-ink/25 hover:bg-surface"
                >
                  Back to home
                </Link>
              </Reveal>

              <RevealGroup
                as="ul"
                immediate
                delay={0.7}
                stagger={0.08}
                className="mt-9 flex flex-wrap justify-center gap-2.5"
              >
                {reassurances.map((item) => (
                  <RevealItem
                    as="li"
                    key={item}
                    y={10}
                    className="inline-flex items-center gap-2 rounded-full bg-surface-tint px-3.5 py-2 text-xs font-bold text-slate-600 ring-1 ring-ink/[0.06]"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-mint-deep" />
                    {item}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>

          <Reveal immediate delay={0.8} y={20}>
            <a
              href={`mailto:${supportEmail}`}
              className="group mt-6 flex items-center gap-4 rounded-[26px] border border-ink/[0.08] bg-white/80 p-5 shadow-[0_16px_40px_-24px_rgba(16,29,54,0.3)] backdrop-blur transition-[border-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/30"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(57,121,232,0.7)]">
                <MailIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-ink">Had trouble paying?</b>
                <span className="block text-sm leading-6 text-slate-500">
                  Our support team can help at {supportEmail}
                </span>
              </span>
              <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
