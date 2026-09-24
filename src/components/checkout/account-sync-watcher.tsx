"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { AlertIcon, RefreshIcon } from "@/components/ui/icons";
import { Spinner } from "@/components/ui/spinner";

const refreshIntervalMs = 3000;
const maxAttempts = 20;

/**
 * New accounts reach the database through a Clerk webhook, which can lag a few
 * seconds behind sign-up. Re-render the page until the account appears so the
 * payment button unlocks without a manual refresh.
 */
export function AccountSyncWatcher() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const [isRefreshing, startTransition] = useTransition();
  const statusRef = useRef<HTMLDivElement>(null);
  const gaveUp = attempts >= maxAttempts;

  useEffect(() => {
    if (gaveUp) return;
    const timer = window.setTimeout(() => {
      startTransition(() => router.refresh());
      setAttempts((count) => count + 1);
    }, refreshIntervalMs);
    return () => window.clearTimeout(timer);
  }, [attempts, gaveUp, router]);

  return (
    <div
      ref={statusRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-amber-600">
          {gaveUp ? <AlertIcon className="h-5 w-5" /> : <Spinner className="h-5 w-5" />}
        </span>
        <div className="text-sm leading-6">
          <p className="font-bold text-amber-900">
            {gaveUp ? "Still setting up your account" : "Setting up your account…"}
          </p>
          <p className="text-amber-800/85">
            {gaveUp
              ? "This is taking longer than usual. Check again in a moment, or contact support if it continues."
              : "This usually takes a few seconds. The payment button unlocks automatically."}
          </p>
          {gaveUp ? (
            <button
              type="button"
              disabled={isRefreshing}
              onClick={() => {
                setAttempts(0);
                startTransition(() => router.refresh());
                // This button unmounts once polling restarts; keep focus nearby.
                statusRef.current?.focus();
              }}
              className="mt-2 inline-flex items-center gap-1.5 font-bold text-amber-900 underline-offset-4 hover:underline disabled:opacity-60"
            >
              <RefreshIcon className="h-4 w-4" />
              Check again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
