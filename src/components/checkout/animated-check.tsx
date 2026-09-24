"use client";

import { m } from "motion/react";
import { easeOutExpo } from "@/components/motion/reveal";

type AnimatedCheckProps = {
  className?: string;
  delay?: number;
};

/** A check mark that draws itself inside a pulsing mint circle. */
export function AnimatedCheck({ className = "h-16 w-16", delay = 0.2 }: AnimatedCheckProps) {
  return (
    <m.span
      aria-hidden="true"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-mint text-ink shadow-[0_16px_40px_-10px_rgba(91,214,172,0.8)] ${className}`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-mint/40 [animation-duration:2.4s]" />
      <svg viewBox="0 0 24 24" fill="none" className="relative h-1/2 w-1/2">
        <m.path
          d="m5 12.5 4.2 4.2L19 7"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.25, ease: easeOutExpo }}
        />
      </svg>
    </m.span>
  );
}
