import { Check } from "../Icons";
import { Logo } from "../Logo";
import { Reveal } from "../Reveal";

/* The buyer's do-it-yourself alternative in 2026 is an AI app builder (strategy, 31.10): rows a buyer can check,
   no attack on AI. Laid out like wetria's Versus on wetr.io/wetria: our column is a card lifted off the table, theirs
   stays on the ground; one grid, the card spans every row behind its cells so the rows cannot drift apart. */
const ROWS = [
  { what: "Starts from", them: "A prompt", us: "Your business: who it is for and what it has to prove" },
  { what: "The design", them: "A template look", us: "A design studio's craft, built around your users" },
  { what: "Security", them: "Flaws in 45% of generated code*", us: "Reviewed code, tested sign-in and payments" },
  { what: "Real users", them: "Falls apart after a few iterations", us: "Built to hold real traffic and keep growing" },
  { what: "The code", them: "Generated, hard to hand over", us: "Clean, documented and yours from day one" },
  { what: "When something breaks", them: "You are on your own", us: "A team that monitors, fixes and keeps shipping" },
];

function Cross({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
    </svg>
  );
}

export function Versus() {
  return (
    <section id="versus" className="wrap scroll-mt-20 py-24 md:py-40 lg:py-48">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Reveal as="h2" className="text-[2.125rem] font-medium leading-[1.06] tracking-[-0.03em] md:text-[3.25rem] lg:text-[clamp(2.25rem,3.3vw,3.5rem)]">
            Why not just
            <br />
            <span className="h-dim">build it with AI?</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          AI builders are great for a demo. A product people pay for needs a team. We use AI too, behind people who answer
          for the result.
        </Reveal>
      </div>

      {/* desktop: the table with the lifted column */}
      <Reveal delay={0.1} className="relative mt-14 hidden md:block">
        <div className="grid grid-cols-[1fr_1.1fr_1.4fr] py-6" style={{ gridTemplateRows: `auto repeat(${ROWS.length}, auto)` }}>
          {/* the card behind our column: one grid item, every row */}
          <div aria-hidden className="col-start-3 row-start-1 -row-end-1 -my-6 rounded-card bg-card ring-1 ring-white/[0.08]" />

          <span className="col-start-1 row-start-1 py-5 pr-6 text-sm text-muted-foreground">&nbsp;</span>
          <span className="col-start-2 row-start-1 px-6 py-5 text-sm text-muted-foreground">AI app builders</span>
          <span className="relative col-start-3 row-start-1 flex items-center px-8 py-5">
            <Logo className="!h-7" />
          </span>

          {ROWS.map((r, i) => (
            <div key={r.what} className="contents">
              <p className="border-t border-white/[0.08] py-6 pr-6 text-lg font-medium" style={{ gridColumn: 1, gridRow: i + 2 }}>
                {r.what}
              </p>
              <p className="flex items-start gap-3 border-t border-white/[0.08] px-6 py-6 text-lg leading-relaxed text-muted-foreground" style={{ gridColumn: 2, gridRow: i + 2 }}>
                <Cross className="mt-1 h-5 w-5 shrink-0" />
                {r.them}
              </p>
              <p className="relative flex items-start gap-3 border-t border-white/[0.08] px-8 py-6 text-lg leading-relaxed" style={{ gridColumn: 3, gridRow: i + 2 }}>
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                {r.us}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* phone: one card per row, our answer on the lifted ground */}
      <ul className="mt-12 space-y-4 md:hidden">
        {ROWS.map((r, i) => (
          <Reveal as="li" key={r.what} delay={0.05 * i} className="overflow-hidden rounded-card bg-card ring-1 ring-white/[0.08]">
            <p className="px-6 pt-6 text-base font-medium">{r.what}</p>
            <p className="flex items-start gap-3 px-6 pb-4 pt-2 text-base leading-relaxed text-muted-foreground">
              <Cross className="mt-1 h-5 w-5 shrink-0" />
              {r.them}
            </p>
            <p className="flex items-start gap-3 bg-accent/[0.08] px-6 py-4 text-base leading-relaxed">
              <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
              {r.us}
            </p>
          </Reveal>
        ))}
      </ul>

      <p className="mt-8 text-xs text-muted">
        * OWASP Top-10 flaws in 45% of AI coding tasks across 100+ models,{" "}
        <a
          href="https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 underline-offset-2 hover:text-foreground"
        >
          Veracode, 2025
        </a>
        .
      </p>
    </section>
  );
}
