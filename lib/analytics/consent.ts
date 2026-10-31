/**
 * Google Consent Mode v2, the way wetr.io does it: the container loads for everyone, storage does not until the
 * visitor accepts. GA4 then receives an anonymous ping from a refused visit instead of silence, which is what puts
 * a consent rate and modelled conversions in the reports.
 */

import { ANALYTICS_HOSTS } from "@/lib/site";

export const CONSENT_KEY = "cookie-consent";
export type Consent = "all" | "essential";

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[];
    // Defined by the inline script below, which runs before anything else.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Inline <head> script, rendered by the root layout ahead of everything else. It has to be inline and first:
 * defaults set after the container has loaded arrive too late. `wait_for_update` holds the tags for half a second
 * so a visitor who answers the banner at once is still measured correctly. Off the live hosts, or without a
 * container id, it does nothing.
 */
export function consentDefaultScript(gtmId: string): string {
  if (!gtmId) return "";
  return `
(function(){
if(${JSON.stringify(ANALYTICS_HOSTS)}.indexOf(location.hostname)===-1)return;
window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments)};
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','url_passthrough',true);
gtag('set','ads_data_redaction',true);
try{if(localStorage.getItem('${CONSENT_KEY}')==='all'){gtag('consent','update',${JSON.stringify(GRANTED)})}}catch(e){}
})();
`.trim();
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the banner will ask again next time */
  }
  document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=31536000; samesite=lax; secure`;
}

/** Called from the banner's click, not from an effect: GTM has to hear it while `wait_for_update` still holds. */
export function grantGoogleConsent() {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", GRANTED);
}

export function revokeGoogleConsent() {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", DENIED);
}

/** The identifiers an accepted tracker leaves behind; `_ga_<STREAM>` is matched by prefix. */
const TRACKING_COOKIES = ["_ga", "_gid", "_gcl_au", "_fbp", "_fbc", "_clck", "_clsk"];

export function clearTrackingCookies() {
  if (typeof document === "undefined") return;
  const host = location.hostname;
  const root = host.split(".").slice(-2).join(".");
  const names = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((n) => TRACKING_COOKIES.some((t) => n === t || n.startsWith(`${t}_`)));
  const gone = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  for (const n of names) {
    for (const d of ["", `; domain=${host}`, `; domain=.${host}`, `; domain=.${root}`]) {
      document.cookie = `${n}=; ${gone}${d}`;
    }
  }
}
