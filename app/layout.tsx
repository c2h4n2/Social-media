import type { Metadata } from "next";
import "./globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Post Doctor — Improve Your Social Post Before You Publish",
    template: "%s | Post Doctor",
  },
  description:
    "Upload a photo or describe your planned social post. Get AI-powered captions, hooks, CTAs, keywords, hashtags, and audience-focused suggestions.",
  applicationName: "Post Doctor",
  keywords: [
    "social media caption generator",
    "post analyzer",
    "Instagram caption",
    "TikTok captions",
    "social media AI",
    "content creator tools",
  ],
  openGraph: {
    title: "Post Doctor",
    description:
      "Improve your social post before you publish it.",
    type: "website",
    url: siteUrl,
    siteName: "Post Doctor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Doctor",
    description:
      "Improve your social post before you publish it.",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Post Doctor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdSenseLoader />
        {children}
      </body>
    </html>
  );
}
