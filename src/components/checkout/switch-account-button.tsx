"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

/** Signs out and returns to sign-in, so the user can pay with their app email. */
export function SwitchAccountButton() {
  const { signOut } = useClerk();
  const [pending, setPending] = useState(false);

  async function switchAccount() {
    setPending(true);
    try {
      await signOut({ redirectUrl: "/sign-in" });
    } catch {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={switchAccount}
      disabled={pending}
      aria-busy={pending}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-brand-strong transition-colors hover:bg-brand-soft disabled:cursor-progress disabled:opacity-80"
    >
      {pending ? <Spinner className="h-3.5 w-3.5" /> : null}
      {pending ? "Switching…" : "Switch account"}
    </button>
  );
}
