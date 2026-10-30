import { Check, Glyph, type GlyphName } from "../Icons";
import { HeroWindow } from "../wetria/HeroWindow";

/**
 * Our products in the Products section (Kirill, 30.10.2026: «в точности как они сделаны»): wetr.io, the portal and
 * the Analyzer as screenshots of the live thing (Shots.tsx), the Hub drawn after its own code (HubWindow.tsx), wetria
 * as the very window from the hero of wetr.io/wetria. A picture, not a control: nothing in a window takes focus.
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
 * wetria: the very window from the hero of wetr.io/wetria (Kirill, 30.10: «используй то же самое»), ported with its
 * scene: the sidebar, the home screen, a request typed and a task run to the finished deck. Laid out at 1700 x 960;
 * the panel scales it. Its tokens are the platform's light ones (`.wetria-window`).
 * ------------------------------------------------------------------------------------------------------------- */

export function WetriaWindow() {
  return (
    <div className="wetria-window w-[1700px] text-[#0b1120]" aria-hidden="true">
      <HeroWindow />
    </div>
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
