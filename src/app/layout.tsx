import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EU Work Support | European work guidance in one app",
  description:
    "Unlock EU Work Support PRO for lifetime access to European work, visa, document, country, and support guidance.",
  openGraph: {
    title: "EU Work Support",
    description:
      "Country guides, document lists, saved references, and support for your European work journey.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafdff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ cssLayerName: "clerk" }}>
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <head>
          {/* Scroll-reveal content starts hidden until JavaScript animates it in. */}
          <noscript>
            <style>
              {
                "[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}"
              }
            </style>
          </noscript>
        </head>
        <body className="flex min-h-full flex-col">
          <MotionProvider>{children}</MotionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
