import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const TITLE = "WeTrio Development Lab: SaaS and web products, built to ship";
const DESCRIPTION =
  "A product development lab by WeTrio, a B2B design studio. Architecture, design, engineering and launch by one team. Every project runs on a real URL from the first weeks.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wetrio.dev"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://wetrio.dev",
    siteName: "WeTrio Development Lab",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
