"use client";

import { m } from "motion/react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { easeOutExpo } from "@/components/motion/reveal";
import { PhoneFrame } from "@/components/landing/phone-frame";
import { SiteLogo } from "@/components/site/site-logo";
import { BackHomeLink } from "@/components/site/subpage-header";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import {
  CheckIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UserPlusIcon,
} from "@/components/ui/icons";

export type AuthVariant = "sign-in" | "sign-up";

type JourneyStep = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const unlockStep: JourneyStep = {
  title: "Unlock PRO in the app",
  description: "Sign in on your phone with the same email.",
  icon: SmartphoneIcon,
};

const content: Record<
  AuthVariant,
  {
    eyebrow: string;
    title: string;
    highlight: string[];
    subtitle: string;
    steps: JourneyStep[];
  }
> = {
  "sign-up": {
    eyebrow: "Join EU Work Support",
    title: "Create your account. Start with clarity.",
    highlight: ["clarity."],
    subtitle:
      "Use the same email as the mobile app. After your account is verified, we’ll take you directly to secure checkout.",
    steps: [
      {
        title: "Create your account",
        description: "Use the same email as your mobile app.",
        icon: UserPlusIcon,
      },
      {
        title: "Pay once — $50",
        description: "Secure Stripe checkout. No subscription.",
        icon: CreditCardIcon,
      },
      unlockStep,
    ],
  },
  "sign-in": {
    eyebrow: "Welcome back",
    title: "Pick up where you left off.",
    highlight: ["left", "off."],
    subtitle:
      "Sign in with the same email you use in the mobile app. Your account keeps website payment and mobile PRO access connected.",
    steps: [
      {
        title: "Sign in to your account",
        description: "Use the email from your mobile app.",
        icon: LockIcon,
      },
      {
        title: "Complete secure checkout",
        description: "One-time $50 payment with Stripe.",
        icon: CreditCardIcon,
      },
      unlockStep,
    ],
  },
};

type AuthShellProps = {
  children: ReactNode;
  variant: AuthVariant;
};

export function AuthShell({ children, variant }: AuthShellProps) {
  const { eyebrow, title, highlight, subtitle, steps } = content[variant];

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-ink-deep px-10 py-10 text-white lg:flex xl:px-16 xl:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.2),transparent)]" />
            <div className="absolute -right-40 -top-32 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.35),transparent)]" />
            <div className="dot-grid absolute inset-0 opacity-25" />
            <EuStarRing
              starSize={4}
              duration="160s"
              className="absolute -bottom-[30%] -left-[25%] w-[780px] animate-orbit text-gold/[0.12]"
            />
          </div>

          <m.div
            initial={{ opacity: 0, x: 70, rotate: 16 }}
            animate={{ opacity: 1, x: 0, rotate: 9 }}
            transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.35 }}
            className="pointer-events-none absolute -right-20 top-1/2 hidden w-[270px] -translate-y-1/2 min-[1400px]:block [@media(max-height:760px)]:hidden"
          >
            <div className="animate-float" style={{ animationDuration: "7s" }}>
              <PhoneFrame src="/assets/home.jpg" alt="" eager sizes="270px" />
            </div>
            <m.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: 1.1 }}
              className="absolute -left-10 bottom-[18%] -rotate-9 rounded-2xl bg-white p-3 pr-4 text-ink shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-soft text-mint-deep">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span>
                  <b className="block text-xs">Access connected</b>
                  <span className="text-[11px] text-slate-500">Web to mobile</span>
                </span>
              </div>
            </m.div>
          </m.div>

          <div className="relative z-10 flex w-full flex-col">
            <SiteLogo tone="light" />

            <div className="my-auto max-w-[440px] py-12">
              <m.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="text-xs font-extrabold uppercase tracking-[0.18em] text-mint-light"
              >
                {eyebrow}
              </m.p>
              <AnimatedHeading
                as="h1"
                className="mt-5 text-balance text-[clamp(2.5rem,3.4vw,3.6rem)] font-black leading-[0.98] tracking-[-0.055em] text-white"
                text={title}
                highlight={highlight}
                highlightClassName="text-gradient-light animate-gradient-pan"
                immediate
                delay={0.1}
              />
              <m.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: easeOutExpo }}
                className="mt-6 text-base leading-8 text-slate-300"
              >
                {subtitle}
              </m.p>

              <JourneyCard steps={steps} />
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <LockIcon className="h-3.5 w-3.5 text-mint-light" />
                  Secure sign-in by Clerk
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheckIcon className="h-3.5 w-3.5 text-mint-light" />
                  Payments processed by Stripe
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                General guidance for European work preparation.
              </p>
            </m.div>
          </div>
        </section>

        <section className="relative flex min-h-screen min-w-0 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 xl:px-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-grid absolute inset-0 opacity-60 lg:opacity-40" />
            <div className="absolute -right-44 -top-44 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.14),transparent)]" />
            <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.12),transparent)] lg:hidden" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 lg:justify-end">
            <div className="lg:hidden">
              <SiteLogo />
            </div>
            <BackHomeLink />
          </div>

          <div className="relative z-10 mx-auto my-auto w-full max-w-[440px] py-8 lg:py-12">
            <MobileIntro
              eyebrow={eyebrow}
              title={title}
              highlight={highlight}
              subtitle={subtitle}
              steps={steps}
            />
            {children}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500"
            >
              <LockIcon className="h-3.5 w-3.5" />
              Secure authentication powered by Clerk
            </m.p>
          </div>
        </section>
      </div>
    </main>
  );
}

function JourneyCard({ steps }: { steps: JourneyStep[] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55, ease: easeOutExpo }}
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-md"
    >
      <p className="px-3 pt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
        Your path to PRO
      </p>
      <ol className="mt-2">
        {steps.map((step, index) => {
          const current = index === 0;
          const Icon = step.icon;

          return (
            <m.li
              key={step.title}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.75 + index * 0.1,
                duration: 0.55,
                ease: easeOutExpo,
              }}
              aria-current={current ? "step" : undefined}
              className={`relative flex gap-4 rounded-2xl p-3 ${
                current ? "bg-white/[0.07]" : ""
              }`}
            >
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[29.5px] top-[50px] h-[calc(100%-38px)] w-px bg-linear-to-b from-white/20 to-white/5"
                />
              ) : null}
              <span
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  current
                    ? "bg-brand text-white shadow-[0_8px_22px_-6px_rgba(57,121,232,0.9)]"
                    : "bg-white/[0.07] text-slate-400"
                }`}
              >
                {current ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-xl bg-brand/40 [animation-duration:2.2s]"
                  />
                ) : null}
                <Icon className="relative h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="flex flex-wrap items-center gap-2">
                  <b
                    className={`text-sm ${current ? "text-white" : "text-slate-300"}`}
                  >
                    {step.title}
                  </b>
                  {current ? (
                    <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-mint-light">
                      You’re here
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                  {step.description}
                </span>
              </span>
            </m.li>
          );
        })}
      </ol>
    </m.div>
  );
}

function MobileIntro({
  eyebrow,
  title,
  highlight,
  subtitle,
  steps,
}: {
  eyebrow: string;
  title: string;
  highlight: string[];
  subtitle: string;
  steps: JourneyStep[];
}) {
  return (
    <div className="mb-7 lg:hidden">
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-white/80 py-1 pl-1 pr-3 text-[11px] font-bold text-slate-600 shadow-sm backdrop-blur"
      >
        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">
          Step 1 of {steps.length}
        </span>
        {steps[0].title}
      </m.div>
      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
        {eyebrow}
      </p>
      <AnimatedHeading
        as="h1"
        className="mt-3 text-balance text-[2rem] font-black leading-[1.02] tracking-[-0.045em] text-ink sm:text-4xl"
        text={title}
        highlight={highlight}
        immediate
        delay={0.05}
      />
      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
        className="mt-3 text-sm leading-6 text-slate-600"
      >
        {subtitle}
      </m.p>
    </div>
  );
}
