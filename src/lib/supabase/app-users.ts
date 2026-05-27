import { createSupabaseServiceClient } from "@/lib/supabase/server";

export type AppUser = {
  clerk_user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  nationality_country_code: string | null;
  residence_country_code: string | null;
  preferred_language: string | null;
  onboarding_completed: boolean;
  onboarding_completed_at: string | null;
  preferences: Record<string, unknown>;
  clerk_created_at: string | null;
  clerk_updated_at: string | null;
  user_plan: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

const appUserSelect = `
  clerk_user_id,
  email,
  first_name,
  last_name,
  image_url,
  nationality_country_code,
  residence_country_code,
  preferred_language,
  onboarding_completed,
  onboarding_completed_at,
  preferences,
  clerk_created_at,
  clerk_updated_at,
  user_plan,
  deleted_at,
  created_at,
  updated_at
`;

export async function getAppUserByClerkUserId(clerkUserId: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("app_users")
    .select(appUserSelect)
    .eq("clerk_user_id", clerkUserId)
    .is("deleted_at", null)
    .maybeSingle<AppUser>();

  if (error) {
    throw new Error(`Unable to load app user: ${error.message}`);
  }

  return data;
}

export async function getAppUserForClerkAccount({
  clerkUserId,
  email,
}: {
  clerkUserId: string;
  email?: string | null;
}) {
  const appUser = await getAppUserByClerkUserId(clerkUserId);

  if (appUser || !email) {
    return appUser;
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("app_users")
    .select(appUserSelect)
    .ilike("email", email)
    .is("deleted_at", null)
    .limit(1)
    .maybeSingle<AppUser>();

  if (error) {
    throw new Error(`Unable to load app user by email: ${error.message}`);
  }

  return data;
}
