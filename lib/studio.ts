/**
 * The team and the testimonials, read from wetr.io's own database so an edit in the admin shows on both sites
 * (Kirill, 31.10: «как на витрио»). Public rows through the anon key, the same reads wetr.io makes, refreshed hourly.
 *
 * Without STUDIO_SUPABASE_URL and STUDIO_SUPABASE_ANON_KEY, or when the read fails, the page shows the snapshot
 * below (taken 31.10.2026), so the section never comes up empty.
 */

export type Member = { name: string; role: string; image: string };
export type Testimonial = { text: string; author: string; position: string; company: string; rating: number };

const URL = process.env.STUDIO_SUPABASE_URL?.trim();
const KEY = process.env.STUDIO_SUPABASE_ANON_KEY?.trim();

const TEAM_FALLBACK: Member[] = [
  { name: "Alex", role: "Founder, CEO", image: "/team/alex.webp" },
  { name: "Kate", role: "Chief Design Officer", image: "/team/kate.webp" },
  { name: "Daria", role: "Project Manager", image: "/team/daria.webp" },
];

/* The homepage set on wetr.io: active and not tied to a service. */
const TESTIMONIALS_FALLBACK: Testimonial[] = [
  {
    text: "Amazing work, communication and creativity as always. They did a great job understanding our needs and turning our existing materials into a killer presentation set.",
    author: "Camille D.",
    position: "Data Product Manager",
    company: "Louis Vuitton",
    rating: 5,
  },
  {
    text: "Wow, truly exceeded my expectations. That was money well spent. Definitely recommending and will use again for future projects.",
    author: "Mark S.",
    position: "VP of Marketing",
    company: "HSBC",
    rating: 5,
  },
  {
    text: "I can't say enough about the level of execution from this agency. I've used them multiple times, and each time it gets better! Fantastic! I recommend their services to everyone.",
    author: "Kenneth M.",
    position: "CEO",
    company: "Monfort Companies",
    rating: 5,
  },
  {
    text: "This is our third time working with this agency and we always appreciate their quick turnaround and quality of work! We will definitely work with them again!",
    author: "Amy B.",
    position: "Managing Partner",
    company: "DA Ventures",
    rating: 5,
  },
  {
    text: "Thank you for your quick turnaround! The presentation you created for us matched our brand perfectly, and the design was excellent. Our team was very pleased with the quality of work. We highly recommend your services!",
    author: "Kari U.",
    position: "Founder",
    company: "Range Meat Academy",
    rating: 5,
  },
  {
    text: "Amazing work, communication and creativity as always. WOW! This is my 2nd work with this agency and will be more. They did a great job, understanding our needs and turning our existing PPT into a killer pitch set. Thanks!",
    author: "Aswad K.",
    position: "Founder",
    company: "Frontplay Headwear",
    rating: 5,
  },
];

async function rest<T>(path: string): Promise<T | null> {
  if (!URL || !KEY) return null;
  try {
    const res = await fetch(`${URL}/rest/v1/${path}`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function loadTeam(): Promise<Member[]> {
  const rows = await rest<{ content?: { members?: Partial<Member>[] } }[]>(
    "pages?id=eq.team&status=eq.published&select=content",
  );
  const members = (rows?.[0]?.content?.members ?? []).filter(
    (m): m is Member => typeof m.name === "string" && typeof m.role === "string" && typeof m.image === "string",
  );
  return members.length ? members : TEAM_FALLBACK;
}

type TestimonialRow = {
  text: string | null;
  author_name: string | null;
  author_surname_initial: string | null;
  author_role: string | null;
  company: string | null;
  rating: number | null;
};

export async function loadTestimonials(): Promise<Testimonial[]> {
  const rows = await rest<TestimonialRow[]>(
    "testimonials?select=text,author_name,author_surname_initial,author_role,company,rating&active=eq.true&service_id=is.null&order=sort_order.asc",
  );
  const list = (rows ?? [])
    .filter((r) => r.text && r.author_name)
    .map((r) => ({
      text: r.text!,
      author: `${r.author_name}${r.author_surname_initial ? ` ${r.author_surname_initial}.` : ""}`,
      position: r.author_role ?? "",
      company: r.company ?? "",
      rating: r.rating ?? 5,
    }));
  return list.length ? list : TESTIMONIALS_FALLBACK;
}
