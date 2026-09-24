"use client";

import { ArrowUpIcon } from "@/components/ui/icons";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
    >
      Back to top
      <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5" />
    </button>
  );
}
