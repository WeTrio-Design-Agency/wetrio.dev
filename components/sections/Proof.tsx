import { Reveal } from "../Reveal";

/**
 * «Trusted by leading brands» with the five marks of wetr.io, in the site's own proportions (`HeroTrustBrands.tsx`,
 * measured on the live page: a 40px row, each mark 10% shorter than the row and capped at 160px × its scale, Nestlé a
 * size down, Louis Vuitton a size up, 56px between them). Here the sentence sits on the left and the row on the right
 * (Kirill, 30.10); on a phone the sentence on top, then three marks across and the two widest underneath, as the site
 * lays them out. The SVGs are the site's (public/logos), painted through a mask in the muted grey on the dark ground.
 */
const BRANDS: { name: string; file: string; ratio: number; scale: number; trim: number }[] = [
  { name: "HSBC", file: "hsbc", ratio: 315.215 / 84.8157, scale: 0.9, trim: 0.9 },
  { name: "Nestlé", file: "nestle", ratio: 226.308 / 61.7203, scale: 0.8075, trim: 0.765 },
  { name: "Louis Vuitton", file: "louis-vuitton", ratio: 504.082 / 61.7204, scale: 0.99, trim: 0.75 },
  { name: "SAP", file: "sap", ratio: 176.195 / 87.3289, scale: 0.9, trim: 0.765 },
  { name: "Oracle", file: "oracle", ratio: 390.895 / 51.4336, scale: 0.9, trim: 0.75 },
];
const ROW = 40;
const CAP = 160;
const TOP = ["HSBC", "Nestlé", "SAP"];

function Mark({ b, mobile }: { b: (typeof BRANDS)[number]; mobile?: boolean }) {
  const mask = `url(/logos/${b.file}.svg) center / contain no-repeat`;
  // height first, then the width cap: a wide wordmark is held to its cap and shrinks in height to keep its shape
  const w = Math.min(ROW * b.scale * b.ratio, CAP * b.scale);
  return (
    <span
      role="img"
      aria-label={b.name}
      className="block bg-muted-foreground opacity-70"
      style={{
        WebkitMask: mask,
        mask,
        aspectRatio: String(b.ratio),
        ...(mobile ? { width: `${b.trim * 100}%`, maxHeight: ROW * b.scale } : { width: w }),
      }}
    />
  );
}

export function Proof() {
  const top = BRANDS.filter((b) => TOP.includes(b.name));
  const bottom = BRANDS.filter((b) => !TOP.includes(b.name));
  return (
    <section id="brands" className="wrap py-12 md:py-16">
      <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
        <Reveal as="p" className="text-base text-muted-foreground">
          Trusted by leading brands
        </Reveal>

        {/* a desktop: one row, as on the site */}
        <div className="hidden items-center gap-x-14 md:flex">
          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={0.06 * i} className="flex h-10 items-center justify-center">
              <Mark b={b} />
            </Reveal>
          ))}
        </div>

        {/* a phone: two rows, each filling the measure */}
        <div className="md:hidden">
          {[top, bottom].map((row, r) => (
            <div key={r} className="flex items-center gap-6">
              {row.map((b, i) => (
                <Reveal key={b.name} delay={0.06 * (r * 3 + i)} className="flex flex-1 items-center justify-center py-4">
                  <Mark b={b} mobile />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
