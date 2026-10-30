import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { GOOGLE_CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics/consent";
import { DESCRIPTION, OG_IMAGE, SITE_NAME, SITE_ORIGIN, TITLE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_ORIGIN}/` },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_ORIGIN}/`,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "WeTrio Development Lab: SaaS and web products, built to ship" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050609" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Consent Mode defaults, inline and first, so no tag fires in a state nobody declared. */}
        {GOOGLE_CONSENT_DEFAULT_SCRIPT ? <script dangerouslySetInnerHTML={{ __html: GOOGLE_CONSENT_DEFAULT_SCRIPT }} /> : null}
      </head>
      <body>
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
