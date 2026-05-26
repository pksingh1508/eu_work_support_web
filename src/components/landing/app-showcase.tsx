import { appScreens, featureHighlights } from "./landing-content";
import { PhoneFrame } from "./phone-frame";

export function AppShowcase() {
  return (
    <section id="features" className="bg-white px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            What PRO unlocks
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            The important work details in one mobile place.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            EU Work Support is built around the screens people actually use:
            home discovery, search, saved guides, and country-level details.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-7">
          {appScreens.map((screen, index) => (
            <PhoneFrame
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              label={screen.label}
              className={index % 2 === 1 ? "md:mt-10" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
