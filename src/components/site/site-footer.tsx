import Link from "next/link";
import { appName } from "@/components/landing/landing-content";
import { legalLinks, supportEmail } from "@/lib/legal/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.75fr_0.75fr]">
        <div>
          <div className="inline-flex items-center gap-3 font-semibold">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0069c9] text-sm font-bold text-white">
              EU
            </span>
            <span>{appName}</span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
            Digital guidance for European work preparation. PRO is a one-time
            $50 website payment for lifetime access to paid mobile app content,
            support, and available data.
          </p>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Secure payments are processed by Stripe. EU Work Support does not
            store full card numbers.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-[#45d19a]">
            Support
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Need help with checkout, account access, billing, or PRO unlock?
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-[#45d19a] decoration-2 underline-offset-4 hover:text-[#d9f4e8]"
          >
            {supportEmail}
          </a>
        </div>

        <nav aria-label="Policies" className="flex flex-col items-start">
          <h2 className="text-sm font-semibold uppercase text-[#45d19a]">
            Policies
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {appName}. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/sign-up" className="hover:text-white">
            Get PRO
          </Link>
          <a href={`mailto:${supportEmail}`} className="hover:text-white">
            Contact support
          </a>
        </div>
      </div>
    </footer>
  );
}
