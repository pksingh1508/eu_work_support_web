"use client";

import Link from "next/link";
import { pricingPlans } from "./landing-content";
import { m } from "motion/react";

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#f1f6ff] px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute right-[-12rem] top-24 h-96 w-96 rounded-full bg-[#77dbbd]/20 blur-[90px]" />
      <div className="mx-auto max-w-[1120px]">
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">
            Simple pricing
          </p>
          <h2 className="section-title mt-4">
            One upgrade. A lifetime of access.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Unlock every guide, page, and support feature with one secure payment. No subscription and no recurring fees.
          </p>
        </m.div>

        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="mx-auto mt-12 max-w-2xl">
          {pricingPlans.map((plan) => (
            <m.article
              key={plan.name}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-[30px] border p-7 sm:p-9 ${
                plan.featured
                  ? "border-[#3979e8]/50 bg-[#101d36] text-white shadow-[0_28px_80px_rgba(16,29,54,0.22)]"
                  : "border-white bg-white text-[#101d36] shadow-[0_18px_55px_rgba(16,29,54,.07)]"
              }`}
            >
              {plan.featured ? <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#3979e8]/30 blur-[55px]" /> : null}
              <div className="flex items-start justify-between gap-4">
                <div className="relative">
                  <h3 className="text-2xl font-black tracking-[-0.03em]">{plan.name}</h3>
                  <p
                    className={`mt-2 leading-7 ${
                      plan.featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
                {plan.featured ? (
                  <span className="relative rounded-full bg-[#dff8ef] px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#11684f]">
                    Lifetime access
                  </span>
                ) : null}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-6xl font-black tracking-[-0.06em]">{plan.price}</span>
                {plan.featured ? (
                  <span className="pb-2 text-slate-300">one-time</span>
                ) : null}
              </div>

              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-6 last:sm:col-span-2">
                    <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${plan.featured ? "bg-[#78e0be]/15 text-[#78e0be]" : "bg-[#eaf2ff] text-[#3979e8]"}`}>✓</span>
                    <span className={plan.featured ? "text-slate-100" : "text-slate-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`relative mt-9 inline-flex min-h-13 w-full items-center justify-center rounded-2xl px-5 text-base font-bold transition-colors ${
                  plan.featured
                    ? "bg-[#5bd6ac] text-[#101d36] hover:bg-[#78e0be]"
                    : "border border-slate-200 bg-[#101d36] text-white hover:bg-[#3979e8]"
                }`}
              >
                {plan.cta}
              </Link>
            </m.article>
          ))}
        </m.div>
        <p className="mt-7 text-center text-sm text-slate-500">Secure checkout powered by Stripe · No recurring subscription</p>
      </div>
    </section>
  );
}
