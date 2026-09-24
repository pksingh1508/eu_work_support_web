type AuthFormSkeletonProps = {
  /** Number of input fields to mimic (sign-in shows one, sign-up two). */
  fields?: number;
};

/** Placeholder shaped like the Clerk card, shown while the form loads. */
export function AuthFormSkeleton({ fields = 2 }: AuthFormSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full overflow-hidden rounded-[28px] border border-ink/[0.08] bg-white shadow-[0_30px_80px_-24px_rgba(16,29,54,0.22)]"
    >
      <span className="sr-only">Loading secure sign-in…</span>
      <div className="space-y-7 px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <div className="skeleton h-7 w-3/5 rounded-lg" />
          <div className="skeleton h-4 w-4/5 rounded-md" />
        </div>
        <div className="space-y-5">
          {Array.from({ length: fields }, (_, index) => (
            <div key={index} className="space-y-2">
              <div className="skeleton h-4 w-28 rounded-md" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="skeleton h-12 w-full rounded-xl bg-brand/15" />
      </div>
      <div className="border-t border-ink/[0.06] px-6 py-5">
        <div className="skeleton mx-auto h-4 w-1/2 rounded-md" />
      </div>
      <div className="border-t border-ink/[0.06] px-6 py-5">
        <div className="skeleton mx-auto h-4 w-1/4 rounded-md" />
      </div>
    </div>
  );
}
