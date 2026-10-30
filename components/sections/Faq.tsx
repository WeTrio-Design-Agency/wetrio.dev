"use client";

import { useState } from "react";
import { Minus, Plus } from "../Icons";
import { Reveal } from "../Reveal";
import { FAQ } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      {/* the words on the left, the questions on the right level with the heading (Kirill, 30.10) */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            Questions,
            <br />
            <span className="h-dim">answered.</span>
          </Reveal>
          <Reveal as="p" delay={0.15} className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Everything people ask before the first call. Not here? Write to us, a person answers.
          </Reveal>
        </div>

        <Reveal delay={0.1} className="surface rounded-card">
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
      </div>
    </section>
  );
}
