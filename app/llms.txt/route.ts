import { CONTACT_EMAIL, DEMOS_URL, DESCRIPTION, SITE_NAME, SITE_ORIGIN, STUDIO_ORIGIN, TELEGRAM_URL } from "@/lib/site";
import { FAQ } from "@/lib/faq";

/** /llms.txt: the facts an answer engine can quote, every line said on the page too. */
export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${DESCRIPTION} Geographic reach: worldwide (remote team).`,
    "",
    "## What we build",
    "- SaaS platforms: multi-tenant products for subscription businesses, with auth, Stripe billing, roles, admin and usage limits.",
    "- Web applications and client portals: fast on a phone, usable from the keyboard, readable by a screen reader.",
    "- Dashboards and internal tools: one place for the numbers a team acts on, with access by role.",
    "- AI features and automation: assistants, summarisers and classifiers inside real workflows, on Claude and OpenAI models.",
    "- Integrations and APIs: webhooks and automations that connect billing, mail, chat and data.",
    "- MVPs and prototypes: a working first version in weeks, on its own URL, with real content.",
    "",
    "## Products built and run by the Lab",
    "- WeTrio Hub: the studio's operations platform (clients, projects, tasks, timesheets, finance, mail, meetings) with role-based access, a Telegram bot and a daily digest.",
    `- wetria (${STUDIO_ORIGIN}/wetria): AI slide design on the client's own template, a SaaS with paying customers; Stripe subscriptions, render workers for PPTX and PDF.`,
    "- Client portal (https://portal.wetr.io): projects, hours left in the package, files and invoices, read from the Hub's API.",
    `- Analyzer (${STUDIO_ORIGIN}/analyzer): a free design check of a deck or a website with a scored report.`,
    `- wetr.io (${STUDIO_ORIGIN}) and its admin: the studio site and the CMS behind it, with an encrypted intake for leads.`,
    "",
    "## Live demos",
    "- Nordhaus (https://nordhaus.demo.wetrio.dev): a scroll-driven landing page for an architecture practice, vanilla JS.",
    "- Halden Gallery (https://halden.demo.wetrio.dev): a virtual showroom in WebGL, Three.js.",
    "- Parklab (https://parklab.demo.wetrio.dev/overview.html): six design directions for a playground builder with WebGL models.",
    `- All demos: ${DEMOS_URL}`,
    "",
    "## How we work",
    "- A scoped, fixed-price first sprint after one call; a clickable prototype on its own URL usually two to four weeks after the brief.",
    "- The client owns the code, the infrastructure and the accounts from day one.",
    `- Design and engineering by one team: the Lab is run by WeTrio, a B2B design studio (${STUDIO_ORIGIN}).`,
    "- After launch: monitoring, fixes, iterations and new features under a monthly agreement or per task.",
    "- Stack: Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Stripe, Cloudflare, Coolify, Docker, Claude API, Playwright.",
    "",
    "## Questions people ask",
    ...FAQ.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Contact",
    `- Website: ${SITE_ORIGIN}/`,
    `- Email: ${CONTACT_EMAIL}`,
    `- Telegram: ${TELEGRAM_URL}`,
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
