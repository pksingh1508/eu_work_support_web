import { PageBackdrop } from "@/components/site/page-backdrop";
import { SubpageHeader } from "@/components/site/subpage-header";

export default function CheckoutLoading() {
  return (
    <main className="relative min-h-screen bg-surface">
      <PageBackdrop />
      <SubpageHeader />
      <div
        role="status"
        aria-live="polite"
        className="relative mx-auto max-w-[1160px] px-5 pb-20 pt-8 sm:px-8 lg:pt-12"
      >
        <span className="sr-only">Loading your checkout…</span>
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((step) => (
            <div key={step} className="flex flex-1 items-center gap-3 last:flex-none">
              <div className="skeleton h-8 w-8 rounded-full" />
              <div className="skeleton hidden h-4 w-28 rounded-md sm:block" />
              {step < 2 ? <div className="skeleton h-0.5 flex-1 rounded-full" /> : null}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-12">
          <div className="space-y-6">
            <div className="skeleton h-4 w-32 rounded-md" />
            <div className="space-y-3">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-4/5 rounded-xl" />
              <div className="skeleton h-12 w-3/5 rounded-xl" />
            </div>
            <div className="space-y-2.5">
              <div className="skeleton h-4 w-full rounded-md" />
              <div className="skeleton h-4 w-2/3 rounded-md" />
            </div>
            <div className="rounded-[28px] border border-ink/[0.08] bg-white/80 p-6 sm:p-8">
              <div className="skeleton h-3 w-40 rounded-md" />
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div key={item} className="skeleton h-12 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-ink/[0.08] bg-white shadow-[0_30px_80px_-30px_rgba(16,29,54,0.35)]">
            <div className="space-y-5 bg-ink px-6 py-7 sm:px-8">
              <div className="skeleton-dark h-3 w-28 rounded-md" />
              <div className="flex items-center gap-4">
                <div className="skeleton-dark h-14 w-14 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton-dark h-4 w-2/3 rounded-md" />
                  <div className="skeleton-dark h-3 w-1/3 rounded-md" />
                </div>
              </div>
            </div>
            <div className="space-y-4 px-6 py-7 sm:px-8">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="flex justify-between gap-4">
                  <div className="skeleton h-4 w-24 rounded-md" />
                  <div className="skeleton h-4 w-20 rounded-md" />
                </div>
              ))}
              <div className="my-6! border-t border-dashed border-ink/15" />
              <div className="flex items-end justify-between">
                <div className="skeleton h-5 w-32 rounded-md" />
                <div className="skeleton h-9 w-20 rounded-lg" />
              </div>
              <div className="skeleton mt-6! h-14 w-full rounded-2xl" />
              <div className="skeleton h-16 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
