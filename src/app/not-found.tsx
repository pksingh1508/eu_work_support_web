import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedHeading } from "@/components/motion/animated-words";
import { Reveal } from "@/components/motion/reveal";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { SubpageHeader } from "@/components/site/subpage-header";
import { EuStarRing } from "@/components/ui/eu-star-ring";
import { ArrowLeftIcon, MailIcon } from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Page not found | EU Work Support",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col bg-surface text-ink">
      <PageBackdrop />
      <SubpageHeader />
      <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center">
        <Reveal
          immediate
          scale={0.85}
          y={0}
          duration={0.9}
          className="relative flex h-48 w-48 items-center justify-center"
        >
          <EuStarRing
            starSize={7}
            duration="50s"
            className="absolute inset-0 animate-orbit text-gold"
          />
          <span className="text-gradient animate-gradient-pan text-6xl font-black tracking-[-0.06em]">
            404
          </span>
        </Reveal>
        <Reveal immediate delay={0.2} y={10}>
          <p className="section-kicker mt-8">Page not found</p>
        </Reveal>
        <AnimatedHeading
          as="h1"
          className="mt-4 text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.02] tracking-[-0.05em]"
          text="This page took a different route."
          highlight={["different"]}
          immediate
          delay={0.3}
        />
        <Reveal immediate delay={0.55} y={12}>
          <p className="mx-auto mt-5 max-w-md text-base leading-8 text-slate-600">
            The page you’re looking for doesn’t exist or has moved. Let’s get
            you back on track.
          </p>
        </Reveal>
        <Reveal
          immediate
          delay={0.65}
          y={12}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-base font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(16,29,54,0.7)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong"
          >
            <ArrowLeftIcon className="h-5 w-5 transition-transform duration-300 ease-smooth group-hover:-translate-x-0.5" />
            Back to home
          </Link>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white px-6 text-base font-bold text-ink transition-colors hover:border-ink/25"
          >
            <MailIcon className="h-5 w-5 text-brand" />
            Contact support
          </a>
        </Reveal>
      </div>
    </main>
  );
}
