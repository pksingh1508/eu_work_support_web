import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site/site-footer";
import { privacyPolicy } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Privacy Policy | EU Work Support",
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage content={privacyPolicy} />
      <SiteFooter />
    </>
  );
}
