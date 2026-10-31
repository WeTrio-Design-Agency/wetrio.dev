"use client";

import { useRef, useState } from "react";
import { attributionField } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics/track";
import { CONTACT_EMAIL, SUBMIT_URL } from "@/lib/site";
import { Select } from "./Select";
import { Turnstile } from "./Turnstile";

const SERVICES = [
  { id: "saas", label: "SaaS platform" },
  { id: "webapp", label: "Web application or portal" },
  { id: "mobile", label: "Mobile app" },
  { id: "dashboard", label: "Dashboard or internal tool" },
  { id: "ai", label: "AI features and automation" },
  { id: "integration", label: "Integrations and APIs" },
  { id: "mvp", label: "MVP or prototype" },
  { id: "existing", label: "A product already in progress" },
  { id: "other", label: "Something else" },
];

const field =
  "w-full rounded-lg bg-white/[0.06] px-4 py-2.5 text-base text-foreground placeholder:text-white/40 outline-none ring-1 ring-white/15 transition-shadow focus:ring-2 focus:ring-accent";

type State = "idle" | "submitting" | "success";

/**
 * Posts to the studio's intake on admin.wetr.io, the way wetr.io's ContactPopup does: multipart, a honeypot, the
 * Turnstile token, the page and the campaign record. From there the lead is the studio's like any other (encrypted
 * row, Telegram, emails, the Hub), filed under the source `dev`. A conversion is counted only once the intake said
 * yes.
 */
export function ContactForm() {
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
    if (honeypot) data.append("website", honeypot);
    if (token) data.append("cf-turnstile-response", token);

    try {
      const res = await fetch(SUBMIT_URL, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (res.ok) {
        trackEvent("enquiry_submitted", { service: service || "not_specified" });
        setState("success");
        return;
      }
      // the intake answers 400 both for a bad address and for a failed challenge; its one sentence tells them apart
      let reason = res.status === 429 ? "rate_limit" : res.status >= 500 ? "server" : "validation";
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (/verification/i.test(body?.error ?? "")) reason = "turnstile";
      }
      trackEvent("enquiry_failed", { reason });
      setSendError(
        res.status === 429
          ? `Too many requests from this network. Try again in a few minutes or write to ${CONTACT_EMAIL}.`
          : `Something went wrong. Please try again or write to ${CONTACT_EMAIL}.`,
      );
    } catch {
      trackEvent("enquiry_failed", { reason: "network" });
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
        <p className="text-2xl font-medium tracking-tight">Thanks, {name.trim().split(/\s+/)[0]}.</p>
        <p className="text-base leading-relaxed text-white/80">
          Your request is with the team. We reply to {email.trim()} within one business day to book a short call.
        </p>
      </div>
    );
  }

  const disabled = state === "submitting" || (!token && !tokenFailed);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm text-white/70">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-invalid={errors.name || undefined}
            className={`${field} ${errors.name ? "ring-red-400" : ""}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm text-white/70">
            Work email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-invalid={errors.email || undefined}
            className={`${field} ${errors.email ? "ring-red-400" : ""}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-1.5 block text-sm text-white/70">
          What are you building?
        </label>
        <Select id="contact-service" value={service} onChange={setService} options={SERVICES} placeholder="Choose one" className={field} />
      </div>

      <div>
        <label htmlFor="contact-description" className="mb-1.5 block text-sm text-white/70">
          About the product
        </label>
        <textarea
          id="contact-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What it does, who it is for, where it stands today"
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
        <Turnstile resetKey={resetKey} onVerify={setToken} onExpire={() => setToken(null)} onLoadError={() => setTokenFailed(true)} />
      )}

      {sendError && (
        <p role="alert" className="text-sm text-red-300">
          {sendError}
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="submit" disabled={disabled} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {state === "submitting" ? "Sending…" : "Get my free audit"}
        </button>
        {!token && !tokenFailed && state === "idle" && <span className="text-sm text-white/60">Checking the connection…</span>}
      </div>
    </form>
  );
}
