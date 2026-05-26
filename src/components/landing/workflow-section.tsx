import { workflowSteps } from "./landing-content";

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="bg-white px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Web payment flow
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            From the mobile app to PRO access in four steps.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The website handles account creation and payment. The mobile app
            uses the same email to recognize your upgraded plan.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-slate-200 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2ff] text-sm font-bold text-[#0069c9]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
