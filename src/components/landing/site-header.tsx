"use client";

import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { SiteLogo } from "@/components/site/site-logo";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PendingLink } from "@/components/ui/pending-link";
import { appStoreUrl, navigationItems, playStoreUrl } from "./landing-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(playStoreUrl);
  const pendingHrefRef = useRef<string | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });
  const activePillTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 500, damping: 38, mass: 0.65 };
  const labelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.6 };
  const floating = scrolled || menuOpen;

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);

    if (pendingHrefRef.current) {
      const target = document.querySelector<HTMLElement>(
        pendingHrefRef.current,
      );
      if (target && Math.abs(target.getBoundingClientRect().top - 96) < 36) {
        pendingHrefRef.current = null;
      } else {
        return;
      }
    }

    const activationLine = value + 160;
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
    // Lock the root element: <html> has its own overflow, so a lock on
    // <body> would never reach the viewport.
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const hashMatchesNavigation = navigationItems.some(
      (item) => item.href === window.location.hash,
    );
    if (hashMatchesNavigation) setActiveHref(window.location.hash);
    setScrolled(window.scrollY > 24);

    return () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // iPadOS Safari reports itself as "Macintosh", so this also covers iPads.
    if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
      setDownloadUrl(appStoreUrl);
    }
  }, []);

  return (
    <>
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-linear-to-r from-mint via-brand to-violet"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-[padding] duration-500 ease-smooth ${
          floating ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 border transition-all duration-500 ease-smooth ${
            floating
              ? "h-16 max-w-[1180px] rounded-[32px] border-ink/[0.08] bg-white/80 pl-4 pr-2.5 shadow-[0_18px_50px_-20px_rgba(16,29,54,0.28)] backdrop-blur-xl sm:pl-5"
              : "h-[72px] max-w-[1240px] rounded-none border-transparent bg-transparent px-5 sm:h-[78px] sm:px-8"
          }`}
        >
          <SiteLogo />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-full border border-ink/[0.07] bg-white/70 p-1.5 shadow-sm lg:flex"
          >
            <LayoutGroup id="desktop-navigation">
              {navigationItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <m.a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => selectNavigationItem(item.href)}
                    whileHover={
                      isActive || prefersReducedMotion ? undefined : { y: -1 }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.97 }
                    }
                    className={`relative isolate overflow-hidden rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 hover:bg-brand-soft hover:text-brand-strong"
                    }`}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="active-navigation-pill"
                        initial={false}
                        transition={activePillTransition}
                        className="absolute inset-0 -z-10 rounded-full bg-brand shadow-[0_7px_18px_rgba(57,121,232,.25)]"
                      />
                    ) : null}
                    <m.span
                      animate={
                        isActive ? { y: -1, scale: 1.015 } : { y: 0, scale: 1 }
                      }
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/sign-in"
              className="hidden min-h-11 items-center rounded-full px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-ink/[0.05] hover:text-ink lg:inline-flex"
            >
              Sign in
            </Link>
            <PendingLink
              href="/sign-up"
              className="group relative hidden min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(16,29,54,0.18)] transition-[transform,background-color] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong active:translate-y-0 sm:inline-flex"
            >
              Create account
            </PendingLink>
            <button
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft lg:hidden"
            >
              <span className="relative h-4 w-5">
                <m.span
                  animate={
                    menuOpen ? { y: 7, rotate: 45 } : { y: 1, rotate: 0 }
                  }
                  className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
                />
                <m.span
                  animate={
                    menuOpen ? { opacity: 0, x: 4 } : { opacity: 1, x: 0 }
                  }
                  className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
                />
                <m.span
                  animate={
                    menuOpen ? { y: -7, rotate: -45 } : { y: -1, rotate: 0 }
                  }
                  className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-ink/25 px-3 pt-[88px] backdrop-blur-sm sm:px-5 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <m.nav
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto max-w-[1180px] origin-top overflow-hidden rounded-[28px] border border-white/70 bg-surface p-3 shadow-[0_28px_90px_rgba(16,29,54,0.24)]"
            >
              <LayoutGroup id="mobile-navigation-links">
                {navigationItems.map((item, index) => {
                  const isActive = activeHref === item.href;

                  return (
                    <m.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.05 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                        duration: 0.4,
                      }}
                      whileTap={
                        prefersReducedMotion ? undefined : { scale: 0.985 }
                      }
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => {
                        selectNavigationItem(item.href);
                        setMenuOpen(false);
                      }}
                      className="relative isolate flex items-center justify-between overflow-hidden rounded-2xl px-4 py-3.5 text-base font-bold text-ink hover:bg-brand-soft"
                    >
                      {isActive ? (
                        <m.span
                          layoutId="mobile-active-navigation-pill"
                          initial={false}
                          transition={activePillTransition}
                          className="absolute inset-0 -z-10 rounded-2xl bg-brand shadow-[0_8px_22px_rgba(57,121,232,.2)]"
                        />
                      ) : null}
                      <m.span
                        animate={{
                          color: isActive ? "#ffffff" : "#101d36",
                          x: isActive ? 2 : 0,
                        }}
                        transition={labelTransition}
                      >
                        {item.label}
                      </m.span>
                      <m.span
                        aria-hidden="true"
                        animate={
                          isActive
                            ? { color: "#bcd1ff", scale: 0.8 }
                            : { color: "#3979e8", scale: 1 }
                        }
                        transition={labelTransition}
                      >
                        {isActive ? "●" : "↗"}
                      </m.span>
                    </m.a>
                  );
                })}
              </LayoutGroup>
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.24 }}
                className="mt-2 grid grid-cols-2 gap-2 border-t border-ink/[0.06] pt-3"
              >
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-2xl border border-ink/10 bg-white text-sm font-bold text-ink"
                >
                  Sign in
                </Link>
                <PendingLink
                  href="/sign-up"
                  className="group flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-bold text-white shadow-[0_10px_24px_-8px_rgba(57,121,232,0.55)]"
                >
                  Get PRO
                </PendingLink>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-bold text-white"
                >
                  Download the app
                  <ArrowUpRightIcon className="h-4 w-4 text-white/70" />
                </a>
              </m.div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
