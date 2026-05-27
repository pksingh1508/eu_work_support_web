import Link from "next/link";
import { appName } from "@/components/landing/landing-content";
import { legalLinks, supportEmail } from "@/lib/legal/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-semibold text-slate-950"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0069c9] text-sm font-bold text-white">
              EU
            </span>
            <span>{appName}</span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Digital guidance for European work preparation. PRO is a one-time
            $50 payment for lifetime access to paid app content.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Support:{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-semibold text-[#0069c9] hover:text-[#0058aa]"
            >
              {supportEmail}
            </a>
          </p>
        </div>

        <nav
          aria-label="Legal and support links"
          className="grid gap-3 text-sm font-medium text-slate-600 sm:grid-cols-2 lg:min-w-[420px]"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
