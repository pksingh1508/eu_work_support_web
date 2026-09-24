import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({ children, className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </StrokeIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M19 12H5m6 6-6-6 6-6" />
    </StrokeIcon>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </StrokeIcon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </StrokeIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </StrokeIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </StrokeIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </StrokeIcon>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </StrokeIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 5v14M5 12h14" />
    </StrokeIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth="2.6" {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </StrokeIcon>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </StrokeIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.1 7 9.5 4.1-1.4 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </StrokeIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </StrokeIcon>
  );
}

export function UserPlusIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5M19 8v6m3-3h-6" />
    </StrokeIcon>
  );
}

export function CreditCardIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </StrokeIcon>
  );
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </StrokeIcon>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2l-1.8-5.6-5.7-1.8L10.2 9 12 3.5Z" />
      <path d="M19 3v3m-1.5-1.5h3M5 17.5v3M3.5 19h3" />
    </StrokeIcon>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4" />
    </StrokeIcon>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5m0 3.5h.01" />
    </StrokeIcon>
  );
}

export function UndoIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </StrokeIcon>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Zm5-2v14m6-12v14" />
    </StrokeIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m20 20-4.2-4.2m2.2-5.3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </StrokeIcon>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 4.8C6 3.8 6.8 3 7.8 3h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.5L6 21V4.8Z" />
    </StrokeIcon>
  );
}

export function QuoteIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M9.6 5.5C6 6.9 3.5 9.9 3.5 14.1c0 2.7 1.6 4.4 3.8 4.4 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.2-3.1-3.3.3-1.7 1.7-3.3 3.6-4.2L9.6 5.5Zm9.5 0c-3.6 1.4-6.1 4.4-6.1 8.6 0 2.7 1.6 4.4 3.8 4.4 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.2-3.1-3.3.3-1.7 1.7-3.3 3.6-4.2l-1.7-2.1Z" />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="m12 2.8 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.6l-5.6 3.2 1.3-6.2L3 9.3l6.3-.7L12 2.8Z" />
    </svg>
  );
}
