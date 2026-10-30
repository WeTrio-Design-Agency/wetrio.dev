import { type GlyphName } from "../Icons";
import { Reveal } from "../Reveal";
import { StackIcon } from "../mocks/Windows";

const STACK: { name: string; role: string; icon: GlyphName }[] = [
  { name: "Next.js", role: "Framework", icon: "code" },
  { name: "React", role: "Interface", icon: "atom" },
  { name: "TypeScript", role: "Language", icon: "type" },
  { name: "Tailwind CSS", role: "Styling", icon: "wind" },
  { name: "Supabase", role: "Auth and data", icon: "bolt" },
  { name: "PostgreSQL", role: "Database", icon: "database" },
  { name: "Stripe", role: "Billing", icon: "card" },
  { name: "Cloudflare", role: "DNS and edge", icon: "cloud" },
  { name: "Coolify", role: "Deploys", icon: "rocket" },
  { name: "Docker", role: "Containers", icon: "box" },
  { name: "Claude API", role: "AI features", icon: "sparkles" },
  { name: "Playwright", role: "Testing", icon: "flask" },
];

export function Stack() {
  return (
    <section id="stack" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            Built on a stack
            <br />
            <span className="h-dim">we run in production.</span>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-5">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            No experiments on your budget. Every tool below runs our own products today.
          </p>
          <a href="#products" className="btn btn-secondary">
            See the products
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-white/[0.08] md:grid-cols-3 xl:grid-cols-6">
        {STACK.map((s, i) => (
          <Reveal key={s.name} delay={0.03 * i} className="bg-background p-6 md:p-7">
            <StackIcon name={s.icon} />
            <div className="mt-10 font-medium">{s.name}</div>
            <div className="mt-1 text-sm text-muted">{s.role}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
