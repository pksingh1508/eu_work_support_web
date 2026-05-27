"use client";

import { useState } from "react";

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

export function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function startCheckout() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.ok) {
        setError(!data.ok ? data.error : "Unable to start checkout.");
        return;
      }

      window.location.assign(data.url);
    } catch {
      setError("Unable to start checkout. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={disabled || isLoading}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0069c9] px-6 text-base font-semibold text-white transition hover:bg-[#0058aa] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
      >
        {isLoading ? "Opening Stripe..." : "Pay $50 with Stripe"}
      </button>
      {error ? (
        <p className="mt-3 max-w-xl text-sm leading-6 text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
