import type { Content } from "@/lib/content";
import { Logo } from "../Logo";
import { CookieSettingsLink } from "../CookieBanner";
import { BEHANCE_URL, CONTACT_EMAIL, NAV_HREFS, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/site";

/* Three columns as on wetr.io's footer (Kirill, 31.10): ours, the studio, the contacts. Legal moved to the bottom line.
   The words are the admin's (lib/content.ts): our column repeats the menu's, each label stays with its link. */
const STUDIO_HREFS = [
  "https://wetr.io",
  "https://wetr.io/#about",
  "https://wetr.io/projects",
  "https://wetr.io/journal",
  "https://wetr.io/careers",
];

function columns(copy: Content["footer"], nav: Content["nav"]): { title: string; links: { label: string; href: string }[] }[] {
  return [
    // the menu's first four: Products, Projects, Services, Process
    { title: copy.devTitle, links: NAV_HREFS.slice(0, 4).map((href, i) => ({ label: nav.links[i], href })) },
    { title: copy.studioTitle, links: STUDIO_HREFS.map((href, i) => ({ label: copy.studioLinks[i], href })) },
    {
      title: copy.contactTitle,
      links: [
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        { label: "Telegram", href: TELEGRAM_URL },
        { label: "WhatsApp", href: WHATSAPP_URL },
        { label: "Behance", href: BEHANCE_URL },
      ],
    },
  ];
}

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function Footer({ copy, nav }: { copy: Content["footer"]; nav: Content["nav"] }) {
  const COLUMNS = columns(copy, nav);
  const LEGAL = [
    { label: copy.privacy, href: "https://wetr.io/privacy" },
    { label: copy.terms, href: "https://wetr.io/terms" },
  ];
  return (
    <footer>
      <div className="wrap flex flex-col gap-12 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {copy.blurb}
          </p>
          {/* the hero's two buttons (Kirill, 30.10) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              {copy.primary}
            </a>
            <a href="#products" className="btn btn-secondary">
              {copy.secondary}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 md:gap-x-16 lg:gap-x-20">
          {COLUMNS.map((c) => (
            <div key={c.links[0]?.href}>
              <p className="text-sm font-semibold text-foreground">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
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
        <p>© {new Date().getFullYear()} {copy.copyright}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {LEGAL.map((l) => (
            <a key={l.href} href={l.href} {...external(l.href)} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  );
}
