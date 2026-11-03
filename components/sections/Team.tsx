import Image from "next/image";
import type { Content } from "@/lib/content";
import type { Member } from "@/lib/studio";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";

/* Per-photo framing, as on wetr.io: the files are framed eyes-on-one-line, so every card uses the centred crop today.
   A photo that sits differently gets an objectPosition here. Keyed by name, as the admin stores it. */
const FRAMING: Record<string, string> = {};

/** The people, as on wetr.io (Kirill, 31.10): portrait cards with the name and role over a dark fade. */
export function Team({ copy, members }: { copy: Content["team"]; members: Member[] }) {
  return (
    <section id="team" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            <Rich text={copy.heading} />
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.subtitle}
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={0.06 * i} className="relative aspect-[15/17] overflow-hidden rounded-card bg-card ring-1 ring-white/[0.08]">
            <Image
              src={m.image}
              alt={m.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              quality={82}
              className="object-cover"
              style={{ objectPosition: FRAMING[m.name] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xl font-medium leading-tight md:text-2xl">{m.name}</p>
              <p className="mt-1 text-sm text-white/60">{m.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
