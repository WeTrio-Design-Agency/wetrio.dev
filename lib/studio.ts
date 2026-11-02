/**
 * The team and the testimonials, read from wetr.io's own database so an edit in the admin shows on both sites
 * (Kirill, 31.10: «как на витрио»). Public rows through the anon key, the same reads wetr.io makes, refreshed hourly.
 *
 * Without STUDIO_SUPABASE_URL and STUDIO_SUPABASE_ANON_KEY, or when the read fails, the page shows the snapshot
 * below (taken 31.10.2026), so the section never comes up empty.
 *
 * The cookie banner and the trackers come from the same place (Kirill, 31.10: «куки один в один как на витрио»): the
 * banner's words from the admin's Global elements, the GTM container and the Meta Pixel from its Site settings.
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

/* The set wetr.io/web-design shows (Kirill, 31.10): active, service `webdesign`, closest to what this site sells. */
const TESTIMONIALS_FALLBACK: Testimonial[] = [
  {
    text: "The website became much easier to understand. The team helped us turn a complex offer into a clear user journey with strong visual direction.",
    author: "Leila H.",
    position: "Product Lead",
    company: "Yuwab",
    rating: 5,
  },
  {
    text: "The new web design gave our product a much stronger digital presence. It feels cleaner, more premium, and easier for customers to navigate.",
    author: "Elena S.",
    position: "Brand Manager",
    company: "Sensin",
    rating: 5,
  },
  {
    text: "The landing page structure became sharper and more focused. It was clear that the design was built around how users actually make decisions.",
    author: "Alex P.",
    position: "Growth Lead",
    company: "Snappymob",
    rating: 5,
  },
  {
    text: "The interface direction helped us communicate the product more clearly. The team balanced visual quality with real usability.",
    author: "Tomas V.",
    position: "Product Manager",
    company: "Invideos",
    rating: 5,
  },
];

/** A public read from the studio's database; null without the keys or when the read fails. lib/content.ts reads the page's words with it. */
export async function rest<T>(path: string): Promise<T | null> {
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
    "testimonials?select=text,author_name,author_surname_initial,author_role,company,rating&active=eq.true&service_id=eq.webdesign&order=sort_order.asc",
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

export type CookieCopy = { body: string; policyLabel: string; acceptAll: string; essentialOnly: string };

/* wetr.io's own fallbacks (src/components/CookieBanner.tsx there), used while the admin leaves a field empty. */
const COOKIE_FALLBACK: CookieCopy = {
  body: "We use cookies to improve your experience. Accept all or essential cookies only. Learn more in our",
  policyLabel: "Privacy Policy",
  acceptAll: "Accept all",
  essentialOnly: "Essential only",
};

export async function loadCookieCopy(): Promise<CookieCopy> {
  const rows = await rest<{ content?: { cookie?: Partial<CookieCopy> } }[]>(
    "pages?id=eq.global&status=eq.published&select=content",
  );
  const c = rows?.[0]?.content?.cookie ?? {};
  const pick = (k: keyof CookieCopy) => (typeof c[k] === "string" && c[k]!.trim() ? c[k]!.trim() : COOKIE_FALLBACK[k]);
  return { body: pick("body"), policyLabel: pick("policyLabel"), acceptAll: pick("acceptAll"), essentialOnly: pick("essentialOnly") };
}

export type Trackers = { gtmId: string; metaPixelId: string };

/** The studio's GTM container and Meta Pixel; NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_META_PIXEL_ID override them for this site. */
export async function loadTrackers(): Promise<Trackers> {
  const rows = await rest<{ gtm_id: string | null; meta_pixel_id: string | null }[]>(
    "site_settings?select=gtm_id,meta_pixel_id&limit=1",
  );
  return {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || rows?.[0]?.gtm_id?.trim() || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || rows?.[0]?.meta_pixel_id?.trim() || "",
  };
}
