import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RequestAccessPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/request/sign-up");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
      <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.45)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Request Received
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Hello, your account was created successfully.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          We will grant you access in 2 to 3 working days. We will also notify
          you by email once your access is ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/request"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-[#f8fafc] transition hover:bg-slate-800"
            style={{ color: "#f8fafc" }}
          >
            Back to Home
          </Link>
          <p className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm text-slate-600">
            We will notify you by email.
          </p>
        </div>
      </section>
    </main>
  );
}
