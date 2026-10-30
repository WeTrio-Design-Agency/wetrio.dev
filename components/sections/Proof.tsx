import { Reveal } from "../Reveal";

/**
 * «Trusted by leading brands», the strip wetr.io/web-design carries, with the same five marks and the same sizing by
 * eye (`HeroTrustBrands.tsx` on the site): each mark 10% smaller than the row, Nestlé a size down, Louis Vuitton a
 * size up; on a phone three across the top and the two widest underneath, each trimmed inside its share of the row.
 * The SVGs are the site's (public/logos); on the dark ground they are painted through a mask in the muted grey.
 */
const BRANDS: { name: string; file: string; ratio: number; scale: number; trim: number }[] = [
  { name: "HSBC", file: "hsbc", ratio: 315.215 / 84.8157, scale: 0.9, trim: 0.9 },
  { name: "Nestlé", file: "nestle", ratio: 226.308 / 61.7203, scale: 0.8075, trim: 0.765 },
  { name: "SAP", file: "sap", ratio: 176.195 / 87.3289, scale: 0.9, trim: 0.765 },
  { name: "Louis Vuitton", file: "louis-vuitton", ratio: 504.082 / 61.7204, scale: 0.99, trim: 0.75 },
  { name: "Oracle", file: "oracle", ratio: 390.895 / 51.4336, scale: 0.9, trim: 0.75 },
];
const ROW = 40; // the desktop row, px
const TOP = ["HSBC", "Nestlé", "SAP"];

function Mark({ b, mobile }: { b: (typeof BRANDS)[number]; mobile?: boolean }) {
  const mask = `url(/logos/${b.file}.svg) center / contain no-repeat`;
  return (
    <span
      role="img"
      aria-label={b.name}
      className="block bg-muted-foreground opacity-70"
      style={{
        WebkitMask: mask,
        mask,
        aspectRatio: String(b.ratio),
        ...(mobile ? { width: `${b.trim * 100}%` } : { height: ROW * b.scale }),
      }}
    />
  );
}

export function Proof() {
  const top = BRANDS.filter((b) => TOP.includes(b.name));
  const bottom = BRANDS.filter((b) => !TOP.includes(b.name));
  return (
    <section id="brands" className="wrap py-14 text-center md:py-20">
      <Reveal as="p" className="text-base text-muted-foreground">
        Trusted by leading brands
      </Reveal>
      {/* a phone: two rows, each filling the measure */}
      <div className="mt-7 md:hidden">
        {[top, bottom].map((row, r) => (
          <div key={r} className="flex items-center gap-6">
            {row.map((b, i) => (
              <Reveal key={b.name} delay={0.06 * (r * 3 + i)} className="flex flex-1 items-center justify-center py-5">
                <Mark b={b} mobile />
              </Reveal>
            ))}
          </div>
        ))}
      </div>
      {/* a desktop: one row */}
      <div className="mt-9 hidden items-center justify-center gap-x-16 md:flex lg:gap-x-24">
        {BRANDS.map((b, i) => (
          <Reveal key={b.name} delay={0.06 * i} className="flex items-center">
            <Mark b={b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
