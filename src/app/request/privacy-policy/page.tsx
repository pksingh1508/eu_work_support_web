import type { Metadata } from "next";
import { app_policy } from "@/constant/app_policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EU Work Support app privacy policy.",
};

type PolicyBlock = (typeof app_policy.blocks)[number];

function renderBlock(block: PolicyBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={`${block.type}-${index}`}
          className="mt-10 text-2xl font-semibold tracking-tight text-slate-950"
        >
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3
          key={`${block.type}-${index}`}
          className="mt-7 text-lg font-semibold text-slate-900"
        >
          {block.text}
        </h3>
      );

    case "bullets":
      return (
        <ul
          key={`${block.type}-${index}`}
          className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-600 marker:text-slate-400"
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
          className="mt-4 text-base leading-8 text-slate-600"
        >
          {block.text}
        </p>
      );

    default:
      return null;
  }
}

export default function RequestPrivacyPolicyPage() {
  return (
    <main className="px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.18)] sm:p-10 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {app_policy.title}
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Last updated: {app_policy.lastUpdated}
        </p>

        <div className="mt-8">
          {app_policy.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </main>
  );
}
