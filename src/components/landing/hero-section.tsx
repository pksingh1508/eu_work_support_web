import Link from "next/link";
import { appName } from "./landing-content";
import { PhoneFrame } from "./phone-frame";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f8fc]">
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] bg-white lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:py-24">
        <div className="w-full max-w-[calc(100vw-40px)] min-w-0 sm:max-w-3xl">
          <p className="mb-5 inline-flex rounded-lg border border-[#0069c9]/20 bg-white px-3 py-2 text-sm font-semibold text-[#0069c9]">
            Built for people planning work in Europe
          </p>
          <h1 className="max-w-[11ch] text-4xl font-bold leading-[1.08] text-slate-950 sm:max-w-4xl sm:text-6xl lg:text-7xl">
            {appName}
          </h1>
          <p className="mt-7 max-w-[340px] text-lg leading-8 text-slate-600 sm:max-w-2xl sm:text-xl">
            Country guides, document lists, saved references, and support for
            your European work journey. Pay securely on the website, then log
            in to the mobile app with the same email to unlock PRO.
          </p>

          <div className="mt-9 flex max-w-[340px] flex-col gap-3 sm:max-w-none sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0069c9] px-6 text-base font-semibold text-white transition hover:bg-[#0058aa] sm:w-auto"
            >
              Unlock PRO for $50
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-base font-semibold text-slate-950 transition hover:border-slate-950 sm:w-auto"
            >
              See how it works
            </a>
          </div>

          <dl className="mt-10 hidden max-w-xl grid-cols-3 gap-3 text-sm sm:grid">
            {[
              ["$50", "one-time fee"],
              ["Lifetime", "PRO access"],
              ["Stripe", "secure checkout"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-lg border border-slate-200 bg-white p-4">
                <dt className="font-bold text-slate-950">{value}</dt>
                <dd className="mt-1 text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto h-[470px] w-full max-w-[520px] min-w-0 sm:h-[560px] lg:h-[620px]">
          <PhoneFrame
            src="/assets/home.jpg"
            alt="EU Work Support home screen"
            eager
            className="absolute left-1/2 top-0 w-[220px] -translate-x-1/2 sm:w-[255px] lg:left-[46%] lg:w-[285px]"
          />
          <PhoneFrame
            src="/assets/search.jpg"
            alt="EU Work Support search results screen"
            className="absolute left-2 top-24 w-[170px] rotate-[-5deg] sm:left-3 sm:w-[205px] lg:left-0 lg:top-28 lg:w-[230px]"
          />
          <PhoneFrame
            src="/assets/single_country.jpg"
            alt="EU Work Support country detail screen"
            className="absolute right-0 top-28 w-[175px] rotate-[5deg] sm:w-[210px] lg:top-[8.5rem] lg:w-[235px]"
          />
        </div>
      </div>
    </section>
  );
}
