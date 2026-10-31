import { Logo } from "../Logo";
import { CookieSettingsLink } from "../CookieBanner";
import { BEHANCE_URL, CONTACT_EMAIL, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/site";

/* Three columns as on wetr.io's footer (Kirill, 31.10): ours, the studio, the contacts. Legal moved to the bottom line. */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "WeTrio Dev",
    links: [
      { label: "Products", href: "#products" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "WeTrio studio", href: "https://wetr.io" },
      { label: "About", href: "https://wetr.io/#about" },
      { label: "Cases", href: "https://wetr.io/projects" },
      { label: "Journal", href: "https://wetr.io/journal" },
      { label: "Careers", href: "https://wetr.io/careers" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: "Telegram", href: TELEGRAM_URL },
      { label: "WhatsApp", href: WHATSAPP_URL },
      { label: "Behance", href: BEHANCE_URL },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "https://wetr.io/privacy" },
  { label: "Terms", href: "https://wetr.io/terms" },
];

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function Footer() {
  return (
    <footer>
      <div className="wrap flex flex-col gap-12 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            SaaS and web apps by WeTrio, a B2B design studio. Product design and engineering under one roof.
          </p>
          {/* the hero's two buttons (Kirill, 30.10) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              Get a free audit
            </a>
            <a href="#products" className="btn btn-secondary">
              See the products
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 md:gap-x-16 lg:gap-x-20">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold text-foreground">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...external(l.href)} className="inline-block py-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-white/[0.08] py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} WeTrio. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {LEGAL.map((l) => (
            <a key={l.label} href={l.href} {...external(l.href)} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  );
}
