import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal } from "@/components/motion/reveal";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import { PendingLink } from "@/components/ui/pending-link";
import { StoreButtons } from "./store-buttons";

export function CtaSection() {
  return (
    <section id="download" className="relative bg-surface px-5 pb-24 sm:px-8 lg:pb-32">
      <Reveal
        y={48}
        duration={0.9}
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-ink px-6 py-16 text-center text-white shadow-[0_40px_100px_-40px_rgba(16,29,54,0.6)] sm:px-12 lg:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.45),transparent)]" />
          <div className="absolute -bottom-48 -right-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.25),transparent)]" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(102,88,217,0.25),transparent)]" />
          <div className="dot-grid absolute inset-0 opacity-20" />
          <EuStarRing
            starSize={5}
            duration="120s"
            className="absolute left-1/2 top-1/2 w-[min(640px,150%)] -translate-x-1/2 -translate-y-1/2 animate-orbit text-gold/25"
          />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mint-light">
            Start today
          </p>
          <AnimatedHeading
            as="h2"
            className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-black leading-none tracking-[-0.055em] text-balance"
            text="Your European work journey, fully unlocked."
            highlight={["fully", "unlocked."]}
            highlightClassName="text-gradient-light animate-gradient-pan"
            delay={0.15}
          />
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Download EU Work Support, then unlock lifetime PRO with one secure
            $50 payment. No subscription, ever.
          </p>
          <div className="mt-9 flex flex-col items-center gap-5">
            <StoreButtons tone="light" className="justify-center" />
            <PendingLink
              href="/sign-up"
              className="group inline-flex items-center gap-2 text-sm font-bold text-mint-light transition-colors hover:text-white"
            >
              Already have the app? Get lifetime PRO
            </PendingLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
