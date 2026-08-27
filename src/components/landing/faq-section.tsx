"use client";

import { faqs } from "./landing-content";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { supportEmail } from "@/lib/legal/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#fafdff] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
        <m.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="section-kicker">Common questions</p>
          <h2 className="section-title mt-4">Good to know before you go.</h2>
          <p className="mt-5 leading-7 text-slate-600">Still need help? Our support team is one email away.</p>
          <a href={`mailto:${supportEmail}`} className="mt-6 inline-flex items-center gap-2 font-bold text-[#245fc7]">Contact support <span aria-hidden="true">↗</span></a>
        </m.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <m.article key={faq.question} layout className="overflow-hidden rounded-[22px] border border-[#101d36]/[0.08] bg-white shadow-[0_10px_35px_rgba(16,29,54,.04)]">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-base font-extrabold tracking-[-0.02em] text-[#101d36] sm:text-lg">{faq.question}</span>
                <m.span aria-hidden="true" animate={{ rotate: openIndex === index ? 45 : 0 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xl font-medium text-[#3979e8]">+</m.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index ? (
                  <m.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="overflow-hidden">
                    <p className="px-5 pb-6 leading-7 text-slate-600 sm:px-6">{faq.answer}</p>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
