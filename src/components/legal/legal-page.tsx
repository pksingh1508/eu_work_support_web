import Link from "next/link";
import type { LegalPageContent } from "@/lib/legal/content";
import { lastUpdated, supportEmail } from "@/lib/legal/content";

type LegalPageProps = {
  content: LegalPageContent;
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <main className="bg-[#f6f8fc] px-5 py-12 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-[#0069c9]">
          Back to EU Work Support
        </Link>

        <header className="mt-8 rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Last updated {lastUpdated}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {content.description}
          </p>
        </header>

        <div className="mt-6 space-y-5">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#0069c9]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="mt-6 rounded-lg border border-slate-200 bg-white p-7 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
          This page is provided for transparency about EU Work Support policies.
          For questions, contact{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="font-semibold text-[#0069c9] hover:text-[#0058aa]"
          >
            {supportEmail}
          </a>
          .
        </footer>
      </article>
    </main>
  );
}
