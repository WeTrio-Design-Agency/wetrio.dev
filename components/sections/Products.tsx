"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import { Fluid } from "../Fluid";
import { Reveal } from "../Reveal";
import { Checks, WetriaWindow } from "../mocks/Windows";
import { Fit } from "../mocks/Fit";
import { HubWindow } from "../mocks/HubWindow";
import { SiteWindow } from "../mocks/Shots";
import { Rich } from "../Rich";

/* Named by what each one is, with the product's name inside (Kirill, 30.10); the studio site goes last. The words are
   the admin's (lib/content.ts), one slot per product; the window stays with its slot. */
const PRODUCTS: { id: string; width: number; window: React.ReactNode }[] = [
  { id: "wetria", width: 1700, window: <WetriaWindow /> },
  { id: "hub", width: 1440, window: <HubWindow /> },
  { id: "site", width: 1440, window: <SiteWindow /> },
];

export function Products({ copy }: { copy: Content["products"] }) {
  const [active, setActive] = useState(0);
  const current = PRODUCTS[active];
  const items = PRODUCTS.map((p, i) => ({ ...p, ...copy.items[i] }));

  return (
    <section id="products" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            <Rich text={copy.heading} />
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.subtitle}
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal className="surface rounded-card">
          {items.map((p, i) => {
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
