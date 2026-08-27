"use client";

import { m } from "motion/react";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.euworksupport.app";

type StoreButtonsProps = {
  compact?: boolean;
  className?: string;
};

export function StoreButtons({ compact = false, className = "" }: StoreButtonsProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <m.a
        href={playStoreUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Download EU Work Support on Google Play"
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className={`group inline-flex items-center gap-3 rounded-2xl bg-[#101d36] text-white shadow-[0_14px_40px_rgba(16,29,54,0.18)] ring-1 ring-white/10 ${
          compact ? "min-h-12 px-4" : "min-h-14 px-5"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0">
          <path fill="#31d158" d="M3.4 2.8a2 2 0 0 0-.4 1.3v15.8c0 .5.1.9.4 1.3l9.2-9.2L3.4 2.8Z" />
          <path fill="#28a8ea" d="m15.7 8.9-3.1 3.1 3.1 3.1 4.3-2.4c.8-.4.8-1 0-1.4l-4.3-2.4Z" />
          <path fill="#ffd600" d="m3.4 2.8 9.2 9.2 3.1-3.1-9.8-5.6c-.9-.5-1.8-.7-2.5-.5Z" />
          <path fill="#ff3a44" d="m3.4 21.2 9.2-9.2 3.1 3.1-9.8 5.6c-.9.5-1.8.7-2.5.5Z" />
        </svg>
        <span className="text-left leading-none">
          <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-white/65">
            Get it on
          </span>
          <span className={`${compact ? "text-sm" : "text-base"} mt-1 block font-bold`}>
            Google Play
          </span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="ml-auto h-4 w-4 text-white/55 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </m.a>

      <div
        aria-label="EU Work Support for iOS is coming soon"
        className={`inline-flex cursor-default items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 text-[#101d36] shadow-sm ${
          compact ? "min-h-12 px-4" : "min-h-14 px-5"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-current">
          <path d="M16.7 12.7c0-2.5 2.1-3.7 2.2-3.8a4.8 4.8 0 0 0-3.8-2c-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9a5 5 0 0 0-4.2 2.6c-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9 4.3 4.3 0 0 1-2.8-4.2ZM14 5.2a4.4 4.4 0 0 0 1-3.2 4.5 4.5 0 0 0-3 1.5A4.2 4.2 0 0 0 11 6.6 3.7 3.7 0 0 0 14 5.2Z" />
        </svg>
        <span className="text-left leading-none">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            iOS app
          </span>
          <span className={`${compact ? "text-sm" : "text-base"} mt-1 block font-bold`}>
            Coming soon
          </span>
        </span>
      </div>
    </div>
  );
}
