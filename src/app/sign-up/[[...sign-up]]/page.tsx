import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";
import { clerkAppearance } from "@/components/auth/clerk-appearance";

type SignUpPageProps = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return (
    <AuthShell
      eyebrow="Join EU Work Support"
      title="Create your account. Start with clarity."
      subtitle="Use the same email as the mobile app. After your account is verified, we’ll take you directly to secure checkout."
    >
      <SignUp
        appearance={clerkAppearance}
        fallbackRedirectUrl="/checkout"
        forceRedirectUrl="/checkout"
        initialValues={email ? { emailAddress: email } : undefined}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </AuthShell>
  );
}
