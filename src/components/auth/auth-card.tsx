"use client";

import { ClerkFailed, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { AlertIcon, RefreshIcon } from "@/components/ui/icons";
import { AuthFormSkeleton } from "./auth-form-skeleton";

type AuthCardProps = {
  children: ReactNode;
  fields?: number;
};

/** Shows a skeleton while Clerk loads and a recovery message if it fails. */
export function AuthCard({ children, fields }: AuthCardProps) {
  return (
    <>
      <ClerkLoading>
        <AuthFormSkeleton fields={fields} />
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
      <ClerkFailed>
        <div
          role="alert"
          className="rounded-[28px] border border-red-100 bg-white p-7 text-center shadow-[0_30px_80px_-24px_rgba(16,29,54,0.22)]"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-extrabold text-ink">
            We couldn’t load secure sign-in
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Check your connection or disable content blockers, then try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-white transition-colors hover:bg-brand-strong"
          >
            <RefreshIcon className="h-4 w-4" />
            Reload page
          </button>
        </div>
      </ClerkFailed>
    </>
  );
}
