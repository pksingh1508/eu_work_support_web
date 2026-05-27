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

export function AuthShell({ children, eyebrow, title, subtitle }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
        <section className="order-2 min-w-0 lg:order-1">
          <Link href="/" className="text-lg font-bold text-slate-950">
            {appName}
          </Link>
          <div className="mt-10 max-w-xl">
            <p className="text-sm font-semibold uppercase text-[#0069c9]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{subtitle}</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white p-4">
            <div className="relative mx-auto aspect-[9/18] max-h-[520px] w-full max-w-[260px] overflow-hidden rounded-[2rem] border-[10px] border-slate-950 bg-slate-950 shadow-2xl">
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
        </section>

        <section className="order-1 flex min-w-0 justify-center lg:order-2">
          {children}
        </section>
      </div>
    </main>
  );
}
