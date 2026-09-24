import type { Metadata } from "next";
import { DocumentShell, MetaChip } from "@/components/legal/document-shell";
import { slugify } from "@/components/legal/slugify";
import { Reveal } from "@/components/motion/reveal";
import { CalendarIcon, CheckIcon, SmartphoneIcon } from "@/components/ui/icons";
import { app_policy } from "@/constant/app_policy";

export const metadata: Metadata = {
  title: `${app_policy.title} | EU Work Support`,
  description:
    "Privacy policy for the EU Work Support mobile application, including collected data, retention, deletion, and service providers.",
};

type PolicyBlock = (typeof app_policy.blocks)[number];
type ContentBlock = Exclude<PolicyBlock, { type: "heading" }>;

function groupBlocks(blocks: readonly PolicyBlock[]) {
  const intro: ContentBlock[] = [];
  const sections: { id: string; title: string; blocks: ContentBlock[] }[] = [];

  for (const block of blocks) {
    if (block.type === "heading") {
      sections.push({ id: slugify(block.text), title: block.text, blocks: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].blocks.push(block);
    } else {
      intro.push(block);
    }
  }

  return { intro, sections };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "subheading":
      return (
        <h3
          key={`${block.type}-${index}`}
          className="pt-2 text-lg font-extrabold tracking-[-0.02em] text-ink"
        >
          {block.text}
        </h3>
      );
    case "bullets":
      return (
        <ul key={`${block.type}-${index}`} className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "paragraph":
      return <p key={`${block.type}-${index}`}>{block.text}</p>;
  }
}

export default function AppPrivacyPolicyPage() {
  const { intro, sections } = groupBlocks(app_policy.blocks);

  return (
    <DocumentShell
      standalone
      eyebrow="Mobile app"
      title={app_policy.title}
      meta={
        <>
          <MetaChip icon={<CalendarIcon className="h-3.5 w-3.5" />}>
            Last updated {app_policy.lastUpdated}
          </MetaChip>
          <MetaChip icon={<SmartphoneIcon className="h-3.5 w-3.5" />}>
            EU Work Support app
          </MetaChip>
        </>
      }
      toc={sections.map(({ id, title }) => ({ id, title }))}
    >
      {intro.length > 0 ? (
        <Reveal
          immediate
          delay={0.4}
          y={20}
          className="mb-4 space-y-4 rounded-[26px] border border-brand/15 bg-brand-soft/50 p-6 text-[15px] leading-8 text-slate-700 sm:p-8 sm:text-base"
        >
          {intro.map(renderBlock)}
        </Reveal>
      ) : null}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Reveal
            as="section"
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            y={24}
            amount={0.05}
            className="rounded-[26px] border border-ink/[0.07] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(16,29,54,0.3)] sm:p-8"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="mt-1 hidden w-7 shrink-0 text-sm font-black tabular-nums text-brand/50 sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id={`${section.id}-title`}
                  className="text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600 sm:text-base">
                  {section.blocks.map(renderBlock)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DocumentShell>
  );
}
