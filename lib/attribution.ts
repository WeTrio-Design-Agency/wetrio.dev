/**
 * Where a lead came from, recorded by the site itself, exactly as wetr.io does it (`src/lib/attribution.ts` there).
 *
 * GA4 sits behind Consent Mode, so a visitor who never accepts cookies is an estimate rather than a session. The
 * campaign therefore travels with the form instead: kept in functionality storage, which Consent Mode grants by
 * default, and posted to the admin with the lead, where `parseAttribution` whitelists it.
 *
 * Two touches: FIRST is the visit that introduced us and never moves for 90 days, LAST is the latest visit that
 * said where it came from.
 */

const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "utm_placement",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

type Touch = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  landed_at?: string;
};

type Attribution = { first_touch: Touch; last_touch: Touch };

const STORAGE_KEY = "wt_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
// every value arrives in a URL a stranger can write
const MAX_VALUE_LENGTH = 300;

function clean(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed || undefined;
}

function externalReferrer(): string | undefined {
  const raw = clean(document.referrer);
  if (!raw) return undefined;
  try {
    if (new URL(raw).hostname === location.hostname) return undefined;
  } catch {
    return undefined;
  }
  return raw;
}

function readTouch(): Touch {
  const params = new URLSearchParams(location.search);
  const touch: Touch = {};
  for (const key of PARAMS) {
    const value = clean(params.get(key));
    if (value) touch[key] = value;
  }
  touch.landing_page = clean(location.pathname + location.search);
  const referrer = externalReferrer();
  if (referrer) touch.referrer = referrer;
  touch.landed_at = new Date().toISOString();
  return touch;
}

/** A visit with no campaign and no referrer (a typed address, a bookmark) must not overwrite last week's campaign. */
function hasSignal(touch: Touch): boolean {
  return PARAMS.some((key) => touch[key]) || !!touch.referrer;
}

function read(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    if (!parsed || typeof parsed !== "object" || !parsed.first_touch) return null;
    return { first_touch: parsed.first_touch, last_touch: parsed.last_touch ?? parsed.first_touch };
  } catch {
    return null;
  }
}

function expired(touch: Touch): boolean {
  const at = touch.landed_at ? Date.parse(touch.landed_at) : NaN;
  return !Number.isNaN(at) && Date.now() - at > MAX_AGE_MS;
}

/** Record this page load. Safe on every mount: a visit with nothing to say leaves the record alone. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const touch = readTouch();
    const stored = read();
    if (!stored || expired(stored.first_touch)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ first_touch: touch, last_touch: touch }));
      return;
    }
    if (!hasSignal(touch)) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ first_touch: stored.first_touch, last_touch: touch }));
  } catch {
    /* storage unavailable: attribution is never worth breaking a page over */
  }
}

/** The value the form posts alongside the lead, or null when this browser has nothing to say. */
export function attributionField(): string | null {
  if (typeof window === "undefined") return null;
  const attribution = read();
  return attribution ? JSON.stringify(attribution) : null;
}
