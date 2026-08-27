"use client";

import { workflowSteps } from "./landing-content";
import { m } from "motion/react";

export function WorkflowSection() {
  return (
    <section id="how-to-get-access" className="bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <m.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="lg:sticky lg:top-32 lg:self-start">
          <p className="section-kicker">How to get access</p>
          <h2 className="section-title mt-4">Four small steps to full access.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The website handles your account and secure payment. The app uses
            the same email to recognize your upgrade—simple and connected.
          </p>
          <a href="#pricing" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#245fc7]">See pricing <span aria-hidden="true">→</span></a>
        </m.div>

        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="relative grid gap-4 sm:grid-cols-2">
          {workflowSteps.map((step, index) => (
            <m.article key={step.title} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} whileHover={{ y: -5 }} className="group rounded-[26px] border border-[#101d36]/[0.08] bg-[#fafdff] p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3979e8] text-sm font-black text-white shadow-[0_9px_22px_rgba(57,121,232,.25)]">
                0{index + 1}
              </span>
              <h3 className="mt-6 text-xl font-extrabold tracking-[-0.025em] text-[#101d36]">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
