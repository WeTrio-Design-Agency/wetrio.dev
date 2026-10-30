"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fits a product window into its panel (Kirill, 30.10: «все объекты-экраны в правой части должны быть выровнены по
 * центру; могут быть обрезаны снизу, но должно быть ровно»): the window keeps its own width, is scaled to the panel's
 * width less a margin on each side, sits centred, and runs off the bottom edge only.
 */
export function Fit({ width, children, margin = 0.06, top = "8%" }: { width: number; children: React.ReactNode; margin?: number; top?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const panel = ref.current?.parentElement;
    if (!panel) return;
    const ro = new ResizeObserver(([e]) => setScale((e.contentRect.width * (1 - 2 * margin)) / width));
    ro.observe(panel);
    return () => ro.disconnect();
  }, [width, margin]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 origin-top"
      style={{ top, width, transform: `translateX(-50%) scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}
