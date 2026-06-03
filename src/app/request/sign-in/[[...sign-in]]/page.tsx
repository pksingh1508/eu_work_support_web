import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RequestSignInPage() {
  const { userId } = await auth();
  const mobileAppUrl = "euworksupport://";

  if (userId) {
    redirect("/request/request-access");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
      <div className="flex w-full max-w-6xl gap-10 items-center justify-center">
        <section className="max-w-xl">
          <Link
            href="/request"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mx-auto block text-center"
          >
            EU Work Support
          </Link>

          <div className="mt-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.45)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Account Access
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Already created your account?
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              If your account was created successfully, please try signing in to
              the EU Work Support app. If you are not able to access the app
              yet, please allow 2 to 3 working days while we review and enable
              your access.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We will notify you by email as soon as your access is ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={mobileAppUrl}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-[#f8fafc] transition hover:bg-slate-800"
              >
                Open EU Work Support app
              </a>
              <a
                href="/request/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-[#f8fafc] transition hover:bg-slate-800"
                style={{ color: "#f8fafc" }}
              >
                Back to Sign Up Form
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
