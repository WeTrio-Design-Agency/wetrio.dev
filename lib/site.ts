/** Site-wide constants. wetrio.dev has no admin of its own: everything that wetr.io reads from site_settings lives here. */

export const SITE_ORIGIN = "https://wetrio.dev";
export const SITE_NAME = "WeTrio Dev";
export const SHORT_NAME = "wetrio.dev";
export const TITLE = "WeTrio Dev: SaaS and web apps, designed and built by one team";
export const DESCRIPTION =
  "For founders and B2B teams. Product design and engineering under one roof, so nothing gets lost between designer and developer. A clickable prototype in 1–2 weeks.";
export const OG_IMAGE = "/og.jpg";

export const STUDIO_ORIGIN = "https://wetr.io";
/** The studio's Organization node on wetr.io, so the two graphs link as parent and child. */
export const STUDIO_ORG_ID = `${STUDIO_ORIGIN}/#organization`;

export const CONTACT_EMAIL = "start@wetr.io";
export const TELEGRAM_URL = "https://t.me/wetr_io";
export const WHATSAPP_URL = "https://wa.me/48506782768";
export const BEHANCE_URL = "https://www.behance.net/wetriodesign";

/**
 * The studio's intake on admin.wetr.io: the same endpoint the wetr.io forms post to, so a lead from here lands in
 * the same table, the same Telegram chat, the same emails and the Hub. The admin tells the two sites apart by the
 * request's origin and files these under the source `dev`. NEXT_PUBLIC_SUBMIT_URL points it at a local admin.
 */
export const SUBMIT_URL = process.env.NEXT_PUBLIC_SUBMIT_URL?.trim() || "https://admin.wetr.io/api/submit";

/** wetr.io's Cloudflare Turnstile widget; wetrio.dev has to be on its hostname list or every send fails. */
export const TURNSTILE_SITE_KEY = "0x4AAAAAADlXIg-NGqkeKitk";

/** Live hosts only: a build on localhost or a preview must not file its pageviews in the real property. */
export const ANALYTICS_HOSTS = ["wetrio.dev", "www.wetrio.dev"];

export function analyticsHostAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return ANALYTICS_HOSTS.includes(window.location.hostname);
}
