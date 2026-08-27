"use client";

import { appName } from "./landing-content";
import { PhoneFrame } from "./phone-frame";
import { StoreButtons } from "./store-buttons";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backPhoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 105],
  );
  const frontPhoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 48],
  );
  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -28],
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#fafdff]"
    >
      <div className="hero-grid absolute inset-0 -z-20 opacity-60" />
      <div className="absolute -left-40 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#6be2bb]/20 blur-[90px]" />
      <div className="absolute -right-32 top-0 -z-10 h-[560px] w-[560px] rounded-full bg-[#3979e8]/20 blur-[110px]" />
      <div className="mx-auto grid min-h-[calc(100svh-78px)] max-w-[1240px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:py-20">
        <m.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 min-w-0"
        >
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3979e8]/15 bg-white/75 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.13em] text-[#245fc7] shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#50c99f] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38b98f]" />
            </span>
            Your Europe work companion
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.58,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[12ch] text-[clamp(3rem,7vw,5.85rem)] font-black leading-[0.94] tracking-[-0.065em] text-[#101d36]"
          >
            Work across Europe with{" "}
            <span className="text-gradient">clarity.</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
          >
            {appName} brings country guides, document checklists, saved
            resources, and practical support into one simple app—so your next
            move feels manageable.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <StoreButtons className="mt-8" />
          </m.div>

          <m.dl
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.36 },
              },
            }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500"
          >
            {[
              ["One-time", "PRO payment"],
              ["Lifetime", "app access"],
              ["Secure", "Stripe checkout"],
            ].map(([value, label]) => (
              <m.div
                key={value}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dff8ef] text-[11px] font-black text-[#138466]">
                  ✓
                </span>
                <dt className="font-extrabold text-[#101d36]">{value}</dt>
                <dd>{label}</dd>
              </m.div>
            ))}
          </m.dl>
        </m.div>

        <div className="relative mx-auto h-[485px] w-full max-w-[540px] min-w-0 sm:h-[600px] lg:h-[650px]">
          <m.div
            initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 95,
              damping: 17,
              delay: 0.12,
            }}
            className="absolute left-1/2 top-[7%] h-[82%] w-[82%] -translate-x-1/2 rounded-[50%] border border-white/80 bg-gradient-to-br from-white/90 to-[#dfeaff]/75 shadow-[inset_0_0_0_1px_rgba(57,121,232,.06),0_35px_90px_rgba(57,121,232,.16)] backdrop-blur"
          />
          <m.div
            style={{ y: backPhoneY, willChange: "transform" }}
            className="absolute inset-0"
          >
            <PhoneFrame
              src="/assets/search.jpg"
              alt="EU Work Support search results screen"
              eager
              className="absolute left-0 top-[25%] w-[38%] -rotate-[8deg] sm:left-[1%]"
            />
            <PhoneFrame
              src="/assets/single_country.jpg"
              alt="EU Work Support country detail screen"
              eager
              className="absolute right-0 top-[20%] w-[39%] rotate-[8deg] sm:right-[1%]"
            />
          </m.div>
          <m.div
            style={{ y: frontPhoneY, willChange: "transform" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: 0.24,
            }}
            className="absolute inset-0"
          >
            <PhoneFrame
              src="/assets/home.jpg"
              alt="EU Work Support home screen"
              eager
              className="absolute left-1/2 top-[3%] w-[50%] -translate-x-1/2"
            />
          </m.div>
          <m.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[1%] rounded-2xl border border-white bg-white/90 p-3 shadow-[0_16px_40px_rgba(16,29,54,.14)] backdrop-blur sm:left-[4%] sm:p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff8ef] text-[#138466]">
                ✓
              </span>
              <span>
                <b className="block text-xs text-[#101d36] sm:text-sm">
                  Guides saved
                </b>
                <span className="text-[11px] text-slate-500 sm:text-xs">
                  Ready when you are
                </span>
              </span>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
