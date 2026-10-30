/* ════════════════════════════════════════════════════════════════════════════
   Real runs, used wherever the page shows a slide.

   Every deck here is a job on wetria.wetr.io, pulled through the task's own
   preview route and kept in public/decks/<id> as webp: `<side>-NN.webp` at
   1600px for the compare frame, `<side>-NN-s.webp` at 480px for the rail.
   Where a deck is a client's, the names, figures and logos were changed with
   the product's own sanitize (deckbench) before rendering, on both sides with
   one plan, so a number that changes on the left changes the same way on the
   right. The page says so under the frame.
   ════════════════════════════════════════════════════════════════════════════ */

export type Side = "before" | "after"

export interface Deck {
  /** Folder under public/decks. */
  id: string
  /** The job on the platform, for the record. */
  job: string
  /** Who the deck is for, as the switcher names it. */
  client: string
  title: string
  mode: "Design" | "Adapt to template" | "Format"
  slides: number
  tokens: number
  /** The pair the frame opens on. */
  featured: number
  /** One line per slide, for the rail's labels and alt text. */
  labels: string[]
  /** The line under the frame. */
  note: string
  /** Sanitized: the content is fictional, the layout is the run's. */
  sanitized: boolean
}

/* Job 37fdcd67dadc (02.10.2026): a test brief with its spreadsheet attached, not a
   client's, so nothing in it needed changing. Design mode, 10 slides, gate passed,
   real cost $4.35 = 87 tokens at the client's price. */
export const LUMEN: Deck = {
  id: "lumen",
  job: "37fdcd67dadc",
  client: "Lumen Mobility",
  title: "Lumen Mobility Q3 2026 Business Review",
  mode: "Design",
  slides: 10,
  tokens: 87,
  featured: 2,
  labels: [
    "Cover",
    "Executive summary",
    "Revenue by month",
    "Revenue by city",
    "Rides by vehicle",
    "Unit economics by city",
    "EBITDA bridge",
    "Fleet and utilisation",
    "NPS and complaints",
    "Appendix: data sources",
  ],
  note: "A test brief with its spreadsheet, not a client's deck; the run is real.",
  sanitized: false,
}

/* The client runs below were sanitized before they were rendered, the product's own way:
   deckbench's sanitize (studio/deckbench/sanitize.py) with one plan applied to the original and
   to the result, so a name or a figure changed on the left is changed the same way on the
   right. Client logos and branded backgrounds were blanked in place (the frame stays, the mark
   goes), figures scaled by one factor so a chart still reads in order, and every slide was
   rendered in PowerPoint. The plans and the renders live with the session's scratchpad; the
   pipeline is in the handoff. */

/* Job 9819291a5eef (04.10.2026): a startup's investor pitch, Design mode, twelve slides; the
   competitor screenshot, the team and the contacts are left out. 73 tokens for the run. */
export const LOOT: Deck = {
  id: "loot",
  job: "9819291a5eef",
  client: "Quest Vault",
  title: "Quest Vault, an investor pitch",
  mode: "Design",
  slides: 9,
  tokens: 73,
  featured: 1,
  labels: ["Cover", "Problem", "Solution", "How it works", "Market", "Traction", "Roadmap", "Financial model", "Impact"],
  note: "Nine of the run's twelve slides. Names and figures are changed; the layouts are the run's.",
  sanitized: true,
}

/* Job 27aceeb7dbed (06.10.2026): a fund's sector deck, Design mode on an agency's template,
   eight slides. 147 tokens. */
export const HEALTH: Deck = {
  id: "health",
  job: "27aceeb7dbed",
  client: "Health AI",
  title: "Health AI, a sector deck",
  mode: "Design",
  slides: 8,
  tokens: 147,
  featured: 7,
  labels: [
    "Cover",
    "The analytics frontier",
    "Healthcare challenges",
    "A market in its infancy",
    "Where AI applies",
    "Proactive and convenient",
    "Radiology",
    "Learnings for investors",
  ],
  note: "All eight slides. Names, figures and logos are changed; the layouts are the run's.",
  sanitized: true,
}

/* Job 48f90e42da1a (06.10.2026): a vendor's proposal moved onto an agency's template, Adapt to
   template mode, sixteen slides; ten of them. 146 tokens. */
export const AGENTS: Deck = {
  id: "agents",
  job: "48f90e42da1a",
  client: "Contract intelligence",
  title: "Contract intelligence, a vendor proposal",
  mode: "Adapt to template",
  slides: 10,
  tokens: 146,
  featured: 4,
  labels: [
    "Cover",
    "Agenda",
    "From documents to outcomes",
    "Agentic AI in action, 1",
    "Agentic AI in action, 2",
    "From graveyard to source of truth",
    "Phased deployment",
    "Clean-up economics",
    "Investment overview",
    "Scope overview",
  ],
  note: "Ten of the run's sixteen slides. Names, figures and logos are changed; the layouts are the run's.",
  sanitized: true,
}

/** The examples: one slide of each run, chosen by Kirill (11.10). Lumen first, in the dark green
    style it was asked for; then Quest Vault, Health AI and Contract intelligence. `n` is the slide's
    number in the deck's folder; `service` keys the product's service (product.ts SERVICES). */
export const EXAMPLES: { deck: Deck; n: number; service: "format" | "template" | "restyle" | "sanitize"; title: string; line: string }[] = [
  {
    deck: LUMEN,
    n: 4,
    service: "restyle",
    title: "Charts built from Excel",
    line: "The draft named the data. Design built the chart from the attached Excel, in a dark executive style.",
  },
  {
    deck: LOOT,
    n: 8,
    service: "template",
    title: "Figures into a pitch slide",
    line: "The point went into the title, three years of revenue into a chart. Every figure is the draft's.",
  },
  {
    deck: HEALTH,
    n: 5,
    service: "format",
    title: "A crowded slide, calmed",
    line: "The same eleven points on one grid, in the deck's own colours. The layout changed, the content did not.",
  },
  {
    deck: AGENTS,
    n: 9,
    service: "template",
    title: "Moved onto your template",
    line: "Every word and figure carried across, into the template's layouts, type and colours.",
  },
]

export const slideOf = (deck: Deck, side: Side, n: number, small = false) =>
  `/wetria/decks/${deck.id}/${side}-${String(n).padStart(2, "0")}${small ? "-s" : ""}.webp`

/** Lumen's slides, for the blocks that use that one run. */
export const slide = (side: Side, n: number, small = false) => slideOf(LUMEN, side, n, small)
export const LUMEN_SLIDES = LUMEN.labels

/* What was asked, as it reads in the request bubble. */
export const LUMEN_BRIEF = "Executive committee deck, dark style. Build every chart from the attached Excel."
