"use client";

import { useState } from "react";
import { Fluid } from "../Fluid";
import { Minus, Plus, Spark } from "../Icons";
import { Reveal } from "../Reveal";

const FAQ = [
  {
    q: "How soon do we see something working?",
    a: "Within the first sprint. A clickable prototype lives on its own URL, usually two to four weeks after the brief.",
  },
  {
    q: "What does it cost to start?",
    a: "We scope a fixed-price first sprint after one call. The estimate lists what you get and when you can click it.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The repository, the infrastructure and the accounts are yours from day one.",
  },
  {
    q: "Do you design as well?",
    a: "Yes. The Lab is run by WeTrio, a B2B design studio. Interface and architecture are designed together.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on: monitoring, fixes, iterations and new features under a monthly agreement or per task.",
  },
  {
    q: "Which stack do you use?",
    a: "Next.js, TypeScript, Supabase or PostgreSQL, Stripe and Cloudflare. The same stack runs our own products.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="wrap scroll-mt-16 py-20 md:py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal>
            <span className="tag">
              <Spark className="h-3 w-3 text-foreground" />
              FAQ
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Questions,
            <br />
            <span className="h-dim">answered.</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Everything people ask before the first call. Not here? Write to us, a person answers.
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Reveal className="surface rounded-card">
          {FAQ.map((f, i) => {
            const isOpen = i === open;
            return (
              <div key={f.q} className={i > 0 ? "border-t border-white/[0.08]" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left md:px-8"
                >
                  <span className="w-6 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-base font-medium md:text-lg">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white/[0.06] text-foreground">
                    {isOpen ? <Minus /> : <Plus />}
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-[4.25rem] text-sm leading-relaxed text-muted-foreground md:px-8 md:pl-[4.75rem] md:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={0.1} className="relative min-h-[360px] overflow-hidden rounded-card">
          <Fluid seed={4.4} />
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
            <div className="glass w-full max-w-sm rounded-card p-6">
              <p className="text-lg font-medium">Still have questions?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ask about scope, timelines or the stack. We answer in person, in the channel you prefer.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="https://t.me/wetr_io" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Telegram
                </a>
                <a href="https://wa.me/48506782768" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  WhatsApp
                </a>
                <a href="mailto:start@wetr.io" className="btn btn-secondary btn-sm">
                  start@wetr.io
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
