export const appName = "EU Work Support";

export const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const appScreens = [
  {
    src: "/assets/profile.jpg",
    alt: "EU Work Support profile screen showing account and support options",
    label: "Profile",
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
    name: "Free",
    price: "$0",
    description: "Only basic access to the home page.",
    cta: "Start free",
    href: "/sign-up",
    featured: false,
    features: [
      "Home page access only",
      "Every other page is locked",
      "No support",
      "No complete data",
    ],
  },
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
      "One-time fee with lifetime access",
    ],
  },
];

export const workflowSteps = [
  {
    title: "Request your link",
    description:
      "Enter your email in the mobile app and receive the secure website link in your inbox.",
  },
  {
    title: "Create your account",
    description:
      "Use the same email on the website so your Clerk account connects to your mobile app access.",
  },
  {
    title: "Pay once",
    description:
      "Complete the $50 PRO payment through Stripe on the website, outside the mobile app.",
  },
  {
    title: "Unlock in the app",
    description:
      "Return to the mobile app, log in with the same email, and access the PRO content.",
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
