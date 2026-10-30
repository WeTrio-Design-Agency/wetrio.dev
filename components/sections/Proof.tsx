import { Reveal } from "../Reveal";

const FACTS = [
  ["2024", "the year the studio was founded"],
  ["6", "products of our own in production"],
  ["3", "live demos you can click today"],
];

const NAMES = ["WeTrio Hub", "wetria", "Client portal", "Analyzer", "wetr.io", "Admin"];

export function Proof() {
  return (
    <section className="wrap py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
        <Reveal className="flex gap-10">
          {FACTS.map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-medium tracking-tight md:text-4xl">{n}</div>
              <div className="mt-1 max-w-[9rem] text-xs leading-snug text-muted-foreground">{l}</div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted md:justify-end">
          <span className="text-xs uppercase tracking-wider">Built and run by the Lab</span>
          {NAMES.map((n) => (
            <span key={n} className="font-medium text-muted-foreground">
              {n}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
