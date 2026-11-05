"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import { Glyph, type GlyphName } from "../Icons";
import { Reveal } from "../Reveal";
import { Checks } from "../mocks/Windows";
import { Rich } from "../Rich";

/**
 * The diagram after the reference (Kirill, 30.10): a chip in the middle with a slowly turning ring of dots, six
 * nodes on the axes and the diagonals, a white dot where each line leaves its node, lines with rounded turns into
 * the chip's sides, a bracket above and below the chip, and one horizontal trace across the whole width. Drawn on a
 * 520 x 520 grid; the nodes and the chip are HTML over the SVG so the glyphs stay crisp.
 */
const G = 520;
const C = G / 2;
const NODE = 64;
const CHIP = 140;
const NODES: { name: GlyphName; x: number; y: number }[] = [
  { name: "globe", x: C, y: 70 },
  { name: "sparkles", x: 430, y: 150 },
  { name: "wrench", x: 430, y: 370 },
  { name: "database", x: C, y: 450 },
  { name: "chat", x: 90, y: 370 },
  { name: "bot", x: 90, y: 150 },
];
const STROKE = "rgba(255,255,255,0.16)";

/** Where a node's line starts: the middle of the edge that faces the chip. */
function port(n: { x: number; y: number }) {
  return { x: n.x, y: n.y < C ? n.y + NODE / 2 : n.y - NODE / 2 };
}

/** The line from a node's port into the chip: straight for the axis nodes, down (or up) then across for the rest. */
function trace(n: { x: number; y: number }) {
  const p = port(n);
  const half = CHIP / 2;
  if (n.x === C) return n.y < C ? `M${p.x} ${p.y} V${C - half}` : `M${p.x} ${p.y} V${C + half}`;
  const r = 14;
  const dir = n.x < C ? 1 : -1; // towards the chip
  const vy = n.y < C ? C - 28 : C + 28; // the row the line runs along: above or below the middle trace
  const dy = n.y < C ? 1 : -1; // the line leaves the node going down (upper nodes) or up (lower nodes)
  const edgeX = C - dir * half;
  return `M${p.x} ${p.y} V${vy - dy * r} a${r} ${r} 0 0 ${dir * dy > 0 ? 0 : 1} ${dir * r} ${dy * r} H${edgeX}`;
}

function Diagram() {
  const half = CHIP / 2;
  const bracket = (dy: 1 | -1) => {
    // an open rounded bracket from the chip's edge, around the axis line, 45px out on each side
    const y0 = C - dy * half;
    const y1 = y0 - dy * 40;
    const r = 14;
    return `M${C - 45} ${y0} V${y1 + dy * r} a${r} ${r} 0 0 ${dy > 0 ? 1 : 0} ${r} ${-dy * r} H${C + 45 - r} a${r} ${r} 0 0 ${dy > 0 ? 1 : 0} ${r} ${dy * r} V${y0}`;
  };
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox={`0 0 ${G} ${G}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="trace-x" x1="0" x2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.35" stopColor="white" stopOpacity="0.24" />
            <stop offset="0.65" stopColor="white" stopOpacity="0.24" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="chip-glow">
            <stop offset="0" stopColor="#3b82f6" stopOpacity="0.28" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={150} fill="url(#chip-glow)" />
        {/* the middle trace across the whole width, fading at both ends */}
        <path d={`M0 ${C} H${C - half}`} stroke="url(#trace-x)" strokeWidth="1.5" fill="none" />
        <path d={`M${C + half} ${C} H${G}`} stroke="url(#trace-x)" strokeWidth="1.5" fill="none" />
        {/* the brackets above and below the chip */}
        <path d={bracket(1)} stroke={STROKE} strokeWidth="1.5" fill="none" />
        <path d={bracket(-1)} stroke={STROKE} strokeWidth="1.5" fill="none" />
        {NODES.map((n) => {
          const d = trace(n);
          return (
            <g key={n.name}>
              <path d={d} stroke={STROKE} strokeWidth="1.5" fill="none" />
              <path d={d} stroke="white" strokeWidth="1.5" fill="none" className="pulse-line" />
            </g>
          );
        })}
        {NODES.map((n) => {
          const p = port(n);
          return <circle key={n.name} cx={p.x} cy={p.y} r="4" fill="#f4f5f7" stroke="#0e1015" strokeWidth="2.5" />;
        })}
      </svg>
      {NODES.map((n) => (
        <span
          key={n.name}
          className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-card text-foreground ring-1 ring-white/10"
          style={{ left: `${(n.x / G) * 100}%`, top: `${(n.y / G) * 100}%`, width: `${(NODE / G) * 100}%`, aspectRatio: "1" }}
        >
          <Glyph name={n.name} className="h-[38%] w-[38%]" />
        </span>
      ))}
      <span
        className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[22%] bg-card ring-1 ring-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        style={{ width: `${(CHIP / G) * 100}%`, aspectRatio: "1" }}
      >
        <span className="grid h-[72%] w-[72%] place-items-center rounded-[18%] bg-gradient-to-br from-white/[0.16] to-white/[0.04] ring-1 ring-white/10">
          <svg viewBox="0 0 60 60" className="spin-slow h-[60%] w-[60%]" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2;
              // rounded, so the server and the browser print the same digits and hydration matches
              return <circle key={i} cx={(30 + 20 * Math.cos(a)).toFixed(2)} cy={(30 + 20 * Math.sin(a)).toFixed(2)} r="5" fill="#f4f5f7" opacity={(0.55 + 0.45 * (i / 5)).toFixed(2)} />;
            })}
          </svg>
        </span>
      </span>
    </div>
  );
}

/** The kinds of work are the admin's (lib/content.ts), as many as it has; the diagram beside them is fixed. */
export function Build({ copy }: { copy: Content["services"] }) {
  const [active, setActive] = useState(0);
  const WORK = copy.items;

  return (
    <section id="services" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            <Rich text={copy.heading} />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.subtitle}
          </p>
          <a href="#contact" data-placement="build" className="btn btn-primary">
            {copy.button}
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="surface rounded-card">
          {WORK.map((w, i) => {
            const open = i === active;
            return (
              <div key={i} className={i > 0 ? "border-t border-white/[0.08]" : ""}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`work-${i}`}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left md:px-8"
                >
                  <span className="w-6 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 text-lg font-medium ${open ? "text-foreground" : "text-muted-foreground"}`}>{w.name}</span>
                  <span className={`h-2 w-2 rounded-sm transition-colors ${open ? "bg-foreground" : "bg-white/15"}`} />
                </button>
                <div
                  id={`work-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-7 pl-[4.25rem] md:px-8 md:pl-[4.75rem]">
                      <p className="text-xl font-medium">{w.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{w.text}</p>
                      <Checks items={w.checks} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
        <Reveal delay={0.1} className="surface flex items-center rounded-card p-8 md:p-12">
          <Diagram />
        </Reveal>
      </div>
    </section>
  );
}
