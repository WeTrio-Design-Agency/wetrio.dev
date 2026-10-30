import { ContactForm } from "../ContactForm";
import { Fluid } from "../Fluid";
import { Reveal } from "../Reveal";
import { ContactLinks } from "../ContactLinks";

export function Contact() {
  return (
    <section id="contact" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <Reveal className="relative overflow-hidden rounded-[28px]" clip>
        <Fluid seed={6.8} />
        <div className="relative grid grid-cols-1 gap-10 p-6 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-[clamp(2.75rem,4.2vw,3.75rem)]">
              Let&apos;s build the
              <br />
              first version.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              Tell us about your product. We reply with what the smallest version worth building looks like and when
              you can click it.
            </p>
            <div className="mt-auto pt-10">
              <p className="text-sm text-white/70">Prefer a quick message?</p>
              <ContactLinks place="contact" className="mt-3" />
            </div>
          </div>
          <div className="glass rounded-card p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
