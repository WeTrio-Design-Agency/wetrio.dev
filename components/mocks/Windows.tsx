import { Check, Glyph } from "../Icons";

/**
 * Product windows drawn in code, not screenshots: the layout follows the real products, the names and the numbers
 * are made up (Kirill, 30.10.2026: show our products, but never a client's name or a real figure).
 */

export function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#0b0c11] text-foreground shadow-[0_40px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function Mark({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-foreground text-[10px] font-bold text-background">
        W
      </span>
      <span className="text-[13px] font-semibold">{label}</span>
    </div>
  );
}

function Bar({ label, v }: { label: string; v: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-28 w-full items-end rounded-md bg-white/[0.06]">
        <div className="w-full rounded-md bg-foreground" style={{ height: `${v}%` }} />
      </div>
      <span className="text-[10px] text-muted">{label}</span>
    </div>
  );
}

export function HubWindow() {
  const menu = ["Dashboard", "Clients", "Projects", "Tasks", "Timesheets", "Finance"];
  const general = ["Mail", "Meetings", "Settings"];
  return (
    <Window className="flex w-[900px] text-[12px]">
      <aside className="hidden w-52 shrink-0 flex-col border-r border-white/[0.08] p-4 md:flex">
        <Mark label="WeTrio Hub" />
        <p className="mt-6 text-[10px] uppercase tracking-wider text-muted">Menu</p>
        <ul className="mt-2 space-y-0.5">
          {menu.map((m, i) => (
            <li
              key={m}
              className={`rounded-md px-2.5 py-1.5 ${i === 0 ? "bg-white/[0.08] text-foreground" : "text-muted-foreground"}`}
            >
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[10px] uppercase tracking-wider text-muted">General</p>
        <ul className="mt-2 space-y-0.5">
          {general.map((m) => (
            <li key={m} className="rounded-md px-2.5 py-1.5 text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-lg bg-white/[0.05] p-3">
          <p className="font-medium">Month closes in 2 days</p>
          <div className="mt-2 h-1 rounded-full bg-white/10">
            <div className="h-1 w-[85%] rounded-full bg-accent" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">3 invoices still to send.</p>
          <button type="button" className="mt-3 w-full rounded-md bg-foreground py-1.5 text-[11px] font-medium text-background">
            Send invoices
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex h-11 items-center border-b border-white/[0.08] px-5 text-[13px]">Overview</div>
        <div className="p-5">
          <p className="text-[20px] font-medium">Good morning, Mia</p>
          <p className="mt-1 text-muted-foreground">Here is how the studio moved this month.</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/[0.05] p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Revenue this month</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  +12%
                </span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-[24px] font-medium tracking-tight">
                  $48,200<span className="text-muted">.00</span>
                </span>
                <svg viewBox="0 0 120 36" className="h-8 w-28 text-foreground" fill="none" aria-hidden="true">
                  <path
                    className="draw-line"
                    d="M2 28 C 18 26, 22 14, 36 16 S 56 30, 70 20 S 92 4, 118 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className="rounded-lg bg-white/[0.05] p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hours left in packages</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">9 clients</span>
              </div>
              <div className="mt-2 text-[24px] font-medium tracking-tight">
                318<span className="text-muted"> h</span>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white/[0.05] p-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Hours by week</span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-sm bg-foreground" /> Billed
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-sm bg-white/20" /> Planned
              </span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-3">
              <Bar label="W1" v={55} />
              <Bar label="W2" v={72} />
              <Bar label="W3" v={48} />
              <Bar label="W4" v={88} />
              <Bar label="W5" v={64} />
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white/[0.05]">
            <div className="px-4 pt-3 font-medium">Recent invoices</div>
            <table className="mt-2 w-full">
              <thead>
                <tr className="text-left text-[10px] text-muted">
                  <th className="px-4 py-1 font-medium">Client</th>
                  <th className="py-1 font-medium">Date</th>
                  <th className="py-1 font-medium">Amount</th>
                  <th className="py-1 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nordhaus", "Design retainer", "06 Oct", "$3,200", "Paid"],
                  ["Halden Gallery", "Website", "07 Oct", "$5,800", "Sent"],
                  ["Parklab", "SaaS build", "09 Oct", "$12,400", "Draft"],
                ].map(([n, k, d, a, s]) => (
                  <tr key={n} className="border-t border-white/[0.06]">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-[10px] font-medium">
                          {n[0]}
                        </span>
                        <div>
                          <div className="font-medium">{n}</div>
                          <div className="text-[10px] text-muted">{k}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-muted-foreground">{d}</td>
                    <td className="py-2">{a}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          s === "Paid"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : s === "Sent"
                              ? "bg-accent/20 text-blue-300"
                              : "bg-white/10 text-muted-foreground"
                        }`}
                      >
                        {s}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Window>
  );
}

export function WetriaWindow() {
  const tasks = [
    ["Q3 investor update", "24 slides · Nordhaus template", "Designed", 100],
    ["Sales deck, EU launch", "18 slides · Parklab template", "Designing", 64],
    ["Board report, October", "32 slides · Halden template", "Checked", 100],
  ] as const;
  return (
    <Window className="w-[640px] text-[12px]">
      <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-5">
        <Mark label="wetria" />
        <span className="rounded-md bg-white/[0.08] px-2 py-1 text-[11px]">120 tokens left</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium">Tasks</p>
          <button type="button" className="rounded-md bg-foreground px-3 py-1.5 text-[11px] font-medium text-background">
            New task
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {tasks.map(([t, m, s, p]) => (
            <div key={t} className="rounded-lg bg-white/[0.05] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="text-[11px] text-muted">{m}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p === 100 ? "bg-emerald-500/15 text-emerald-400" : "bg-accent/20 text-blue-300"
                  }`}
                >
                  {s}
                </span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div className={`h-1 rounded-full ${p === 100 ? "bg-emerald-400" : "bg-accent"}`} style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] uppercase tracking-wider text-muted">Preview</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-[16/9] rounded-md bg-white/[0.07] p-2">
              <div className="h-1.5 w-2/3 rounded-sm bg-foreground/80" />
              <div className="mt-1.5 h-1 w-1/2 rounded-sm bg-white/30" />
              <div className={`mt-2 h-5 rounded-sm ${i % 2 ? "bg-accent/70" : "bg-white/15"}`} />
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

export function PortalWindow() {
  return (
    <Window className="w-[640px] text-[12px]">
      <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-5">
        <Mark label="Client portal" />
        <span className="text-muted-foreground">Nordhaus</span>
      </div>
      <div className="p-5">
        <p className="text-[18px] font-medium">Brand system refresh</p>
        <p className="mt-1 text-muted-foreground">Package of 60 h · ends 30 Nov</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ["Hours left", "42 h"],
            ["In progress", "3 tasks"],
            ["Files", "27"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/[0.05] p-3">
              <div className="text-[11px] text-muted-foreground">{k}</div>
              <div className="mt-1 text-[18px] font-medium">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10">
          <div className="h-1.5 w-[30%] rounded-full bg-accent" />
        </div>
        <div className="mt-4 flex gap-4 border-b border-white/[0.08] text-[11px]">
          <span className="border-b-2 border-foreground pb-2 font-medium">Files</span>
          <span className="pb-2 text-muted-foreground">Invoices</span>
          <span className="pb-2 text-muted-foreground">Team</span>
        </div>
        <ul className="divide-y divide-white/[0.06]">
          {[
            ["Logo system v3.fig", "Today", "Figma"],
            ["Brand guide, draft 2.pdf", "Yesterday", "PDF"],
            ["Social templates.zip", "24 Oct", "Archive"],
          ].map(([n, d, t]) => (
            <li key={n} className="flex items-center justify-between py-2.5">
              <span className="font-medium">{n}</span>
              <span className="text-[11px] text-muted-foreground">
                {t} · {d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

export function AnalyzerWindow() {
  const meters = [
    ["Typography", 82],
    ["Layout", 61],
    ["Colour", 79],
  ] as const;
  return (
    <Window className="w-[640px] text-[12px]">
      <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-5">
        <Mark label="Analyzer" />
        <span className="text-muted-foreground">sales-deck-v4.pptx · 18 slides</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-6 p-5">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 100 100" className="h-28 w-28" aria-hidden="true">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="264"
              strokeDashoffset={264 - 264 * 0.74}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="55" textAnchor="middle" fill="#f4f5f7" fontSize="22" fontWeight="500">
              74
            </text>
          </svg>
          <span className="mt-1 text-[11px] text-muted-foreground">Design score</span>
        </div>
        <div>
          {meters.map(([k, v]) => (
            <div key={k} className="mb-3">
              <div className="flex justify-between text-[11px]">
                <span>{k}</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-accent" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
          <p className="mt-4 text-[11px] uppercase tracking-wider text-muted">Findings</p>
          <ul className="mt-2 space-y-1.5">
            {["Body text under 12 pt on 6 slides", "Three accent colours compete on slide 4", "Charts rebuilt as images on 5 slides"].map(
              (f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{f}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </Window>
  );
}

export function AdminWindow() {
  const cols: [string, string[][]][] = [
    [
      "New",
      [
        ["Kestrel Cloud", "Website design", "2 h ago"],
        ["Marlow & Co", "Pitch deck", "Yesterday"],
      ],
    ],
    ["In review", [["Orbit Labs", "Dashboard", "Yesterday"]]],
    [
      "Replied",
      [
        ["Fenwick Group", "Brand system", "26 Oct"],
        ["Lumen Health", "Website design", "24 Oct"],
      ],
    ],
  ];
  return (
    <Window className="w-[720px] text-[12px]">
      <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-5">
        <Mark label="wetr.io admin" />
        <span className="text-muted-foreground">Leads · 5 open</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5">
        {cols.map(([name, cards]) => (
          <div key={name}>
            <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{name}</span>
              <span>{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map(([n, k, d]) => (
                <div key={n} className="rounded-lg bg-white/[0.05] p-3">
                  <div className="font-medium">{n}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{k}</div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
                    <span>via wetr.io/contact</span>
                    <span>{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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

export function StackIcon({ name }: { name: Parameters<typeof Glyph>[0]["name"] }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.06] text-foreground ring-1 ring-white/10">
      <Glyph name={name} className="h-[18px] w-[18px]" />
    </span>
  );
}
