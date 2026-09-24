import { SignIn } from "@clerk/nextjs";
import { AuthCard } from "@/components/auth/auth-card";
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
    <AuthCard fields={1}>
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/checkout"
        forceRedirectUrl="/checkout"
        initialValues={email ? { emailAddress: email } : undefined}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </AuthCard>
  );
}
