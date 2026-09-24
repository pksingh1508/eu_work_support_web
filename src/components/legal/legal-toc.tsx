"use client";

import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { useEffect, useState } from "react";
import { easeOutExpo } from "@/components/motion/reveal";
import { ChevronDownIcon } from "@/components/ui/icons";

export type TocItem = {
  id: string;
  title: string;
};

function useActiveSection(items: TocItem[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -62% 0px" },
    );
    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    // Short final sections never reach the observer band, so pin the last
    // item once the reader hits the bottom of the page.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      const last = items.at(-1);
      if (atBottom && last) setActiveId(last.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return activeId;
}

export function LegalToc({ items }: { items: TocItem[] }) {
  const activeId = useActiveSection(items);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
        On this page
      </p>
      <LayoutGroup id="legal-toc">
        <ul className="mt-4 border-l border-ink/10">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="relative">
                {active ? (
                  <m.span
                    layoutId="legal-toc-indicator"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute -left-px top-1 bottom-1 w-0.5 rounded-full bg-brand"
                  />
                ) : null}
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`block py-1.5 pl-4 text-sm leading-6 transition-colors duration-200 ${
                    active
                      ? "font-bold text-ink"
                      : "text-slate-500 hover:text-ink"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </nav>
  );
}

export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="On this page"
      className="mb-5 overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-[0_12px_30px_-20px_rgba(16,29,54,0.3)] lg:hidden print:hidden"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-ink"
      >
        <span>
          On this page{" "}
          <span className="font-semibold text-slate-500">({items.length})</span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <m.ul
            key="toc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="overflow-hidden border-t border-ink/[0.06]"
          >
            {items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-surface-tint hover:text-ink"
                >
                  <span className="w-5 shrink-0 font-bold tabular-nums text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </m.ul>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
