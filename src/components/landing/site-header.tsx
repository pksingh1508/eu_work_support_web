import Link from "next/link";
import { appName, navigationItems } from "./landing-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 font-semibold text-slate-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0069c9] text-sm font-bold text-white">
            EU
          </span>
          <span className="truncate text-sm sm:text-base">{appName}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/sign-up"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-[#0069c9] sm:px-5"
        >
          Get PRO
        </Link>
      </div>
    </header>
  );
}
