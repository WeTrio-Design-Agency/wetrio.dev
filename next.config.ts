import type { NextConfig } from "next";

/* The same policy as wetr.io's (its next.config.ts), less what this page never loads (Vimeo, Unsplash, LinkedIn):
   GTM/GA4 and Clarity through the studio's GTM container, Meta Pixel, PostHog, Turnstile, the form posting to the
   admin's intake, the team portraits from wetr.io's media bucket. 'unsafe-inline' for the consent, PostHog and
   JSON-LD inline scripts and for motion's style attributes. CSP_REPORT_ONLY=true reports instead of blocking. */
const SUBMIT_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUBMIT_URL ?? "").origin;
  } catch {
    return "https://admin.wetr.io";
  }
})();
const STUDIO_MEDIA = "https://krworbvnuciyknhhlzqj.supabase.co";
const CSP = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://challenges.cloudflare.com https://connect.facebook.net https://eu-assets.i.posthog.com https://eu.i.posthog.com`,
  `style-src 'self' 'unsafe-inline'`,
  `connect-src 'self' ${SUBMIT_ORIGIN} https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://c.bing.com https://stats.g.doubleclick.net https://www.facebook.com https://eu.i.posthog.com https://eu-assets.i.posthog.com`,
  `img-src 'self' data: blob: ${STUDIO_MEDIA} https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://c.bing.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net`,
  `font-src 'self' data:`,
  `frame-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com`,
  `worker-src 'self' blob:`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self' ${SUBMIT_ORIGIN}`,
  `frame-ancestors 'self' https://eu.posthog.com`,
  `upgrade-insecure-requests`,
].join("; ");
const CSP_HEADER = process.env.CSP_REPORT_ONLY === "true" ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";

const nextConfig: NextConfig = {
  // No `x-powered-by: Next.js`: it tells a scanner which advisory list to try first.
  poweredByHeader: false,
  // Security headers on every response (audit 05.11: the site sent none).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: CSP_HEADER, value: CSP },
        ],
      },
    ];
  },
  /* Standard Next.js server build — deployed like the other *.wetrio.dev
     projects (PaaS auto-detects Next.js and runs `next start`). */
  // demo.wetrio.dev's index of demos is retired (Kirill, 31.10): the address now lands on the Projects section here.
  // The demos themselves live on their own subdomains (nordhaus.demo.wetrio.dev …) and are not affected.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "demo.wetrio.dev" }],
        destination: "https://wetrio.dev/#projects",
        permanent: true,
      },
    ];
  },
  images: {
    // the team portraits come from wetr.io's media bucket (lib/studio.ts)
    remotePatterns: [{ protocol: "https", hostname: "krworbvnuciyknhhlzqj.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
