import { isDefaultHeading, DEV_CONTENT, type Content } from "@/lib/content";
import { Fluid } from "../Fluid";
import { Reveal } from "../Reveal";
import { Fit } from "../mocks/Fit";
import { HubWindow } from "../mocks/HubWindow";
import { Rich } from "../Rich";

/**
 * The fold after the reference (Kirill, 30.10): the words in the left column, the picture a panel that runs from
 * under the bar to the right edge and the bottom of the first screen, the Hub window inside it scaled with the
 * panel and cut by its right and bottom edges. On a phone the panel sits under the words.
 */
export function Hero({ copy }: { copy: Content["hero"] }) {
  return (
    <section id="top" className="relative pt-20">
      <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)]">
        {/* the words */}
        <div className="flex flex-col justify-center px-6 pb-12 pt-16 md:px-10 lg:justify-end lg:pb-20 lg:pl-10 lg:pr-10 lg:pt-24">
          {/* sized to their words, the same space on both sides of every divider (Kirill, 31.10) */}
          <Reveal className="mb-10 flex gap-5 md:gap-8 lg:mb-12">
            {copy.facts.map((f, i) => (
              <div key={f.label} className={`flex min-w-0 flex-col gap-1 ${i > 0 ? "border-l border-white/10 pl-5 md:pl-8" : ""}`}>
                <span className="text-lg font-medium leading-tight tracking-[-0.02em] md:text-2xl">{f.value}</span>
                <span className="text-xs leading-snug text-muted-foreground md:text-sm">{f.label}</span>
              </div>
            ))}
          </Reveal>
          <Reveal as="h1" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            {isDefaultHeading(copy.title, DEV_CONTENT.hero.title) ? (
              <>
                SaaS and web apps,{" "}
                <br className="hidden md:block" />
                designed and built{" "}
                {/* «by one team.» never splits; at desktop widths it takes the third line on its own */}
                <span className="h-dim whitespace-nowrap">by one team.</span>
              </>
            ) : (
              // a changed headline from the admin: its <br> breaks on every screen
              <Rich text={copy.title} />
            )}
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {copy.subtitle}
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" data-placement="hero" className="btn btn-primary">
              {copy.primary}
            </a>
            <a href="#products" className="btn btn-secondary">
              {copy.secondary}
            </a>
          </Reveal>
        </div>

        {/* on a desktop: air under the bar, the top-left corner rounded, the bottom-left square (Kirill, 30.10) */}
        <div className="relative mx-6 mb-6 h-[400px] overflow-hidden rounded-[28px] md:mx-10 md:h-[560px] lg:m-0 lg:mt-8 lg:h-auto lg:min-h-[640px] lg:rounded-none lg:rounded-tl-[28px]">
          <Fluid seed={0.3} />
          <Reveal delay={0.35} className="absolute inset-0">
            <Fit width={1440} span={1.22} x={0.07} y={0.08} narrow={{ span: 1.6, x: 0.07, y: 0.08 }}>
              <HubWindow />
            </Fit>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
