import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getBrevoEnv } from "@/lib/env";

const BREVO_SEND_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const requestBuckets = new Map<string, RateLimitBucket>();

const sendPaymentLinkSchema = z
  .object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    name: z.preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? undefined : value,
      z.string().trim().min(1).max(80).optional(),
    ),
  })
  .strict();

type BrevoEmailResponse = {
  messageId?: string;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let env: ReturnType<typeof getBrevoEnv>;

  try {
    env = getBrevoEnv();
  } catch (error) {
    console.error("Brevo email environment error:", error);
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  if (!isAuthorizedRequest(request, env.X_API_KEY)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized request." },
      { status: 401 },
    );
  }

  const bodyResult = await parseRequestBody(request);

  if (!bodyResult.success) {
    return NextResponse.json(
      { ok: false, error: bodyResult.error },
      { status: 400 },
    );
  }

  const { email, name } = bodyResult.data;
  const rateLimit = checkRateLimit(request, email);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  //   const paymentLink = createPaymentLink(env.NEXT_PUBLIC_SITE_URL, email);

  try {
    const brevoResponse = await fetch(BREVO_SEND_EMAIL_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: env.BREVO_SENDER_NAME,
          email: env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email,
            ...(name ? { name } : {}),
          },
        ],
        subject: "Request Granted of EU Work Support",
        htmlContent: createEmailHtml({ name }),
        textContent: createEmailText({ name }),
      }),
      cache: "no-store",
    });

    const responseBody = await readBrevoResponse(brevoResponse);

    if (!brevoResponse.ok) {
      console.error("Brevo send email failed:", {
        status: brevoResponse.status,
        responseBody,
      });

      return NextResponse.json(
        { ok: false, error: "Unable to send payment link." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      messageId: responseBody.messageId ?? null,
    });
  } catch (error) {
    console.error("Brevo send email request error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send payment link." },
      { status: 502 },
    );
  }
}

async function parseRequestBody(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = sendPaymentLinkSchema.safeParse(json);

    if (!parsed.success) {
      return {
        success: false as const,
        error: "Please provide a valid email address.",
      };
    }

    return {
      success: true as const,
      data: parsed.data,
    };
  } catch {
    return {
      success: false as const,
      error: "Request body must be valid JSON.",
    };
  }
}

// function createPaymentLink(siteUrl: string, email: string) {
//   // change this later for taking the user to the main website.
//   const url = new URL("/request/sign-up", siteUrl);
//   url.searchParams.set("email", email);
//   return url.toString();
// }

function createEmailText({ name }: { name?: string }) {
  const greeting = name ? `Hi ${name},` : "Hi,";

  return [
    greeting,
    "",
    "Your request to get Access to EU Work Support has been granted.",
    "",
    "You can now access all the features of EU Work Support using the email address you provided.",
    "",
    "If you have any questions, feel free to reach out to our support team.",
  ].join("\n");
}

function createEmailHtml({ name }: { name?: string }) {
  const safeName = name ? escapeHtml(name) : "";
  const greeting = safeName ? `Hi ${safeName},` : "Hi,";

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f6f8fc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #dbe3ef;border-radius:8px;padding:28px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:24px;">${greeting}</p>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:34px;color:#020617;">Access Granted</h1>
            <p style="margin:0 0 20px;font-size:16px;line-height:26px;color:#475569;">
              Your request to get Access to EU Work Support has been granted.
            </p>
            <p style="margin:24px 0 0;font-size:13px;line-height:20px;color:#64748b;">
                You can now access all the features of EU Work Support using the email address you provided. So login in the app and start exploring the features. If you have any questions, feel free to reach out to our support team.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function readBrevoResponse(
  response: Response,
): Promise<BrevoEmailResponse> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as BrevoEmailResponse;
  } catch {
    return {};
  }
}

function checkRateLimit(request: NextRequest, email: string) {
  const ip = getRequestIp(request);
  const emailLimit = hitRateLimitBucket(`email:${email}`);
  const ipLimit = hitRateLimitBucket(`ip:${ip}`);

  if (emailLimit.allowed && ipLimit.allowed) {
    return { allowed: true as const };
  }

  return {
    allowed: false as const,
    retryAfterSeconds: Math.max(
      emailLimit.retryAfterSeconds ?? 0,
      ipLimit.retryAfterSeconds ?? 0,
    ),
  };
}

function hitRateLimitBucket(key: string) {
  const now = Date.now();
  const existingBucket = requestBuckets.get(key);

  if (!existingBucket || existingBucket.resetAt <= now) {
    requestBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return { allowed: true as const };
  }

  existingBucket.count += 1;

  if (existingBucket.count <= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: true as const };
  }

  return {
    allowed: false as const,
    retryAfterSeconds: Math.ceil((existingBucket.resetAt - now) / 1000),
  };
}

function getRequestIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isAuthorizedRequest(request: NextRequest, expectedApiKey: string) {
  const requestSecret =
    request.headers.get("x-api-key") || request.headers.get("x_api_key");

  if (!requestSecret) {
    return false;
  }

  return safeCompare(requestSecret, expectedApiKey);
}

function safeCompare(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
