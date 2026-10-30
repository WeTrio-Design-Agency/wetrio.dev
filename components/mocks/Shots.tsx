"use client";

/* eslint-disable @next/next/no-img-element -- a screenshot of our own site, shown as it is */

import { useEffect, useRef, useState } from "react";

/**
 * wetr.io as it is: a full-height screenshot of the live home page (public/products/site-home.jpg, refreshed with
 * tools/shots.cjs) scrolling through a 1440 x 960 window. The scroll starts when the window comes into view or the
 * product is opened, not when the page loads (Kirill, 30.10), and stops off screen.
 */
export function SiteWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[960px] w-[1440px] overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      aria-hidden="true"
    >
      <img src="/products/site-home.jpg" alt="" width={1440} height={8307} className={`block w-full ${playing ? "site-scroll" : ""}`} />
    </div>
  );
}
