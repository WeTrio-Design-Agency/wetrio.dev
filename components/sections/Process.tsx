import { Spark } from "../Icons";
import { Reveal } from "../Reveal";

const STEPS = [
  {
    title: "Discover",
    text: "One sprint to define what the product must prove. We start with the business problem, not the feature list.",
  },
  {
    title: "Design and prototype",
    text: "Architecture and interface take shape together. Within weeks you click a working prototype on its own URL.",
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

const PRINCIPLES = [
  {
    title: "Working software from week one",
    text: "Every project is a live deployment from the first weeks. Reviews happen in the browser, on the real thing.",
  },
  {
    title: "Design is part of the build",
    text: "The Lab shares one design language with the studio. Speed never excuses a careless interface.",
  },
  {
    title: "A small senior team",
    text: "The people who scope the product build it. No hand-offs between departments, no six-month roadmaps before the first click.",
  },
];

export function Process() {
  return (
    <section id="process" className="wrap scroll-mt-20 py-20 md:py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal>
            <span className="tag">
              <Spark className="h-3 w-3 text-foreground" />
              Process
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            From first brief
            <br />
            <span className="h-dim">to production.</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          Short loops, live software, no hidden phases. The Lab is run by{" "}
          <a href="https://wetr.io" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-accent">
            WeTrio
          </a>
          , a B2B design studio. The same standards apply to code.
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/[0.08] md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={0.06 * i} className="bg-card p-7 md:p-8">
            <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-10 text-xl font-medium tracking-tight">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/[0.08] md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={0.06 * i} className="bg-background p-7 md:p-8">
            <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
