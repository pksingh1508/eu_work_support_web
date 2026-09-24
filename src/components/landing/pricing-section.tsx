"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import {
  easeOutExpo,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import {
  CheckIcon,
  LockIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  StarIcon,
} from "@/components/ui/icons";
import { PendingLink } from "@/components/ui/pending-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingPlans } from "./landing-content";

const assurances = [
  { icon: ShieldCheckIcon, label: "Secure Stripe checkout" },
  { icon: RefreshIcon, label: "No recurring subscription" },
  { icon: StarIcon, label: "Lifetime PRO access" },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-surface-tint px-5 py-24 sm:px-8 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.2),transparent)]" />
        <div className="absolute -left-48 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.14),transparent)]" />
        <EuStarRing
          starSize={4}
          duration="200s"
          className="absolute left-1/2 top-[52%] w-[min(1100px,140%)] -translate-x-1/2 -translate-y-1/2 animate-orbit text-brand/[0.07]"
        />
      </div>

      <div className="relative mx-auto max-w-[1080px]">
        <SectionHeading
          layout="center"
          kicker="Simple pricing"
          title="One upgrade. A lifetime of access."
          highlight={["lifetime"]}
          description="Unlock every guide, page, and support feature with one secure payment. No subscription and no recurring fees."
        />

        {pricingPlans.map((plan) => {
          const amount = Number(plan.price.replace(/[^0-9.]/g, ""));
          const currency = plan.price.replace(/[0-9.,\s]/g, "");

          return (
            <Reveal
              key={plan.name}
              y={48}
              duration={0.9}
              className="mx-auto mt-14 max-w-[980px] lg:mt-16"
            >
              <m.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="glow-border rounded-[34px] p-[1.5px] shadow-[0_40px_100px_-30px_rgba(16,29,54,0.5)]"
              >
                <article className="relative overflow-hidden rounded-[33px] bg-ink text-white">
                  <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.45),transparent)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.18),transparent)]"
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="p-7 sm:p-10 lg:border-r lg:border-white/10 lg:p-12">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2.5 text-2xl font-black tracking-[-0.03em]">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
                            <StarIcon className="h-4.5 w-4.5" />
                          </span>
                          {plan.name}
                        </h3>
                        <span className="rounded-full bg-mint-soft px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#11684f]">
                          Lifetime access
                        </span>
                      </div>
                      <p className="mt-4 leading-7 text-slate-300">
                        {plan.description}
                      </p>

                      <div className="mt-8 flex items-end gap-2">
                        <span className="sr-only">{plan.price}</span>
                        <span
                          aria-hidden="true"
                          className="flex items-start text-7xl font-black leading-none tracking-[-0.06em] sm:text-8xl"
                        >
                          <span className="mr-1 mt-2 text-4xl tracking-normal text-slate-300 sm:text-5xl">
                            {currency}
                          </span>
                          <PriceCounter value={amount} />
                        </span>
                        <span className="pb-2 text-base font-semibold text-slate-300">
                          one-time
                        </span>
                      </div>

                      <PendingLink
                        href={plan.href}
                        className="group relative mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-mint px-6 text-base font-extrabold text-ink shadow-[0_18px_40px_-14px_rgba(91,214,172,0.7)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-mint-light active:translate-y-0"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent transition-[left] duration-700 ease-smooth group-hover:left-[120%]"
                        />
                        <span className="relative">{plan.cta}</span>
                      </PendingLink>
                      <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                        <LockIcon className="h-3.5 w-3.5" />
                        Secure checkout powered by Stripe
                      </p>
                    </div>

                    <div className="border-t border-white/10 bg-white/[0.025] p-7 sm:p-10 lg:border-t-0 lg:p-12">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-mint-light">
                        Everything included
                      </p>
                      <RevealGroup
                        as="ul"
                        stagger={0.08}
                        delay={0.2}
                        className="mt-6 grid gap-4"
                      >
                        {plan.features.map((feature) => (
                          <RevealItem
                            as="li"
                            key={feature}
                            x={-14}
                            y={0}
                            className="flex items-center gap-3.5 leading-6"
                          >
                            <span
                              aria-hidden="true"
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-light ring-1 ring-mint/20"
                            >
                              <CheckIcon className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-medium text-slate-100">
                              {feature}
                            </span>
                          </RevealItem>
                        ))}
                      </RevealGroup>

                      <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-[#9cc0ff]">
                          <SmartphoneIcon className="h-4.5 w-4.5" />
                        </span>
                        <p className="text-sm leading-6 text-slate-300">
                          <b className="text-white">Same email, same access.</b>{" "}
                          Sign in to the mobile app with the email you use here
                          and PRO unlocks automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </m.div>
            </Reveal>
          );
        })}

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="mx-auto mt-10 flex max-w-[980px] flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {assurances.map(({ icon: Icon, label }) => (
            <RevealItem
              as="li"
              key={label}
              y={12}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500"
            >
              <Icon className="h-4 w-4 text-brand" />
              {label}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function PriceCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = usePrefersReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView || reduceMotion) return;
    count.jump(0);
    const controls = animate(count, value, {
      duration: 1.4,
      delay: 0.25,
      ease: easeOutExpo,
    });
    return () => controls.stop();
  }, [count, inView, reduceMotion, value]);

  return <m.span ref={ref}>{rounded}</m.span>;
}
