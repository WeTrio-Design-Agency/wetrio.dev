"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { readConsent } from "@/lib/analytics/consent";
import { trackEvent } from "@/lib/analytics/track";
import { analyticsHostAllowed } from "@/lib/site";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

let gtmInjected = false;
let pixelInjected = false;

/** Meta's base code, as wetr.io's useMetaPixel injects it: only after "Accept all", only on the live hosts. */
function injectPixel(id: string) {
  if (pixelInjected || !analyticsHostAllowed()) return;
  pixelInjected = true;
  /* eslint-disable @typescript-eslint/no-explicit-any, prefer-spread, @typescript-eslint/no-unused-expressions */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    b.head.appendChild(t);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable @typescript-eslint/no-explicit-any, prefer-spread, @typescript-eslint/no-unused-expressions */
  window.fbq("init", id);
  window.fbq("trackSingle", id, "PageView");
}

/**
 * The studio's trackers, as on wetr.io: the GTM container (GA4 and Clarity live inside it) loads for everyone and
 * stores nothing until Consent Mode is granted; the Meta Pixel has no consent model, so it loads only on "Accept all".
 * Both ids come from the admin's Site settings (lib/studio.ts). PostHog is the inline script in the layout.
 */
export function Analytics({ gtmId, metaPixelId }: { gtmId: string; metaPixelId: string }) {
  useEffect(() => {
    // outside the consent and host gates on purpose: the campaign record is functionality storage, as on wetr.io
    captureAttribution();
    if (gtmInjected || !gtmId || !analyticsHostAllowed()) return;
    gtmInjected = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);
  }, [gtmId]);

  // Every button that leads to the form says where it sits (data-placement); one listener counts them all.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href="#contact"][data-placement]');
      if (a) trackEvent("quote_form_opened", { placement: a.getAttribute("data-placement") ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!metaPixelId) return;
    if (readConsent() === "all") injectPixel(metaPixelId);
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "all") injectPixel(metaPixelId);
    };
    window.addEventListener("consent-update", onConsent);
    return () => window.removeEventListener("consent-update", onConsent);
  }, [metaPixelId]);

  return null;
}
