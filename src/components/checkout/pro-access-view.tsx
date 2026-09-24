import Link from "next/link";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { appStoreUrl, playStoreUrl } from "@/components/landing/landing-content";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";
import { AnimatedCheck } from "./animated-check";

type ProAccessViewProps = {
  accountEmail: string;
};

const unlockedFeatures = [
  "All country and document guides",
  "Every app page and available data",
  "Saved resources across your journey",
  "EU Work Support assistance",
];

const accessDetails = [
  ["Status", "Active"],
  ["Renewal", "None"],
  ["Amount due", "$0"],
];

export function ProAccessView({ accountEmail }: ProAccessViewProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
      <Reveal
        immediate
        y={32}
        className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-white shadow-[0_32px_90px_rgba(16,29,54,.22)] sm:p-10 lg:p-12"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.5),transparent)]" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.2),transparent)]" />
          <EuStarRing
            starSize={5}
            duration="120s"
            className="absolute -right-40 -top-40 w-[320px] animate-orbit text-gold/25"
          />
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-4">
            <AnimatedCheck className="h-14 w-14" />
            <div className="inline-flex items-center gap-2 rounded-full border border-mint-light/20 bg-mint/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-mint-light">
              PRO access active
            </div>
          </div>
          <AnimatedHeading
            as="h1"
            className="mt-7 max-w-[11ch] text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-5xl xl:text-6xl"
            text="You're already PRO."
            highlight={["PRO."]}
            highlightClassName="text-gradient-light animate-gradient-pan"
            immediate
            delay={0.2}
          />
          <Reveal immediate delay={0.45} y={14}>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Your lifetime access is active on this account. There is nothing
              else to purchase, and you will never be charged a renewal fee.
            </p>
          </Reveal>

          <Reveal
            immediate
            delay={0.55}
            y={14}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Connected account
            </p>
            <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">
              {accountEmail}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Use this same email when signing in to the mobile app.
            </p>
          </Reveal>

          <Reveal
            immediate
            delay={0.65}
            y={14}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {[
              { href: playStoreUrl, label: "Open Android app" },
              { href: appStoreUrl, label: "Open iOS app" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-mint px-6 text-sm font-extrabold text-ink shadow-[0_14px_30px_-12px_rgba(91,214,172,0.7)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-mint-light"
              >
                {link.label}
                <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            <Link
              href="/"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Explore the website
            </Link>
          </Reveal>
        </div>
      </Reveal>

      <Reveal
        immediate
        delay={0.15}
        y={32}
        as="aside"
        className="rounded-[32px] border border-ink/[0.08] bg-white p-7 shadow-[0_22px_70px_rgba(16,29,54,.08)] sm:p-9 lg:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-strong">
              Your access
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-ink">
              Lifetime PRO
            </h2>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-soft text-mint-deep">
            <CheckIcon className="h-7 w-7" />
          </span>
        </div>

        <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-surface px-5">
          {accessDetails.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-5 py-4 text-sm">
              <dt className="font-medium text-slate-500">{label}</dt>
              <dd
                className={`font-extrabold ${label === "Status" ? "inline-flex items-center gap-2 text-mint-deep" : "text-ink"}`}
              >
                {label === "Status" ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-deep" />
                  </span>
                ) : null}
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
            Everything unlocked
          </h3>
          <RevealGroup as="ul" immediate delay={0.4} stagger={0.08} className="mt-5 space-y-4">
            {unlockedFeatures.map((feature) => (
              <RevealItem
                as="li"
                key={feature}
                x={-12}
                y={0}
                className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {feature}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-9 border-t border-slate-100 pt-6">
          <p className="text-sm leading-6 text-slate-500">
            Need help accessing PRO in the app?{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-bold text-brand-strong hover:text-brand-deep"
            >
              Contact support
            </a>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
