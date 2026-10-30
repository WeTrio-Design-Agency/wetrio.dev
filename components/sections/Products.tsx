"use client";

import { useState } from "react";
import { Fluid } from "../Fluid";
import { Spark } from "../Icons";
import { Reveal } from "../Reveal";
import { Checks, WetriaWindow } from "../mocks/Windows";
import { Fit } from "../mocks/Fit";
import { HubWindow } from "../mocks/HubWindow";
import { SiteWindow } from "../mocks/Shots";

const PRODUCTS: { id: string; name: string; title: string; text: string; checks: string[]; width: number; window: React.ReactNode }[] = [
  {
    id: "site",
    name: "wetr.io",
    title: "The studio site.",
    text: "Cases, journal, FAQ and SEO edited by the team in its own admin. Leads arrive encrypted, pass Turnstile and reach the Hub.",
    checks: ["Content edited by the team, not by code", "Encrypted intake with a virus scan", "GA4, Clarity and Meta under consent"],
    width: 1440,
    window: <SiteWindow />,
  },
  {
    id: "wetria",
    name: "wetria",
    title: "AI slide design on your own template.",
    text: "Upload a deck, get it back designed and still editable in PowerPoint, Keynote, Google Slides or Figma. A SaaS with paying customers.",
    checks: ["Stripe subscriptions and promo codes", "Render workers for PPTX and PDF", "Moderation inside the Hub"],
    width: 1700,
    window: <WetriaWindow />,
  },
  {
    id: "hub",
    name: "WeTrio Hub",
    title: "The studio runs on it.",
    text: "Clients, projects, tasks, timesheets, finance, mail and meetings in one place. Role-based access, a Telegram bot and a daily digest.",
    checks: ["Replaced ClickUp for the whole team", "Mail, meetings and chat with transcripts", "The client portal reads from the same API"],
    width: 1440,
    window: <HubWindow />,
  },
];

export function Products() {
  const [active, setActive] = useState(0);
  const current = PRODUCTS[active];

  return (
    <section id="products" className="wrap scroll-mt-20 py-20 md:py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal>
            <span className="tag">
              <Spark className="h-3 w-3 text-foreground" />
              Products
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Products we build
            <br />
            <span className="h-dim">and keep running.</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Our own operations platform, a SaaS with paying customers and the studio site. Same team, same stack we offer
          you.
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal className="surface rounded-card">
          {PRODUCTS.map((p, i) => {
            const open = i === active;
            return (
              <div key={p.id} className={i > 0 ? "border-t border-white/[0.08]" : ""}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`product-${p.id}`}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left md:px-8"
                >
                  <span className="w-6 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 text-lg font-medium ${open ? "text-foreground" : "text-muted-foreground"}`}>{p.name}</span>
                  <span className={`h-2 w-2 rounded-full transition-colors ${open ? "bg-foreground" : "bg-white/15"}`} />
                </button>
                <div
                  id={`product-${p.id}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-7 pl-[4.25rem] md:px-8 md:pl-[4.75rem]">
                      <p className="text-xl font-medium">{p.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.text}</p>
                      <Checks items={p.checks} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={0.1} className="relative h-[200px] overflow-hidden rounded-card md:h-[420px]">
          <Fluid seed={2.1} />
          {/* Fit carries position and scale; the fade runs on the inner div, so the two transforms do not fight */}
          <Fit key={current.id} width={current.width}>
            <div className="swap-in">{current.window}</div>
          </Fit>
        </Reveal>
      </div>
    </section>
  );
}
