import { AppShowcase } from "@/components/landing/app-showcase";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonial } from "@/components/landing/Testimonial";
import { WorkflowSection } from "@/components/landing/workflow-section";
import { SiteFooter } from "@/components/site/site-footer";
import { redirect } from "next/dist/client/components/navigation";

export default function Home() {
  return redirect("/request");
}

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white">
//       <SiteHeader />
//       <main>
//         <HeroSection />
//         <Testimonial />
//         <AppShowcase />
//         <PricingSection />
//         <WorkflowSection />
//         <FaqSection />
//       </main>
//       <SiteFooter />
//     </div>
//   )
// }
