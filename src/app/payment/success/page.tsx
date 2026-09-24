import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { StoreButtons } from "@/components/landing/store-buttons";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SuccessBurst } from "@/components/payment/success-burst";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { SiteFooter } from "@/components/site/site-footer";
import { SubpageHeader } from "@/components/site/subpage-header";
import {
  MailIcon,
  SmartphoneIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Payment complete | EU Work Support",
};

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    already_pro?: string;
    session_id?: string;
  }>;
};

const nextSteps = [
  {
    icon: SmartphoneIcon,
    title: "Open the app",
    description: "Launch EU Work Support on your phone.",
  },
  {
    icon: UserPlusIcon,
    title: "Sign in with the same email",
    description: "Use the email connected to this account.",
  },
  {
    icon: SparklesIcon,
    title: "Enjoy lifetime PRO",
    description: "Every guide, page, and support feature is unlocked.",
  },
];

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const alreadyPro = params.already_pro === "1";
  const mobileAppUrl = "euworksupport://sign-in";
  const mobileAppUrlPro = "euworksupport://";

  return (
    <>
      <main className="relative min-h-screen bg-surface text-ink">
        <PageBackdrop />
        <SubpageHeader />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8 lg:pb-28 lg:pt-12">
          {alreadyPro ? null : <CheckoutSteps current={2} />}

          <Reveal
            immediate
            y={32}
            className="relative mt-8 overflow-hidden rounded-[36px] border border-ink/[0.08] bg-white px-6 pb-10 pt-8 text-center shadow-[0_40px_100px_-40px_rgba(16,29,54,0.35)] sm:px-12 sm:pb-12 lg:mt-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(91,214,172,0.18),transparent_70%)]"
            />
            <div className="relative">
              <SuccessBurst />
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-mint-deep">
                {alreadyPro ? "PRO active" : "Payment received"}
              </p>
              <AnimatedHeading
                as="h1"
                className="mx-auto mt-4 max-w-xl text-balance text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[1.02] tracking-[-0.05em] text-ink"
                text={
                  alreadyPro
                    ? "Your account already has lifetime PRO access."
                    : "Thanks. Stripe has completed your checkout."
                }
                highlight={alreadyPro ? ["lifetime", "PRO"] : ["completed"]}
                immediate
                delay={0.5}
                stagger={0.05}
              />
              <Reveal immediate delay={0.8} y={12}>
                <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  {alreadyPro
                    ? "Return to the mobile app and log in with the same email to access PRO content."
                    : "Your payment is verified by Stripe. Return to the mobile app and log in with the same email to access PRO content."}
                </p>
              </Reveal>
              <Reveal
                immediate
                delay={0.9}
                y={12}
                className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <a
                  href={alreadyPro ? mobileAppUrlPro : mobileAppUrl}
                  className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl bg-ink px-6 text-base font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(16,29,54,0.7)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong"
                >
                  <SmartphoneIcon className="h-5 w-5 text-mint-light" />
                  Open EU Work Support app
                </a>
                <Link
                  href="/"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-ink/10 bg-white px-6 text-base font-bold text-ink transition-colors hover:border-ink/25 hover:bg-surface"
                >
                  Back to home
                </Link>
              </Reveal>
            </div>
          </Reveal>

          <Reveal immediate delay={1} y={24} className="mt-10">
            <h2 className="text-center text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
              What happens next
            </h2>
          </Reveal>
          <RevealGroup
            as="ol"
            immediate
            delay={1.1}
            stagger={0.1}
            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealItem
                  as="li"
                  key={step.title}
                  y={20}
                  className="rounded-[24px] border border-ink/[0.07] bg-white/80 p-5 shadow-[0_16px_40px_-24px_rgba(16,29,54,0.3)] backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-black text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-4 font-extrabold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal
            immediate
            delay={1.3}
            y={20}
            className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[28px] bg-ink p-6 text-white sm:flex-row sm:p-7"
          >
            <div className="text-center sm:text-left">
              <p className="font-extrabold">Don’t have the app yet?</p>
              <p className="mt-1 text-sm text-slate-300">
                Download it, then sign in with the same email.
              </p>
            </div>
            <StoreButtons compact tone="light" className="shrink-0" />
          </Reveal>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
            <MailIcon className="h-4 w-4" />
            PRO not showing in the app?{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-bold text-brand-strong hover:text-brand-deep"
            >
              Contact support
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
