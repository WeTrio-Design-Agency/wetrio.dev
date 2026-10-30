"use client";

import { useEffect, useState } from "react";
import {
  clearTrackingCookies,
  grantGoogleConsent,
  readConsent,
  revokeGoogleConsent,
  storeConsent,
  type Consent,
} from "@/lib/analytics/consent";
import { GTM_ID, STUDIO_ORIGIN } from "@/lib/site";

/** The same two answers as on wetr.io. Reopened from the footer's "Cookie settings", so a choice can be taken back. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GTM_ID) return; // nothing is tracked, so there is nothing to ask
    if (!readConsent()) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener("cookie-settings", open);
    return () => window.removeEventListener("cookie-settings", open);
  }, []);

  const decide = (value: Consent) => {
    const previous = readConsent();
    storeConsent(value);
    // Taking consent back: deny, delete the identifiers already on the device, reload so running scripts stop.
    if (value === "essential" && previous === "all") {
      revokeGoogleConsent();
      clearTrackingCookies();
      window.location.reload();
      return;
    }
    if (value === "all") grantGoogleConsent();
    window.dispatchEvent(new CustomEvent("consent-update", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="glass fixed bottom-4 left-4 right-4 z-[70] max-w-md rounded-card p-5 sm:left-6 sm:right-auto"
    >
      <p id="cookie-title" className="text-sm font-medium">
        Cookies
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        We use cookies to see how the site is used and to improve it. Accept all or essential only. Details are in the{" "}
        <a
          href={`${STUDIO_ORIGIN}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-accent"
        >
          WeTrio privacy policy
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => decide("all")} className="btn btn-primary btn-sm">
          Accept all
        </button>
        <button type="button" onClick={() => decide("essential")} className="btn btn-secondary btn-sm">
          Essential only
        </button>
      </div>
    </div>
  );
}

/** The footer link that reopens the banner. */
export function CookieSettingsLink() {
  if (!GTM_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie-settings"))}
      className="text-xs text-muted transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
