import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRightIcon, ClockIcon, MailIcon } from "@/components/ui/icons";
import { supportEmail } from "@/lib/legal/content";

/** Prominent email call-to-action shown at the top of the Contact page. */
export function ContactCard() {
  return (
    <Reveal
      immediate
      delay={0.4}
      y={20}
      className="relative mb-6 overflow-hidden rounded-[28px] bg-ink p-6 text-white shadow-[0_30px_80px_-30px_rgba(16,29,54,0.6)] sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.5),transparent)]"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint text-ink">
            <MailIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-extrabold">Email our support team</p>
            <p className="mt-1 break-all text-sm text-slate-300">{supportEmail}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-mint-light">
              <ClockIcon className="h-3.5 w-3.5" />
              We aim to reply within 2 business days
            </p>
          </div>
        </div>
        <a
          href={`mailto:${supportEmail}`}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-extrabold text-ink transition-colors hover:bg-mint-soft"
        >
          Send an email
          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Reveal>
  );
}
