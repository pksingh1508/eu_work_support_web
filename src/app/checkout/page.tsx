import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CheckoutPage() {
  const { userId } = await auth.protect();

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-5 py-10 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <Link href="/" className="text-lg font-bold text-slate-950">
          EU Work Support
        </Link>

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            Account ready
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950">
            Checkout comes next.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            You are signed in with Clerk. Phase 5 will replace this page with
            the Stripe Checkout session that upgrades this user to PRO.
          </p>
          <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Clerk user ID: <span className="font-mono text-slate-950">{userId}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
