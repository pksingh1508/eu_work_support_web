import Link from "next/link";
import { appName } from "./landing-content";

export function FinalCta() {
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[#45d19a]">
            Lifetime PRO access
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Unlock {appName} for a one-time $50 fee.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Create your website account, complete secure checkout, then return
            to the mobile app with the same email.
          </p>
        </div>

        <Link
          href="/sign-up"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-slate-950 transition hover:bg-[#d9f4e8] sm:w-auto"
        >
          Get PRO access
        </Link>
      </div>
    </section>
  );
}
