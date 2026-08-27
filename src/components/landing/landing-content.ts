export const appName = "EU Work Support";

export const navigationItems = [
  { label: "How to get Access", href: "#how-to-get-access" },
  { label: "Pricing", href: "#pricing" },
  { label: "Feature", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export const appScreens = [
  {
    src: "/assets/home.jpg",
    alt: "EU Work Support home screen showing main features",
    label: "Home",
  },
  {
    src: "/assets/search.jpg",
    alt: "EU Work Support search screen showing Germany work support results",
    label: "Search",
  },
  {
    src: "/assets/single_country.jpg",
    alt: "EU Work Support country detail screen with document lists",
    label: "Country guides",
  },
  {
    src: "/assets/saved.jpg",
    alt: "EU Work Support saved guides screen",
    label: "Saved guides",
  },
];

export const featureHighlights = [
  {
    title: "Country-by-country guidance",
    description:
      "Browse work visa, education, insurance, residence, employer, and immigration references for European destinations.",
  },
  {
    title: "Searchable document lists",
    description:
      "Find the exact topic you need quickly, from Germany visa checklists to residence permits and driving licence guides.",
  },
  {
    title: "Save important guides",
    description:
      "Keep key countries and documents close so your next step is easy to return to inside the mobile app.",
  },
];

export const pricingPlans = [
  {
    name: "PRO",
    price: "$50",
    description: "One-time fee. Lifetime access.",
    cta: "Get lifetime access",
    href: "/sign-up",
    featured: true,
    features: [
      "Access to all features",
      "Access to every page",
      "Support included",
      "All available data unlocked",
      "Lifetime access with one payment",
    ],
  },
];

export const workflowSteps = [
  {
    title: "Create your account",
    description:
      "Use your email to create an account. Once your account is created, you will be redirected to the checkout page.",
  },
  {
    title: "Pay the one-time fee",
    description:
      "Complete the one-time payment securely through Stripe.",
  },
  {
    title: "Get lifetime access",
    description:
      "Use the same email to sign in to the app and access all PRO content for life.",
  },
];

export const faqs = [
  {
    question: "Why do I pay on the website instead of the mobile app?",
    answer:
      "EU Work Support handles payment on the website so your app account can be upgraded after a secure Stripe checkout.",
  },
  {
    question: "Is PRO a subscription?",
    answer:
      "No. PRO is a one-time $50 payment that gives lifetime access to all available features, pages, data, and support.",
  },
  {
    question: "Which email should I use?",
    answer:
      "Use the same email on the website that you plan to use in the mobile app. That is how your PRO access is matched.",
  },
];
