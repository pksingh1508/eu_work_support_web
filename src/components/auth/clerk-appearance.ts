export const clerkAppearance = {
  variables: {
    borderRadius: "0.5rem",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#0f172a",
    colorPrimary: "#0069c9",
    colorText: "#0f172a",
    fontFamily: "var(--font-geist-sans)",
  },
  elements: {
    card: "shadow-none",
    cardBox: "rounded-lg border border-slate-200 shadow-none",
    footerActionLink: "text-[#0069c9] hover:text-[#0058aa]",
    formButtonPrimary: "bg-[#0069c9] text-white hover:bg-[#0058aa]",
    formFieldInput: "rounded-lg",
    headerSubtitle: "text-slate-600",
    headerTitle: "text-slate-950",
  },
} as const;
