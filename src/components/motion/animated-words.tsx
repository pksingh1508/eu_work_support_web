"use client";

import { m } from "motion/react";
import { easeOutExpo } from "./reveal";

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3";
  text: string;
  className?: string;
  id?: string;
  /** Words (matched exactly, punctuation included) rendered with `highlightClassName`. */
  highlight?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * A heading revealed word by word, each word rising out of a clipping mask.
 * The heading's accessible name is the plain sentence, so assistive tech
 * doesn't read the split words one at a time.
 */
export function AnimatedHeading({
  as: Heading = "h2",
  text,
  className,
  id,
  highlight = [],
  highlightClassName = "text-gradient animate-gradient-pan",
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: AnimatedHeadingProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" }
    : {
        whileInView: "visible",
        viewport: { once: true, amount: 0.4, margin: "0px 0px -8% 0px" },
      };

  return (
    <Heading id={id} aria-label={text} className={className}>
      <m.span
        aria-hidden="true"
        initial="hidden"
        {...trigger}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="-mx-[0.06em] -mb-[0.16em] inline-block overflow-hidden px-[0.06em] pb-[0.16em] align-top">
              <m.span
                data-reveal=""
                className={`inline-block ${
                  highlight.includes(word) ? highlightClassName : ""
                }`}
                variants={{
                  hidden: { y: "112%", rotate: 3 },
                  visible: {
                    y: "0%",
                    rotate: 0,
                    transition: { duration: 0.85, ease: easeOutExpo },
                  },
                }}
              >
                {word}
              </m.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </Heading>
  );
}
