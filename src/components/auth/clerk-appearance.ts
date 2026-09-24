// Tailwind classes here override Clerk's defaults because Clerk's own styles
// live in the lower-priority "clerk" cascade layer (see globals.css).
export const clerkAppearance = {
  variables: {
    borderRadius: "0.875rem",
    colorBackground: "#ffffff",
    colorForeground: "#101d36",
    colorMutedForeground: "#64748b",
    colorMuted: "#f1f6ff",
    colorInput: "#f8fbff",
    colorInputForeground: "#101d36",
    colorPrimary: "#3979e8",
    colorPrimaryForeground: "#ffffff",
    colorRing: "#3979e8",
    colorDanger: "#dc2626",
    colorSuccess: "#138466",
    colorNeutral: "#101d36",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontFamilyButtons:
      "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox:
      "w-full max-w-none animate-fade-up overflow-hidden rounded-[28px] border border-ink/[0.08] bg-white shadow-[0_30px_80px_-24px_rgba(16,29,54,0.22)]",
    card: "gap-7 rounded-none border-0 bg-transparent px-6 py-7 shadow-none sm:px-8 sm:py-8",
    header: "items-start gap-1.5 text-left",
    headerTitle: "text-[1.6rem] font-black tracking-[-0.04em] text-ink",
    headerSubtitle: "text-sm leading-6 text-slate-500",
    main: "gap-6",
    socialButtonsBlockButton:
      "min-h-12 rounded-xl border border-slate-200 bg-white font-semibold text-ink shadow-none transition-colors hover:border-brand/40 hover:bg-brand-soft/60",
    socialButtonsBlockButtonText: "font-semibold text-ink",
    dividerLine: "bg-slate-200",
    dividerText:
      "text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
    formFieldLabel: "text-sm font-bold text-ink",
    formFieldInput:
      "min-h-12 rounded-xl border border-slate-200 bg-[#f8fbff] px-4 text-[15px] text-ink shadow-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15",
    formFieldInputShowPasswordButton: "text-slate-400 hover:text-brand",
    formFieldErrorText: "mt-1.5 text-xs font-semibold text-red-600",
    formFieldSuccessText: "text-xs font-semibold text-mint-deep",
    formButtonPrimary:
      "min-h-12 rounded-xl bg-brand text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(57,121,232,0.7)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-brand-strong hover:shadow-[0_18px_36px_-12px_rgba(57,121,232,0.8)] active:scale-[0.99]",
    footer: "border-t border-ink/[0.06] bg-none bg-surface-tint/50",
    footerAction: "justify-center text-sm",
    footerActionText: "text-slate-500",
    footerActionLink: "font-bold text-brand-strong hover:text-brand-deep",
    identityPreview: "rounded-xl border border-slate-200 bg-[#f8fbff]",
    identityPreviewText: "font-semibold text-ink",
    identityPreviewEditButton: "text-brand-strong hover:text-brand-deep",
    formResendCodeLink: "font-bold text-brand-strong hover:text-brand-deep",
    otpCodeFieldInput:
      "h-12 rounded-xl border-slate-200 bg-[#f8fbff] text-ink focus:border-brand",
    alert: "rounded-xl border border-red-100 bg-red-50",
    alertText: "text-sm text-red-700",
    backLink: "font-bold text-brand-strong hover:text-brand-deep",
  },
} as const;
