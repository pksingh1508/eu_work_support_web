import Image from "next/image";

type PhoneFrameProps = {
  alt: string;
  className?: string;
  eager?: boolean;
  label?: string;
  src: string;
  darkLabel?: boolean;
  sizes?: string;
};

export function PhoneFrame({
  alt,
  className = "",
  eager = false,
  label,
  src,
  darkLabel = false,
  sizes = "(max-width: 768px) 62vw, 280px",
}: PhoneFrameProps) {
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-[30px] border border-white/15 bg-[#081225] p-2 shadow-[0_28px_70px_rgba(4,10,24,0.28)] ring-1 ring-ink/10">
        {/* The shimmer shows through until the screenshot has loaded. */}
        <div className="skeleton relative overflow-hidden rounded-[22px]">
          <Image
            src={src}
            alt={alt}
            width={1260}
            height={2800}
            className="h-auto w-full"
            loading={eager ? undefined : "lazy"}
            preload={eager ? true : undefined}
            sizes={sizes}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent" />
        </div>
      </div>
      {label ? (
        <figcaption
          className={`mt-3 text-center text-sm font-semibold ${darkLabel ? "text-slate-300" : "text-slate-500"}`}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
