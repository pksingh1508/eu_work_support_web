"use client";

import {
  m,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import {
  ArrowRightIcon,
  CreditCardIcon,
  SmartphoneIcon,
  UserPlusIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { workflowSteps } from "./landing-content";

const stepIcons: ReactNode[] = [
  <UserPlusIcon key="account" className="h-5 w-5" />,
  <CreditCardIcon key="payment" className="h-5 w-5" />,
  <SmartphoneIcon key="app" className="h-5 w-5" />,
];

export function WorkflowSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 85%", "end 55%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  const lineProgress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <section
      id="how-to-get-access"
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.07),transparent)]"
      />
      <div className="relative mx-auto max-w-[1240px]">
        <SectionHeading
          layout="split"
          kicker="How to get access"
          title="Three simple steps to GET access."
          highlight={["GET"]}
          description="Create your account, complete one secure payment, and use the same email to unlock EU Work Support in the mobile app."
        >
          <a
            href="#pricing"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-strong transition-colors hover:text-brand-deep"
          >
            See pricing
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
          </a>
        </SectionHeading>

        <div ref={stepsRef} className="relative mt-14 lg:mt-20">
          {/* Desktop: horizontal track connecting the step nodes. */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-[3px] overflow-hidden rounded-full bg-slate-100 lg:block"
          >
            <m.div
              style={{ scaleX: lineProgress }}
              className="h-full origin-left rounded-full bg-linear-to-r from-brand via-violet to-mint"
            />
          </div>
          {/* Mobile: vertical track down the left side. */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-7 top-7 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-slate-100 lg:hidden"
          >
            <m.div
              style={{ scaleY: lineProgress }}
              className="h-full w-full origin-top rounded-full bg-linear-to-b from-brand via-violet to-mint"
            />
          </div>

          <RevealGroup
            as="ol"
            stagger={0.14}
            className="relative grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {workflowSteps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.title}
                y={32}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0"
              >
                <StepNode
                  index={index}
                  total={workflowSteps.length}
                  progress={lineProgress}
                  icon={stepIcons[index]}
                />
                <m.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative flex-1 overflow-hidden rounded-[28px] border border-ink/[0.08] bg-surface p-6 shadow-[0_14px_40px_rgba(16,29,54,.04)] transition-[box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-[0_24px_60px_-18px_rgba(57,121,232,0.3)] sm:p-7 lg:mt-8 lg:w-full lg:p-8 lg:text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-brand via-violet to-mint transition-transform duration-500 ease-smooth group-hover:scale-x-100"
                  />
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-strong">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-[-0.025em] text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </m.article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

// Maps progress to `from` until `start`, eases to `to` by `end`, then holds.
// The range always spans 0→1 so scroll-accelerated values don't snap back.
function fullRange(start: number, end: number, from: number, to: number) {
  const input = [0];
  const output = [from];
  if (start > 0) {
    input.push(start);
    output.push(from);
  }
  input.push(end);
  output.push(to);
  if (end < 1) {
    input.push(1);
    output.push(to);
  }
  return [input, output] as const;
}

function StepNode({
  index,
  total,
  progress,
  icon,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  icon: ReactNode;
}) {
  // Each node lights up as the progress line reaches it.
  const threshold = total > 1 ? index / (total - 1) : 0;
  const start = Math.max(0, threshold - 0.12);
  const end = Math.min(1, threshold + 0.001);
  const activeOpacity = useTransform(progress, ...fullRange(start, end, 0, 1));
  const idleOpacity = useTransform(activeOpacity, [0, 1], [1, 0]);
  const scale = useTransform(progress, ...fullRange(start, end, 0.92, 1));

  return (
    <m.div
      style={{ scale }}
      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ink/[0.08] bg-white text-slate-400 shadow-[0_10px_30px_-10px_rgba(16,29,54,0.25)]"
    >
      <m.span
        aria-hidden="true"
        style={{ opacity: activeOpacity }}
        className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand to-violet shadow-[0_12px_28px_-8px_rgba(57,121,232,0.6)]"
      />
      <m.span style={{ opacity: activeOpacity }} className="absolute text-white">
        {icon}
      </m.span>
      <m.span style={{ opacity: idleOpacity }} className="absolute">
        {icon}
      </m.span>
    </m.div>
  );
}
