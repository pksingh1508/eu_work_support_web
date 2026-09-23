"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { appStoreUrl, playStoreUrl } from "./landing-content";

type StoreButtonsProps = {
  compact?: boolean;
  className?: string;
};

export function StoreButtons({ compact = false, className = "" }: StoreButtonsProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <StoreLink
        href={playStoreUrl}
        label="Download EU Work Support on Google Play"
        eyebrow="Get it on"
        storeName="Google Play"
        compact={compact}
        icon={
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0">
            <path fill="#31d158" d="M3.4 2.8a2 2 0 0 0-.4 1.3v15.8c0 .5.1.9.4 1.3l9.2-9.2L3.4 2.8Z" />
            <path fill="#28a8ea" d="m15.7 8.9-3.1 3.1 3.1 3.1 4.3-2.4c.8-.4.8-1 0-1.4l-4.3-2.4Z" />
            <path fill="#ffd600" d="m3.4 2.8 9.2 9.2 3.1-3.1-9.8-5.6c-.9-.5-1.8-.7-2.5-.5Z" />
            <path fill="#ff3a44" d="m3.4 21.2 9.2-9.2 3.1 3.1-9.8 5.6c-.9.5-1.8.7-2.5.5Z" />
          </svg>
        }
      />

      <StoreLink
        href={appStoreUrl}
        label="Download EU Work Support on the App Store"
        eyebrow="Download on the"
        storeName="App Store"
        compact={compact}
        icon={
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-current">
            <path d="M16.7 12.7c0-2.5 2.1-3.7 2.2-3.8a4.8 4.8 0 0 0-3.8-2c-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9a5 5 0 0 0-4.2 2.6c-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9 4.3 4.3 0 0 1-2.8-4.2ZM14 5.2a4.4 4.4 0 0 0 1-3.2 4.5 4.5 0 0 0-3 1.5A4.2 4.2 0 0 0 11 6.6 3.7 3.7 0 0 0 14 5.2Z" />
          </svg>
        }
      />
    </div>
  );
}

type StoreLinkProps = {
  href: string;
  label: string;
  eyebrow: string;
  storeName: string;
  compact: boolean;
  icon: ReactNode;
};

function StoreLink({ href, label, eyebrow, storeName, compact, icon }: StoreLinkProps) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={`group inline-flex items-center gap-3 rounded-2xl bg-[#101d36] text-white shadow-[0_14px_40px_rgba(16,29,54,0.18)] ring-1 ring-white/10 ${
        compact ? "min-h-12 px-4" : "min-h-14 px-5"
      }`}
    >
      {icon}
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-white/65">
          {eyebrow}
        </span>
        <span className={`${compact ? "text-sm" : "text-base"} mt-1 block font-bold`}>
          {storeName}
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
  );
}
