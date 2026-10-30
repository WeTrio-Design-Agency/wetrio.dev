/** Site-wide constants. The Lab has no admin: everything that wetr.io reads from site_settings lives here. */

export const SITE_ORIGIN = "https://wetrio.dev";
export const SITE_NAME = "WeTrio Development Lab";
export const SHORT_NAME = "WeTrio Dev Lab";
export const TITLE = "WeTrio Development Lab: SaaS and web products by one team, from architecture to launch";
export const DESCRIPTION =
  "A design studio's dev lab building SaaS and web products. Architecture, design, engineering and launch by one team: interfaces people want to use, code that holds in production.";
export const OG_IMAGE = "/og.jpg";

export const STUDIO_ORIGIN = "https://wetr.io";
/** The studio's Organization node on wetr.io, so the two graphs link as parent and child. */
export const STUDIO_ORG_ID = `${STUDIO_ORIGIN}/#organization`;

export const CONTACT_EMAIL = "start@wetr.io";
export const TELEGRAM_URL = "https://t.me/wetr_io";
export const WHATSAPP_URL = "https://wa.me/48506782768";

/**
 * The GTM container, set in Coolify as NEXT_PUBLIC_GTM_ID. Blank means no analytics at all: the container is
 * never injected and the consent script does nothing. GA4 and Clarity are tags inside the container, as on wetr.io.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

/** Live hosts only: a build on localhost or a preview must not file its pageviews in the real property. */
export const ANALYTICS_HOSTS = ["wetrio.dev", "www.wetrio.dev"];

export function analyticsHostAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return ANALYTICS_HOSTS.includes(window.location.hostname);
}
