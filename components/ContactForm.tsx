"use client";

import { useState } from "react";

const SERVICES = [
  { id: "saas", label: "SaaS platform" },
  { id: "webapp", label: "Web application or portal" },
  { id: "dashboard", label: "Dashboard or internal tool" },
  { id: "ai", label: "AI features and automation" },
  { id: "integration", label: "Integrations and APIs" },
  { id: "mvp", label: "MVP or prototype" },
  { id: "other", label: "Something else" },
];

const CONTACT_EMAIL = "start@wetr.io";

const field =
  "w-full rounded-lg bg-white/[0.06] px-4 py-2.5 text-base text-foreground placeholder:text-white/40 outline-none ring-1 ring-white/15 transition-shadow focus:ring-2 focus:ring-accent";

/* The form opens the visitor's mail client for now; the Hub intake is the next step (Kirill, 30.10.2026). */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: boolean }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = {
      name: !name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      description: !description.trim(),
    };
    setErrors(next);
    if (next.name || next.email || next.description) return;

    const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? "Not specified";
    const subject = `New project enquiry: ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Service: ${serviceLabel}`, "", "Project:", description].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

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
            Email
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
          What do you need?
        </label>
        <div className="relative">
          <select
            id="contact-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`${field} appearance-none pr-10 ${service ? "" : "text-white/40"}`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id} className="bg-card text-foreground">
                {s.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="contact-description" className="mb-1.5 block text-sm text-white/70">
          About the product
        </label>
        <textarea
          id="contact-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What it does, who it is for, when you need the first version"
          rows={4}
          aria-invalid={errors.description || undefined}
          className={`${field} resize-none ${errors.description ? "ring-red-400" : ""}`}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-1 self-start">
        Send enquiry
      </button>
    </form>
  );
}
