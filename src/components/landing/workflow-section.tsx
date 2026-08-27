"use client";

import { workflowSteps } from "./landing-content";
import { m } from "motion/react";

export function WorkflowSection() {
  return (
    <section
      id="how-to-get-access"
      className="bg-white px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 lg:grid-cols-2 lg:items-end"
        >
          <div>
            <p className="section-kicker">How to get access</p>
            <h2 className="section-title mt-4">
              Three simple steps to GET access.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Create your account, complete one secure payment, and use the same
              email to unlock EU Work Support in the mobile app.
            </p>
            <a
              href="#pricing"
              className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#245fc7]"
            >
              See pricing <span aria-hidden="true">→</span>
            </a>
          </div>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative mt-14 grid gap-4 lg:grid-cols-3"
        >
          {workflowSteps.map((step, index) => (
            <m.article
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -5 }}
              className="group relative rounded-[28px] border border-[#101d36]/[0.08] bg-[#fafdff] p-7 shadow-[0_14px_40px_rgba(16,29,54,.04)] sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3979e8] text-sm font-black text-white shadow-[0_9px_22px_rgba(57,121,232,.25)]">
                0{index + 1}
              </span>
              <h3 className="mt-7 text-xl font-extrabold tracking-[-0.025em] text-[#101d36] sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
              {index < workflowSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-9 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-[#3979e8]/15 bg-white text-xs font-black text-[#3979e8] shadow-sm lg:flex"
                >
                  →
                </span>
              ) : null}
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
