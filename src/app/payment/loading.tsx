import { PageBackdrop } from "@/components/site/page-backdrop";
import { SubpageHeader } from "@/components/site/subpage-header";

export default function PaymentLoading() {
  return (
    <main className="relative min-h-screen bg-surface">
      <PageBackdrop />
      <SubpageHeader />
      <div
        role="status"
        aria-live="polite"
        className="relative mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 lg:pt-16"
      >
        <span className="sr-only">Loading your payment status…</span>
        <div className="flex flex-col items-center rounded-[36px] border border-ink/[0.08] bg-white px-6 py-12 shadow-[0_40px_100px_-40px_rgba(16,29,54,0.35)] sm:px-12">
          <div className="skeleton h-20 w-20 rounded-full" />
          <div className="skeleton mt-7 h-3 w-32 rounded-md" />
          <div className="skeleton mt-5 h-10 w-4/5 rounded-xl" />
          <div className="skeleton mt-3 h-10 w-3/5 rounded-xl" />
          <div className="skeleton mt-6 h-4 w-2/3 rounded-md" />
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row">
            <div className="skeleton h-13 w-full rounded-2xl sm:w-56" />
            <div className="skeleton h-13 w-full rounded-2xl sm:w-40" />
          </div>
        </div>
      </div>
    </main>
  );
}
