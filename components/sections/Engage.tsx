import { Reveal } from "../Reveal";
import { Checks } from "../mocks/Windows";

/* Three formats without prices (Kirill's pick, 31.10): what each is for, how it is priced, what you get. */
const FORMATS = [
  {
    name: "Discovery sprint",
    terms: "1–2 weeks · fixed price",
    title: "For an idea or a product that needs a plan.",
    checks: ["Scope and architecture", "A live demo on its own link", "An estimate for the first version"],
  },
  {
    name: "First version",
    terms: "Fixed scope · fixed price",
    title: "For a product ready to be built.",
    checks: ["Weekly releases on a live URL", "Design and engineering in one team", "Launch, monitoring and handover"],
  },
  {
    name: "Product team",
    terms: "Monthly",
    title: "For a live product that has to keep moving.",
    checks: ["New features and fixes every week", "Monitoring and support", "A team that already knows your code"],
  },
];

export function Engage() {
  return (
    <section id="engage" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            Three ways to work,
            <br />
            <span className="h-dim">priced before we start.</span>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Every engagement starts with the free audit, and the price is agreed before any work begins.
          </p>
          <a href="#contact" className="btn btn-primary">
            Get a free audit
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/[0.08] lg:grid-cols-3">
        {FORMATS.map((f, i) => (
          <Reveal key={f.name} delay={0.06 * i} className="flex flex-col bg-card p-7 md:p-8">
            <span className="text-xs text-accent">{f.terms}</span>
            <h3 className="mt-10 text-xl font-medium tracking-tight">{f.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{f.title}</p>
            <Checks items={f.checks} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
