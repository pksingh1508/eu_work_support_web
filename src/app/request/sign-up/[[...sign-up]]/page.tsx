import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RequestSignUpPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/request/request-access");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="max-w-xl">
          <Link
            href="/request"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            EU Work Support
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Request access to the app.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create your account with email and password, complete the Clerk
            verification step, and we will place your request in the access
            queue.
          </p>
        </section>

        <section className="flex justify-center lg:justify-end">
          <SignUp
            fallbackRedirectUrl="/request/request-access"
            forceRedirectUrl="/request/request-access"
            path="/request/sign-up"
            routing="path"
            signInUrl="/request/sign-in"
            appearance={{
              elements: {
                card: "shadow-[0_28px_80px_-38px_rgba(15,23,42,0.55)] border border-slate-200 rounded-[2rem]",
                headerTitle: "text-slate-950",
                headerSubtitle: "text-slate-600",
                socialButtonsBlockButton:
                  "border-slate-200 text-slate-700 hover:bg-slate-50",
                formButtonPrimary:
                  "bg-slate-950 hover:bg-slate-800 text-white shadow-none",
                footerActionLink: "text-sky-700 hover:text-sky-800",
              },
            }}
          />
        </section>
      </div>
    </main>
  );
}
