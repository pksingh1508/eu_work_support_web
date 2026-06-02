import type { Metadata } from "next";
import { app_policy } from "@/constant/app_policy";

export const metadata: Metadata = {
  title: `${app_policy.title} | EU Work Support`,
  description:
    "Privacy policy for the EU Work Support mobile application, including collected data, retention, deletion, and service providers.",
};

export default function AppPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-slate-900 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            {app_policy.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Last updated {app_policy.lastUpdated}
          </p>
        </header>

        <div className="mt-8 space-y-5">
          {app_policy.blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={`${block.type}-${index}`}
                    className="pt-5 text-2xl font-bold leading-snug"
                  >
                    {block.text}
                  </h2>
                );
              case "subheading":
                return (
                  <h3
                    key={`${block.type}-${index}`}
                    className="pt-2 text-xl font-semibold leading-snug"
                  >
                    {block.text}
                  </h3>
                );
              case "bullets":
                return (
                  <ul
                    key={`${block.type}-${index}`}
                    className="list-disc space-y-2 pl-6 text-base leading-7 text-slate-700"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              case "paragraph":
                return (
                  <p
                    key={`${block.type}-${index}`}
                    className="text-base leading-7 text-slate-700"
                  >
                    {block.text}
                  </p>
                );
            }
          })}
        </div>
      </article>
    </main>
  );
}
