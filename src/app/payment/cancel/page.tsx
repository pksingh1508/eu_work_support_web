import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] px-5 py-10 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <Link href="/" className="text-lg font-bold text-slate-950">
          EU Work Support
        </Link>

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Checkout canceled
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950">
            No payment was taken.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            You can return to checkout whenever you are ready to unlock lifetime
            PRO access.
          </p>
          <Link
            href="/checkout"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0069c9] px-6 text-base font-semibold text-white transition hover:bg-[#0058aa]"
          >
            Try checkout again
          </Link>
        </div>
      </section>
    </main>
  );
}
