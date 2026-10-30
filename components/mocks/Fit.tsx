"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fits a product window into its panel (Kirill, 30.10: «экраны по ширине одинаково, всё ровно по отступам; могут
 * быть обрезаны снизу»): the window keeps its own width, is scaled to the panel's width less the same margin on each
 * side, sits centred with that margin above it too, and runs off the bottom edge only. Every window gets the same
 * margin, so they all come out the same width.
 */
export function Fit({ width, children, margin = 0.04 }: { width: number; children: React.ReactNode; margin?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setPanel(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gutter = panel * margin;
  const scale = (panel - 2 * gutter) / width;
  return (
    <div
      ref={ref}
      className="absolute left-1/2 origin-top"
      style={{ top: gutter, width, transform: `translateX(-50%) scale(${scale})`, visibility: panel ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}
