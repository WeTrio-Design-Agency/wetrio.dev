"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Places a product window inside its panel and scales it with the panel (Kirill, 30.10: «картинка должна
 * адаптироваться под размер»). The window keeps its own layout width; `span` says how wide it is as a share of the
 * panel's width, `x` and `y` where its top-left corner sits, as shares of the panel's width. With the defaults the
 * window sits centred with the same 4% gutter on three sides and runs off the bottom (the Products panel); the hero
 * passes a span over 1 so the window runs off the right edge too, as the reference does.
 */
export function Fit({
  width,
  children,
  span = 0.92,
  x = (1 - span) / 2,
  y = 0.04,
  narrow,
}: {
  width: number;
  children: React.ReactNode;
  span?: number;
  x?: number;
  y?: number;
  /** The same three numbers for a panel under 640px wide, where a wider window keeps the picture legible. */
  narrow?: { span: number; x: number; y: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setPanel(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const p = panel < 640 && narrow ? narrow : { span, x, y };
  const scale = (panel * p.span) / width;
  return (
    <div
      ref={ref}
      className="absolute origin-top-left"
      style={{ left: panel * p.x, top: panel * p.y, width, transform: `scale(${scale})`, visibility: panel ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}
