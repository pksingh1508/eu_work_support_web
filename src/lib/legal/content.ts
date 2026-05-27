export const supportEmail = "office@euworksupport.eu";
export const lastUpdated = "May 27, 2026";

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  {
    label: "Refund & Cancellation Policy",
    href: "/refund-and-cancellation-policy",
  },
  { label: "Contact Us", href: "/contact-us" },
];

export type LegalSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalPageContent = {
  title: "Privacy Policy",
  description:
    "How EU Work Support collects, uses, and protects information when you use our website, payment flow, and mobile app.",
  sections: [
    {
      title: "Who we are",
      body: [
        "EU Work Support provides digital guidance for people researching work, document, visa, residence, and country information for Europe. This Privacy Policy explains how we handle personal information when you visit our website, create an account, request a payment link, purchase PRO access, or use the EU Work Support mobile app.",
      ],
    },
    {
      title: "Information we collect",
      body: [
        "We collect only the information needed to create your account, send the website payment link, process your one-time purchase, provide access to PRO content, and respond to support requests.",
      ],
      bullets: [
        "Account information, such as email address, name, profile image, Clerk user ID, preferred language, and app preferences.",
        "Payment information handled through Stripe, such as Checkout Session ID, payment status, amount, currency, Stripe customer ID, and limited billing details returned to us by Stripe. We do not store full card numbers.",
        "Email delivery information needed to send the website link through Brevo.",
        "Support messages you send to us, including your email address and any details you choose to include.",
        "Basic technical data such as browser, device, IP-derived security signals, pages visited, and logs needed to protect the service and troubleshoot issues.",
      ],
    },
    {
      title: "How we use information",
      body: [
        "We use personal information to operate EU Work Support, complete the website payment flow, unlock PRO access in the mobile app, prevent misuse, and communicate with you about your account or support request.",
      ],
      bullets: [
        "Create and manage your website account through Clerk.",
        "Match your website account to your mobile app login using the same email address.",
        "Send the secure website link requested from the mobile app.",
        "Process the one-time $50 PRO payment through Stripe.",
        "Update your Supabase app user record from Free to PRO after payment verification.",
        "Provide support, resolve billing questions, and prevent fraud or unauthorized access.",
      ],
    },
    {
      title: "Payment security",
      body: [
        "Payments are processed by Stripe. EU Work Support does not collect, process, or store full payment card numbers. Stripe handles payment details according to its own security and compliance standards. We receive only the information needed to verify payment, fulfil PRO access, and maintain payment records.",
      ],
    },
    {
      title: "Service providers",
      body: [
        "We use trusted providers to operate the service. These providers process information only as needed to provide their services to us.",
      ],
      bullets: [
        "Clerk for account creation, authentication, and user profile management.",
        "Supabase for application database records, including user plan status.",
        "Stripe for secure payment processing and payment verification.",
        "Brevo for transactional emails that send the website payment link.",
        "Hosting, analytics, logging, and security providers used to run and protect the website.",
      ],
    },
    {
      title: "Data retention",
      body: [
        "We keep account and payment records for as long as needed to provide lifetime PRO access, comply with legal, tax, accounting, and fraud-prevention obligations, and resolve disputes. Support messages are kept only as long as reasonably needed for customer service and business records.",
      ],
    },
    {
      title: "Your choices",
      body: [
        `You may contact us at ${supportEmail} to request access, correction, or deletion of personal information associated with your EU Work Support account. Some payment, security, tax, or dispute records may need to be retained where required by law or legitimate business obligations.`,
      ],
    },
    {
      title: "International users",
      body: [
        "EU Work Support may be used by people in different countries. Your information may be processed in countries where our service providers operate. We take reasonable steps to use providers that protect personal information appropriately.",
      ],
    },
    {
      title: "Contact",
      body: [
        `For privacy questions, account requests, or data concerns, contact us at ${supportEmail}.`,
      ],
    },
  ],
};

export const termsAndConditions: LegalPageContent = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the EU Work Support website, mobile app, account, and PRO purchase flow.",
  sections: [
    {
      title: "Agreement to these terms",
      body: [
        "By visiting the EU Work Support website, creating an account, purchasing PRO access, or using the mobile app, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, do not use the service or make a purchase.",
      ],
    },
    {
      title: "What EU Work Support provides",
      body: [
        "EU Work Support is a digital information product that provides organized guidance, references, saved content, country information, document lists, and support features related to European work preparation. The service is designed for general informational support and practical organization.",
      ],
    },
    {
      title: "No legal, immigration, employment, or financial advice",
      body: [
        "EU Work Support does not provide legal advice, immigration advice, employment placement, government services, visa approval, job guarantees, financial advice, or professional representation. Information in the app may help you understand topics and prepare questions, but you remain responsible for verifying requirements with official government sources, employers, schools, embassies, consulates, lawyers, advisers, or other qualified professionals.",
      ],
    },
    {
      title: "Account requirements",
      body: [
        "To purchase PRO access, you must create a website account with an email address and password through Clerk. To unlock PRO in the mobile app, you must log in with the same email address used for the website purchase. You are responsible for keeping your login details secure and for providing accurate account information.",
      ],
    },
    {
      title: "PRO purchase",
      body: [
        "EU Work Support PRO is sold as a one-time $50 payment for lifetime access to the paid content and paid app features available under the PRO plan. Prices are shown in USD unless otherwise stated. Payment is processed securely by Stripe on the website, outside the mobile app.",
        "Lifetime access means access for the life of the EU Work Support product, subject to these terms, technical availability, lawful use, and reasonable changes to features or content over time. It does not mean that every feature, data source, support channel, or content item will remain unchanged forever.",
      ],
    },
    {
      title: "Acceptable use",
      body: [
        "You agree not to misuse the website, app, payment flow, or content.",
      ],
      bullets: [
        "Do not share, resell, scrape, copy, or redistribute paid PRO content without permission.",
        "Do not attempt to bypass payment, authentication, security, or account restrictions.",
        "Do not use the service for unlawful activity, fraud, harassment, or infringement.",
        "Do not upload or send malicious code, spam, or abusive support messages.",
      ],
    },
    {
      title: "Availability and changes",
      body: [
        "We aim to keep EU Work Support available and accurate, but we do not guarantee uninterrupted access or error-free content. We may update, add, remove, or reorganize features and information to improve the service, reflect changed requirements, or maintain security.",
      ],
    },
    {
      title: "Third-party services",
      body: [
        "EU Work Support uses third-party providers including Clerk, Supabase, Stripe, and Brevo. Your use of payment and account features may also be subject to those providers' terms and policies.",
      ],
    },
    {
      title: "Limitation of liability",
      body: [
        "To the maximum extent permitted by law, EU Work Support is not liable for indirect, incidental, special, consequential, or punitive damages, or for losses caused by reliance on general information, third-party changes, government decisions, employer decisions, visa outcomes, or service interruptions.",
      ],
    },
    {
      title: "Termination",
      body: [
        "We may suspend or terminate access if an account is used fraudulently, violates these terms, creates security risk, or misuses PRO content or support. Termination for misuse does not automatically entitle you to a refund.",
      ],
    },
    {
      title: "Contact",
      body: [
        `Questions about these terms can be sent to ${supportEmail}.`,
      ],
    },
  ],
};

export const refundPolicy: LegalPageContent = {
  title: "Refund & Cancellation Policy",
  description:
    "Clear refund and cancellation terms for the one-time EU Work Support PRO lifetime access purchase.",
  sections: [
    {
      title: "Product type",
      body: [
        "EU Work Support PRO is a digital product. It unlocks paid mobile app content, paid pages, data, saved guidance features, and support access after a successful one-time website payment.",
      ],
    },
    {
      title: "One-time payment and no subscription",
      body: [
        "PRO is a one-time $50 payment for lifetime access. It is not a subscription. We do not charge recurring monthly or yearly fees for PRO. Because there is no recurring subscription, there is no subscription cancellation process.",
      ],
    },
    {
      title: "When you can request a refund",
      body: [
        "You may request a refund within 7 days of purchase if you are unable to access PRO after payment and we cannot resolve the issue, or if you were charged in error. Refund requests are reviewed based on account activity, payment records, and support history.",
      ],
      bullets: [
        "Duplicate charges for the same account are eligible for refund after verification.",
        "Payments made with the wrong email may be corrected by transferring access where possible, or refunded if access cannot be matched.",
        "Technical access issues should be reported first so we can fix the account or plan status.",
      ],
    },
    {
      title: "When refunds may be declined",
      body: [
        "Because PRO is a digital lifetime access product, refunds may be declined after the access has been delivered and used, after the refund window has passed, or when the request is based on a change of mind rather than a technical or billing issue.",
      ],
      bullets: [
        "Refunds are not provided because a user did not receive a job, visa, residence permit, document approval, or other outcome outside our control.",
        "Refunds are not provided for misuse, account termination due to policy violations, or attempts to bypass payment or security.",
        "Refunds are not provided for partial use of digital content after successful delivery unless required by applicable law.",
      ],
    },
    {
      title: "How to request a refund",
      body: [
        `Email ${supportEmail} with the subject "Refund Request" and include the email used for checkout, purchase date, Stripe receipt or Checkout Session ID if available, and a short explanation of the issue.`,
        "We aim to respond within 2 business days. Approved refunds are processed back to the original payment method through Stripe. Bank and card processing times are controlled by the payment provider and your financial institution.",
      ],
    },
    {
      title: "Cancellation",
      body: [
        "Because PRO is not a subscription, there are no recurring charges to cancel. You may stop using the app at any time. Stopping use does not automatically create a refund unless the request meets this policy or applicable law requires otherwise.",
      ],
    },
    {
      title: "Chargebacks and disputes",
      body: [
        "If you have a billing problem, contact us first so we can investigate and resolve it quickly. We reserve the right to provide payment records, account access logs, refund policy details, and support communications to Stripe or card networks when responding to disputes.",
      ],
    },
  ],
};

export const contactUs: LegalPageContent = {
  title: "Contact Us",
  description:
    "How to contact EU Work Support for billing, refund, account, payment, app access, or privacy questions.",
  sections: [
    {
      title: "Customer support",
      body: [
        `For support, email us at ${supportEmail}. This is the primary support channel for website payments, PRO access, refunds, account questions, privacy requests, and app access issues.`,
      ],
    },
    {
      title: "What to include",
      body: [
        "To help us resolve your request faster, include the email address used for your EU Work Support account, the issue you are experiencing, your purchase date if relevant, and your Stripe receipt or Checkout Session ID if available.",
      ],
    },
    {
      title: "Response time",
      body: [
        "We aim to respond to customer support emails within 2 business days. Complex billing, account matching, or payment verification issues may take longer if we need to review records from Clerk, Supabase, Stripe, or Brevo.",
      ],
    },
    {
      title: "Billing and refunds",
      body: [
        'For refund requests, use the subject line "Refund Request" and review our Refund & Cancellation Policy before contacting us.',
      ],
    },
    {
      title: "Security and privacy",
      body: [
        'For privacy requests, account deletion requests, or security concerns, use the subject line "Privacy Request" or "Security Concern" so your message can be reviewed appropriately.',
      ],
    },
  ],
};
