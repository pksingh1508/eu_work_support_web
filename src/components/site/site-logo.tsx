import Image from "next/image";
import Link from "next/link";
import { appName } from "@/components/landing/landing-content";

type SiteLogoProps = {
  tone?: "dark" | "light";
  /** Pass `null` to render the brand mark without a link. */
  href?: string | null;
  className?: string;
};

export function SiteLogo({
  tone = "dark",
  href = "/",
  className = "",
}: SiteLogoProps) {
  const classes = `group inline-flex min-w-0 items-center gap-3 ${
    tone === "light" ? "text-white" : "text-ink"
  } ${className}`;
  const mark = (
    <>
      <span className="relative flex h-10 w-10 shrink-0 rounded-full shadow-[0_8px_22px_rgba(57,121,232,0.3)] transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-105">
        <Image
          src="/assets/logo.png"
          alt=""
          width={40}
          height={40}
          loading="eager"
        />
      </span>
      <span className="truncate text-[15px] font-extrabold tracking-[-0.02em] sm:text-base">
        {appName}
      </span>
    </>
  );

  if (href === null) return <span className={classes}>{mark}</span>;

  return (
    <Link href={href} className={classes}>
      {mark}
    </Link>
  );
}
