import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1),
  BREVO_API_KEY: z.string().min(1),
  BREVO_SENDER_EMAIL: z.email(),
  BREVO_SENDER_NAME: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_PRO_PRICE_ID: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.url(),
  SUPABASE_URL: z.url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

const publicEnvSchema = serverEnvSchema.pick({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: true,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: true,
  NEXT_PUBLIC_SITE_URL: true,
});

const optionalSecretSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().min(16).optional(),
);

const brevoEnvSchema = serverEnvSchema
  .pick({
    BREVO_API_KEY: true,
    BREVO_SENDER_EMAIL: true,
    BREVO_SENDER_NAME: true,
    NEXT_PUBLIC_SITE_URL: true,
  })
  .extend({
    PAYMENT_LINK_API_SECRET: optionalSecretSchema,
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type BrevoEnv = z.infer<typeof brevoEnvSchema>;

let cachedServerEnv: ServerEnv | undefined;
let cachedPublicEnv: PublicEnv | undefined;
let cachedBrevoEnv: BrevoEnv | undefined;

function formatEnvError(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
}

export function getServerEnv() {
  if (typeof window !== "undefined") {
    throw new Error("Server environment variables cannot be read in the browser.");
  }

  if (!cachedServerEnv) {
    const parsed = serverEnvSchema.safeParse(process.env);

    if (!parsed.success) {
      throw new Error(`Invalid server environment: ${formatEnvError(parsed.error)}`);
    }

    cachedServerEnv = parsed.data;
  }

  return cachedServerEnv;
}

export function getPublicEnv() {
  if (!cachedPublicEnv) {
    const parsed = publicEnvSchema.safeParse({
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });

    if (!parsed.success) {
      throw new Error(`Invalid public environment: ${formatEnvError(parsed.error)}`);
    }

    cachedPublicEnv = parsed.data;
  }

  return cachedPublicEnv;
}

export function getBrevoEnv() {
  if (typeof window !== "undefined") {
    throw new Error("Brevo environment variables cannot be read in the browser.");
  }

  if (!cachedBrevoEnv) {
    const parsed = brevoEnvSchema.safeParse({
      BREVO_API_KEY: process.env.BREVO_API_KEY,
      BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
      BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      PAYMENT_LINK_API_SECRET: process.env.PAYMENT_LINK_API_SECRET,
    });

    if (!parsed.success) {
      throw new Error(`Invalid Brevo environment: ${formatEnvError(parsed.error)}`);
    }

    cachedBrevoEnv = parsed.data;
  }

  return cachedBrevoEnv;
}
