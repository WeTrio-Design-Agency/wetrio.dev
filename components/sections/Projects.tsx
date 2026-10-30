import Image from "next/image";
import { ArrowUpRight } from "../Icons";
import { Reveal } from "../Reveal";

type Project = {
  title: string;
  text: string;
  meta: string;
  href: string;
  image: string;
  by: "lab" | "studio";
};

/* The Lab's own front-end builds on their subdomains, and websites the studio designed (public cases on wetr.io). */
const PROJECTS: Project[] = [
  {
    title: "Nordhaus",
    text: "A landing page for an architecture practice: masked reveals, a pinned work section and a sticky card stack, all driven by scroll.",
    meta: "Vanilla JS · no dependencies · 30 KB",
    href: "https://nordhaus.demo.wetrio.dev",
    image: "/demos/nordhaus.jpg",
    by: "lab",
  },
  {
    title: "Halden Gallery",
    text: "A virtual showroom in WebGL: four full-scale interiors in one enfilade, the scroll wheel walks the camera through them.",
    meta: "Three.js · procedural geometry",
    href: "https://halden.demo.wetrio.dev",
    image: "/demos/halden.jpg",
    by: "lab",
  },
  {
    title: "Parklab",
    text: "Six design directions for a playground builder in one header, each with a 3D model you can orbit and re-finish.",
    meta: "Three.js · image-to-3D",
    href: "https://parklab.demo.wetrio.dev/overview.html",
    image: "/demos/parklab.jpg",
    by: "lab",
  },
  {
    title: "Invideos / MaaS",
    text: "A landing page for a cloud video analytics SaaS, built for trust and a clear offer.",
    meta: "SaaS landing page",
    href: "https://wetr.io/projects/invideos-maas-saas-landing-page",
    image: "/cases/invideos-maas-saas-landing-page.webp",
    by: "studio",
  },
  {
    title: "AutoPharm",
    text: "A corporate site that turns dense industrial engineering data into visible proof of reliability.",
    meta: "Corporate website",
    href: "https://wetr.io/projects/autopharm-pharmaceutical-automation-website",
    image: "/cases/autopharm-pharmaceutical-automation-website.webp",
    by: "studio",
  },
  {
    title: "Snappymob",
    text: "A landing page for a digital development company: services, expertise and client results.",
    meta: "Landing page",
    href: "https://wetr.io/projects/snappymob-landing-page-design",
    image: "/cases/snappymob-landing-page-design.webp",
    by: "studio",
  },
  {
    title: "Sensin",
    text: "A sustainable care brand site built around product storytelling and a checkout that converts.",
    meta: "E-commerce website",
    href: "https://wetr.io/projects/sensin-personal-care-website",
    image: "/cases/sensin-personal-care-website.webp",
    by: "studio",
  },
  {
    title: "Yuwab",
    text: "A multi-page coaching website built to present services and guide visitors to a first call.",
    meta: "Multi-page website",
    href: "https://wetr.io/projects/yuwab-coaching-website-design",
    image: "/cases/yuwab-coaching-website-design.webp",
    by: "studio",
  },
];

export function Projects() {
  return (
    <section id="projects" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-[clamp(2.75rem,4.2vw,3.75rem)]">
            Selected work,
            <br />
            <span className="h-dim">all of it live.</span>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Front-end builds by the Lab alongside websites designed by the studio.
          </p>
          <a href="https://wetr.io/projects" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            All studio cases
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={0.05 * (i % 4)}>
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
                    {p.by === "lab" ? "Built by the Lab" : "Designed by the studio"}
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
