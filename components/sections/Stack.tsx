import type { Content } from "@/lib/content";
import { type GlyphName } from "../Icons";
import { Reveal } from "../Reveal";
import { StackIcon } from "../mocks/Windows";
import { Rich } from "../Rich";

/* The names and roles are the admin's (lib/content.ts), one slot per tool; the icon stays with its slot. */
const ICONS: GlyphName[] = ["code", "atom", "type", "wind", "bolt", "database", "card", "cloud", "rocket", "box", "sparkles", "flask"];

export function Stack({ copy }: { copy: Content["stack"] }) {
  return (
    <section id="stack" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
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
          <a href="#products" className="btn btn-secondary">
            {copy.button}
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-white/[0.08] md:grid-cols-3 xl:grid-cols-6">
        {copy.items.map((s, i) => (
          <Reveal key={i} delay={0.03 * i} className="bg-background p-6 md:p-7">
            <StackIcon name={ICONS[i]} />
            <div className="mt-10 font-medium">{s.name}</div>
            <div className="mt-1 text-sm text-muted">{s.role}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
