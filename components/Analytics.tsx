"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { GTM_ID, analyticsHostAllowed } from "@/lib/site";

let injected = false;

/**
 * Loads the GTM container once per page load, on the live hosts only. GA4 and Clarity are tags inside it, so no
 * standalone gtag.js: that would count every pageview twice. What the container may store is decided by the
 * Consent Mode defaults in the root layout.
 */
export function Analytics() {
  useEffect(() => {
    // outside the consent and host gates on purpose: the campaign record is functionality storage, as on wetr.io
    captureAttribution();
    if (injected || !GTM_ID || !analyticsHostAllowed()) return;
    injected = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, []);
  return null;
}
