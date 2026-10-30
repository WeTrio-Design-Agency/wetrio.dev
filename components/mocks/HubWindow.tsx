"use client";

import { useEffect, useState } from "react";
import { Glyph, type GlyphName } from "../Icons";
import { WeTrioWordmark } from "../Logo";

/**
 * The Hub's Home (v3) in the dark theme, after the Hub's own code (`app/(app)/dashboard/AdminDashboard.tsx`,
 * `HomeBlocks.tsx`, `Agenda.tsx`, `components/ui/KpiTile.tsx`, `charts/HomeTrendChart.tsx`) and its dark tokens:
 * the month's money tiles, revenue by month beside what waits on a person, the meetings beside «What's new».
 * The pointer plays two hovers in turn (Kirill, 30.10: «наведение на график и встречи»): a month on the chart with
 * its tooltip, then a meeting with the calendar's brief card beside it. Names and figures are made up.
 */

// the Hub's dark tokens (app/globals.css, .dark)
const C = {
  base: "#010412",
  elevated: "#101a2e",
  subtle: "#1e293b",
  hover: "#17223a",
  borderDefault: "#334155",
  t1: "#f8fafc",
  t2: "#cbd5e1",
  t3: "#94a3b8",
  accent: "#3b82f6",
  ink: "#60a5fa",
  success: "#0da86e",
  danger: "#f87171",
  warning: "#fbbf24",
};

const NAV: [GlyphName, string][] = [
  ["grid", "Overview"],
  ["briefcase", "Projects"],
  ["list", "Tasks"],
  ["card", "Clients"],
  ["users", "Team"],
  ["database", "Finance"],
  ["chart", "Analytics"],
  ["megaphone", "Marketing"],
  ["chat", "Communication"],
  ["calendar", "Meetings"],
  ["book", "Knowledge"],
  ["sparkles", "WeTria AI"],
];

const MONTHS = [
  ["Nov", 19.4, 15.2],
  ["Dec", 22.8, 17.9],
  ["Jan", 16.1, 14.0],
  ["Feb", 18.7, 15.8],
  ["Mar", 21.3, 16.4],
  ["Apr", 20.2, 18.1],
  ["May", 18.4, 17.2],
  ["Jun", 21.9, 18.8],
  ["Jul", 24.1, 19.6],
  ["Aug", 19.6, 20.3],
  ["Sep", 27.3, 21.1],
  ["Oct", 24.9, 19.0],
] as const;
const FULL = ["November 2025", "December 2025", "January 2026", "February 2026", "March 2026", "April 2026", "May 2026", "June 2026", "July 2026", "August 2026", "September 2026", "October 2026"];

const MEETINGS = [
  { day: "Today", time: "10:00 – 10:30", title: "Nordhaus · brand system, review 2", soon: "in 25 min", people: 3, join: true },
  { day: "Today", time: "14:00 – 14:45", title: "Parklab · SaaS build, sprint planning", people: 4, join: true },
  { day: "Tomorrow", time: "11:00 – 11:30", title: "Halden Gallery · website kick-off", people: 2, join: true },
  { day: "Monday, 3 November", time: "16:00 – 16:30", title: "Kestrel Cloud · dashboard, first look", people: 3, join: false },
];

const NEWS: [GlyphName, string, string, string, boolean][] = [
  ["chat", "Mia mentioned you in Parklab", "«Can we move the planning to 14:00?»", "12 min", true],
  ["card", "Payment received: Nordhaus", "$3,200 · invoice 1041", "1 h", true],
  ["briefcase", "Halden Gallery moved to Review", "Website · Oskar Berg", "3 h", true],
  ["calendar", "Kick-off booked with Halden", "Tomorrow, 11:00", "5 h", false],
  ["chat", "New lead from wetr.io", "Lumen Health · website design", "Yesterday", false],
];

function Spark({ points, w = 96, h = 28 }: { points: number[]; w?: number; h?: number }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${((i / (points.length - 1)) * w).toFixed(1)},${(h - 2 - ((p - min) / span) * (h - 4)).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" className="shrink-0" style={{ color: C.accent }}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tile({ label, value, delta, sub, spark }: { label: string; value: string; delta?: string; sub?: string; spark?: number[] }) {
  return (
    <div className="relative min-w-0 rounded-2xl p-4" style={{ background: C.elevated }}>
      <Glyph name="arrowUpRight" className="absolute right-4 top-4 h-4 w-4" />
      <p className="truncate pr-6 text-xs font-medium" style={{ color: C.t3 }}>
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-2xl font-medium tracking-tight" style={{ color: C.t1 }}>
            {value}
          </p>
          <div className="mt-1.5 flex items-center gap-2 text-xs" style={{ color: C.t3 }}>
            {delta && (
              <span className="rounded-full px-1.5 py-0.5 font-medium" style={{ background: C.subtle, color: C.t2 }}>
                {delta}
              </span>
            )}
            {sub && <span className="truncate">{sub}</span>}
          </div>
        </div>
        {spark && <Spark points={spark} />}
      </div>
    </div>
  );
}

function Card({ title, extra, children, className = "" }: { title: React.ReactNode; extra?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`flex min-w-0 flex-col overflow-hidden rounded-2xl ${className}`} style={{ background: C.elevated }}>
      <header className="flex items-start justify-between gap-3 px-5 pt-4">
        <div className="min-w-0">{typeof title === "string" ? <h2 className="text-base font-medium" style={{ color: C.t1 }}>{title}</h2> : title}</div>
        {extra}
      </header>
      {children}
    </section>
  );
}

function Arrow() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full" style={{ color: "rgba(148,163,184,0.5)" }}>
      <Glyph name="arrowUpRight" className="h-4 w-4" />
    </span>
  );
}

function Row({ icon, title, sub, aside, lit }: { icon: GlyphName; title: string; sub?: string; aside?: React.ReactNode; lit?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={lit ? { background: "rgba(59,130,246,0.1)", color: "#93c5fd" } : { background: C.subtle, color: C.t3 }}
      >
        <Glyph name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm ${lit ? "font-medium" : ""}`} style={{ color: C.t1 }}>
          {title}
        </span>
        {sub && (
          <span className="mt-0.5 block truncate text-[13px]" style={{ color: C.t3 }}>
            {sub}
          </span>
        )}
      </span>
      {aside}
      <Glyph name="chevronRight" className="h-4 w-4 shrink-0" />
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "danger" | "attention" | "default" }) {
  const s =
    tone === "danger"
      ? { background: "rgba(248,113,113,0.14)", color: "#fda4af" }
      : tone === "attention"
        ? { background: "rgba(245,175,33,0.16)", color: C.warning }
        : { background: C.subtle, color: C.t2 };
  return (
    <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={s}>
      {children}
    </span>
  );
}

/* The chart: 12 soft-topped bars, the running month hatched, last year as a dashed curve, the hovered month lit. */
function Chart({ active }: { active: number | null }) {
  const W = 760;
  const H = 150;
  const max = 30;
  const n = MONTHS.length;
  const slot = (W - 48) / n;
  const bw = Math.min(36, slot * 0.72);
  const y = (v: number) => H - 24 - (v / max) * (H - 32);
  const ghost = MONTHS.map(([, , ly], i) => `${i === 0 ? "M" : "L"}${48 + slot * i + slot / 2},${y(ly)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hub-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.accent} stopOpacity={1} />
          <stop offset="100%" stopColor={C.accent} stopOpacity={0.6} />
        </linearGradient>
        <pattern id="hub-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={C.accent} fillOpacity={0.18} />
          <line x1="0" y1="0" x2="0" y2="6" stroke={C.accent} strokeWidth="2.5" strokeOpacity={0.7} />
        </pattern>
      </defs>
      {[0, 10, 20, 30].map((v) => (
        <g key={v}>
          <line x1="48" x2={W} y1={y(v)} y2={y(v)} stroke={C.subtle} strokeDasharray="3 4" />
          <text x="40" y={y(v) + 4} textAnchor="end" fontSize="11" fill={C.t3}>
            {v === 0 ? "$0" : `$${v}K`}
          </text>
        </g>
      ))}
      {MONTHS.map(([m, v], i) => {
        const x = 48 + slot * i + (slot - bw) / 2;
        const top = y(v);
        const running = i === n - 1;
        return (
          <g key={m} style={{ opacity: active === null || active === i ? 1 : 0.45, transition: "opacity .2s" }}>
            <path
              d={`M${x} ${H - 24} V${top + 6} a6 6 0 0 1 6 -6 h${bw - 12} a6 6 0 0 1 6 6 V${H - 24} Z`}
              fill={running ? "url(#hub-hatch)" : "url(#hub-bar)"}
            />
            <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize="12" fill={C.t3}>
              {m}
            </text>
          </g>
        );
      })}
      <path d={ghost} fill="none" stroke={C.t3} strokeWidth="1.5" strokeDasharray="3 3" opacity={0.7} />
    </svg>
  );
}

function Tooltip({ i }: { i: number }) {
  const [, v, ly] = MONTHS[i];
  const ch = Math.round(((v - ly) / ly) * 100);
  return (
    <div
      className="absolute z-10 min-w-44 rounded-xl px-3 py-2 text-xs shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ left: `${8 + (i / MONTHS.length) * 88}%`, top: 8, background: C.elevated, border: `1px solid ${C.borderDefault}` }}
    >
      <div className="mb-1.5" style={{ color: C.t3 }}>
        {FULL[i]}
        {i === MONTHS.length - 1 && " · so far"}
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5" style={{ color: C.t2 }}>
          <span className="h-2 w-2 rounded-[2px]" style={{ background: C.accent }} /> Revenue
        </span>
        <span className="font-medium" style={{ color: C.t1 }}>
          ${(v * 1000).toLocaleString("en-US")}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5" style={{ color: C.t2 }}>
          <span className="h-0.5 w-2.5 rounded-full" style={{ background: C.t3 }} /> Last year
        </span>
        <span style={{ color: C.t1 }}>${(ly * 1000).toLocaleString("en-US")}</span>
      </div>
      {i !== MONTHS.length - 1 && (
        <div className="mt-1.5" style={{ color: ch >= 0 ? C.success : "#fda4af" }}>
          {ch >= 0 ? "+" : "−"}
          {Math.abs(ch)}% on last year
        </div>
      )}
    </div>
  );
}

/* The calendar's brief card, as Agenda opens it beside a hovered meeting. */
function EventCard({ m }: { m: (typeof MEETINGS)[number] }) {
  return (
    <div
      className="absolute left-[46%] top-[112px] z-20 w-[420px] rounded-2xl p-5 text-sm shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ background: C.elevated, border: `1px solid ${C.borderDefault}` }}
    >
      <p className="text-base font-medium" style={{ color: C.t1 }}>
        {m.title}
      </p>
      <p className="mt-1 text-xs" style={{ color: C.t3 }}>
        Today · {m.time} · <span style={{ color: C.ink }}>{m.soon ?? "later today"}</span>
      </p>
      <div className="mt-4 space-y-3">
        {[
          ["globe", "Where", "WeTrio room", "hub.wetr.io/room/nordhaus-review"],
          ["users", "People", "3 people: MK, OB, NH", ""],
          ["card", "Client", "Nordhaus", ""],
        ].map(([icon, k, v, s]) => (
          <div key={k} className="flex gap-3">
            <span className="mt-0.5 shrink-0" style={{ color: C.t3 }}>
              <Glyph name={icon as GlyphName} className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs" style={{ color: C.t3 }}>
                {k}
              </p>
              <p style={{ color: C.t1 }}>{v}</p>
              {s && (
                <p className="truncate text-xs" style={{ color: C.t3 }}>
                  {s}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <span className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-medium text-white" style={{ background: C.accent }}>
          <Glyph name="video" className="h-4 w-4" /> Join
        </span>
        <span className="flex h-9 items-center rounded-full px-4 text-sm" style={{ border: `1px solid ${C.borderDefault}`, color: C.t1 }}>
          Open in calendar
        </span>
      </div>
    </div>
  );
}

const STEPS: Array<{ chart: number | null; meeting: number | null }> = [
  { chart: null, meeting: null },
  { chart: 10, meeting: null },
  { chart: 11, meeting: null },
  { chart: null, meeting: null },
  { chart: null, meeting: 0 },
  { chart: null, meeting: 1 },
];

export function HubWindow() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const { chart, meeting } = STEPS[step];
  const week = [
    ["Thu", "30", 2],
    ["Fri", "31", 1],
    ["Sat", "1", 0],
    ["Sun", "2", 0],
    ["Mon", "3", 1],
    ["Tue", "4", 0],
    ["Wed", "5", 2],
  ] as const;

  return (
    <div
      className="flex min-h-[960px] w-[1440px] overflow-hidden rounded-xl text-[13px] shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      style={{ background: C.base, color: C.t1 }}
      aria-hidden="true"
    >
      <aside className="flex w-60 shrink-0 flex-col px-4 pb-4 pt-6" style={{ borderRight: `1px solid ${C.subtle}` }}>
        <span className="inline-flex flex-col items-end gap-[2px] self-start pl-2">
          <WeTrioWordmark className="h-[18px] w-auto" />
          <span className="font-serif text-[13px] italic leading-none" style={{ color: C.ink }}>
            Hub
          </span>
        </span>
        <ul className="mt-8 space-y-0.5">
          {NAV.map(([icon, label], i) => (
            <li
              key={label}
              className="flex h-9 items-center gap-3 rounded-lg px-3 text-[14px]"
              style={i === 0 ? { background: "rgba(59,130,246,0.14)", color: "#93c5fd" } : { color: C.t2 }}
            >
              <Glyph name={icon} className="h-4 w-4" />
              {label}
            </li>
          ))}
        </ul>
        <ul className="mt-auto space-y-0.5 pt-4 text-[14px]" style={{ borderTop: `1px solid ${C.subtle}`, color: C.t2 }}>
          <li className="flex h-9 items-center gap-3 px-3">
            <Glyph name="shield" className="h-4 w-4" /> System
          </li>
          <li className="flex h-9 items-center gap-3 px-3">
            <Glyph name="refresh" className="h-4 w-4" /> Refresh
          </li>
        </ul>
        <div className="mt-3 flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium" style={{ background: "rgba(59,130,246,0.14)", color: "#93c5fd" }}>
            MK
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">Mia Korhonen</p>
            <p className="text-[11px]" style={{ color: C.t3 }}>
              mia@studio.dev
            </p>
          </div>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px]" style={{ background: C.subtle, color: C.t3 }}>
            Admin
          </span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 shrink-0 items-center gap-4 px-8" style={{ borderBottom: `1px solid ${C.subtle}` }}>
          <div className="flex h-9 w-[560px] items-center gap-3 rounded-lg px-3" style={{ background: C.elevated, color: C.t3 }}>
            <Glyph name="search" className="h-4 w-4" />
            <span className="flex-1">Search the Hub: projects, people, documents, meetings</span>
            <span className="rounded px-1.5 text-[10px]" style={{ border: `1px solid ${C.borderDefault}` }}>
              ⌘K
            </span>
          </div>
          <span className="ml-auto flex h-9 items-center gap-1.5 rounded-full px-4 font-medium text-white" style={{ background: C.accent }}>
            <Glyph name="plus" className="h-4 w-4" /> New project
          </span>
          <span className="flex h-8 items-center rounded-full p-1 text-[11px]" style={{ background: C.elevated }}>
            <span className="rounded-full px-2 py-0.5 text-white" style={{ background: C.accent }}>
              EN
            </span>
            <span className="px-2" style={{ color: C.t3 }}>
              RU
            </span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: C.elevated, color: C.t2 }}>
            <Glyph name="bell" className="h-4 w-4" />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-8 pb-6 pt-7">
          <p className="text-[30px] font-medium tracking-tight">Good morning, Mia</p>
          <p className="mt-1 text-[14px]" style={{ color: C.t2 }}>
            30 October · 14 active tasks · 2 overdue · data 1 hour ago
          </p>

          <div className="mt-5 grid grid-cols-4 gap-3">
            <Tile label="Cash" value="$38,210" sub="4 accounts" />
            <Tile label="Owed to us" value="$6,544" sub="9 projects · oldest September" />
            <Tile label="Revenue this month" value="$24,900" sub="$5,200 in progress" spark={[18.4, 21.9, 24.1, 19.6, 27.3, 24.9]} />
            <Tile label="Profit this month" value="$12,480" sub="September: $13,900" spark={[8.1, 10.2, 12.4, 9.1, 13.9, 12.5]} />
          </div>

          <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-3">
            <Card
              className="col-span-2"
              title="Revenue by month"
              extra={
                <div className="flex items-center gap-3">
                  <span className="flex h-7 rounded-lg p-0.5" style={{ background: C.subtle }}>
                    <span className="grid w-8 place-items-center rounded-md" style={{ background: C.elevated, color: C.t1 }}>
                      <Glyph name="chart" className="h-3.5 w-3.5" />
                    </span>
                    <span className="grid w-8 place-items-center" style={{ color: C.t3 }}>
                      <Glyph name="list" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <Arrow />
                </div>
              }
            >
              <div className="-mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 text-xs" style={{ color: C.t3 }}>
                <span>October so far: $24,900 · September: $27,300</span>
                <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                  <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: C.accent }} /> Revenue
                </span>
                <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                  <span className="h-2.5 w-2.5 rounded-[3px] opacity-80" style={{ background: `repeating-linear-gradient(45deg, ${C.accent} 0 2px, transparent 2px 4px)` }} /> Running
                </span>
                <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                  <svg width="14" height="4">
                    <line x1="0" y1="2" x2="14" y2="2" stroke={C.t3} strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                  Last year
                </span>
              </div>
              <div className="relative min-h-0 flex-1 px-5 pb-3 pt-3">
                {chart !== null && <Tooltip i={chart} />}
                <Chart active={chart} />
              </div>
            </Card>

            <Card title="Needs you">
              <div className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-3 pb-3 pt-2">
                <Row icon="briefcase" title="Projects overdue" sub="Oldest: Kestrel Cloud, 3 days late." aside={<Badge tone="danger">2</Badge>} />
                <Row icon="list" title="Comments assigned to you" sub="Reply or resolve them in the task." aside={<Badge tone="attention">4</Badge>} />
                <Row icon="database" title="Telegram expenses to book" sub="Oldest 2 days ago." aside={<Badge tone="attention">3</Badge>} />
                <Row icon="chat" title="Unread mail" sub="Inbox 7 · Clients 3" aside={<Badge tone="default">10</Badge>} />
              </div>
            </Card>

            <Card className="col-span-2 relative" title="Meetings" extra={<Arrow />}>
              <div className="grid grid-cols-7 gap-1 px-4 pt-3">
                {week.map(([wd, d, n], i) => (
                  <span key={wd} className="flex flex-col items-center gap-1 rounded-xl py-2">
                    <span className="text-[11px]" style={{ color: i === 0 ? C.ink : C.t3 }}>
                      {wd}
                    </span>
                    <span className="text-[15px] font-medium leading-none" style={{ color: i === 0 ? C.ink : C.t1 }}>
                      {d}
                    </span>
                    <span className="flex h-1.5 items-center gap-0.5">
                      {Array.from({ length: n }, (_, k) => (
                        <span key={k} className="h-1 w-1 rounded-full" style={{ background: C.accent }} />
                      ))}
                    </span>
                  </span>
                ))}
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-2 pb-3 pt-2">
                {["Today", "Tomorrow", "Monday, 3 November"].map((day) => (
                  <div key={day} className="mt-2 first:mt-0">
                    <h3 className="px-3 pb-1 text-xs font-medium" style={{ color: C.t3 }}>
                      {day}
                    </h3>
                    <ul className="space-y-0.5">
                      {MEETINGS.filter((m) => m.day === day).map((m, i) => {
                        const idx = MEETINGS.indexOf(m);
                        const next = idx === 0;
                        const hovered = meeting === idx;
                        return (
                          <li
                            key={m.title}
                            className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                            style={{ background: hovered || next ? C.subtle : "transparent" }}
                          >
                            <span className="h-8 w-[3px] shrink-0 rounded-full" style={{ background: next ? "rgba(59,130,246,0.6)" : C.borderDefault }} />
                            <span className="w-[92px] shrink-0 text-xs" style={{ color: C.t2 }}>
                              {m.time}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm">{m.title}</span>
                              <span className="mt-0.5 flex items-center gap-2 text-xs" style={{ color: C.t3 }}>
                                {m.soon && (
                                  <span className="font-medium" style={{ color: C.t2 }}>
                                    {m.soon}
                                  </span>
                                )}
                                <span>{m.people} people</span>
                              </span>
                            </span>
                            {m.join && (
                              <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium" style={{ border: `1px solid ${C.borderDefault}` }}>
                                <Glyph name="video" className="h-3.5 w-3.5" /> Join
                              </span>
                            )}
                            {i === 99 && null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              {meeting !== null && <EventCard m={MEETINGS[meeting]} />}
            </Card>

            <Card
              title={
                <h2 className="text-base font-medium" style={{ color: C.t1 }}>
                  What&apos;s new <span className="ml-2 text-sm font-normal" style={{ color: C.ink }}>3 new</span>
                </h2>
              }
              extra={<Arrow />}
            >
              <div className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-3 pb-3 pt-2">
                {NEWS.map(([icon, t, s, when, lit]) => (
                  <Row
                    key={t}
                    icon={icon}
                    title={t}
                    sub={s}
                    lit={lit}
                    aside={
                      <span className="text-xs" style={{ color: C.t3 }}>
                        {when}
                      </span>
                    }
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
