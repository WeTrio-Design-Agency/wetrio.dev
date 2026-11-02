import { cache } from "react";
import { DESCRIPTION, TITLE } from "./site";
import { rest } from "./studio";

/**
 * The page's words, editable in the studio's admin (admin.wetr.io/dev, `pages` row id='dev'), the way wetr.io/wetria
 * is. What is below is the copy as it stands, and the page falls back to it field by field: an empty or missing field
 * shows these words, so an empty row, a missing key or an unanswered query changes nothing on the page.
 *
 * Headings are the admin's rich-heading format: plain text, <em> for the dimmed second half, <br> for a line break
 * (components/Rich.tsx draws them). Lists with a picture, an icon or a link of their own (the products, the projects,
 * the steps, the stack) are fixed slots: the words change, the slot keeps its picture. The comparison, the services
 * and the questions are lists the editor can lengthen, shorten and reorder.
 *
 * The admin mirrors DEV_CONTENT as DEV_DEFAULTS (src/lib/validation/dev-page.ts there): keep the two in step.
 *
 * Not here, on purpose: the team and the testimonials (Library on the admin, lib/studio.ts), the cookie banner's
 * words (Global elements), the brand marks, the product windows, the addresses in lib/site.ts, the form's error
 * messages, and llms.txt, which is its own summary.
 */

type Check = string[];

export interface Content {
  nav: { links: string[]; button: string };
  hero: { facts: { value: string; label: string }[]; title: string; subtitle: string; primary: string; secondary: string };
  brands: { label: string };
  products: { heading: string; subtitle: string; items: { name: string; title: string; text: string; checks: Check }[] };
  projects: {
    heading: string;
    subtitle: string;
    button: string;
    labBadge: string;
    studioBadge: string;
    items: { title: string; text: string; meta: string }[];
  };
  versus: {
    heading: string;
    subtitle: string;
    them: string;
    rows: { what: string; them: string; us: string }[];
    note: string;
    source: string;
  };
  services: { heading: string; subtitle: string; button: string; items: { name: string; title: string; text: string; checks: Check }[] };
  process: {
    heading: string;
    intro: string;
    link: string;
    outro: string;
    steps: { title: string; text: string }[];
    principles: { title: string; text: string }[];
  };
  engage: { heading: string; subtitle: string; button: string; formats: { name: string; terms: string; title: string; checks: Check }[] };
  stack: { heading: string; subtitle: string; button: string; items: { name: string; role: string }[] };
  team: { heading: string; subtitle: string };
  testimonials: { heading: string; subtitle: string };
  faq: { heading: string; subtitle: string; items: { q: string; a: string }[] };
  contact: {
    heading: string;
    subtitle: string;
    quick: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      serviceLabel: string;
      servicePlaceholder: string;
      /** One per option, in the form's order; the option's id stays with its slot (components/ContactForm.tsx). */
      services: string[];
      aboutLabel: string;
      aboutPlaceholder: string;
      button: string;
      sending: string;
      checking: string;
      /** {name} is the visitor's first name. */
      thanks: string;
      /** {email} is the address they gave. */
      received: string;
    };
  };
  footer: {
    blurb: string;
    primary: string;
    secondary: string;
    devTitle: string;
    studioTitle: string;
    contactTitle: string;
    /** WeTrio studio, About, Cases, Journal, Careers: each label stays with its link. */
    studioLinks: string[];
    privacy: string;
    terms: string;
    copyright: string;
  };
}

export const DEV_CONTENT: Content = {
  nav: { links: ["Products", "Projects", "Services", "Process", "FAQ"], button: "Get a free audit" },
  hero: {
    /* Kirill's numbers (31.10). Years are the team's experience: the studio itself dates from 2024. */
    facts: [
      { value: "40+", label: "products shipped" },
      { value: "9+", label: "years of experience" },
      { value: "1 week", label: "to a live demo" },
    ],
    title: "SaaS and web apps, <br>designed and built <em>by one team.</em>",
    subtitle: "Product design and engineering under one roof, so nothing gets lost between designer and developer.",
    primary: "Get a free audit",
    secondary: "See the products",
  },
  brands: { label: "Trusted by leading brands" },
  products: {
    heading: "Products we build<br><em>and keep running.</em>",
    subtitle:
      "Three products we run every day: a SaaS with paying customers, the platform the studio works in and the studio site.",
    items: [
      {
        name: "AI SaaS platform",
        title: "wetria: AI slide design on the client's own template.",
        text: "A SaaS with paying customers: upload a deck, get it back designed and still editable in PowerPoint, Keynote, Google Slides or Figma.",
        checks: ["Sign-up, plans and promo codes on Stripe", "An AI pipeline with render workers for PPTX and PDF", "Usage limits, abuse control and moderation in the Hub"],
      },
      {
        name: "CRM and operations platform",
        title: "WeTrio Hub: the platform the studio runs on.",
        text: "Clients, projects, tasks, timesheets, finance, mail and meetings in one place, with access by role. It replaced ClickUp for the whole team.",
        checks: ["Role-based access for admins, leads and designers", "Mail, meetings and chat with call transcripts", "A client portal reading the same API"],
      },
      {
        name: "Website and CMS",
        title: "wetr.io: the studio's site and the admin behind it.",
        text: "The team edits cases, the journal, FAQ and SEO without a developer. Every enquiry is encrypted.",
        checks: ["A CMS the team runs without a developer", "Encrypted enquiry intake", "GA4, Clarity and Meta Pixel under cookie consent"],
      },
    ],
  },
  projects: {
    heading: "Selected work,<br><em>all of it live.</em>",
    subtitle: "Front-end builds by our engineers alongside websites designed by the studio.",
    button: "All studio cases",
    labBadge: "Built by WeTrio Dev",
    studioBadge: "Designed by the studio",
    items: [
      {
        title: "Nordhaus",
        text: "A landing page for an architecture practice: masked reveals, a pinned work section and a sticky card stack, all driven by scroll.",
        meta: "Vanilla JS · no dependencies · 30 KB",
      },
      {
        title: "Halden Gallery",
        text: "A virtual showroom in WebGL: four full-scale interiors in one enfilade, the scroll wheel walks the camera through them.",
        meta: "Three.js · procedural geometry",
      },
      {
        title: "Parklab",
        text: "Six design directions for a playground builder in one header, each with a 3D model you can orbit and re-finish.",
        meta: "Three.js · image-to-3D",
      },
      {
        title: "Invideos / MaaS",
        text: "A landing page for a cloud video analytics SaaS, built for trust and a clear offer.",
        meta: "SaaS landing page",
      },
      {
        title: "AutoPharm",
        text: "A corporate site that turns dense industrial engineering data into visible proof of reliability.",
        meta: "Corporate website",
      },
      {
        title: "Snappymob",
        text: "A landing page for a digital development company: services, expertise and client results.",
        meta: "Landing page",
      },
      {
        title: "Sensin",
        text: "A sustainable care brand site built around product storytelling and a checkout that converts.",
        meta: "E-commerce website",
      },
      {
        title: "Yuwab",
        text: "A multi-page coaching website built to present services and guide visitors to a first call.",
        meta: "Multi-page website",
      },
    ],
  },
  versus: {
    heading: "Why not just<br><em>build it with AI?</em>",
    subtitle:
      "AI builders are great for a demo. A product people pay for needs a team. We use AI too, behind people who answer for the result.",
    them: "AI app builders",
    rows: [
      { what: "Starts from", them: "A prompt", us: "Your business: who it is for and what it has to prove" },
      { what: "The design", them: "A template look", us: "A design studio's craft, built around your users" },
      { what: "Security", them: "Flaws in 45% of generated code*", us: "Reviewed code, tested sign-in and payments" },
      { what: "Real users", them: "Falls apart after a few iterations", us: "Built to hold real traffic and keep growing" },
      { what: "The code", them: "Generated, hard to hand over", us: "Clean, documented and yours from day one" },
      { what: "When something breaks", them: "You are on your own", us: "A team that monitors, fixes and keeps shipping" },
    ],
    note: "* OWASP Top-10 flaws in 45% of AI coding tasks across 100+ models,",
    source: "Veracode, 2025",
  },
  services: {
    heading: "What we build,<br><em>at any stage.</em>",
    subtitle:
      "An idea, a half-built MVP or a live product someone else started: we join where you are, take over the code if there is any, and keep it shipping.",
    button: "Get a free audit",
    /* Each kind of work says who it is for, what you get and how soon (Kirill's audit, 31.10). */
    items: [
      {
        name: "SaaS platforms",
        title: "For founders turning a service into a subscription product.",
        text: "Sign-up, plans and billing, roles, and an admin your team runs without a developer.",
        checks: ["Stripe subscriptions and invoices", "Workspaces and roles", "Admin, moderation and usage limits"],
      },
      {
        name: "Web applications and portals",
        title: "For companies whose clients or partners need their own login.",
        text: "Client portals, marketplaces and booking flows that work on a phone first.",
        checks: ["Sign-in by magic link or password", "Files, invoices and exports", "Usable from the keyboard and a screen reader"],
      },
      {
        name: "Mobile apps",
        title: "For products people reach for on the go.",
        text: "iOS and Android apps that share one backend with your web product, so both stay in step.",
        checks: ["iOS and Android", "One backend for web and mobile", "Push notifications"],
      },
      {
        name: "Dashboards and internal tools",
        title: "For teams running operations from spreadsheets.",
        text: "One place for the numbers and tasks a team acts on, with access by role.",
        checks: ["Live data from the systems you already run", "Role-based access", "Digests to mail and Telegram"],
      },
      {
        name: "AI features and automation",
        title: "For teams losing hours to repeatable work.",
        text: "Assistants, summaries and document checks inside the tools you already use, measured by the hours they save.",
        checks: ["Claude and OpenAI models", "Call transcripts and summaries", "Document rendering and checks"],
      },
      {
        name: "Integrations and APIs",
        title: "For products that have to talk to other tools.",
        text: "Billing, mail, chat and your data warehouse connected without manual steps.",
        checks: ["Stripe, Supabase, Telegram, Deepgram", "A public API with keys", "Webhooks with retries"],
      },
      {
        name: "MVPs and prototypes",
        title: "For founders who need proof before a bigger build.",
        text: "A live demo in one week, then a first version you can put in front of investors and first users.",
        checks: ["Clickable on its own URL", "Real content, not placeholders", "Grows into the product instead of being thrown away"],
      },
    ],
  },
  process: {
    heading: "From first brief<br><em>to production.</em>",
    intro: "Short loops, live software, no hidden phases. WeTrio Dev is part of",
    link: "WeTrio",
    outro: ", a B2B design studio. The same standards apply to code.",
    steps: [
      {
        title: "Discover",
        text: "One sprint to define what the product must prove. We start with the business problem, not the feature list.",
      },
      {
        title: "Design and prototype",
        text: "Architecture and interface take shape together. In one week you open a live demo on its own link.",
      },
      {
        title: "Build and iterate",
        text: "Short releases on a live product. Every decision is checked against real software, with you in the loop.",
      },
      {
        title: "Launch and support",
        text: "We harden the product for production and stay on: monitoring, fixes, iterations and new features.",
      },
    ],
    principles: [
      {
        title: "Working software from week one",
        text: "Every project is a live deployment from the first weeks. Reviews happen in the browser, on the real thing.",
      },
      {
        title: "Design is part of the build",
        text: "We share one design language with the studio. Speed never excuses a careless interface.",
      },
      {
        title: "A small senior team",
        text: "The people who scope the product build it. No hand-offs between departments, no six-month roadmaps before the first click.",
      },
      {
        title: "You own the code",
        text: "The repository, the infrastructure and the accounts are yours from day one. Leaving is never a negotiation.",
      },
    ],
  },
  engage: {
    heading: "Three ways to work,<br><em>priced before we start.</em>",
    subtitle: "Every engagement starts with the free audit, and the price is agreed before any work begins.",
    button: "Get a free audit",
    /* Three formats without prices (Kirill's pick, 31.10): what each is for, how it is priced, what you get. */
    formats: [
      {
        name: "Discovery sprint",
        terms: "1–2 weeks · fixed price",
        title: "For an idea or a product that needs a plan.",
        checks: ["Scope and architecture", "A live demo on its own link", "An estimate for the first version"],
      },
      {
        name: "First version",
        terms: "Fixed scope · fixed price",
        title: "For a product ready to be built.",
        checks: ["Weekly releases on a live URL", "Design and engineering in one team", "Launch, monitoring and handover"],
      },
      {
        name: "Product team",
        terms: "Monthly",
        title: "For a live product that has to keep moving.",
        checks: ["New features and fixes every week", "Monitoring and support", "A team that already knows your code"],
      },
    ],
  },
  stack: {
    heading: "Built on a stack<br><em>we run in production.</em>",
    subtitle: "No experiments on your budget. Every tool below runs our own products today.",
    button: "See the products",
    items: [
      { name: "Next.js", role: "Framework" },
      { name: "React", role: "Interface" },
      { name: "TypeScript", role: "Language" },
      { name: "Tailwind CSS", role: "Styling" },
      { name: "Supabase", role: "Auth and data" },
      { name: "PostgreSQL", role: "Database" },
      { name: "Stripe", role: "Billing" },
      { name: "Cloudflare", role: "DNS and edge" },
      { name: "Coolify", role: "Deploys" },
      { name: "Docker", role: "Containers" },
      { name: "Claude API", role: "AI features" },
      { name: "Playwright", role: "Testing" },
    ],
  },
  team: {
    heading: "The people behind<br><em>your product.</em>",
    subtitle: "A small senior team. The people who scope your product stay on it through launch and after.",
  },
  testimonials: {
    heading: "What clients say<br><em>about working with us.</em>",
    subtitle: "Reviews of WeTrio, the studio behind wetrio.dev.",
  },
  faq: {
    heading: "Questions,<br><em>answered.</em>",
    subtitle: "Everything people ask before the first call. Not here? Write to us, a person answers.",
    /* Read by the section, by the FAQPage JSON-LD and by llms.txt, so the three never disagree. */
    items: [
      {
        q: "How soon do we see something working?",
        a: "In one week: a live demo of your product on its own link, so you review the real thing in a browser, not a slide.",
      },
      {
        q: "What does it cost to start?",
        a: "Nothing. The audit is free: a 30-minute call, then a short plan with what to build first and a fixed price for the first sprint.",
      },
      {
        q: "Can you take over a product someone else started?",
        a: "Yes. We audit the code and the infrastructure, fix what is fragile and keep building. An idea, a half-built MVP or a live product: we join at any stage.",
      },
      {
        q: "Can you work with our in-house team?",
        a: "Yes. We work in your repository and your chat, and take on one part of the product or the whole design and build.",
      },
      {
        q: "Do you build mobile apps?",
        a: "Yes. iOS and Android apps, usually sharing one backend with the web product so the two stay in step.",
      },
      {
        q: "Where is the team? Does the time zone matter?",
        a: "Our team works from several countries, so the time zone is never in the way: we fit one weekly call into your day, and the work keeps moving while you sleep.",
      },
      {
        q: "How often do we meet and see progress?",
        a: "Once a week, with a demo of what shipped. Between calls the progress is on a live URL you can open any time.",
      },
      {
        q: "Do you sign an NDA?",
        a: "Yes. We sign yours before you share any details.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The repository, the infrastructure and the accounts are yours from day one.",
      },
      {
        q: "What happens after launch?",
        a: "We stay on: monitoring, fixes, iterations and new features under a monthly agreement or per task.",
      },
      {
        q: "Which stack do you use?",
        a: "Next.js, TypeScript, Supabase or PostgreSQL, Stripe and Cloudflare. The same stack runs our own products.",
      },
    ],
  },
  contact: {
    heading: "Get a free audit<br>of your product.",
    subtitle:
      "Tell us about your product. We reply within one business day. Get the audit: what to build first, what it takes and when you can click it.",
    quick: "Prefer a quick message?",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Work email",
      emailPlaceholder: "you@company.com",
      serviceLabel: "What are you building?",
      servicePlaceholder: "Choose one",
      services: [
        "SaaS platform",
        "Web application or portal",
        "Mobile app",
        "Dashboard or internal tool",
        "AI features and automation",
        "Integrations and APIs",
        "MVP or prototype",
        "A product already in progress",
        "Something else",
      ],
      aboutLabel: "About the product",
      aboutPlaceholder: "What it does, who it is for, where it stands today",
      button: "Get my free audit",
      sending: "Sending…",
      checking: "Checking the connection…",
      thanks: "Thanks, {name}.",
      received: "Your request is with the team. We reply to {email} within one business day to book a short call.",
    },
  },
  footer: {
    blurb: "SaaS and web apps by WeTrio, a B2B design studio. Product design and engineering under one roof.",
    primary: "Get a free audit",
    secondary: "See the products",
    devTitle: "WeTrio Dev",
    studioTitle: "Studio",
    contactTitle: "Contact",
    studioLinks: ["WeTrio studio", "About", "Cases", "Journal", "Careers"],
    privacy: "Privacy",
    terms: "Terms",
    copyright: "WeTrio. All rights reserved.",
  },
};

/* ── reading the row over the defaults ─────────────────────────────────────────────────────────────────────────── */

const str = (x: unknown, fallback: string) => (typeof x === "string" && x.trim() ? x.trim() : fallback);
const obj = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const arr = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);

/** Every string of a section: the stored one where it has words, the page's own where it does not. */
function strings<T extends object>(stored: unknown, fallback: T): T {
  const s = obj(stored);
  const out: Record<string, unknown> = Object.fromEntries(Object.entries(fallback));
  for (const [k, v] of Object.entries(fallback)) if (typeof v === "string") out[k] = str(s[k], v);
  return out as T;
}

/** A list of lines (a card's checks): the stored lines when there are any, else the page's own. */
function lines(stored: unknown, fallback: string[]): string[] {
  const list = arr(stored).map((x) => str(x, "")).filter(Boolean);
  return list.length ? list : fallback;
}

/** Fixed slots of single words (the menu, the form's options): each slot falls back on its own. */
const words = (stored: unknown, fallback: string[]) => fallback.map((f, i) => str(arr(stored)[i], f));

/** Fixed slots of cards (a product, a project, a step): each slot falls back on its own, its checks too. */
function slots<T extends object>(stored: unknown, fallback: T[]): T[] {
  return fallback.map((f, i) => {
    const s = arr(stored)[i];
    const out = strings(s, f) as T & { checks?: string[] };
    return "checks" in f ? { ...out, checks: lines(obj(s).checks, (f as { checks: string[] }).checks) } : out;
  });
}

/** A list the editor can lengthen or shorten: taken whole when it has a full row, else the page's own. A row with an
 *  empty cell is dropped rather than drawn with a hole in it; a row's checks may be empty. */
function rows<T extends object>(stored: unknown, fallback: T[]): T[] {
  const keys = Object.keys(fallback[0]).filter((k) => k !== "checks");
  const withChecks = "checks" in fallback[0];
  const full = arr(stored)
    .map(obj)
    .map((r) => {
      const row: Record<string, unknown> = Object.fromEntries(keys.map((k) => [k, str(r[k], "")]));
      if (withChecks) row.checks = lines(r.checks, []);
      return row;
    })
    .filter((r) => keys.every((k) => r[k]));
  return full.length ? (full as T[]) : fallback;
}

/** The stored content (pages.dev.content) over the page's own words. */
export function devContent(content: unknown): Content {
  const c = obj(content);
  const d = DEV_CONTENT;
  const section = (k: keyof Content) => obj(c[k]);
  return {
    nav: { ...strings(c.nav, d.nav), links: words(section("nav").links, d.nav.links) },
    hero: { ...strings(c.hero, d.hero), facts: slots(section("hero").facts, d.hero.facts) },
    brands: strings(c.brands, d.brands),
    products: { ...strings(c.products, d.products), items: slots(section("products").items, d.products.items) },
    projects: { ...strings(c.projects, d.projects), items: slots(section("projects").items, d.projects.items) },
    versus: { ...strings(c.versus, d.versus), rows: rows(section("versus").rows, d.versus.rows) },
    services: { ...strings(c.services, d.services), items: rows(section("services").items, d.services.items) },
    process: {
      ...strings(c.process, d.process),
      steps: slots(section("process").steps, d.process.steps),
      principles: slots(section("process").principles, d.process.principles),
    },
    engage: { ...strings(c.engage, d.engage), formats: slots(section("engage").formats, d.engage.formats) },
    stack: { ...strings(c.stack, d.stack), items: slots(section("stack").items, d.stack.items) },
    team: strings(c.team, d.team),
    testimonials: strings(c.testimonials, d.testimonials),
    faq: { ...strings(c.faq, d.faq), items: rows(section("faq").items, d.faq.items) },
    contact: {
      ...strings(c.contact, d.contact),
      form: {
        ...strings(section("contact").form, d.contact.form),
        services: words(obj(section("contact").form).services, d.contact.form.services),
      },
    },
    footer: { ...strings(c.footer, d.footer), studioLinks: words(section("footer").studioLinks, d.footer.studioLinks) },
  };
}

export type Seo = { title: string; description: string; canonical: string; ogImage: string; noindex: boolean };

/** The search block (pages.dev.seo): the site's own title and description while the admin leaves them empty. */
export function devSeo(seo: unknown): Seo {
  const s = obj(seo);
  return {
    title: str(s.title, TITLE),
    description: str(s.description, DESCRIPTION),
    canonical: str(s.canonical, ""),
    ogImage: str(s.og_image ?? s.ogImage, ""),
    noindex: s.noindex === true,
  };
}

/** One read per request for the layout, the page and llms.txt; hourly, like the rest of lib/studio.ts. */
const loadRow = cache(async () => {
  const rows = await rest<{ content?: unknown; seo?: unknown }[]>("pages?id=eq.dev&status=eq.published&select=content,seo");
  return rows?.[0] ?? null;
});

export async function loadContent(): Promise<Content> {
  return devContent((await loadRow())?.content);
}

export async function loadSeo(): Promise<Seo> {
  return devSeo((await loadRow())?.seo);
}

const norm = (s: string) =>
  s
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/\s*<br\s*\/?>\s*/gi, "<br>")
    .replace(/\s+/g, " ")
    .trim();

/** True when a heading is still the page's own, so the section can keep its hand-set breaks. */
export const isDefaultHeading = (value: string, fallback: string) => norm(value) === norm(fallback);
