"use client";

import {
  m,
  type MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { easeOutExpo } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import { CheckIcon, StarIcon } from "@/components/ui/icons";
import { PendingLink } from "@/components/ui/pending-link";
import { appName } from "./landing-content";
import { PhoneFrame } from "./phone-frame";
import { StoreButtons } from "./store-buttons";

const trustPoints = [
  ["One-time", "PRO payment"],
  ["Lifetime", "app access"],
  ["Secure", "Stripe checkout"],
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -40],
  );
  // Ranges run to 1 so Motion's scroll-timeline acceleration keeps the end
  // value instead of easing back to the element's resting opacity.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.35, 0.35]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [1, 0, 0]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <div className="mx-auto grid min-h-[calc(100svh-78px)] max-w-[1240px] grid-cols-1 items-center gap-6 px-5 pb-14 pt-8 sm:gap-10 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:py-16">
        <m.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 min-w-0"
        >
          <m.div
            data-reveal=""
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-white/80 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.13em] text-brand-strong shadow-sm backdrop-blur sm:mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-deep" />
            </span>
            Your Europe work companion
          </m.div>

          <AnimatedHeading
            as="h1"
            className="max-w-[12ch] text-[clamp(2.85rem,7vw,5.85rem)] font-black leading-[0.94] tracking-[-0.065em] text-ink"
            text="Work across Europe with clarity."
            highlight={["clarity."]}
            immediate
            delay={0.08}
            stagger={0.07}
          />

          <m.p
            data-reveal=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOutExpo }}
            className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:mt-7 sm:text-lg sm:leading-8"
          >
            {appName} brings country guides, document checklists, saved
            resources, and practical support into one simple app—so your next
            move feels manageable.
          </m.p>

          <m.div
            data-reveal=""
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeOutExpo }}
          >
            <StoreButtons className="mt-8" />
          </m.div>

          <m.p
            data-reveal=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500"
          >
            Already using the app?
            <PendingLink
              href="/sign-up"
              className="group inline-flex items-center gap-1.5 font-bold text-brand-strong transition-colors hover:text-brand-deep"
            >
              Unlock lifetime PRO
            </PendingLink>
          </m.p>

          <m.dl
            data-reveal=""
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.8 },
              },
            }}
            className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-[13px] leading-5 text-slate-500 sm:mt-9 sm:gap-5 sm:text-sm"
          >
            {trustPoints.map(([value, label]) => (
              <m.div
                key={value}
                data-reveal=""
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOutExpo },
                  },
                }}
              >
                <dt className="flex items-center gap-2 font-extrabold text-ink">
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-soft text-mint-deep"
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {value}
                </dt>
                <dd className="mt-0.5 pl-7">{label}</dd>
              </m.div>
            ))}
          </m.dl>
        </m.div>

        <HeroVisual scrollYProgress={scrollYProgress} />
      </div>

      <m.div
        aria-hidden="true"
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
          <span className="flex h-9 w-[22px] justify-center rounded-full border-2 border-slate-300 pt-1.5">
            <span className="h-2 w-1 animate-scroll-cue rounded-full bg-slate-400" />
          </span>
          Scroll
        </div>
      </m.div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-b from-[#f1f7ff] to-surface" />
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -left-48 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.22),transparent)]" />
      <div className="absolute -right-52 -top-32 h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.2),transparent)]" />
      <div className="absolute -bottom-40 left-1/3 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(102,88,217,0.1),transparent)]" />
    </div>
  );
}

function HeroVisual({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltSpring = { stiffness: 110, damping: 18, mass: 0.8 };
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-7, 7]),
    tiltSpring,
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [5, -5]),
    tiltSpring,
  );
  const backPhoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 110],
  );
  const frontPhoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 48],
  );
  const ringRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 45],
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative mx-auto h-[420px] w-full min-w-0 max-w-[540px] perspective-[1400px] sm:h-[580px] lg:h-[640px]"
    >
      <m.div
        data-reveal=""
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: easeOutExpo }}
        className="absolute left-1/2 top-[7%] h-[82%] w-[82%] -translate-x-1/2 rounded-full border border-white/80 bg-linear-to-br from-white/95 to-[#dfeaff]/75 shadow-[inset_0_0_0_1px_rgba(57,121,232,.06),0_35px_90px_rgba(57,121,232,.16)]"
      />
      <m.div
        style={{ rotate: ringRotate }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.25, ease: easeOutExpo }}
        className="absolute left-1/2 top-1/2 w-[118%] -translate-x-1/2 -translate-y-1/2 sm:w-[124%]"
      >
        <EuStarRing
          starSize={5}
          duration="140s"
          className="w-full animate-orbit text-gold"
        />
      </m.div>

      <m.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <m.div style={{ y: backPhoneY }} className="absolute inset-0">
          <m.div
            data-reveal=""
            initial={{ opacity: 0, x: -48, rotate: -16 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.4 }}
            className="absolute left-0 top-[25%] w-[38%] sm:left-[1%]"
          >
            <PhoneFrame
              src="/assets/search.jpg"
              alt="EU Work Support search results screen"
              eager
            />
          </m.div>
          <m.div
            data-reveal=""
            initial={{ opacity: 0, x: 48, rotate: 16 }}
            animate={{ opacity: 1, x: 0, rotate: 8 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.5 }}
            className="absolute right-0 top-[20%] w-[39%] sm:right-[1%]"
          >
            <PhoneFrame
              src="/assets/single_country.jpg"
              alt="EU Work Support country detail screen"
              eager
            />
          </m.div>
        </m.div>

        <m.div style={{ y: frontPhoneY }} className="absolute inset-0">
          <m.div
            data-reveal=""
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 17, delay: 0.2 }}
            className="absolute left-1/2 top-[3%] w-[50%] -translate-x-1/2"
          >
            <PhoneFrame
              src="/assets/home.jpg"
              alt="EU Work Support home screen"
              eager
            />
          </m.div>
        </m.div>

        <FloatingChip
          className="bottom-[8%] left-0 sm:bottom-[10%] sm:left-[3%]"
          delay={0.95}
          floatDelay="0s"
          icon={
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-soft text-mint-deep">
              <CheckIcon className="h-4 w-4" />
            </span>
          }
          title="Guides saved"
          subtitle="Ready when you are"
        />
        <FloatingChip
          className="right-0 top-[6%] hidden sm:right-[2%] sm:block"
          delay={1.1}
          floatDelay="-3s"
          icon={
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff5d1] text-[#c28f00]">
              <StarIcon className="h-4 w-4" />
            </span>
          }
          title="Lifetime PRO"
          subtitle="One payment, no renewals"
        />
      </m.div>
    </div>
  );
}

function FloatingChip({
  className,
  delay,
  floatDelay,
  icon,
  title,
  subtitle,
}: {
  className: string;
  delay: number;
  floatDelay: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <m.div
      data-reveal=""
      initial={{ opacity: 0, scale: 0.8, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      style={{ z: 60 }}
      className={`absolute z-20 ${className}`}
    >
      <div
        className="animate-float rounded-2xl border border-white bg-white/95 p-3 shadow-[0_18px_44px_rgba(16,29,54,.16)] sm:p-3.5"
        style={{ animationDelay: floatDelay }}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="pr-1">
            <b className="block text-xs text-ink sm:text-sm">{title}</b>
            <span className="text-[11px] text-slate-500 sm:text-xs">
              {subtitle}
            </span>
          </span>
        </div>
      </div>
    </m.div>
  );
}
