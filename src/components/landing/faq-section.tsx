import { faqs } from "./landing-content";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#f6f8fc] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Common questions
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Clear answers before checkout.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
