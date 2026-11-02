import { loadContent, loadSeo } from "@/lib/content";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN, STUDIO_ORIGIN, TELEGRAM_URL } from "@/lib/site";

/** /llms.txt: the facts an answer engine can quote, every line said on the page too. The description and the questions
 *  are the admin's, as on the page (lib/content.ts); the summary between them is written here. */
export async function GET() {
  const [copy, seo] = await Promise.all([loadContent(), loadSeo()]);
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${seo.description} Geographic reach: worldwide (a team across several countries).`,
    "",
    "## Facts",
    "- 40+ products shipped; 9+ years of experience; a live demo of your product in one week.",
    "",
    "## What we build",
    "- SaaS platforms: sign-up, plans and Stripe billing, roles and an admin the team runs without a developer.",
    "- Web applications and client portals: their own login for clients or partners, phone first.",
    "- Mobile apps: iOS and Android, sharing one backend with the web product.",
    "- Dashboards and internal tools: one place for the numbers and tasks a team acts on, with access by role.",
    "- AI features and automation: assistants, summaries and document checks on Claude and OpenAI models.",
    "- Integrations and APIs: billing, mail, chat and data connected without manual steps.",
    "- MVPs and prototypes: a live demo in one week, then a first version for investors and first users.",
    "- Any stage: an idea, a half-built MVP or a live product someone else started.",
    "",
    "## Products we build and run",
    "- WeTrio Hub: the studio's CRM and operations platform (clients, projects, tasks, timesheets, finance, mail, meetings) with role-based access.",
    `- wetria (${STUDIO_ORIGIN}/wetria): AI slide design on the client's own template, a SaaS with paying customers; Stripe subscriptions, render workers for PPTX and PDF.`,
    `- wetr.io (${STUDIO_ORIGIN}) and its admin: the studio site and the CMS behind it, with an encrypted intake for leads.`,
    "",
    "## Front-end builds",
    "- Nordhaus (https://nordhaus.demo.wetrio.dev): a scroll-driven landing page for an architecture practice, vanilla JS.",
    "- Halden Gallery (https://halden.demo.wetrio.dev): a virtual showroom in WebGL, Three.js.",
    "- Parklab (https://parklab.demo.wetrio.dev/overview.html): six design directions for a playground builder with WebGL models.",
    "",
    "## How we work",
    "- Every engagement starts with a free audit: a 30-minute call, then what to build first and a fixed price for the first sprint.",
    "- Three formats: a discovery sprint (1–2 weeks, fixed price), a first version (fixed scope, fixed price), a product team (monthly).",
    "- The client owns the code, the infrastructure and the accounts from day one.",
    `- Design and engineering by one team: WeTrio Dev is part of WeTrio, a B2B design studio (${STUDIO_ORIGIN}).`,
    "- After launch: monitoring, fixes, iterations and new features under a monthly agreement or per task.",
    "- Stack: Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Stripe, Cloudflare, Coolify, Docker, Claude API, Playwright.",
    "",
    "## Questions people ask",
    ...copy.faq.items.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Contact",
    `- Website: ${SITE_ORIGIN}/`,
    `- Email: ${CONTACT_EMAIL}`,
    `- Telegram: ${TELEGRAM_URL}`,
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
