import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
