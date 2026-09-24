import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { ProAccessView } from "@/components/checkout/pro-access-view";
import { PurchaseView } from "@/components/checkout/purchase-view";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { SiteFooter } from "@/components/site/site-footer";
import { SubpageHeader } from "@/components/site/subpage-header";
import { getAppUserForClerkAccount } from "@/lib/supabase/app-users";

export const metadata: Metadata = {
  title: "Checkout | EU Work Support",
};

export default async function CheckoutPage() {
  const { userId } = await auth.protect();
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    null;
  const appUser = await getAppUserForClerkAccount({ clerkUserId: userId, email });
  const isPro = appUser?.user_plan?.toUpperCase() === "PRO";
  const isSyncing = !appUser;

  return (
    <>
      <main className="relative min-h-screen bg-surface text-ink">
        <PageBackdrop />
        <SubpageHeader />
        <div className="relative mx-auto max-w-[1160px] px-5 pb-20 pt-8 sm:px-8 lg:pb-28 lg:pt-12">
          {isPro ? (
            <ProAccessView
              accountEmail={appUser?.email ?? email ?? "Your account email"}
            />
          ) : (
            <PurchaseView
              email={appUser?.email ?? email}
              currentPlan={appUser?.user_plan ?? null}
              isSyncing={isSyncing}
            />
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
