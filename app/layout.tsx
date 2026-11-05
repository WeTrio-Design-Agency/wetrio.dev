import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { consentDefaultScript } from "@/lib/analytics/consent";
import { posthogScript } from "@/lib/analytics/posthog";
import { loadSeo } from "@/lib/content";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { loadCookieCopy, loadTrackers } from "@/lib/studio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** The admin's SEO block for the page (lib/content.ts); left empty, the site's own title, description, card and canonical. */
export async function generateMetadata(): Promise<Metadata> {
  const { title, description, canonical, ogImage, noindex } = await loadSeo();
  const image = ogImage ? { url: ogImage, alt: title } : { url: OG_IMAGE, width: 1200, height: 630, alt: title };
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: title },
    description,
    alternates: { canonical: canonical || `${SITE_ORIGIN}/` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_ORIGIN}/`,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: { index: !noindex, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#050609" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [trackers, cookieCopy] = await Promise.all([loadTrackers(), loadCookieCopy()]);
  const consentScript = consentDefaultScript(trackers.gtmId);
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Consent Mode defaults, inline and first, so no tag fires in a state nobody declared. */}
        {consentScript ? <script dangerouslySetInnerHTML={{ __html: consentScript }} /> : null}
        <script dangerouslySetInnerHTML={{ __html: posthogScript() }} />
      </head>
      <body>
        {children}
        <Analytics gtmId={trackers.gtmId} metaPixelId={trackers.metaPixelId} />
        <CookieBanner copy={cookieCopy} />
      </body>
    </html>
  );
}
