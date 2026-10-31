import { type GlyphName } from "../Icons";
import { Reveal } from "../Reveal";
import { StackIcon } from "../mocks/Windows";

const STEPS = [
  {
    title: "Discover",
    text: "One sprint to define what the product must prove. We start with the business problem, not the feature list.",
  },
  {
    title: "Design and prototype",
    text: "Architecture and interface take shape together. In one week you open a live demo on its own link.",
  },
  {
    title: "Build and iterate",
    text: "Short releases on a live product. Every decision is checked against real software, with you in the loop.",
  },
  {
    title: "Launch and support",
    text: "We harden the product for production and stay on: monitoring, fixes, iterations and new features.",
  },
];

/* Four principles under four steps: the two grids share columns, so their dividers line up. */
const PRINCIPLES: { title: string; text: string; icon: GlyphName }[] = [
  {
    title: "Working software from week one",
    text: "Every project is a live deployment from the first weeks. Reviews happen in the browser, on the real thing.",
    icon: "browser",
  },
  {
    title: "Design is part of the build",
    text: "We share one design language with the studio. Speed never excuses a careless interface.",
    icon: "layers",
  },
  {
    title: "A small senior team",
    text: "The people who scope the product build it. No hand-offs between departments, no six-month roadmaps before the first click.",
    icon: "users",
  },
  {
    title: "You own the code",
    text: "The repository, the infrastructure and the accounts are yours from day one. Leaving is never a negotiation.",
    icon: "key",
  },
];

/* Each cell is a subgrid of three rows (number or icon, title, text), so titles and texts align across the row even when one wraps. */
const cell = "grid grid-rows-subgrid row-span-3 p-7 md:p-8";
const grid = "grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/[0.08] md:grid-cols-2 xl:grid-cols-4";

export function Process() {
  return (
    <section id="process" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            From first brief
            <br />
            <span className="h-dim">to production.</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Short loops, live software, no hidden phases. WeTrio Dev is part of{" "}
          <a href="https://wetr.io" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-accent">
            WeTrio
          </a>
          , a B2B design studio. The same standards apply to code.
        </Reveal>
      </div>

      <div className={`mt-14 ${grid}`}>
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={0.06 * i} className={`${cell} bg-card`}>
            <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-10 text-xl font-medium tracking-tight">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <div className={`mt-6 ${grid}`}>
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={0.06 * i} className={`${cell} bg-background`}>
            <StackIcon name={p.icon} />
            <h3 className="mt-10 text-lg font-medium tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
