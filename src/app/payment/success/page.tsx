import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    already_pro?: string;
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const alreadyPro = params.already_pro === "1";

  return (
    <>
      <main className="min-h-screen bg-[#f6f8fc] px-5 py-10 sm:px-8">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
          <Link href="/" className="text-lg font-bold text-slate-950">
            EU Work Support
          </Link>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase text-[#0069c9]">
              {alreadyPro ? "PRO active" : "Payment received"}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950">
              {alreadyPro
                ? "Your account already has lifetime PRO access."
                : "Thanks. Stripe has completed your checkout."}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {alreadyPro
                ? "Return to the mobile app and log in with the same email to access PRO content."
                : "Your payment is being verified by Stripe. Once the webhook finishes, return to the mobile app and log in with the same email to access PRO content."}
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0069c9] px-6 text-base font-semibold text-white transition hover:bg-[#0058aa]"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
