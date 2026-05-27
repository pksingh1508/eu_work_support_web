import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site/site-footer";
import { refundPolicy } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | EU Work Support",
  description: refundPolicy.description,
};

export default function RefundAndCancellationPolicyPage() {
  return (
    <>
      <LegalPage content={refundPolicy} />
      <SiteFooter />
    </>
  );
}
