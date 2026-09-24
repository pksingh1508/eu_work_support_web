"use client";

import { m, type Variant } from "motion/react";
import type { ComponentProps } from "react";

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const viewportMargin = "0px 0px -8% 0px";

const elements = {
  div: m.div,
  section: m.section,
  article: m.article,
  header: m.header,
  aside: m.aside,
  nav: m.nav,
  li: m.li,
  ol: m.ol,
  ul: m.ul,
  dl: m.dl,
  p: m.p,
  span: m.span,
};

type RevealElement = keyof typeof elements;
type MotionDivProps = Omit<
  ComponentProps<typeof m.div>,
  "initial" | "animate" | "whileInView" | "viewport" | "variants"
>;

type Offset = {
  x?: number;
  y?: number;
  scale?: number;
  blur?: boolean;
};

function hiddenState({ x = 0, y = 0, scale, blur }: Offset): Variant {
  return {
    opacity: 0,
    x,
    y,
    ...(scale === undefined ? {} : { scale }),
    ...(blur ? { filter: "blur(8px)" } : {}),
  };
}

function visibleState(
  { scale, blur }: Offset,
  duration: number,
  delay = 0,
): Variant {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale === undefined ? {} : { scale: 1 }),
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: { duration, delay, ease: easeOutExpo },
  };
}

type RevealProps = MotionDivProps &
  Offset & {
    as?: RevealElement;
    delay?: number;
    duration?: number;
    amount?: number | "some" | "all";
    /** Animate on mount instead of when scrolled into view. */
    immediate?: boolean;
  };

/** Fades and slides its content in the first time it scrolls into view. */
export function Reveal({
  as = "div",
  x,
  y = 28,
  scale,
  blur,
  delay = 0,
  duration = 0.7,
  amount = 0.15,
  immediate = false,
  children,
  ...props
}: RevealProps) {
  const Component = elements[as] as typeof m.div;
  const offset = { x, y, scale, blur };
  const trigger = immediate
    ? { animate: "visible" }
    : {
        whileInView: "visible",
        viewport: { once: true, amount, margin: viewportMargin },
      };

  return (
    <Component
      data-reveal=""
      initial="hidden"
      {...trigger}
      variants={{
        hidden: hiddenState(offset),
        visible: visibleState(offset, duration, delay),
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = MotionDivProps & {
  as?: RevealElement;
  stagger?: number;
  delay?: number;
  amount?: number | "some" | "all";
  immediate?: boolean;
};

/** Staggers the entrance of its RevealItem children. */
export function RevealGroup({
  as = "div",
  stagger = 0.1,
  delay = 0,
  amount = 0.15,
  immediate = false,
  children,
  ...props
}: RevealGroupProps) {
  const Component = elements[as] as typeof m.div;
  const trigger = immediate
    ? { animate: "visible" }
    : {
        whileInView: "visible",
        viewport: { once: true, amount, margin: viewportMargin },
      };

  return (
    <Component
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = MotionDivProps &
  Offset & {
    as?: RevealElement;
    duration?: number;
  };

export function RevealItem({
  as = "div",
  x,
  y = 24,
  scale,
  blur,
  duration = 0.6,
  children,
  ...props
}: RevealItemProps) {
  const Component = elements[as] as typeof m.div;
  const offset = { x, y, scale, blur };

  return (
    <Component
      data-reveal=""
      variants={{
        hidden: hiddenState(offset),
        visible: visibleState(offset, duration),
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
