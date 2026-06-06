import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Deletion Request | EU Work Support",
  description:
    "Instructions for requesting deletion of an EU Work Support account and its associated data.",
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-slate-900 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Account Deletion Request - EU Work Support
          </h1>
        </header>

        <div className="mt-8 space-y-5 text-base leading-7 text-slate-700">
          <p>
            EU Work Support allows users to request deletion of their account
            and associated data.
          </p>

          <section className="space-y-3">
            <h2 className="pt-5 text-2xl font-bold leading-snug text-slate-900">
              To delete your account
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Open the EU Work Support app</li>
              <li>Go to Profile</li>
              <li>Tap Delete Account</li>
            </ol>
          </section>

          <p>
            If you no longer have access to the app, you can request deletion
            by emailing us at{" "}
            <a
              className="font-medium text-blue-700 underline underline-offset-2"
              href="mailto:office@euworksupport.eu"
            >
              office@euworksupport.eu
            </a>{" "}
            with your registered email address.
          </p>

          <section className="space-y-3">
            <h2 className="pt-5 text-2xl font-bold leading-snug text-slate-900">
              Data deleted
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Account information</li>
              <li>Email address</li>
              <li>Profile data</li>
              <li>Saved content</li>
              <li>App usage data linked to your account</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="pt-5 text-2xl font-bold leading-snug text-slate-900">
              Deletion timeline
            </h2>
            <p>We process account deletion requests within 7-30 working days.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
