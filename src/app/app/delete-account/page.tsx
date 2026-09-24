import type { Metadata } from "next";
import { DocumentShell } from "@/components/legal/document-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ClockIcon, MailIcon, SmartphoneIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Account Deletion Request | EU Work Support",
  description:
    "Instructions for requesting deletion of an EU Work Support account and its associated data.",
};

const deletionSteps = [
  "Open the EU Work Support app",
  "Go to Profile",
  "Tap Delete Account",
];

const deletedData = [
  "Account information",
  "Email address",
  "Profile data",
  "Saved content",
  "App usage data linked to your account",
];

export default function DeleteAccountPage() {
  return (
    <DocumentShell
      standalone
      eyebrow="Mobile app"
      title="Account Deletion Request - EU Work Support"
      description="EU Work Support allows users to request deletion of their account and associated data."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Reveal
          as="section"
          immediate
          delay={0.3}
          y={24}
          aria-labelledby="delete-in-app"
          className="rounded-[26px] border border-ink/[0.07] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(16,29,54,0.3)] sm:p-8"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <SmartphoneIcon className="h-5 w-5" />
          </span>
          <h2
            id="delete-in-app"
            className="mt-5 text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl"
          >
            To delete your account
          </h2>
          <RevealGroup as="ol" immediate delay={0.45} stagger={0.1} className="mt-5 space-y-3">
            {deletionSteps.map((step, index) => (
              <RevealItem
                as="li"
                key={step}
                x={-12}
                y={0}
                className="flex items-center gap-3.5 rounded-2xl bg-surface-tint/80 px-4 py-3.5 font-semibold text-slate-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                  {index + 1}
                </span>
                {step}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          as="section"
          immediate
          delay={0.4}
          y={24}
          aria-labelledby="deleted-data"
          className="rounded-[26px] border border-ink/[0.07] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(16,29,54,0.3)] sm:p-8"
        >
          <h2
            id="deleted-data"
            className="text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl"
          >
            Data deleted
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-7 text-slate-600 sm:text-base">
            {deletedData.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-mint/30 bg-mint-soft/60 p-4">
            <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-mint-deep" />
            <div>
              <h3 className="font-extrabold text-ink">Deletion timeline</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                We process account deletion requests within 7-30 working days.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal
        immediate
        delay={0.55}
        y={20}
        className="mt-4 flex flex-col gap-5 rounded-[26px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <p className="max-w-xl text-sm leading-7 text-slate-300">
          If you no longer have access to the app, you can request deletion by
          emailing us at{" "}
          <a
            className="font-semibold text-white underline decoration-mint decoration-2 underline-offset-4"
            href="mailto:office@euworksupport.eu"
          >
            office@euworksupport.eu
          </a>{" "}
          with your registered email address.
        </p>
        <a
          href="mailto:office@euworksupport.eu"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-mint px-5 text-sm font-extrabold text-ink transition-colors hover:bg-mint-light"
        >
          <MailIcon className="h-4 w-4" />
          Email deletion request
        </a>
      </Reveal>
    </DocumentShell>
  );
}
