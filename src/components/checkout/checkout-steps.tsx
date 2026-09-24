"use client";

import { m } from "motion/react";
import { easeOutExpo } from "@/components/motion/reveal";
import { CheckIcon } from "@/components/ui/icons";

const steps = ["Account created", "Secure payment", "Unlock in the app"];

type CheckoutStepsProps = {
  /** Zero-based index of the active step. */
  current: number;
};

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <m.ol
      aria-label="Checkout progress"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="flex items-center"
    >
      {steps.map((label, index) => {
        const done = index < current;
        const active = index === current;
        const last = index === steps.length - 1;

        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-2 sm:gap-2.5 ${last ? "shrink-0" : "flex-1 pr-2 sm:pr-3"}`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                done
                  ? "bg-mint text-ink"
                  : active
                    ? "bg-brand text-white ring-4 ring-brand/15"
                    : "bg-white text-slate-500 ring-1 ring-ink/10"
              }`}
            >
              {done ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <span
              className={`shrink-0 text-sm font-bold ${
                active
                  ? "text-ink"
                  : done
                    ? "sr-only text-slate-600 sm:not-sr-only"
                    : "sr-only text-slate-500 sm:not-sr-only"
              }`}
            >
              {label}
              {done ? <span className="sr-only"> (completed)</span> : null}
            </span>
            {last ? null : (
              <span
                aria-hidden="true"
                className="ml-1 h-0.5 min-w-4 flex-1 overflow-hidden rounded-full bg-ink/10 sm:ml-2"
              >
                <m.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.2,
                    ease: easeOutExpo,
                  }}
                  className="block h-full origin-left bg-mint"
                />
              </span>
            )}
          </li>
        );
      })}
    </m.ol>
  );
}
