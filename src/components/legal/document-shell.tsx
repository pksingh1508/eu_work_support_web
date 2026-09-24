import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal } from "@/components/motion/reveal";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { BackHomeLink, SubpageHeader } from "@/components/site/subpage-header";
import { PendingLink } from "@/components/ui/pending-link";
import { LegalToc, MobileToc, type TocItem } from "./legal-toc";
import { ReadingProgress } from "./reading-progress";

type DocumentShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  switcher?: ReactNode;
  toc?: TocItem[];
  /**
   * For pages opened from inside the mobile app: no links back to the website
   * or its purchase flow.
   */
  standalone?: boolean;
  children: ReactNode;
};

/** Shared layout for policy and help documents. */
export function DocumentShell({
  eyebrow,
  title,
  description,
  meta,
  switcher,
  toc,
  standalone = false,
  children,
}: DocumentShellProps) {
  const hasToc = Boolean(toc && toc.length > 1);

  return (
    <main className="relative bg-surface text-ink">
      <ReadingProgress />
      <PageBackdrop />
      {standalone ? (
        <SubpageHeader standalone />
      ) : (
        <SubpageHeader>
          <BackHomeLink />
          <PendingLink
            href="/sign-up"
            className="group hidden min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Get PRO
          </PendingLink>
        </SubpageHeader>
      )}

      <header className="relative mx-auto max-w-[1160px] px-5 pb-10 pt-10 sm:px-8 lg:pb-14 lg:pt-16">
        <Reveal immediate y={10} duration={0.5}>
          {standalone ? (
            <p className="section-kicker">{eyebrow}</p>
          ) : (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="font-semibold hover:text-brand-strong">
                Home
              </Link>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span className="font-semibold text-brand-strong">{eyebrow}</span>
            </nav>
          )}
        </Reveal>
        <AnimatedHeading
          as="h1"
          className="mt-5 max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[0.98] tracking-[-0.055em] text-ink"
          text={title}
          immediate
          delay={0.08}
        />
        {description ? (
          <Reveal immediate delay={0.25} y={14}>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
        {meta ? (
          <Reveal immediate delay={0.35} y={12} className="mt-6 flex flex-wrap gap-2.5">
            {meta}
          </Reveal>
        ) : null}
        {switcher ? (
          <Reveal immediate delay={0.45} y={12} className="mt-8">
            {switcher}
          </Reveal>
        ) : null}
      </header>

      <div
        className={`relative mx-auto grid max-w-[1160px] grid-cols-1 gap-10 px-5 pb-20 sm:px-8 lg:pb-28 ${
          hasToc ? "lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14" : ""
        }`}
      >
        {hasToc && toc ? (
          <aside className="hidden lg:block print:hidden">
            <LegalToc items={toc} />
          </aside>
        ) : null}
        <div className="min-w-0">
          {hasToc && toc ? <MobileToc items={toc} /> : null}
          {children}
        </div>
      </div>
    </main>
  );
}

export function MetaChip({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur">
      <span className="text-brand">{icon}</span>
      {children}
    </span>
  );
}
