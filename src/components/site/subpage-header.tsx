import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { SiteLogo } from "./site-logo";

type SubpageHeaderProps = {
  children?: ReactNode;
  /** Brand mark only, with no links (for pages opened from the mobile app). */
  standalone?: boolean;
};

/** Compact sticky header for checkout, payment, and policy pages. */
export function SubpageHeader({ children, standalone = false }: SubpageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8">
        <SiteLogo href={standalone ? null : "/"} />
        {standalone ? null : (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {children ?? <BackHomeLink />}
          </div>
        )}
      </div>
    </header>
  );
}

export function BackHomeLink() {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-bold text-slate-500 transition-colors hover:bg-ink/[0.05] hover:text-brand-strong"
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-x-0.5" />
      <span className="hidden sm:inline">Back to home</span>
      <span className="sm:hidden">Home</span>
    </Link>
  );
}
