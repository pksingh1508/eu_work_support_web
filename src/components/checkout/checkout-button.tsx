"use client";

import { AnimatePresence, m, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { AlertIcon, ArrowRightIcon, LockIcon } from "@/components/ui/icons";
import { Spinner } from "@/components/ui/spinner";

type CheckoutButtonProps = {
  disabled?: boolean;
};

type CheckoutResponse =
  | {
      ok: true;
      alreadyPro?: boolean;
      url: string;
    }
  | {
      ok: false;
      code: string;
      error: string;
    };

type Status = "idle" | "creating" | "redirecting";

const labels: Record<Status, string> = {
  idle: "Pay $50 securely",
  creating: "Preparing secure checkout…",
  redirecting: "Redirecting to Stripe…",
};

export function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [shakeScope, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = usePrefersReducedMotion();
  const redirectTimer = useRef<number | undefined>(undefined);
  const busy = status !== "idle";
  const label = disabled ? "Preparing your account…" : labels[status];

  useEffect(() => {
    // Coming back from Stripe with the back button can restore this page from
    // the back/forward cache while it still shows "Redirecting…".
    const resetOnRestore = (event: PageTransitionEvent) => {
      if (event.persisted) setStatus("idle");
    };
    window.addEventListener("pageshow", resetOnRestore);
    return () => {
      window.removeEventListener("pageshow", resetOnRestore);
      window.clearTimeout(redirectTimer.current);
    };
  }, []);

  function fail(message: string) {
    setError(message);
    setStatus("idle");
    if (!reduceMotion && shakeScope.current) {
      animate(shakeScope.current, { x: [0, -7, 7, -4, 4, 0] }, { duration: 0.45 });
    }
  }

  async function startCheckout() {
    if (busy || disabled) return;
    setError(null);
    setStatus("creating");

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.ok) {
        fail(!data.ok ? data.error : "Unable to start checkout.");
        return;
      }

      // Keep the loading state until the browser leaves for Stripe.
      setStatus("redirecting");
      // If the navigation is stopped (e.g. Esc), let the user try again.
      redirectTimer.current = window.setTimeout(() => setStatus("idle"), 10000);
      window.location.assign(data.url);
    } catch {
      fail("Unable to start checkout. Please check your connection.");
    }
  }

  return (
    <div>
      <div ref={shakeScope}>
        <m.button
          type="button"
          onClick={startCheckout}
          disabled={disabled}
          aria-disabled={busy || disabled}
          aria-busy={busy}
          whileTap={busy || disabled ? undefined : { scale: 0.985 }}
          className={`group relative inline-flex min-h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-6 text-base font-extrabold text-white transition-[background-color,box-shadow] duration-300 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none ${
            busy
              ? "cursor-progress bg-brand-strong shadow-[0_18px_40px_-16px_rgba(57,121,232,0.8)]"
              : "bg-ink shadow-[0_18px_40px_-16px_rgba(16,29,54,0.7)] hover:bg-brand-strong hover:shadow-[0_20px_44px_-14px_rgba(57,121,232,0.75)]"
          }`}
        >
          {!busy && !disabled ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-[left] duration-700 ease-smooth group-hover:left-[120%]"
            />
          ) : null}
          {busy || disabled ? (
            <Spinner className="h-5 w-5" />
          ) : (
            <LockIcon className="h-5 w-5 text-mint-light" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
            >
              {label}
            </m.span>
          </AnimatePresence>
          {!busy && !disabled ? (
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
          ) : null}
        </m.button>
      </div>

      <AnimatePresence initial={false}>
        {status === "redirecting" ? (
          <m.p
            key="redirecting"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-center text-xs text-slate-500"
          >
            <span className="block pt-3">
              Taking you to Stripe’s secure payment page…
            </span>
          </m.p>
        ) : null}
        {error ? (
          <m.div
            key="error"
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-700">
              <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
