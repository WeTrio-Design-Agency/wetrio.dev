import type { Content } from "@/lib/content";
import { ContactForm } from "../ContactForm";
import { Fluid } from "../Fluid";
import { Reveal } from "../Reveal";
import { ContactLinks } from "../ContactLinks";
import { Rich } from "../Rich";

export function Contact({ copy }: { copy: Content["contact"] }) {
  return (
    <section id="contact" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <Reveal className="relative overflow-hidden rounded-[28px]" clip>
        <Fluid seed={6.8} />
        <div className="relative grid grid-cols-1 gap-10 p-6 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <h2 className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
              <Rich text={copy.heading} />
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              {copy.subtitle}
            </p>
            <div className="mt-auto pt-10">
              <p className="text-sm text-white/70">{copy.quick}</p>
              <ContactLinks place="contact" className="mt-3" />
            </div>
          </div>
          <div className="glass rounded-card p-6 md:p-8">
            <ContactForm copy={copy.form} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
