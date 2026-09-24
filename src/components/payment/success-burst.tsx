"use client";

import { m } from "motion/react";
import { AnimatedCheck } from "@/components/checkout/animated-check";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { EuStarRing } from "@/components/ui/eu-star-ring";

const colors = ["#3979e8", "#5bd6ac", "#ffcf40", "#6658d9", "#78e0be", "#f472b6"];

// Deterministic particle layout so server and client markup match.
const particles = Array.from({ length: 22 }, (_, index) => {
  const angle = (index / 22) * Math.PI * 2 + (index % 2 ? 0.14 : -0.1);
  const distance = 92 + (index % 4) * 22;
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance * 0.8),
    rotate: (index % 5) * 72 - 140,
    color: colors[index % colors.length],
    shape: index % 3,
    delay: 0.35 + (index % 6) * 0.025,
  };
});

/** Celebratory check mark with a one-off confetti burst. */
export function SuccessBurst() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <EuStarRing
        starSize={6}
        duration="60s"
        className="absolute inset-0 animate-orbit text-gold"
      />
      {reduceMotion
        ? null
        : particles.map((particle, index) => (
            <m.span
              key={index}
              aria-hidden="true"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: [0, 1, 0.9],
                opacity: [1, 1, 0],
                rotate: particle.rotate,
              }}
              transition={{
                duration: 1.3,
                delay: particle.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute left-1/2 top-1/2 -ml-1 -mt-1 ${
                particle.shape === 0
                  ? "h-2 w-2 rounded-full"
                  : particle.shape === 1
                    ? "h-3 w-1.5 rounded-sm"
                    : "h-2 w-2 rotate-45 rounded-[2px]"
              }`}
              style={{ backgroundColor: particle.color }}
            />
          ))}
      <AnimatedCheck className="h-20 w-20" delay={0.15} />
    </div>
  );
}
