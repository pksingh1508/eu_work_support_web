import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { appName } from "@/components/landing/landing-content";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function AuthShell({
  children,
  eyebrow,
  title,
  subtitle,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-[#101d36]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40 lg:hidden" />
      <div className="grid min-h-screen lg:grid-cols-[0.94fr_1.06fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#0b162c] px-10 py-10 text-white lg:flex xl:px-16 xl:py-12">
          <div className="absolute -left-40 top-[32%] h-[430px] w-[430px] rounded-full bg-[#5bd6ac]/20 blur-[100px]" />
          <div className="absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[#3979e8]/30 blur-[115px]" />
          <div className="auth-dots absolute inset-0 opacity-25" />

          <div className="relative z-10 flex w-full flex-col">
            <Link href="/" className="inline-flex w-fit items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] bg-[#3979e8] text-sm font-black shadow-[0_10px_28px_rgba(57,121,232,.35)]">
                <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#5bd6ac]" />
                <span className="relative">EU</span>
              </span>
              <span className="font-extrabold tracking-[-0.02em]">{appName}</span>
            </Link>

            <div className="my-auto grid items-center gap-10 xl:grid-cols-[1fr_0.8fr]">
              <div className="max-w-xl py-12">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#78e0be]">
                  {eyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(2.65rem,4vw,4.6rem)] font-black leading-[0.96] tracking-[-0.06em] text-white">
                  {title}
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
                  {subtitle}
                </p>

                <ul className="mt-8 space-y-3 text-sm font-semibold text-slate-200">
                  {[
                    "Use the same email as your mobile app",
                    "Secure account and Stripe checkout",
                    "One payment for lifetime PRO access",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5bd6ac]/15 text-xs font-black text-[#78e0be]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative hidden h-[520px] xl:block">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] overflow-hidden rounded-[38px] border-[9px] border-[#081225] bg-[#081225] shadow-[0_38px_90px_rgba(0,0,0,.42)] ring-1 ring-white/15">
                  <div className="relative h-full w-full overflow-hidden rounded-[29px] bg-white">
                    <Image
                      src="/assets/home.jpg"
                      alt="EU Work Support mobile app home screen"
                      fill
                      className="object-cover"
                      sizes="260px"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute bottom-[15%] left-[-10%] rounded-2xl border border-white/10 bg-white/10 p-3.5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5bd6ac]/20 text-[#78e0be]">✓</span>
                    <span>
                      <b className="block text-xs">Access connected</b>
                      <span className="text-[11px] text-slate-300">Web to mobile</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              General guidance for European work preparation.
            </p>
          </div>
        </section>

        <section className="relative flex min-h-screen min-w-0 flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-20">
          <div className="absolute -right-44 -top-44 h-[400px] w-[400px] rounded-full bg-[#3979e8]/10 blur-[90px]" />
          <div className="relative z-10 flex items-center justify-between lg:justify-end">
            <Link href="/" className="inline-flex items-center gap-2.5 lg:hidden">
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[13px] bg-[#3979e8] text-xs font-black text-white shadow-[0_8px_22px_rgba(57,121,232,.3)]">
                <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#5bd6ac]" />
                <span className="relative">EU</span>
              </span>
              <span className="text-sm font-extrabold">{appName}</span>
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-[#245fc7]">
              <span aria-hidden="true">←</span> Back to home
            </Link>
          </div>

          <div className="relative z-10 my-auto flex w-full justify-center py-9 lg:py-12">
            <div className="w-full max-w-[460px]">
              <div className="mb-7 lg:hidden">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#245fc7]">{eyebrow}</p>
                <h1 className="mt-3 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#101d36]">{title}</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>
              </div>
              {children}
              <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                </svg>
                Secure authentication powered by Clerk
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
