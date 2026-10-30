import { Fluid } from "../Fluid";
import { Spark } from "../Icons";
import { Reveal } from "../Reveal";
import { HubWindow } from "../mocks/Windows";

export function Hero() {
  return (
    <section id="top" className="relative pt-20">
      <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]">
        {/* the words */}
        <div className="flex flex-col justify-center px-6 pb-12 pt-16 md:px-10 lg:py-24 lg:pl-10 lg:pr-16">
          <Reveal>
            <span className="tag">
              <Spark className="h-3 w-3 text-foreground" />
              Design-led engineering by WeTrio
            </span>
          </Reveal>
          <Reveal as="h1" delay={0.1} className="mt-8 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl xl:text-[5.25rem]">
            SaaS and web
            <br />
            products,
            <br />
            <span className="h-dim">built to ship.</span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Architecture, design, engineering and launch by one accountable team. Every project runs on a real URL
            from the first weeks.
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

        {/* the picture: the moving blue ground and the Hub window over it, bleeding off the right edge */}
        <div className="relative mx-6 mb-6 h-[440px] overflow-hidden rounded-[28px] md:mx-10 md:h-[560px] lg:m-0 lg:mb-0 lg:h-auto lg:min-h-[640px] lg:rounded-l-[28px] lg:rounded-r-none">
          <Fluid seed={0.3} />
          <div className="absolute left-[6%] top-[8%] origin-top-left [transform:scale(0.42)] sm:[transform:scale(0.6)] lg:[transform:scale(0.72)] xl:[transform:scale(0.8)] 2xl:[transform:scale(0.9)]">
            <Reveal delay={0.35}>
              <HubWindow />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
