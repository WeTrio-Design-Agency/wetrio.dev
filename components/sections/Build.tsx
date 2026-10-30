"use client";

import { useState } from "react";
import { Glyph, type GlyphName } from "../Icons";
import { Reveal } from "../Reveal";
import { Checks } from "../mocks/Windows";

const WORK = [
  {
    name: "SaaS platforms",
    title: "Multi-tenant products for subscription businesses.",
    text: "Auth, billing, roles, admin and usage limits. The full platform, not a demo.",
    checks: ["Stripe subscriptions and invoices", "Roles and workspaces", "Admin and moderation tools", "Usage limits and abuse control"],
  },
  {
    name: "Web applications and portals",
    title: "Client portals, marketplaces and business-critical apps.",
    text: "Fast on a phone by default, usable from the keyboard, readable by a screen reader.",
    checks: ["Search, filters and tables that survive a reload", "Sign-in by magic link or password", "Files, invoices and exports"],
  },
  {
    name: "Dashboards and internal tools",
    title: "Operations tools that turn scattered data into decisions.",
    text: "One place for the numbers a team acts on, with access by role.",
    checks: ["Charts readable in both themes", "Role-based access", "Digests to mail and Telegram"],
  },
  {
    name: "AI features and automation",
    title: "Assistants, summarisers and classifiers inside real workflows.",
    text: "AI measured by usefulness: what it saves the team, not what it demos.",
    checks: ["Claude and OpenAI models", "Call transcripts and summaries", "Document rendering and checks"],
  },
  {
    name: "Integrations and APIs",
    title: "APIs, webhooks and automations that connect the tools you already run.",
    text: "Your product talks to billing, mail, chat and the data warehouse without manual steps.",
    checks: ["Stripe, Supabase, Telegram, Deepgram", "A public API with keys", "Webhooks with retries"],
  },
  {
    name: "MVPs and prototypes",
    title: "A working first version in weeks.",
    text: "Something you can put in front of investors and first users on a real URL.",
    checks: ["Clickable on its own subdomain", "Real content, not placeholders", "Ready to grow into the product"],
  },
];

const NODES: { name: GlyphName; x: number; y: number }[] = [
  { name: "globe", x: 260, y: 60 },
  { name: "sparkles", x: 440, y: 150 },
  { name: "wrench", x: 440, y: 370 },
  { name: "database", x: 260, y: 460 },
  { name: "chat", x: 80, y: 370 },
  { name: "bot", x: 80, y: 150 },
];

function Diagram() {
  const c = 260;
  const paths = NODES.map((n) => {
    if (n.x === c) return `M${c} ${c} L${c} ${n.y}`;
    const mid = n.y < c ? c - 90 : c + 90; // clear of the centre block on every screen width
    return `M${c} ${c} L${c} ${mid} L${n.x} ${mid} L${n.x} ${n.y}`;
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {paths.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d={d} fill="none" stroke="#3b82f6" strokeWidth="1.5" className="pulse-line" />
          </g>
        ))}
      </svg>
      {NODES.map((n) => (
        <span
          key={n.name}
          className="absolute grid h-12 w-12 -translate-x-1/2 md:h-14 md:w-14 -translate-y-1/2 place-items-center rounded-xl bg-card text-foreground ring-1 ring-white/10"
          style={{ left: `${(n.x / 520) * 100}%`, top: `${(n.y / 520) * 100}%` }}
        >
          <Glyph name={n.name} className="h-5 w-5" />
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl md:h-32 md:w-32 bg-card ring-1 ring-white/10 shadow-[0_0_80px_rgba(59,130,246,0.25)]">
        <span className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-b md:h-20 md:w-20 from-white/[0.12] to-white/[0.03] ring-1 ring-white/10">
          <Glyph name="layers" className="h-8 w-8" />
        </span>
      </span>
    </div>
  );
}

export function Build() {
  const [active, setActive] = useState(0);

  return (
    <section id="build" className="wrap scroll-mt-20 py-20 md:py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal>
            <span className="tag">
              <span className="h-1.5 w-1.5 rounded-sm bg-foreground" />
              What we build
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Six kinds of work,
            <br />
            <span className="h-dim">one way of working.</span>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Every engagement starts with a scoped first sprint and ends on a live URL.
          </p>
          <a href="#contact" className="btn btn-primary">
            Start a project
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="surface rounded-card">
          {WORK.map((w, i) => {
            const open = i === active;
            return (
              <div key={w.name} className={i > 0 ? "border-t border-white/[0.08]" : ""}>
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
