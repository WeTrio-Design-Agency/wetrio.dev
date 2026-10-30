import { Fluid } from "../Fluid";
import { Reveal } from "../Reveal";
import { Fit } from "../mocks/Fit";
import { HubWindow } from "../mocks/HubWindow";

/**
 * The fold after the reference (Kirill, 30.10): the words in the left column, the picture a panel that runs from
 * under the bar to the right edge and the bottom of the first screen, the Hub window inside it scaled with the
 * panel and cut by its right and bottom edges. On a phone the panel sits under the words.
 */
export function Hero() {
  return (
    <section id="top" className="relative pt-20">
      <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)]">
        {/* the words */}
        <div className="flex flex-col justify-center px-6 pb-12 pt-16 md:px-10 lg:py-24 lg:pl-10 lg:pr-16">
          <Reveal as="h1" className="text-[2.75rem] font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl lg:text-[clamp(3rem,5.4vw,5.25rem)]">
            SaaS and web
            <br />
            products,
            <br />
            <span className="h-dim">built to ship.</span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Architecture, design, engineering and launch by one accountable team.
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
            <a href="#products" className="btn btn-secondary">
              See the products
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
