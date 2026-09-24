"use client";

import { m, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import {
  ArrowRightIcon,
  BookmarkIcon,
  MapIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { appScreens, featureHighlights } from "./landing-content";
import { PhoneFrame } from "./phone-frame";

const icons: ReactNode[] = [
  <MapIcon key="map" className="h-6 w-6" />,
  <SearchIcon key="search" className="h-6 w-6" />,
  <BookmarkIcon key="bookmark" className="h-6 w-6" />,
];

export function AppShowcase() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const evenY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : 36, reduceMotion ? 0 : -36],
  );
  const oddY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : -24, reduceMotion ? 0 : 24],
  );

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="absolute left-1/2 top-0 h-px w-[min(90%,1160px)] -translate-x-1/2 bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          layout="split"
          kicker="Everything in one place"
          title="The details that turn plans into progress."
          highlight={["progress."]}
          description="Browse practical country information, find the right documents faster, and keep important guidance close throughout your European work journey."
        />

        <RevealGroup
          stagger={0.12}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5"
        >
          {featureHighlights.map((feature, index) => (
            <RevealItem key={feature.title} y={32}>
              <m.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative h-full overflow-hidden rounded-[28px] border border-ink/[0.08] bg-surface p-6 shadow-[0_16px_45px_rgba(16,29,54,.05)] transition-[box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-[0_28px_70px_-24px_rgba(57,121,232,0.35)] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.14),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-brand via-violet to-mint transition-transform duration-500 ease-smooth group-hover:scale-x-100"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-[background-color,color,transform] duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                  {icons[index]}
                </div>
                <h3 className="relative mt-6 text-xl font-extrabold tracking-[-0.025em] text-ink">
                  {feature.title}
                </h3>
                <p className="relative mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
                <a
                  href="#download"
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-strong transition-colors hover:text-brand-deep"
                >
                  Explore in the app
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
                </a>
              </m.article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div
          ref={galleryRef}
          className="relative mt-16 overflow-hidden rounded-[36px] bg-ink px-4 pb-10 pt-12 sm:px-8 sm:pb-14 lg:mt-20 lg:px-12 lg:pb-20 lg:pt-16"
        >
          <div
            aria-hidden="true"
            className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.4),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-48 -left-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.22),transparent)]"
          />
          <div
            aria-hidden="true"
            className="dot-grid absolute inset-0 opacity-20"
          />
          <EuStarRing
            starSize={4}
            className="absolute left-1/2 top-10 w-[min(760px,120%)] -translate-x-1/2 animate-orbit text-gold/10"
          />

          <Reveal className="relative z-10 mx-auto max-w-2xl px-2 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mint-light">
              Designed for real journeys
            </p>
            <h3 className="mt-4 text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Your path, always{" "}
              <span className="text-gradient-light animate-gradient-pan">
                within reach.
              </span>
            </h3>
          </Reveal>

          {/* Mobile: swipeable carousel. */}
          <div className="relative z-10 -mx-4 mt-10 md:hidden">
            <RevealGroup
              stagger={0.08}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[calc(19vw-20px)] pb-2"
            >
              {appScreens.map((screen) => (
                <RevealItem
                  key={screen.src}
                  y={40}
                  className="w-[62vw] max-w-[300px] shrink-0 snap-center"
                >
                  <PhoneFrame
                    src={screen.src}
                    alt={screen.alt}
                    label={screen.label}
                    darkLabel
                    sizes="62vw"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-4 text-center text-xs font-semibold text-slate-400">
              Swipe to explore the app
            </p>
          </div>

          {/* Desktop: parallax row. */}
          <RevealGroup
            stagger={0.1}
            className="relative z-10 mt-12 hidden grid-cols-4 gap-6 md:grid lg:gap-8"
          >
            {appScreens.map((screen, index) => (
              <RevealItem key={screen.src} y={60}>
                <m.div style={{ y: index % 2 === 0 ? evenY : oddY }}>
                  <PhoneFrame
                    src={screen.src}
                    alt={screen.alt}
                    label={screen.label}
                    darkLabel
                    sizes="(max-width: 1024px) 22vw, 250px"
                  />
                </m.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
