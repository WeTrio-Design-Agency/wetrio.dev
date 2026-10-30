import { Check, Glyph, type GlyphName } from "../Icons";
import { WeTrioWordmark } from "../Logo";

/**
 * Our products, drawn in code after the real screens (Kirill, 30.10.2026: «взять за основу наши реальные продукты»,
 * as the wetria window in the hero of wetr.io/wetria). The layout, the labels and the colours follow each product's
 * own interface; every name and figure is made up, so no client or real number ever shows.
 *
 * A picture, not a control: nothing in a window takes focus.
 */

export function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl text-left shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10 ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------------------------------------------------
 * WeTrio Hub, the home screen (dark theme, the Hub's default). After hub-dashboard-1440d: the sidebar with the
 * serif lock-up and twelve sections, the search bar with "New project", four KPI tiles, "My tasks", "Needs your
 * decision" with "System health", "Revenue by month" with "Ads".
 * ------------------------------------------------------------------------------------------------------------- */

const HUB_NAV: [GlyphName, string][] = [
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

function HubTile({ label, value, accent, sub }: { label: string; value: string; accent?: string; sub: string }) {
  return (
    <div className="rounded-xl border border-[#1f2a44] bg-[#0f172b] p-5">
      <p className="text-[11px] uppercase tracking-wide text-[#8b95ab]">{label}</p>
      <p className="mt-3 flex items-baseline gap-3">
        <span className="text-[26px] font-medium tracking-tight text-[#f1f5f9]">{value}</span>
        {accent && <span className="text-[13px] text-[#fbbf24]">{accent}</span>}
      </p>
      <p className="mt-1.5 text-[12px] text-[#8b95ab]">{sub}</p>
    </div>
  );
}

function HubPanel({ title, meta, action, children, className = "" }: { title: string; meta?: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#1f2a44] bg-[#0f172b] p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wide text-[#8b95ab]">
          {title}
          {meta && <span className="ml-2 normal-case tracking-normal text-[#8b95ab]">{meta}</span>}
        </p>
        {action && <span className="text-[12px] text-[#60a5fa]">{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function HubWindow() {
  const tasks = [
    ["Pricing for the Nordhaus request", "T-412"],
    ["Review the Halden brand guide, draft 2", "T-415"],
    ["Send the Parklab report to the client", "T-416"],
    ["Book the November kick-off with Kestrel", "T-418"],
    ["Upload the Lumen slides to the portal", "T-419"],
    ["Close October timesheets", "T-420"],
  ];
  const bars: [string, string, number, string][] = [
    ["May", "$18.4K", 62, "#3b82f6"],
    ["June", "$21.9K", 74, "#3b82f6"],
    ["July", "$24.1K", 82, "#3b82f6"],
    ["August", "$19.6K", 66, "#fbbf24"],
    ["September", "$27.3K", 92, "#3b82f6"],
    ["October · so far", "$24.9K", 84, "#3b82f6"],
  ];
  return (
    <Window className="flex min-h-[960px] w-[1440px] bg-[#070b17] text-[13px] text-[#e2e8f0]">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[#1f2a44] px-4 pb-5 pt-6">
        <span className="inline-flex flex-col items-end gap-[2px] self-start pl-2">
          <WeTrioWordmark className="h-[18px] w-auto text-[#f1f5f9]" />
          <span className="font-serif text-[13px] italic leading-none text-[#60a5fa]">Hub</span>
        </span>
        <ul className="mt-8 space-y-0.5">
          {HUB_NAV.map(([icon, label], i) => (
            <li
              key={label}
              className={`flex h-9 items-center gap-3 rounded-lg px-3 ${i === 0 ? "bg-[#14213f] text-[#93c5fd]" : "text-[#cbd5e1]"}`}
            >
              <Glyph name={icon} className="h-4 w-4" />
              {label}
            </li>
          ))}
        </ul>
        <ul className="mt-auto space-y-0.5 border-t border-[#1f2a44] pt-4">
          <li className="flex h-9 items-center gap-3 px-3 text-[#cbd5e1]">
            <Glyph name="shield" className="h-4 w-4" /> System
          </li>
          <li className="flex h-9 items-center gap-3 px-3 text-[#cbd5e1]">
            <Glyph name="refresh" className="h-4 w-4" /> Refresh
          </li>
        </ul>
        <div className="mt-4 flex items-center gap-3 border-t border-[#1f2a44] pt-4">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14213f] text-[11px] font-medium text-[#93c5fd]">MK</span>
          <div className="min-w-0">
            <p className="truncate font-medium text-[#f1f5f9]">Mia Korhonen</p>
            <p className="text-[11px] text-[#8b95ab]">mia@studio.dev</p>
          </div>
          <span className="ml-auto rounded-full bg-[#14213f] px-2 py-0.5 text-[10px] text-[#8b95ab]">Admin</span>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-16 items-center gap-4 border-b border-[#1f2a44] px-8">
          <div className="flex h-9 w-[560px] items-center gap-3 rounded-lg border border-[#1f2a44] bg-[#0b1224] px-3 text-[#8b95ab]">
            <Glyph name="search" className="h-4 w-4" />
            <span className="flex-1">Search the Hub: projects, people, documents, meetings</span>
            <span className="rounded border border-[#1f2a44] px-1.5 text-[10px]">⌘K</span>
          </div>
          <span className="ml-auto flex h-9 items-center gap-1.5 rounded-full bg-[#3b82f6] px-4 font-medium text-white">
            <Glyph name="plus" className="h-4 w-4" /> New project
          </span>
          <span className="flex h-8 items-center rounded-full bg-[#0f172b] p-1 text-[11px]">
            <span className="rounded-full bg-[#3b82f6] px-2 py-0.5 text-white">EN</span>
            <span className="px-2 text-[#8b95ab]">RU</span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0f172b] text-[#cbd5e1]">
            <Glyph name="bell" className="h-4 w-4" />
          </span>
        </div>

        <div className="px-12 pt-10">
          <p className="text-[32px] font-medium tracking-tight text-[#f1f5f9]">Good morning, Mia</p>
          <p className="mt-2 text-[14px] text-[#cbd5e1]">30 October · 14 active tasks · 2 overdue · data 1 hour ago</p>

          <div className="mt-7 grid grid-cols-4 gap-5">
            <HubTile label="Profit for October so far (after payroll)" value="$12,480" sub="6 closed projects · salaries for 30 of 31 days" />
            <HubTile label="Owed to us" value="$6,544" accent="9 projects" sub="oldest debt: September" />
            <HubTile label="Cash on accounts" value="$38,210" sub="4 accounts · at today's rate" />
            <HubTile label="Revenue for October so far" value="$24,900" accent="$5,200 in progress" sub="September: $27,300" />
          </div>

          <HubPanel title="My tasks" meta="6 open" action="All my tasks" className="mt-5">
            <div className="mt-3 grid grid-cols-2 gap-x-10">
              {tasks.map(([t, id]) => (
                <div key={id} className="flex items-center gap-3 border-b border-[#1f2a44] py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#64748b]" />
                  <span className="flex-1 text-[#f1f5f9]">{t}</span>
                  <span className="text-[11px] text-[#8b95ab]">{id}</span>
                </div>
              ))}
            </div>
          </HubPanel>

          <div className="mt-5 grid grid-cols-[1fr_360px] gap-5">
            <HubPanel title="Needs your decision · 3">
              {[
                ["#fbbf24", "Invoices not sent", "3 drafts, oldest 4 days ago.", "3"],
                ["#f87171", "2 projects overdue", "Oldest: Kestrel Cloud, −3 days.", "2"],
                ["#64748b", "Unread notifications", "Portal requests and chat mentions.", "12"],
              ].map(([c, t, s, n]) => (
                <div key={t} className="flex items-start gap-3 border-b border-[#1f2a44] py-3 last:border-0">
                  <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: c }} />
                  <div className="flex-1">
                    <p className="text-[#f1f5f9]">{t}</p>
                    <p className="text-[12px] text-[#8b95ab]">{s}</p>
                  </div>
                  <span className="rounded-full bg-[#14213f] px-2 py-0.5 text-[11px] text-[#cbd5e1]">{n}</span>
                </div>
              ))}
            </HubPanel>
            <HubPanel title="System health">
              {[
                ["Portal sync", "2 minutes ago"],
                ["Marketing snapshot", "1 hour ago"],
                ["Data on screen", "collected 1 hour ago"],
              ].map(([t, s]) => (
                <div key={t} className="flex items-start gap-3 border-b border-[#1f2a44] py-3 last:border-0">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#34d399]" />
                  <div>
                    <p className="text-[#f1f5f9]">{t}</p>
                    <p className="text-[12px] text-[#8b95ab]">{s}</p>
                  </div>
                </div>
              ))}
            </HubPanel>
          </div>

          <div className="mt-5 grid grid-cols-[1fr_360px] gap-5 pb-10">
            <HubPanel title="Revenue by month · up for the second month" action="Analytics">
              <div className="mt-6 grid grid-cols-6 items-end gap-4">
                {bars.map(([m, v, h, c]) => (
                  <div key={m} className="flex flex-col items-center gap-2">
                    <span className="text-[12px] text-[#cbd5e1]">{v}</span>
                    <div className="w-full rounded-lg" style={{ height: h, background: c }} />
                    <span className="text-[11px] text-[#8b95ab]">{m}</span>
                  </div>
                ))}
              </div>
            </HubPanel>
            <HubPanel title="Ads, last 7 days" action="Ads & SMM">
              <div className="mt-4 grid grid-cols-3 text-[11px] uppercase tracking-wide text-[#8b95ab]">
                <span>Spend</span>
                <span>Leads</span>
                <span>CPL</span>
              </div>
              <div className="mt-1 grid grid-cols-3 text-[22px] font-medium text-[#f1f5f9]">
                <span>$140</span>
                <span>4</span>
                <span>$35</span>
              </div>
              <div className="mt-4 rounded-lg bg-[#14213f] p-3 text-[12px] text-[#cbd5e1]">
                <p className="text-[11px] uppercase tracking-wide text-[#34d399]">Where it works</p>
                <p className="mt-1">WT_Leads_Web_Oct: $82, that is 59% of the budget, and 3 of the 4 leads.</p>
              </div>
            </HubPanel>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ----------------------------------------------------------------------------------------------------------------
 * wetria, the home screen (light, the platform's default). After the platform's own markup, measured for the hero of
 * wetr.io/wetria: a 300px sidebar on #f1f4f8 with projects, templates and recent tasks; the greeting, the composer
 * and the five service cards in the middle of the main area.
 * ------------------------------------------------------------------------------------------------------------- */

const W_PROJECTS = ["Lumen Mobility", "Series A raise", "Brand refresh 2027", "Sales kit"];
const W_TEMPLATES = ["Lumen master", "Investor deck"];
const W_RECENT = ["Board update, October", "Pitch deck v4", "Sales kit on the new master", "Client case for the portfolio", "Investor update, scored"];
const W_SERVICES = ["Format", "Adapt to template", "Design", "Sanitize", "Score a deck"];

function WSection({ title, items, icon }: { title: string; items: string[]; icon: GlyphName }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1 px-3 text-[12px] font-medium text-[#5d6b7d]">
        {title} <Glyph name="chevron" className="h-3 w-3" />
      </p>
      <ul className="space-y-0.5">
        {items.map((p) => (
          <li key={p} className="flex h-9 items-center gap-2.5 rounded-xl pl-4 pr-3 text-[14px] text-[#0b1120]">
            <Glyph name={icon} className="h-4 w-4 text-[#5d6b7d]" />
            <span className="truncate">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WetriaWindow() {
  return (
    <Window className="flex min-h-[960px] w-[1440px] bg-white text-[#0b1120]">
      <aside className="flex w-[300px] shrink-0 flex-col bg-[#f1f4f8] px-3 pb-4 pt-4">
        <div className="flex h-10 items-center gap-2 px-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0b1120] text-[12px] font-bold text-white">w</span>
          <span className="text-[15px] font-semibold">wetria</span>
          <span className="ml-auto flex gap-1 text-[#475569]">
            <span className="grid h-9 w-9 place-items-center rounded-lg">
              <Glyph name="search" className="h-4 w-4" />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-lg">
              <Glyph name="panel" className="h-4 w-4" />
            </span>
          </span>
        </div>
        <div className="mt-4 flex h-9 items-center gap-2.5 rounded-xl pl-4 text-[14px] font-medium">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0b1120] text-white">
            <Glyph name="plus" className="h-3 w-3" />
          </span>
          New task
        </div>
        <div className="mt-6 space-y-6">
          <WSection title="Projects" items={W_PROJECTS} icon="briefcase" />
          <WSection title="Templates" items={W_TEMPLATES} icon="layers" />
          <WSection title="Recent tasks" items={W_RECENT} icon="file" />
        </div>
        <div className="mt-auto flex items-center justify-between px-3 text-[12px] text-[#5d6b7d]">
          <span>120 tokens</span>
          <span>Studio plan</span>
        </div>
      </aside>
      <div className="relative min-w-0 flex-1">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 50% 42%, rgba(59,130,246,0.14) 0%, rgba(255,44,146,0.06) 55%, rgba(255,255,255,0) 100%)" }}
        />
        <div className="relative mx-auto w-[768px] pt-[150px]">
          <p className="text-[36px] font-medium tracking-tight">Good afternoon, Mia</p>
          <p className="mt-2 text-[16px] text-[#475569]">Upload a deck and say what should change. It comes back designed, still editable.</p>
          <div className="mt-10 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-lg bg-[#f1f5f9] px-2.5 py-1.5 text-[13px]">
                <Glyph name="file" className="h-4 w-4 text-[#475569]" /> Q3 investor update.pptx
                <span className="text-[#5d6b7d]">· 24 slides</span>
              </span>
            </div>
            <p className="mt-4 text-[15px] text-[#5d6b7d]">What should change in the whole deck?</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#e2e8f0] text-[#475569]">
                <Glyph name="paperclip" className="h-4 w-4" />
              </span>
              <span className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] px-3 text-[13px]">
                Design <Glyph name="chevron" className="h-3.5 w-3.5 text-[#5d6b7d]" />
              </span>
              <span className="ml-auto flex h-9 items-center rounded-lg bg-[#0b1120] px-4 text-[13px] font-medium text-white">Run</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {W_SERVICES.map((s, i) => (
              <div
                key={s}
                className={`rounded-xl border bg-white px-4 py-3 text-[13px] font-medium ${i === 2 ? "border-[#3b82f6] ring-1 ring-[#3b82f6]" : "border-[#e2e8f0]"} ${i >= 3 ? "col-span-1" : ""}`}
              >
                {s}
                <p className="mt-1 text-[12px] font-normal text-[#5d6b7d]">
                  {["Same slides, made neat", "Rebuilt on your master", "Recomposed by a designer", "Names and numbers replaced", "A design score in minutes"][i]}
                </p>
              </div>
            ))}
          </div>
          <div className="h-16" />
        </div>
      </div>
    </Window>
  );
}

/* ----------------------------------------------------------------------------------------------------------------
 * The client portal, the overview (light). After the portal's own page: the greeting with "Contact manager" and
 * "New request", the KPI row, "Waiting for you", "In progress" with the stage track, "Recently delivered".
 * ------------------------------------------------------------------------------------------------------------- */

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_2px_10px_-4px_rgba(11,17,32,0.07)]">
      <p className="text-[13px] text-[#58667a]">{label}</p>
      <p className="mt-2 text-[26px] font-medium tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-[#58667a]">{sub}</p>
    </div>
  );
}

function Stage({ stages, at }: { stages: string[]; at: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {stages.map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          <span className={`h-1.5 w-10 rounded-full ${i <= at ? "bg-[#3b82f6]" : "bg-[#e2e8f0]"}`} />
        </span>
      ))}
      <span className="ml-2 text-[12px] text-[#58667a]">{stages[at]}</span>
    </div>
  );
}

export function PortalWindow() {
  const work = [
    ["Brand system refresh", "Maya Lind", "due 6 Nov", 1, "in 7 days"],
    ["Investor deck, Series A", "Oskar Berg", "due 12 Nov", 2, "in 13 days"],
    ["Website: pricing page", "Nina Hale", "due 20 Nov", 0, "in 21 days"],
  ] as const;
  return (
    <Window className="min-h-[960px] w-[1440px] bg-[#f8fafc] text-[#0f172a]">
      <div className="flex h-14 items-center gap-6 border-b border-[#e2e8f0] bg-white px-8 text-[13px]">
        <span className="inline-flex flex-col items-end gap-[2px]">
          <WeTrioWordmark className="h-[14px] w-auto text-[#0f172a]" />
          <span className="font-serif text-[10px] italic leading-none text-[#3b82f6]">Portal</span>
        </span>
        <span className="font-medium">Overview</span>
        <span className="text-[#58667a]">Projects</span>
        <span className="text-[#58667a]">Files</span>
        <span className="text-[#58667a]">Invoices</span>
        <span className="text-[#58667a]">Requests</span>
        <span className="ml-auto text-[#58667a]">Nordhaus · Mia Korhonen</span>
      </div>
      <div className="px-8 pb-8 pt-7">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[28px] font-medium tracking-tight">Good morning, Mia</p>
            <p className="mt-1 text-[13px] text-[#58667a]">Thursday, 30 October · Overview</p>
          </div>
          <div className="flex gap-2">
            <span className="flex h-9 items-center rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px]">Contact manager</span>
            <span className="flex h-9 items-center gap-1.5 rounded-lg bg-[#3b82f6] px-3 text-[13px] font-medium text-white">
              <Glyph name="plus" className="h-4 w-4" /> New request
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          <Kpi label="In progress" value="3" sub="next due 6 Nov" />
          <Kpi label="Delivered in October" value="2" sub="last delivery 24 Oct" />
          <Kpi label="Hours in October" value="42 h" sub="on delivered work" />
          <Kpi label="To pay for October" value="$3,200" sub="excluding VAT" />
        </div>
        <div className="mt-4 grid grid-cols-[1fr_340px] gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_2px_10px_-4px_rgba(11,17,32,0.07)]">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium">In progress</p>
              <span className="text-[12px] text-[#3b82f6]">View all</span>
            </div>
            <div className="mt-2 divide-y divide-[#e2e8f0]">
              {work.map(([t, d, due, at, left]) => (
                <div key={t} className="grid grid-cols-[1fr_auto] items-center gap-4 py-3.5">
                  <div>
                    <p className="text-[14px] font-medium">{t}</p>
                    <p className="mt-0.5 text-[12px] text-[#58667a]">
                      designer {d} · {due}
                    </p>
                    <div className="mt-2">
                      <Stage stages={["Brief", "Design", "Review", "Delivery"]} at={at} />
                    </div>
                  </div>
                  <span className="rounded-full bg-[#eff6ff] px-2.5 py-1 text-[12px] text-[#2563eb]">{left}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_2px_10px_-4px_rgba(11,17,32,0.07)]">
              <p className="text-[15px] font-medium">Waiting for you</p>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f8fafc] p-3">
                <div>
                  <p className="text-[13px] font-medium">Invoice 1042</p>
                  <p className="text-[12px] text-[#58667a]">$3,200 · due 5 Nov</p>
                </div>
                <span className="rounded-lg bg-[#0f172a] px-3 py-1.5 text-[12px] font-medium text-white">Pay</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_2px_10px_-4px_rgba(11,17,32,0.07)]">
              <p className="text-[15px] font-medium">Recently delivered</p>
              {[
                ["Sales deck, EU launch", "delivered 24 Oct"],
                ["Social templates, Q4", "delivered 17 Oct"],
              ].map(([t, s]) => (
                <div key={t} className="mt-3 flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ecfdf5] text-[#059669]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">{t}</p>
                    <p className="text-[12px] text-[#58667a]">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ----------------------------------------------------------------------------------------------------------------
 * Analyzer, the result (light, on wetr.io). After ScoreCard, DimensionBars and ScorePanel: the score out of 100 with
 * its bar, the verdict, the two dimensions with their notes, then what to fix and what already works.
 * ------------------------------------------------------------------------------------------------------------- */

export function AnalyzerWindow() {
  const dims: [string, number, string][] = [
    ["Content & storytelling", 68, "Whether the deck has the beats its kind of deck needs, and tells them so the point lands."],
    ["Design", 79, "Hierarchy, typography, colour and whitespace: the craft, against a studio standard."],
  ];
  return (
    <Window className="min-h-[960px] w-[1440px] bg-white text-[#0f172a]">
      <div className="flex h-14 items-center gap-5 border-b border-[#e2e8f0] px-8 text-[13px]">
        <WeTrioWordmark className="h-[14px] w-auto text-[#0f172a]" />
        <span className="text-[#58667a]">Analyzer</span>
        <span className="ml-auto rounded-lg bg-[#f1f5f9] px-2.5 py-1 text-[12px] text-[#58667a]">sales-deck-v4.pptx · 18 slides</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-16 px-12 py-10">
        <div>
          <p className="flex items-baseline gap-1 leading-none">
            <span className="text-[72px] font-semibold tracking-tight">74</span>
            <span className="text-[16px] font-medium text-[#58667a]">/100</span>
          </p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            <div className="h-2 rounded-full bg-[#3b82f6]" style={{ width: "74%" }} />
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-[#0f172a]/85">
            A sound story in plain clothes. The beats are there and in the right order; the slides do not yet carry
            them. Six slides set body text under 12 pt and three accent colours compete on the numbers slide.
          </p>
          <div className="mt-8 grid gap-8 border-t border-[#e2e8f0] pt-8">
            {dims.map(([l, v, n]) => (
              <div key={l}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] font-medium">{l}</span>
                  <span className="text-[15px] font-medium">{v}</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#e2e8f0]">
                  <div className="h-1.5 rounded-full bg-[#3b82f6]" style={{ width: `${v}%` }} />
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#58667a]">{n}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#f8fafc] p-6">
          <p className="text-[12px] uppercase tracking-wide text-[#58667a]">What to fix first</p>
          <ul className="mt-3 space-y-3">
            {[
              ["Body text under 12 pt", "6 slides. Nothing on a projector reads below 14 pt."],
              ["Three accent colours on the numbers slide", "Keep one: the chart and the headline must agree."],
              ["Charts pasted as images", "5 slides. Rebuilt as native charts they stay editable and sharp."],
            ].map(([t, s]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F5AF21]" />
                <div>
                  <p className="text-[14px] font-medium">{t}</p>
                  <p className="text-[12px] text-[#58667a]">{s}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] uppercase tracking-wide text-[#58667a]">What already works</p>
          <ul className="mt-3 space-y-2">
            {["One idea per slide on 15 of 18", "A clear ask on the last slide", "The template's grid is respected"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[14px]">
                <span className="h-2 w-2 rounded-full bg-[#0DA86E]" />
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#3b82f6] px-4 text-[13px] font-medium text-white">
            Get the full report
          </span>
        </div>
      </div>
    </Window>
  );
}

/* ----------------------------------------------------------------------------------------------------------------
 * The wetr.io admin, the leads table (light). After the admin's /leads: the filters by status and source, the table
 * with name, type, status, source and received.
 * ------------------------------------------------------------------------------------------------------------- */

export function AdminWindow() {
  const rows: [string, string, string, string, string, string][] = [
    ["Kestrel Cloud", "hello@kestrel.example", "Website design", "New", "wetr.io/contact", "2 h ago"],
    ["Marlow & Co", "team@marlow.example", "Pitch deck", "New", "Analyzer", "Yesterday"],
    ["Orbit Labs", "ops@orbit.example", "Dashboard", "In progress", "wetr.io/contact", "Yesterday"],
    ["Fenwick Group", "brand@fenwick.example", "Brand system", "Won", "LinkedIn", "26 Oct"],
    ["Lumen Health", "web@lumen.example", "Website design", "In progress", "Google Ads", "24 Oct"],
    ["Halden Gallery", "studio@halden.example", "Website", "Won", "Referral", "20 Oct"],
  ];
  const pill = (s: string) =>
    s === "New" ? "bg-[#eff6ff] text-[#2563eb]" : s === "Won" ? "bg-[#ecfdf5] text-[#059669]" : "bg-[#f1f5f9] text-[#475569]";
  return (
    <Window className="flex min-h-[960px] w-[1440px] bg-[#f8fafc] text-[#0f172a]">
      <aside className="flex w-52 shrink-0 flex-col border-r border-[#e2e8f0] bg-white px-3 pt-5">
        <span className="inline-flex flex-col items-end gap-[2px] self-start pl-2">
          <WeTrioWordmark className="h-[14px] w-auto text-[#0f172a]" />
          <span className="font-serif text-[10px] italic leading-none text-[#3b82f6]">Admin</span>
        </span>
        <ul className="mt-6 space-y-0.5 text-[13px]">
          {["Dashboard", "Leads", "Homepage", "Services", "Cases", "Journal", "Team", "FAQ", "Testimonials", "Media", "SEO", "Settings"].map((l) => (
            <li key={l} className={`flex h-8 items-center rounded-lg px-3 ${l === "Leads" ? "bg-[#eff6ff] font-medium text-[#2563eb]" : "text-[#475569]"}`}>
              {l}
            </li>
          ))}
        </ul>
      </aside>
      <div className="min-w-0 flex-1 px-8 pb-8 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[24px] font-medium tracking-tight">Leads</p>
          <div className="flex gap-2 text-[13px]">
            <span className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3">
              Status: <b className="font-medium">All</b> <Glyph name="chevron" className="h-3.5 w-3.5 text-[#58667a]" />
            </span>
            <span className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3">
              Source: <b className="font-medium">All</b> <Glyph name="chevron" className="h-3.5 w-3.5 text-[#58667a]" />
            </span>
            <span className="flex h-9 items-center rounded-lg bg-[#0f172a] px-3 font-medium text-white">Export CSV</span>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,17,32,0.04),0_2px_10px_-4px_rgba(11,17,32,0.07)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-left text-[12px] text-[#58667a]">
                {["Name", "Type", "Status", "Source", "Received"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([n, e, t, s, src, d]) => (
                <tr key={n} className="border-b border-[#e2e8f0] last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium">{n}</p>
                    <p className="text-[12px] text-[#58667a]">{e}</p>
                  </td>
                  <td className="px-5 py-3">{t}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${pill(s)}`}>{s}</span>
                  </td>
                  <td className="px-5 py-3 text-[#475569]">{src}</td>
                  <td className="px-5 py-3 text-[#475569]">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Window>
  );
}

/* A compact checklist used by the product and the build accordions. */
export function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((c) => (
        <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

export function StackIcon({ name }: { name: GlyphName }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.06] text-foreground ring-1 ring-white/10">
      <Glyph name={name} className="h-[18px] w-[18px]" />
    </span>
  );
}
