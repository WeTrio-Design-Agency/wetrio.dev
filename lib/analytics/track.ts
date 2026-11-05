import { analyticsHostAllowed } from "@/lib/site";

/**
 * One event to every sink, as wetr.io's `src/utils/trackEvent.ts` does it. The names are wetr.io's contract: the GTM
 * container has a GA4 tag only for those, and the Hub reads them from PostHog (`quote_form_submitted` ties a lead to
 * its visit, `contact_click` counts as one). A name outside the contract reaches PostHog and nothing else.
 *
 *  - GTM's dataLayer: the container loads for everyone and Consent Mode decides what GA4 may store.
 *  - PostHog, directly: cookieless until "Accept all" (lib/analytics/posthog.ts).
 *  - The Meta Pixel, for the events that are Meta standard events; fbq exists only after "Accept all". The Lead
 *    carries the id the intake sends to Meta from the server too, so Meta counts one.
 */

const META_STANDARD_EVENTS: Record<string, string> = {
  quote_form_submitted: "Lead",
  contact_click: "Contact",
};

/** Every parameter an event here can carry: cleared on each push, or the dataLayer lends one event's to the next. */
const EVENT_PARAMS = ["channel", "placement", "service", "file_count", "reason", "item"] as const;
const CLEARED = Object.fromEntries(EVENT_PARAMS.map((k) => [k, undefined]));

/** Where a click on this address goes in wetr.io's contract: a way to write to us or follow us, a case, or nothing. */
const CHANNELS: [RegExp, string][] = [
  [/^mailto:/i, "email"],
  [/^https?:\/\/(t\.me|telegram\.me)\//i, "telegram"],
  [/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i, "whatsapp"],
  [/^https?:\/\/(www\.)?behance\.net\//i, "behance"],
  [/^https?:\/\/(www\.)?instagram\.com\//i, "instagram"],
  [/^https?:\/\/(www\.)?linkedin\.com\//i, "linkedin"],
];
const CASE = /^https?:\/\/([a-z0-9-]+)\.demo\.wetrio\.dev|^https?:\/\/wetr\.io\/projects\/([a-z0-9-]+)/i;

/**
 * The event a link click is, by its address alone: the form's buttons, every contact and social link, every
 * project card. Other links (the studio's pages, a cited article) are left to PostHog's autocapture and GA4's
 * outbound clicks.
 */
export function linkEvent(href: string, placement: string): [string, Record<string, string>] | null {
  if (href === "#contact") return ["quote_form_opened", { placement }];
  const channel = CHANNELS.find(([re]) => re.test(href))?.[1];
  if (channel) return ["contact_click", { channel, placement }];
  const c = CASE.exec(href);
  if (c) return ["case_opened", { item: c[1] ?? c[2], placement }];
  return null;
}

export function trackEvent(event: string, params: Record<string, string | number> = {}, eventId?: string) {
  if (typeof window === "undefined" || !analyticsHostAllowed()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...CLEARED, ...params });
  window.posthog?.capture?.(event, { ...params, sent_via: "site" });
  const meta = META_STANDARD_EVENTS[event];
  if (meta && typeof window.fbq === "function") {
    window.fbq("track", meta, params, eventId ? { eventID: eventId } : undefined);
  }
}
