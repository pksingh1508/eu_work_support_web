import Image from "next/image";

type PhoneFrameProps = {
  alt: string;
  className?: string;
  eager?: boolean;
  label?: string;
  src: string;
  darkLabel?: boolean;
};

export function PhoneFrame({
  alt,
  className = "",
  eager = false,
  label,
  src,
  darkLabel = false,
}: PhoneFrameProps) {
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-[30px] border border-white/15 bg-[#081225] p-2 shadow-[0_28px_70px_rgba(4,10,24,0.28)] ring-1 ring-[#101d36]/10">
        <div className="overflow-hidden rounded-[22px] bg-white">
          <Image
            src={src}
            alt={alt}
            width={1260}
            height={2800}
            className="h-auto w-full"
            loading={eager ? undefined : "lazy"}
            preload={eager ? true : undefined}
            sizes="(max-width: 768px) 62vw, 280px"
          />
        </div>
      </div>
      {label ? (
        <figcaption className={`mt-3 text-center text-sm font-semibold ${darkLabel ? "text-slate-300" : "text-slate-500"}`}>
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
