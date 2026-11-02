import Image from "next/image";
import type { Content } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";

type Project = {
  href: string;
  image: string;
  by: "lab" | "studio";
};

/* Our own front-end builds on their subdomains, and websites the studio designed (public cases on wetr.io). The words
   are the admin's (lib/content.ts), one slot per card; the link and the picture stay with their slot. */
const PROJECTS: Project[] = [
  { href: "https://nordhaus.demo.wetrio.dev", image: "/demos/nordhaus.jpg", by: "lab" },
  { href: "https://halden.demo.wetrio.dev", image: "/demos/halden.jpg", by: "lab" },
  { href: "https://parklab.demo.wetrio.dev/overview.html", image: "/demos/parklab.jpg", by: "lab" },
  { href: "https://wetr.io/projects/invideos-maas-saas-landing-page", image: "/cases/invideos-maas-saas-landing-page.webp", by: "studio" },
  { href: "https://wetr.io/projects/autopharm-pharmaceutical-automation-website", image: "/cases/autopharm-pharmaceutical-automation-website.webp", by: "studio" },
  { href: "https://wetr.io/projects/snappymob-landing-page-design", image: "/cases/snappymob-landing-page-design.webp", by: "studio" },
  { href: "https://wetr.io/projects/sensin-personal-care-website", image: "/cases/sensin-personal-care-website.webp", by: "studio" },
  { href: "https://wetr.io/projects/yuwab-coaching-website-design", image: "/cases/yuwab-coaching-website-design.webp", by: "studio" },
];

export function Projects({ copy }: { copy: Content["projects"] }) {
  const items = PROJECTS.map((p, i) => ({ ...p, ...copy.items[i] }));
  return (
    <section id="projects" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            <Rich text={copy.heading} />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.subtitle}
          </p>
          <a href="https://wetr.io/projects" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            {copy.button}
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.href} delay={0.05 * (i % 4)}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="card-link surface block h-full rounded-card p-3">
              <span className="card-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-card-2">
                <Image
                  src={p.image}
                  alt={`${p.title}: ${p.meta}`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="px-3 pb-3 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-medium">{p.title}</span>
                  <span className={`shrink-0 text-xs ${p.by === "lab" ? "text-accent" : "text-muted"}`}>
                    {p.by === "lab" ? copy.labBadge : copy.studioBadge}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <p className="mt-3 text-xs text-muted">{p.meta}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
