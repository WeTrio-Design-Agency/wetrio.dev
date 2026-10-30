import { analyticsHostAllowed } from "@/lib/site";
import { readConsent } from "./consent";

/**
 * A custom event for the GTM container, the same shape as on wetr.io (`event` plus flat parameters). Nothing is
 * pushed off the live hosts or before the visitor accepted everything.
 */
export function trackEvent(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !analyticsHostAllowed()) return;
  if (readConsent() !== "all") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
