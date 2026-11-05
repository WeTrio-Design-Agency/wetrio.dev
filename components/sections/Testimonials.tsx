"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import type { Testimonial } from "@/lib/studio";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";

/**
 * What clients said, one quote at a time on a card that never changes size, after wetr.io's Testimonials: every
 * quote sits in the same grid cell, all but the active one invisible, so the cell measures the longest and the
 * controls never jump. Advances every 6 seconds, pauses under the pointer, swipes on a phone.
 */
export function Testimonials({ copy, items }: { copy: Content["testimonials"]; items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((step: number) => setActive((i) => (i + step + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, items.length, go]);

  if (!items.length) return null;

  return (
    <section id="reviews" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
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

      <Reveal delay={0.1} className="mt-14">
        <div
          className="surface rounded-card px-6 py-10 md:px-16 md:py-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setPaused(false);
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div className="grid" aria-live="polite" aria-atomic="true">
            {items.map((t, i) => (
              <figure
                key={t.author + i}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] flex flex-col transition-opacity duration-500 ${i === active ? "opacity-100" : "invisible opacity-0"}`}
              >
                <div className="flex gap-1 text-accent" role="img" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className={`h-4 w-4 ${s < t.rating ? "fill-current" : "fill-white/15"}`} aria-hidden="true">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-6 text-xl leading-relaxed md:text-2xl">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-medium text-foreground">{t.author}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {t.position}
                    {t.company ? ` at ${t.company}` : ""}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {items.length > 1 && (
            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {items.map((t, i) => (
                  <button
                    key={t.author + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show review ${i + 1} of ${items.length}`}
                    aria-current={i === active}
                    className="grid h-6 w-6 place-items-center"
                  >
                    <span className={`block h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-foreground" : "w-1.5 bg-white/25"}`} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-foreground hover:bg-white/10">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-foreground hover:bg-white/10">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
