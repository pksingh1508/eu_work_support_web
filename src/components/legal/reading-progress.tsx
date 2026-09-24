"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin bar across the top of the viewport showing how far the reader has scrolled. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-mint via-brand to-violet print:hidden"
    />
  );
}
