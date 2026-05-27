import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site/site-footer";
import { contactUs } from "@/lib/legal/content";

export const metadata: Metadata = {
  title: "Contact Us | EU Work Support",
  description: contactUs.description,
};

export default function ContactUsPage() {
  return (
    <>
      <LegalPage content={contactUs} />
      <SiteFooter />
    </>
  );
}
