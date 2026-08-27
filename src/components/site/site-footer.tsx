import Link from "next/link";
import { appName } from "@/components/landing/landing-content";
import { legalLinks, supportEmail } from "@/lib/legal/content";
import { StoreButtons } from "@/components/landing/store-buttons";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0b162c] px-5 pb-9 pt-16 text-white sm:px-8 lg:pt-20">
      <div className="absolute -right-48 -top-48 h-[430px] w-[430px] rounded-full bg-[#3979e8]/20 blur-[100px]" />
      <div className="absolute -bottom-52 -left-24 h-[380px] w-[380px] rounded-full bg-[#5bd6ac]/10 blur-[100px]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.25fr_0.65fr_0.7fr]">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-3 font-semibold">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] bg-[#3979e8] text-sm font-black text-white">
              <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#5bd6ac]" />
              <span className="relative">
              EU
              </span>
            </span>
            <span className="font-extrabold tracking-[-0.02em]">{appName}</span>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
            Clearer country guidance, helpful document lists, and practical
            support for every step of your European work journey.
          </p>
          <StoreButtons compact className="mt-7" />
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#78e0be]">
            Support
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Need help with checkout, account access, billing, or PRO unlock?
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-[#5bd6ac] decoration-2 underline-offset-4 hover:text-[#d9f4e8]"
          >
            {supportEmail}
          </a>
        </div>

        <nav aria-label="Policies" className="flex flex-col items-start">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#78e0be]">
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

      <div className="relative mx-auto mt-12 flex max-w-[1240px] flex-col gap-3 border-t border-white/10 pt-7 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
      <p className="relative mx-auto mt-5 max-w-[1240px] text-[11px] leading-5 text-slate-500">
        EU Work Support provides general informational guidance and is not a substitute for official legal, immigration, or government advice.
      </p>
    </footer>
  );
}
