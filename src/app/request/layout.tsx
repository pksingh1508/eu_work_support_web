import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "EU Work Support Request",
    template: "%s | EU Work Support Request",
  },
  description:
    "Request access to the EU Work Support mobile application and view request-specific policy pages.",
};

export default function RequestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950">{children}</div>
  );
}
