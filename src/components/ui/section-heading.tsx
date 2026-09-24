import type { ReactNode } from "react";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  highlight?: string[];
  description?: ReactNode;
  children?: ReactNode;
  layout?: "split" | "center" | "stack";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  kicker,
  title,
  highlight,
  description,
  children,
  layout = "stack",
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const heading = (
    <div className={layout === "center" ? "flex flex-col items-center" : ""}>
      <Reveal y={12} duration={0.5}>
        <p className="section-kicker">{kicker}</p>
      </Reveal>
      <AnimatedHeading
        as="h2"
        className={`section-title mt-5 ${titleClassName}`}
        text={title}
        highlight={highlight}
        delay={0.08}
      />
    </div>
  );

  const details =
    description || children ? (
      <Reveal delay={0.2} y={20}>
        {description ? (
          <p
            className={`text-base leading-8 text-slate-600 sm:text-lg ${
              layout === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Reveal>
    ) : null;

  if (layout === "split") {
    return (
      <div
        className={`grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 ${className}`}
      >
        {heading}
        {details ? <div className="lg:justify-self-end">{details}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={`${
        layout === "center" ? "mx-auto max-w-3xl text-center" : ""
      } ${className}`}
    >
      {heading}
      {details ? <div className="mt-6">{details}</div> : null}
    </div>
  );
}
