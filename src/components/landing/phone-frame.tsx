import Image from "next/image";

type PhoneFrameProps = {
  alt: string;
  className?: string;
  eager?: boolean;
  label?: string;
  src: string;
};

export function PhoneFrame({
  alt,
  className = "",
  eager = false,
  label,
  src,
}: PhoneFrameProps) {
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
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
        <figcaption className="mt-3 text-center text-sm font-semibold text-slate-500">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
