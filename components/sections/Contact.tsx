import { ContactForm } from "../ContactForm";
import { Fluid } from "../Fluid";
import { Spark } from "../Icons";
import { Reveal } from "../Reveal";

export function Contact() {
  return (
    <section id="contact" className="wrap scroll-mt-16 py-20 md:py-32">
      <Reveal className="relative overflow-hidden rounded-[28px]">
        <Fluid seed={6.8} />
        <div className="relative grid grid-cols-1 gap-10 p-6 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <span className="tag self-start bg-black/30 text-foreground">
              <Spark className="h-3 w-3" />
              Start a project
            </span>
            <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
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
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="mailto:start@wetr.io" className="btn btn-secondary btn-sm bg-black/30">
                  start@wetr.io
                </a>
                <a href="https://t.me/wetr_io" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm bg-black/30">
                  Telegram
                </a>
                <a href="https://wa.me/48506782768" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm bg-black/30">
                  WhatsApp
                </a>
              </div>
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
