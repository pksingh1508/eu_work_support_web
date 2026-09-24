"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { AnimatedHeading } from "@/components/motion/animated-words";
import {
  easeOutExpo,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/reveal";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  MailIcon,
  PlusIcon,
} from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";
import { type Faq, faqs } from "./landing-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative bg-surface px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal y={12} duration={0.5}>
            <p className="section-kicker">Common questions</p>
          </Reveal>
          <AnimatedHeading
            as="h2"
            className="section-title mt-5 text-[clamp(2.25rem,4.4vw,3.6rem)]"
            text="Good to know before you go."
            highlight={["go."]}
            delay={0.08}
          />
          <Reveal delay={0.2} y={20}>
            <p className="mt-5 max-w-md leading-7 text-slate-600">
              Still need help? Our support team is one email away.
            </p>
          </Reveal>
          <Reveal delay={0.3} y={20}>
            <a
              href={`mailto:${supportEmail}`}
              className="group mt-8 flex max-w-md items-center gap-4 rounded-3xl border border-ink/[0.08] bg-white p-4 pr-5 shadow-[0_16px_40px_-20px_rgba(16,29,54,0.22)] transition-[transform,border-color,box-shadow] duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_22px_50px_-20px_rgba(57,121,232,0.4)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(57,121,232,0.7)]">
                <MailIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-ink">Contact support</b>
                <span className="block truncate text-sm text-slate-500">
                  {supportEmail}
                </span>
              </span>
              <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <RevealGroup stagger={0.08} className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;

  return (
    <RevealItem y={20}>
      <article
        className={`overflow-hidden rounded-[22px] border bg-white transition-[border-color,box-shadow] duration-300 ${
          open
            ? "border-brand/25 shadow-[0_22px_50px_-26px_rgba(57,121,232,0.5)]"
            : "border-ink/[0.08] shadow-[0_10px_35px_rgba(16,29,54,.04)] hover:border-ink/15"
        }`}
      >
        <h3>
          <button
            type="button"
            id={`${id}-button`}
            aria-expanded={open}
            aria-controls={open ? `${id}-panel` : undefined}
            onClick={onToggle}
            className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
          >
            <span
              className={`w-6 shrink-0 text-sm font-black tabular-nums transition-colors duration-300 ${
                open ? "text-brand" : "text-slate-300"
              }`}
            >
              0{index + 1}
            </span>
            <span className="flex-1 text-base font-extrabold tracking-[-0.02em] text-ink sm:text-lg">
              {faq.question}
            </span>
            <m.span
              aria-hidden="true"
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                open ? "bg-brand text-white" : "bg-brand-soft text-brand"
              }`}
            >
              <PlusIcon className="h-4 w-4" />
            </m.span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              key="answer"
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-button`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: easeOutExpo },
                opacity: { duration: 0.25 },
              }}
              className="overflow-hidden"
            >
              <div className="pb-6 pl-[60px] pr-5 sm:pl-16 sm:pr-6">
                <p className="leading-7 text-slate-600">{faq.answer}</p>
                {faq.link ? (
                  <Link
                    href={faq.link.href}
                    className="group mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-strong hover:text-brand-deep"
                  >
                    {faq.link.label}
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5" />
                  </Link>
                ) : null}
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </article>
    </RevealItem>
  );
}
