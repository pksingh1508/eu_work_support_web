import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";
import { clerkAppearance } from "@/components/auth/clerk-appearance";

type SignInPageProps = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in before continuing to payment."
      subtitle="Your payment will upgrade the Clerk account connected to this email, so the mobile app can unlock PRO after you log in."
    >
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/checkout"
        forceRedirectUrl="/checkout"
        initialValues={email ? { emailAddress: email } : undefined}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </AuthShell>
  );
}
