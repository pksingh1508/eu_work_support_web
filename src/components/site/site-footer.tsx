import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { appName } from "@/components/landing/landing-content";
import { StoreButtons } from "@/components/landing/store-buttons";
import { MailIcon } from "@/components/ui/icons";
import { legalLinks, supportEmail } from "@/lib/legal/content";
import { BackToTop } from "./back-to-top";
import { SiteLogo } from "./site-logo";

const underlineLink =
  "bg-linear-to-r from-mint to-mint bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-300 ease-smooth hover:bg-[length:100%_1px] hover:text-white";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-deep px-5 pb-9 pt-16 text-white sm:px-8 lg:pt-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.22),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-52 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.12),transparent)]"
      />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.65fr_0.7fr]">
        <Reveal y={20} className="max-w-xl">
          <SiteLogo tone="light" />
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
            Clearer country guidance, helpful document lists, and practical
            support for every step of your European work journey.
          </p>
          <StoreButtons compact className="mt-7" />
        </Reveal>

        <Reveal y={20} delay={0.1}>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-mint-light">
            Support
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Need help with checkout, account access, billing, or PRO unlock?
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="group mt-4 inline-flex items-center gap-2.5 text-sm font-semibold text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.08] text-mint-light transition-colors group-hover:bg-mint group-hover:text-ink">
              <MailIcon className="h-4 w-4" />
            </span>
            <span className={underlineLink}>{supportEmail}</span>
          </a>
        </Reveal>

        <Reveal as="nav" aria-label="Policies" y={20} delay={0.2}>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-mint-light">
            Policies
          </h2>
          <ul className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-300">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={underlineLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-[1240px] flex-col gap-4 border-t border-white/10 pt-7 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {appName}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/sign-up" className="hover:text-white">
            Get PRO
          </Link>
          <a href={`mailto:${supportEmail}`} className="hover:text-white">
            Contact support
          </a>
          <BackToTop />
        </div>
      </div>
      <p className="relative mx-auto mt-5 max-w-[1240px] text-[11px] leading-5 text-slate-500">
        EU Work Support provides general informational guidance and is not a
        substitute for official legal, immigration, or government advice.
      </p>
    </footer>
  );
}
