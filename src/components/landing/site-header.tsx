"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { appName, navigationItems } from "./landing-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const pendingHrefRef = useRef<string | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const activePillTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 500, damping: 38, mass: 0.65 };
  const labelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.6 };

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);

    if (pendingHrefRef.current) {
      const target = document.querySelector<HTMLElement>(pendingHrefRef.current);
      if (target && Math.abs(target.getBoundingClientRect().top - 90) < 36) {
        pendingHrefRef.current = null;
      } else {
        return;
      }
    }

    const activationLine = value + 150;
    let nextHref = "";

    for (const item of navigationItems) {
      const section = document.querySelector<HTMLElement>(item.href);
      if (!section) continue;
      const sectionTop = section.getBoundingClientRect().top + value;
      if (sectionTop <= activationLine) nextHref = item.href;
    }

    setActiveHref((current) => (current === nextHref ? current : nextHref));
  });

  function selectNavigationItem(href: string) {
    pendingHrefRef.current = href;
    setActiveHref(href);

    if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    pendingTimerRef.current = setTimeout(() => {
      pendingHrefRef.current = null;
    }, 1400);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const hashMatchesNavigation = navigationItems.some((item) => item.href === window.location.hash);
    if (hashMatchesNavigation) setActiveHref(window.location.hash);

    return () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    };
  }, []);

  return (
    <>
      <m.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[120] h-[3px] origin-left bg-gradient-to-r from-[#5bd6ac] via-[#3979e8] to-[#7d57d9]"
        style={{ scaleX: scrollYProgress }}
      />
      <m.header
        layoutRoot
        animate={{
          backgroundColor: scrolled ? "rgba(250,252,255,0.9)" : "rgba(250,252,255,0.64)",
          boxShadow: scrolled ? "0 10px 40px rgba(16,29,54,0.08)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[110] border-b border-[#101d36]/[0.07] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[78px] sm:px-8">
          <Link href="/" className="group flex min-w-0 items-center gap-3 text-[#101d36]">
            <m.span
              whileHover={{ rotate: -5, scale: 1.04 }}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-[#3979e8] text-[13px] font-black tracking-[-0.03em] text-white shadow-[0_8px_22px_rgba(57,121,232,0.3)]"
            >
              <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#5bd6ac]" />
              <span className="relative">EU</span>
            </m.span>
            <span className="truncate text-[15px] font-extrabold tracking-[-0.02em] sm:text-base">
              {appName}
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-[#101d36]/[0.07] bg-white/70 p-1.5 shadow-sm lg:flex">
            <LayoutGroup id="desktop-navigation">
              {navigationItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <m.a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => selectNavigationItem(item.href)}
                    whileHover={isActive || prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    className={`relative isolate overflow-hidden rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3979e8] ${
                      isActive ? "text-white" : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#245fc7]"
                    }`}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="active-navigation-pill"
                        initial={false}
                        transition={activePillTransition}
                        className="absolute inset-0 -z-10 rounded-full bg-[#3979e8] shadow-[0_7px_18px_rgba(57,121,232,.25)]"
                      />
                    ) : null}
                    <m.span
                      animate={isActive ? { y: -1, scale: 1.015 } : { y: 0, scale: 1 }}
                      transition={labelTransition}
                      className="relative inline-block"
                    >
                      {item.label}
                    </m.span>
                  </m.a>
                );
              })}
            </LayoutGroup>
          </nav>

          <div className="flex items-center gap-2">
            <m.a
              href="https://play.google.com/store/apps/details?id=com.euworksupport.app"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="hidden min-h-11 items-center justify-center rounded-full bg-[#101d36] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(16,29,54,0.16)] sm:inline-flex"
            >
              Download app
            </m.a>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#101d36]/10 bg-white text-[#101d36] shadow-sm lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="relative h-4 w-5">
                <m.span animate={menuOpen ? { y: 7, rotate: 45 } : { y: 1, rotate: 0 }} className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current" />
                <m.span animate={menuOpen ? { opacity: 0, x: 4 } : { opacity: 1, x: 0 }} className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current" />
                <m.span animate={menuOpen ? { y: -7, rotate: -45 } : { y: -1, rotate: 0 }} className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#101d36]/20 px-4 pt-[88px] backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <m.nav
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto max-w-lg overflow-hidden rounded-[26px] border border-white/70 bg-[#fafdff] p-3 shadow-[0_28px_90px_rgba(16,29,54,0.24)]"
            >
              <LayoutGroup id="mobile-navigation-links">
                {navigationItems.map((item, index) => {
                  const isActive = activeHref === item.href;

                  return (
                    <m.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.05 + index * 0.04 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => {
                        selectNavigationItem(item.href);
                        setMenuOpen(false);
                      }}
                      className="relative isolate flex items-center justify-between overflow-hidden rounded-2xl px-4 py-3.5 text-base font-bold text-[#101d36] hover:bg-[#eef4ff]"
                    >
                      {isActive ? (
                        <m.span
                          layoutId="mobile-active-navigation-pill"
                          initial={false}
                          transition={activePillTransition}
                          className="absolute inset-0 -z-10 rounded-2xl bg-[#3979e8] shadow-[0_8px_22px_rgba(57,121,232,.2)]"
                        />
                      ) : null}
                      <m.span
                        animate={{ color: isActive ? "#ffffff" : "#101d36", x: isActive ? 2 : 0 }}
                        transition={labelTransition}
                      >
                        {item.label}
                      </m.span>
                      <m.span
                        aria-hidden="true"
                        animate={
                          isActive
                            ? { color: "#bcd1ff", rotate: 0, scale: 0.8 }
                            : { color: "#3979e8", rotate: 0, scale: 1 }
                        }
                        transition={labelTransition}
                      >
                        {isActive ? "●" : "↗"}
                      </m.span>
                    </m.a>
                  );
                })}
              </LayoutGroup>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <Link href="/sign-up" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-[#101d36]">
                  Get PRO
                </Link>
                <a href="https://play.google.com/store/apps/details?id=com.euworksupport.app" target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center rounded-2xl bg-[#3979e8] text-sm font-bold text-white">
                  Download
                </a>
              </div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
