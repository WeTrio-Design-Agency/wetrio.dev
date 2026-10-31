import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Standard Next.js server build — deployed like the other *.wetrio.dev
     projects (PaaS auto-detects Next.js and runs `next start`). */
  images: {
    // the team portraits come from wetr.io's media bucket (lib/studio.ts)
    remotePatterns: [{ protocol: "https", hostname: "krworbvnuciyknhhlzqj.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
