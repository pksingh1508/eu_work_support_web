"use client";

import { appScreens, featureHighlights } from "./landing-content";
import { PhoneFrame } from "./phone-frame";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const icons = [
  <path key="map" d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Zm5-2v14m6-12v14" />,
  <path key="search" d="m20 20-4.2-4.2m2.2-5.3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />,
  <path key="bookmark" d="M6 4.8C6 3.8 6.8 3 7.8 3h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.5L6 21V4.8Z" />,
];

export function AppShowcase() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const evenY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 42, reduceMotion ? 0 : -42]);
  const oddY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -28, reduceMotion ? 0 : 28]);

  return (
    <section id="features" className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-[min(90%,1160px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="mx-auto max-w-[1240px]">
        <m.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: "easeOut" }} className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker">Everything in one place</p>
            <h2 className="section-title mt-4">The details that turn plans into progress.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end lg:text-lg">
            Browse practical country information, find the right documents faster,
            and keep important guidance close throughout your European work journey.
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {featureHighlights.map((feature, index) => (
            <m.article
              key={feature.title}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ y: -7 }}
              className="group rounded-[28px] border border-[#101d36]/[0.08] bg-[#fafdff] p-6 shadow-[0_16px_45px_rgba(16,29,54,.05)] sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f1ff] text-[#3979e8] transition-colors group-hover:bg-[#3979e8] group-hover:text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[index]}</svg>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-[-0.025em] text-[#101d36]">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#245fc7]">Explore in the app <span aria-hidden="true">→</span></span>
            </m.article>
          ))}
        </m.div>

        <div ref={parallaxRef} className="relative mt-20 overflow-hidden rounded-[36px] bg-[#101d36] px-4 pb-8 pt-12 sm:px-8 sm:pb-12 lg:px-12 lg:pt-16">
          <div className="absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#3979e8]/30 blur-[90px]" />
          <div className="absolute -bottom-44 -left-20 h-[360px] w-[360px] rounded-full bg-[#5bd6ac]/20 blur-[90px]" />
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#78e0be]">Designed for real journeys</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">Your path, always within reach.</h3>
          </m.div>
          <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {appScreens.map((screen, index) => (
              <m.div key={screen.src} style={{ y: index % 2 === 0 ? evenY : oddY, willChange: "transform" }}>
                <PhoneFrame src={screen.src} alt={screen.alt} label={screen.label} darkLabel />
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
