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
      eyebrow="Create your account"
      title="Create an Account using Email."
      subtitle="After sign-up, you will continue to checkout."
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
