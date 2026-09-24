import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  MailIcon,
} from "@/components/ui/icons";
import type { LegalPageContent } from "@/lib/legal/content";
import { lastUpdated, legalLinks, supportEmail } from "@/lib/legal/content";
import { DocumentShell, MetaChip } from "./document-shell";
import { slugify } from "./slugify";

type LegalPageProps = {
  content: LegalPageContent;
  /** Extra content rendered above the policy sections. */
  children?: ReactNode;
};

export function LegalPage({ content, children }: LegalPageProps) {
  const sections = content.sections.map((section) => ({
    ...section,
    id: slugify(section.title),
  }));
  const wordCount = [
    content.description,
    ...content.sections.flatMap((section) => [
      ...section.body,
      ...(section.bullets ?? []),
    ]),
  ]
    .join(" ")
    .split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));

  return (
    <DocumentShell
      eyebrow="Policies"
      title={content.title}
      description={content.description}
      toc={sections.map(({ id, title }) => ({ id, title }))}
      meta={
        <>
          <MetaChip icon={<CalendarIcon className="h-3.5 w-3.5" />}>
            Last updated {lastUpdated}
          </MetaChip>
          <MetaChip icon={<ClockIcon className="h-3.5 w-3.5" />}>
            {readingMinutes} min read
          </MetaChip>
          <MetaChip icon={<FileTextIcon className="h-3.5 w-3.5" />}>
            {sections.length} sections
          </MetaChip>
        </>
      }
      switcher={
        <nav
          aria-label="Other policies"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {legalLinks.map((link) => {
            const current = link.label === content.title;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  current
                    ? "bg-ink text-white shadow-[0_8px_20px_-8px_rgba(16,29,54,0.6)]"
                    : "border border-ink/10 bg-white/70 text-slate-600 hover:border-brand/30 hover:text-brand-strong"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      }
    >
      {children}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Reveal
            as="section"
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            y={24}
            amount={0.05}
            className="rounded-[26px] border border-ink/[0.07] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(16,29,54,0.3)] sm:p-8"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="mt-1 hidden w-7 shrink-0 text-sm font-black tabular-nums text-brand/50 sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id={`${section.id}-title`}
                  className="text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-5 space-y-3 text-[15px] leading-7 text-slate-600 sm:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
                        >
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        y={20}
        className="mt-6 flex flex-col gap-5 rounded-[26px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <p className="text-lg font-extrabold">Questions about this policy?</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            This page is provided for transparency about EU Work Support
            policies. Our team is happy to help.
          </p>
        </div>
        <a
          href={`mailto:${supportEmail}`}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-mint px-5 text-sm font-extrabold text-ink transition-colors hover:bg-mint-light"
        >
          <MailIcon className="h-4 w-4" />
          <span className="sm:hidden">Email support</span>
          <span className="hidden sm:inline">{supportEmail}</span>
        </a>
      </Reveal>
    </DocumentShell>
  );
}
