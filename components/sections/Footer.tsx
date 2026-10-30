import { Logo } from "../Logo";
import { ContactLinks } from "../ContactLinks";
import { CookieSettingsLink } from "../CookieBanner";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Lab",
    links: [
      { label: "Products", href: "#products" },
      { label: "Projects", href: "#projects" },
      { label: "What we build", href: "#build" },
      { label: "Process", href: "#process" },
      { label: "Demos", href: "https://demo.wetrio.dev" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "wetr.io", href: "https://wetr.io" },
      { label: "Cases", href: "https://wetr.io/projects" },
      { label: "Journal", href: "https://wetr.io/journal" },
      { label: "Careers", href: "https://wetr.io/careers" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "wetria", href: "https://wetr.io/wetria" },
      { label: "Analyzer", href: "https://wetr.io/analyzer" },
      { label: "Client portal", href: "https://portal.wetr.io" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "https://wetr.io/privacy" },
      { label: "Terms", href: "https://wetr.io/terms" },
    ],
  },
];

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function Footer() {
  return (
    <footer>
      <div className="wrap grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.2fr_2fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Software products by WeTrio, a B2B design studio. Architecture, design, engineering and launch by one team.
          </p>
          <ContactLinks order={["email", "telegram"]} place="footer" className="mt-6" />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-xs uppercase tracking-wider text-muted">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...external(l.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
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
        <div className="flex items-center gap-4">
          <CookieSettingsLink />
          <p>wetrio.dev · WeTrio Development Lab</p>
        </div>
      </div>
    </footer>
  );
}
