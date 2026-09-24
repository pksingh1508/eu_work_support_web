"use client";

import Link, { useLinkStatus } from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "./icons";
import { Spinner } from "./spinner";

type PendingLinkProps = ComponentProps<typeof Link> & {
  icon?: ReactNode;
  iconClassName?: string;
};

/**
 * A Next.js Link whose trailing icon turns into a spinner while the
 * destination route is loading, so slow navigations still feel responsive.
 */
export function PendingLink({
  children,
  icon,
  iconClassName = "h-4 w-4",
  ...props
}: PendingLinkProps) {
  return (
    <Link {...props}>
      {children}
      <LinkStatusIcon
        icon={icon ?? <ArrowRightIcon className={iconClassName} />}
        iconClassName={iconClassName}
      />
    </Link>
  );
}

function LinkStatusIcon({
  icon,
  iconClassName,
}: {
  icon: ReactNode;
  iconClassName: string;
}) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center ${iconClassName}`}
    >
      <span
        className={`absolute inset-0 inline-flex items-center justify-center transition duration-200 ease-smooth group-hover:translate-x-0.5 ${
          pending ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {icon}
      </span>
      <span
        className={`absolute inset-0 inline-flex items-center justify-center transition duration-200 ease-smooth ${
          pending ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <Spinner className={iconClassName} />
      </span>
    </span>
  );
}
