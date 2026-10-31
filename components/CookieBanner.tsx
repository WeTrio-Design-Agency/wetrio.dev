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
import type { CookieCopy } from "@/lib/studio";
import { STUDIO_ORIGIN } from "@/lib/site";

/**
 * wetr.io's banner one to one (Kirill, 31.10): the same words from the admin's Global elements, the same corner, size
 * and pill buttons, in the site's dark card. Asked until answered, reopened from the footer's "Cookie settings".
 */
export function CookieBanner({ copy }: { copy: CookieCopy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
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
    // in the click's own tick: GTM holds its tags for half a second waiting for exactly this
    if (value === "all") grantGoogleConsent();
    window.dispatchEvent(new CustomEvent("consent-update", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-4 left-4 right-4 z-[70] md:bottom-8 md:left-auto md:right-8 md:max-w-[342px]">
      <div className="rounded-2xl border border-white/10 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-6">
        <p className="text-sm leading-relaxed text-foreground/85">
          {copy.body}{" "}
          <a
            href={`${STUDIO_ORIGIN}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 underline underline-offset-2 transition-colors hover:text-foreground"
          >
            {copy.policyLabel}
          </a>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => decide("all")}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => decide("essential")}
            className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.essentialOnly}
          </button>
        </div>
      </div>
    </div>
  );
}

/** The footer link that reopens the banner, always there as on wetr.io. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie-settings"))}
      className="transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
