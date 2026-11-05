"use client";

import { useEffect, useRef, useState } from "react";
import { attributionField } from "@/lib/attribution";
import type { Content } from "@/lib/content";
import { trackEvent } from "@/lib/analytics/track";
import { CONTACT_EMAIL, SUBMIT_URL } from "@/lib/site";
import { Select } from "./Select";
import { Turnstile } from "./Turnstile";

/* The options' ids; their labels are the admin's (lib/content.ts), one per slot, and the label is what the intake gets. */
const SERVICE_IDS = ["saas", "webapp", "mobile", "dashboard", "ai", "integration", "mvp", "existing", "other"];

const field =
  "w-full rounded-lg bg-white/[0.06] px-4 py-2.5 text-base text-foreground placeholder:text-white/40 outline-none ring-1 ring-white/15 transition-shadow focus:ring-2 focus:ring-accent";

type State = "idle" | "submitting" | "success";

/**
 * Posts to the studio's intake on admin.wetr.io, the way wetr.io's ContactPopup does: multipart, a honeypot, the
 * Turnstile token, the page and the campaign record. From there the lead is the studio's like any other (encrypted
 * row, Telegram, emails, the Hub), filed under the source `dev`. A conversion is counted only once the intake said
 * yes. The words are the admin's (lib/content.ts); the error lines stay here, they carry the address in lib/site.ts.
 */
export function ContactForm({ copy }: { copy: Content["contact"]["form"] }) {
  const SERVICES = SERVICE_IDS.map((id, i) => ({ id, label: copy.services[i] }));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: boolean }>({});
  const [state, setState] = useState<State>("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenFailed, setTokenFailed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const sending = useRef(false);
  // The human check loads when the form comes near the screen, not with the page: it was 1.7 MB of the page's 3 MB
  // and most of the main-thread work on a phone, for a form at the very bottom (audit 05.11).
  const checkSlot = useRef<HTMLDivElement>(null);
  const [checkNear, setCheckNear] = useState(false);
  useEffect(() => {
    const el = checkSlot.current;
    if (!el || typeof IntersectionObserver === "undefined") return setCheckNear(true);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setCheckNear(true);
        io.disconnect();
      }
    }, { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const freshToken = () => {
    setToken(null);
    setResetKey((k) => k + 1);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending.current) return;
    const next = {
      name: !name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      description: !description.trim(),
    };
    setErrors(next);
    const first = (["name", "email", "description"] as const).find((k) => next[k]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    sending.current = true;
    setState("submitting");
    setSendError(null);

    const data = new FormData();
    data.append("type", "contact");
    data.append("name", name.trim());
    data.append("email", email.trim());
    data.append("service", SERVICES.find((s) => s.id === service)?.label ?? "");
    data.append("description", description.trim());
    data.append("pageUrl", window.location.href);
    const attribution = attributionField();
    if (attribution) data.append("attribution", attribution);
    // one id for the browser's Lead and the copy the intake sends Meta from the server, so Meta counts one
    // randomUUID exists only on https and in browsers from 2022 on; a form stuck on "Sending…" would cost the lead
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    data.append("eventId", eventId);
    const fbp = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
    if (fbp) data.append("fbp", fbp);
    if (honeypot) data.append("website", honeypot);
    if (token) data.append("cf-turnstile-response", token);

    try {
      const res = await fetch(SUBMIT_URL, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (res.ok) {
        trackEvent("quote_form_submitted", { service: service || "none", file_count: 0 }, eventId);
        setState("success");
        return;
      }
      // the intake answers 400 both for a bad address and for a failed challenge; its one sentence tells them apart
      let reason = res.status === 429 ? "rate_limit" : res.status >= 500 ? "server" : "validation";
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (/verification/i.test(body?.error ?? "")) reason = "turnstile";
      }
      trackEvent("quote_form_failed", { reason });
      setSendError(
        res.status === 429
          ? `Too many requests from this network. Try again in a few minutes or write to ${CONTACT_EMAIL}.`
          : `Something went wrong. Please try again or write to ${CONTACT_EMAIL}.`,
      );
    } catch {
      trackEvent("quote_form_failed", { reason: "network" });
      setSendError(`Could not connect. Check your connection or write to ${CONTACT_EMAIL}.`);
    } finally {
      sending.current = false;
    }
    setState("idle");
    freshToken();
  }

  if (state === "success") {
    return (
      <div className="flex flex-col gap-3 py-6" role="status">
        <p className="text-2xl font-medium tracking-tight">{copy.thanks.replaceAll("{name}", name.trim().split(/\s+/)[0])}</p>
        <p className="text-base leading-relaxed text-white/80">{copy.received.replaceAll("{email}", email.trim())}</p>
      </div>
    );
  }

  const disabled = state === "submitting" || (!token && !tokenFailed);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm text-white/70">
            {copy.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            aria-invalid={errors.name || undefined}
            className={`${field} ${errors.name ? "ring-red-400" : ""}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm text-white/70">
            {copy.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            aria-invalid={errors.email || undefined}
            className={`${field} ${errors.email ? "ring-red-400" : ""}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-1.5 block text-sm text-white/70">
          {copy.serviceLabel}
        </label>
        <Select id="contact-service" value={service} onChange={setService} options={SERVICES} placeholder={copy.servicePlaceholder} className={field} />
      </div>

      <div>
        <label htmlFor="contact-description" className="mb-1.5 block text-sm text-white/70">
          {copy.aboutLabel}
        </label>
        <textarea
          id="contact-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={copy.aboutPlaceholder}
          rows={4}
          aria-invalid={errors.description || undefined}
          className={`${field} resize-none ${errors.description ? "ring-red-400" : ""}`}
        />
      </div>

      {/* the honeypot: people never see it, bots fill it, and the intake quietly drops the send */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {!tokenFailed && (
        <div ref={checkSlot}>
          {checkNear && (
            <Turnstile resetKey={resetKey} onVerify={setToken} onExpire={() => setToken(null)} onLoadError={() => setTokenFailed(true)} />
          )}
        </div>
      )}

      {sendError && (
        <p role="alert" className="text-sm text-red-300">
          {sendError}
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="submit" disabled={disabled} className="btn btn-primary">
          {state === "submitting" ? copy.sending : copy.button}
        </button>
        {!token && !tokenFailed && state === "idle" && <span className="text-sm text-white/60">{copy.checking}</span>}
      </div>
    </form>
  );
}
