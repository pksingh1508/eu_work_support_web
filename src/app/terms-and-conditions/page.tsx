import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site/site-footer";
import { termsAndConditions } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Terms & Conditions | EU Work Support",
  description: termsAndConditions.description,
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <LegalPage content={termsAndConditions} />
      <SiteFooter />
    </>
  );
}
