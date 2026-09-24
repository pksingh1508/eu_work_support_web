import { SignUp } from "@clerk/nextjs";
import { AuthCard } from "@/components/auth/auth-card";
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
    <AuthCard fields={2}>
      <SignUp
        appearance={clerkAppearance}
        fallbackRedirectUrl="/checkout"
        forceRedirectUrl="/checkout"
        initialValues={email ? { emailAddress: email } : undefined}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </AuthCard>
  );
}
