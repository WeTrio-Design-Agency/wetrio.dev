"use client";

import { useEffect, useState } from "react";
import { Glyph, type GlyphName } from "../Icons";
import { HubLogo } from "./HubLogo";

/**
 * The Hub's Home in the dark theme, after Kirill's own screen of it (30.10.2026) and the Hub's code
 * (`app/(app)/dashboard/AdminDashboard.tsx`, `HomeBlocks.tsx`, `Agenda.tsx`, `components/ui/KpiTile.tsx`,
 * `charts/HomeTrendChart.tsx`) with its dark tokens. The proportions are the real ones: compact tiles, a 370px chart
 * card, rows at their natural height; the page runs past the window's bottom as the Hub's does. The pointer plays
 * two hovers in turn on the left of the window (the panels cut the right off): a month on the chart with its tooltip,
 * then a meeting with the calendar's brief card above its row. Names and figures are made up.
 */

// the Hub's dark tokens (app/globals.css, .dark)
const C = {
  base: "#010412",
  elevated: "#101a2e",
  subtle: "#1e293b",
  borderDefault: "#334155",
  t1: "#f8fafc",
  t2: "#cbd5e1",
  t3: "#94a3b8",
  accent: "#3b82f6",
  ink: "#60a5fa",
  success: "#0da86e",
  warning: "#fbbf24",
};

const NAV_WORK: [GlyphName, string][] = [
  ["briefcase", "Projects"],
  ["list", "Tasks"],
  ["mail", "Mail"],
  ["video", "Meetings"],
  ["chat", "Chat"],
  ["grid", "Products"],
];
const NAV_CLIENTS: [GlyphName, string][] = [
  ["card", "Clients"],
  ["target", "Pipeline"],
  ["chat", "Feedback"],
];
const NAV_MONEY: [GlyphName, string][] = [
  ["wallet", "Finance"],
  ["chart", "Insights"],
  ["megaphone", "Marketing"],
];
const NAV_TEAM: [GlyphName, string][] = [
  ["users", "People"],
  ["gauge", "Workload"],
  ["clock", "Hours"],
  ["userPlus", "Hiring"],
];
const NAV_WORKSPACE: [GlyphName, string][] = [
  ["book", "Knowledge"],
  ["plug", "Integrations"],
];

const MONTHS = [
  ["Nov 25", 19.4, 15.2],
  ["Dec 25", 22.8, 17.9],
  ["Jan 26", 16.1, 14.0],
  ["Feb 26", 18.7, 15.8],
  ["Mar 26", 21.3, 16.4],
  ["Apr 26", 20.2, 18.1],
  ["May 26", 18.4, 17.2],
  ["Jun 26", 21.9, 18.8],
  ["Jul 26", 24.1, 19.6],
  ["Aug 26", 19.6, 20.3],
  ["Sep 26", 27.3, 21.1],
  ["Oct 26", 24.9, 19.0],
] as const;
const FULL = ["November 2025", "December 2025", "January 2026", "February 2026", "March 2026", "April 2026", "May 2026", "June 2026", "July 2026", "August 2026", "September 2026", "October 2026"];

const MEETINGS = [
  { day: "Today", time: "16:00 – 17:00", title: "Friday check-up", soon: "in 1 h 23 min", people: 6, join: true, room: "friday-checkup" },
  { day: "Today", time: "17:00 – 18:00", title: "Nordhaus · brand system, review 2", people: 3, join: true, room: "nordhaus-review" },
  { day: "Sunday 1 November", time: "18:00 – 19:30", title: "Partners meeting", people: 4, join: true, room: "partners" },
  { day: "Monday 2 November", time: "11:00 – 11:30", title: "Halden Gallery · website kick-off", people: 2, join: false, room: "halden-kickoff" },
];

const NEWS: [GlyphName, string, string, string, boolean][] = [
  ["mail", "New email from Nordhaus", "Logo files approved, next step the guide", "13 min ago", true],
  ["chat", "New messages in Design", "Kate: the review slides are in the folder", "16 min ago", true],
  ["mail", "New email from Parklab", "Sprint planning agenda", "52 min ago", true],
  ["chat", "New messages in Parklab", "Mia: can we move the planning to 14:00?", "1 h ago", false],
  ["card", "Payment received: Halden Gallery", "$5,800 · invoice 1041", "3 h ago", false],
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

function Tile({ label, value, sub, spark }: { label: string; value: string; sub?: string; spark?: number[] }) {
  return (
    <div className="relative min-w-0 rounded-2xl p-4" style={{ background: C.elevated }}>
      <span className="absolute right-4 top-4" style={{ color: "rgba(148,163,184,0.5)" }}>
        <Glyph name="arrowUpRight" className="h-4 w-4" />
      </span>
      <p className="truncate pr-6 text-xs font-medium" style={{ color: C.t3 }}>
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-2xl font-medium tracking-tight" style={{ color: C.t1 }}>
            {value}
          </p>
          {sub && (
            <p className="mt-1.5 truncate text-xs" style={{ color: C.t3 }}>
              {sub}
            </p>
          )}
        </div>
        {spark && <Spark points={spark} />}
      </div>
    </div>
  );
}

function Card({ title, extra, children, className = "", clip = true }: { title: React.ReactNode; extra?: React.ReactNode; children: React.ReactNode; className?: string; clip?: boolean }) {
  return (
    <section className={`flex min-w-0 flex-col rounded-2xl ${clip ? "overflow-hidden" : "overflow-visible"} ${className}`} style={{ background: C.elevated }}>
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
      <span style={{ color: C.t3 }}>
        <Glyph name="chevronRight" className="h-4 w-4 shrink-0" />
      </span>
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

/* The chart as HomeTrendChart draws it: soft-topped bars in a gradient, the running month hatched, last year as a
   dashed curve, the hovered month lit and the rest dimmed. Drawn at 760 x 250, the box the card gives it. */
const CW = 760;
const CH = 250;
const AX = 48;
const MAX = 30;
const slot = (CW - AX) / MONTHS.length;
const cy = (v: number) => CH - 24 - (v / MAX) * (CH - 36);
const cx = (i: number) => AX + slot * i + slot / 2;

function smooth(points: [number, number][]) {
  return points
    .map(([x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      const [px, py] = points[i - 1];
      const mx = (px + x) / 2;
      return `C${mx} ${py} ${mx} ${y} ${x} ${y}`;
    })
    .join(" ");
}

function Chart({ active }: { active: number | null }) {
  const bw = Math.min(36, slot * 0.6);
  const ghost = smooth(MONTHS.map(([, , ly], i) => [cx(i), cy(ly)]));
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} width={CW} height={CH} aria-hidden="true">
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
          <line x1={AX} x2={CW} y1={cy(v)} y2={cy(v)} stroke={C.subtle} strokeDasharray="3 4" />
          <text x={AX - 8} y={cy(v) + 4} textAnchor="end" fontSize="11" fill={C.t3}>
            {v === 0 ? "$0" : `$${v}K`}
          </text>
        </g>
      ))}
      {MONTHS.map(([m, v], i) => {
        const x = cx(i) - bw / 2;
        const top = cy(v);
        const running = i === MONTHS.length - 1;
        return (
          <g key={m} style={{ opacity: active === null || active === i ? 1 : 0.45, transition: "opacity .2s" }}>
            <path d={`M${x} ${CH - 24} V${top + 6} a6 6 0 0 1 6 -6 h${bw - 12} a6 6 0 0 1 6 6 V${CH - 24} Z`} fill={running ? "url(#hub-hatch)" : "url(#hub-bar)"} />
            <text x={cx(i)} y={CH - 6} textAnchor="middle" fontSize="12" fill={C.t3}>
              {m}
            </text>
          </g>
        );
      })}
      <path d={ghost} fill="none" stroke={C.t3} strokeWidth="1.5" strokeDasharray="4 4" opacity={0.8} />
    </svg>
  );
}

function Tooltip({ i }: { i: number }) {
  const [, v, ly] = MONTHS[i];
  const ch = Math.round(((v - ly) / ly) * 100);
  const running = i === MONTHS.length - 1;
  return (
    <div
      className="absolute z-10 min-w-44 rounded-xl px-3 py-2 text-xs shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ left: cx(i) + 20, top: 4, background: C.elevated, border: `1px solid ${C.borderDefault}` }}
    >
      <div className="mb-1.5" style={{ color: C.t3 }}>
        {FULL[i]}
        {running && " · this month so far"}
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
      {!running && (
        <div className="mt-1.5" style={{ color: ch >= 0 ? C.success : "#fda4af" }}>
          {ch >= 0 ? "+" : "−"}
          {Math.abs(ch)}% on last year
        </div>
      )}
    </div>
  );
}

/* The calendar's brief card above its row, as Floating flips it when there is no room below. */
function EventCard({ m }: { m: (typeof MEETINGS)[number] }) {
  return (
    <div
      className="absolute bottom-[calc(100%+6px)] left-2 z-30 w-[420px] rounded-2xl p-5 text-sm shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ background: C.elevated, border: `1px solid ${C.borderDefault}` }}
    >
      <p className="text-base font-medium" style={{ color: C.t1 }}>
        {m.title}
      </p>
      <p className="mt-1 text-xs" style={{ color: C.t3 }}>
        {m.day} · {m.time} · <span style={{ color: C.ink }}>{m.soon ?? "later today"}</span>
      </p>
      <div className="mt-4 space-y-3">
        {[
          ["globe", "Where", "WeTrio room", `hub.wetr.io/room/${m.room}`],
          ["users", "People", `${m.people} people`, ""],
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

/* The hover loop. Everything it touches sits on the left of the window: the hero and the Products panel cut the
   right side off (Kirill, 30.10), so the months are December and February and the card opens over the first rows. */
const STEPS: Array<{ chart: number | null; meeting: number | null }> = [
  { chart: null, meeting: null },
  { chart: 1, meeting: null },
  { chart: 3, meeting: null },
  { chart: null, meeting: null },
  { chart: null, meeting: 0 },
  { chart: null, meeting: 1 },
];

function NavRow({ icon, label, active = false }: { icon: GlyphName; label: string; active?: boolean }) {
  return (
    <li className="flex h-9 items-center gap-3 rounded-lg px-3 text-[14px]" style={active ? { background: "rgba(59,130,246,0.14)", color: "#93c5fd" } : { color: C.t2 }}>
      <Glyph name={icon} className="h-4 w-4" />
      {label}
    </li>
  );
}

function NavGroup({ label }: { label: string }) {
  return (
    <p className="mb-1 mt-4 flex items-center gap-1 px-3 text-[12px] font-medium" style={{ color: C.t3 }}>
      {label} <Glyph name="chevron" className="h-3 w-3" />
    </p>
  );
}

export function HubWindow() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const { chart, meeting } = STEPS[step];
  const week = [
    ["Fri", "30", 2],
    ["Sat", "31", 0],
    ["Sun", "1", 1],
    ["Mon", "2", 1],
    ["Tue", "3", 3],
    ["Wed", "4", 0],
    ["Thu", "5", 1],
  ] as const;

  return (
    <div
      className="flex w-[1440px] overflow-hidden rounded-xl text-[13px] shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      style={{ background: C.base, color: C.t1 }}
      aria-hidden="true"
    >
      <aside className="flex w-[280px] shrink-0 flex-col px-4 pb-4 pt-5" style={{ borderRight: `1px solid ${C.subtle}` }}>
        <div className="flex items-center">
          <HubLogo className="ml-2 h-8 w-auto" />
          <span className="ml-auto flex gap-1" style={{ color: C.t3 }}>
            <span className="grid h-9 w-9 place-items-center rounded-lg">
              <Glyph name="search" className="h-4 w-4" />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-lg">
              <Glyph name="panel" className="h-4 w-4" />
            </span>
          </span>
        </div>
        <div className="mt-5 flex h-10 items-center gap-3 px-3 text-[14px] font-medium">
          <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: C.t1, color: C.base }}>
            <Glyph name="plus" className="h-3.5 w-3.5" />
          </span>
          Create
        </div>
        <ul className="mt-2 space-y-0.5">
          <NavRow icon="grid" label="Home" active />
          <NavRow icon="inbox" label="Inbox" />
        </ul>
        <NavGroup label="Work" />
        <ul className="space-y-0.5">
          {NAV_WORK.map(([icon, label]) => (
            <NavRow key={label} icon={icon} label={label} />
          ))}
        </ul>
        <NavGroup label="Clients" />
        <ul className="space-y-0.5">
          {NAV_CLIENTS.map(([icon, label]) => (
            <NavRow key={label} icon={icon} label={label} />
          ))}
        </ul>
        <NavGroup label="Money" />
        <ul className="space-y-0.5">
          {NAV_MONEY.map(([icon, label]) => (
            <NavRow key={label} icon={icon} label={label} />
          ))}
        </ul>
        <NavGroup label="Team" />
        <ul className="space-y-0.5">
          {NAV_TEAM.map(([icon, label]) => (
            <NavRow key={label} icon={icon} label={label} />
          ))}
        </ul>
        <NavGroup label="Workspace" />
        <ul className="space-y-0.5">
          {NAV_WORKSPACE.map(([icon, label]) => (
            <NavRow key={label} icon={icon} label={label} />
          ))}
        </ul>
        <div className="mt-6 rounded-2xl p-3" style={{ background: C.elevated }}>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-medium" style={{ background: C.subtle, color: C.t1 }}>
              MK
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium">Mia Korhonen</p>
              <p className="truncate text-[12px]" style={{ color: C.t3 }}>
                mia@studio.dev
              </p>
            </div>
          </div>
          <div className="mt-3 flex justify-around pt-3" style={{ borderTop: `1px solid ${C.subtle}`, color: C.t3 }}>
            <Glyph name="settings" className="h-4 w-4" />
            <Glyph name="play" className="h-4 w-4" />
            <Glyph name="refresh" className="h-4 w-4" />
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-14 pb-8 pt-4">
        <div className="flex h-10 items-center text-[13px]">
          <span className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: C.elevated, color: C.t2 }}>
            <span className="h-2 w-2 rounded-full" style={{ background: C.success }} /> Mia K
          </span>
          <span className="ml-auto" style={{ color: C.t3 }}>
            30 October 14:36 (Warsaw) &nbsp;|&nbsp; $ 80.5 ₽
          </span>
        </div>

        <p className="mt-6 text-[30px] font-medium tracking-tight">Good afternoon, Mia</p>
        <p className="mt-1 text-[15px]" style={{ color: C.t2 }}>
          Friday 30 October · 2 meetings today · 2 projects late
        </p>

        <div className="mt-6 grid grid-cols-4 gap-4">
          <Tile label="Cash" value="$38,210" sub="4 accounts" />
          <Tile label="Owed to us" value="$6,544" sub="9 projects · oldest September" />
          <Tile label="Revenue this month" value="$24,900" sub="$5,200 in progress" spark={[18.4, 21.9, 24.1, 19.6, 27.3, 24.9]} />
          <Tile label="Profit this month" value="$12,480" sub="September: $13,900" spark={[8.1, 10.2, 12.4, 9.1, 13.9, 12.5]} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <Card
            className="col-span-2 h-[370px]"
            title="Revenue by month"
            extra={
              <div className="flex items-center gap-3">
                <span className="flex h-8 rounded-lg p-0.5" style={{ background: C.subtle }}>
                  <span className="grid w-9 place-items-center rounded-md" style={{ background: C.elevated, color: C.t1 }}>
                    <Glyph name="chart" className="h-3.5 w-3.5" />
                  </span>
                  <span className="grid w-9 place-items-center" style={{ color: C.t3 }}>
                    <Glyph name="list" className="h-3.5 w-3.5" />
                  </span>
                </span>
                <Arrow />
              </div>
            }
          >
            <div className="-mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 text-[13px]" style={{ color: C.t3 }}>
              <span>Up for the second month.</span>
              <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: C.accent }} /> Revenue
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                <span className="h-2.5 w-2.5 rounded-[3px] opacity-80" style={{ background: `repeating-linear-gradient(45deg, ${C.accent} 0 2px, transparent 2px 4px)` }} /> This month so far
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ color: C.t2 }}>
                <svg width="14" height="4">
                  <line x1="0" y1="2" x2="14" y2="2" stroke={C.t3} strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
                Last year
              </span>
            </div>
            <div className="relative mt-4 px-5">
              {chart !== null && <Tooltip i={chart} />}
              <Chart active={chart} />
            </div>
          </Card>

          <Card className="h-[370px]" title="Needs you">
            <div className="space-y-0.5 px-3 pb-3 pt-2">
              <Row icon="briefcase" title="Projects overdue" sub="Oldest: Kestrel Cloud, 3 days late." aside={<Badge tone="danger">2</Badge>} />
              <Row icon="list" title="Tasks overdue" sub="Across the team" aside={<Badge tone="danger">4</Badge>} />
              <Row icon="mail" title="Unread mail" sub="Inbox 7 · Clients 3" aside={<Badge tone="default">10</Badge>} />
              <Row icon="bot" title="Task drafts from the bot" sub="3 to confirm, 1 unassigned. Oldest 2 days ago." aside={<Badge tone="attention">4</Badge>} />
            </div>
          </Card>

          <Card className={`col-span-2 relative ${meeting !== null ? "z-20" : ""}`} clip={false} title="Meetings" extra={<Arrow />}>
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
            <div className="px-2 pb-3 pt-2">
              {["Today", "Sunday 1 November", "Monday 2 November"].map((day) => (
                <div key={day} className="mt-2 first:mt-0">
                  <h3 className="px-3 pb-1 text-xs font-medium" style={{ color: C.t3 }}>
                    {day}
                  </h3>
                  <ul className="space-y-0.5">
                    {MEETINGS.filter((m) => m.day === day).map((m) => {
                      const idx = MEETINGS.indexOf(m);
                      const next = idx === 0;
                      const hovered = meeting === idx;
                      return (
                        <li
                          key={m.title}
                          className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${hovered ? "z-30" : ""}`}
                          style={{ background: hovered || next ? C.subtle : "transparent" }}
                        >
                          {hovered && <EventCard m={m} />}
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
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title={
              <h2 className="text-base font-medium" style={{ color: C.t1 }}>
                What&apos;s new <span className="ml-2 text-sm font-normal" style={{ color: C.ink }}>3 new</span>
              </h2>
            }
            extra={<Arrow />}
          >
            <div className="space-y-0.5 px-3 pb-3 pt-2">
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
  );
}
