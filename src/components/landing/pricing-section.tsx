import Link from "next/link";
import { pricingPlans } from "./landing-content";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#f6f8fc] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Simple pricing
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Free is limited. PRO unlocks everything.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Pay once on the website and keep lifetime access in the mobile app.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-lg border p-7 ${
                plan.featured
                  ? "border-[#0069c9] bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                  : "border-slate-200 bg-white text-slate-950"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p
                    className={`mt-2 leading-7 ${
                      plan.featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
                {plan.featured ? (
                  <span className="rounded-lg bg-[#d9f4e8] px-3 py-2 text-sm font-bold text-[#074d35]">
                    Best value
                  </span>
                ) : null}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.featured ? (
                  <span className="pb-2 text-slate-300">one-time</span>
                ) : null}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-6">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                        plan.featured ? "bg-[#45d19a]" : "bg-slate-400"
                      }`}
                    />
                    <span className={plan.featured ? "text-slate-100" : "text-slate-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 text-base font-semibold transition ${
                  plan.featured
                    ? "bg-white text-slate-950 hover:bg-[#d9f4e8]"
                    : "border border-slate-300 bg-white text-slate-950 hover:border-slate-950"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
