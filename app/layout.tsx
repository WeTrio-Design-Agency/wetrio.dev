import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { consentDefaultScript } from "@/lib/analytics/consent";
import { DESCRIPTION, OG_IMAGE, SITE_NAME, SITE_ORIGIN, TITLE } from "@/lib/site";
import { loadCookieCopy, loadTrackers } from "@/lib/studio";
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "WeTrio Dev: SaaS and web apps, designed and built by one team" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050609" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [trackers, cookieCopy] = await Promise.all([loadTrackers(), loadCookieCopy()]);
  const consentScript = consentDefaultScript(trackers.gtmId);
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Consent Mode defaults, inline and first, so no tag fires in a state nobody declared. */}
        {consentScript ? <script dangerouslySetInnerHTML={{ __html: consentScript }} /> : null}
      </head>
      <body>
        {children}
        <Analytics gtmId={trackers.gtmId} metaPixelId={trackers.metaPixelId} />
        <CookieBanner copy={cookieCopy} />
      </body>
    </html>
  );
}
