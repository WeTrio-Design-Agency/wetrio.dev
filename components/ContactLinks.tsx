"use client";

import { trackEvent } from "@/lib/analytics/track";
import { CONTACT_EMAIL, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/site";

type Channel = "email" | "telegram" | "whatsapp";

const LINKS: Record<Channel, { label: string; href: string; external: boolean }> = {
  email: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, external: false },
  telegram: { label: "Telegram", href: TELEGRAM_URL, external: true },
  whatsapp: { label: "WhatsApp", href: WHATSAPP_URL, external: true },
};

type Props = {
  /** Which channels, in order. The first one is the primary button. */
  order?: Channel[];
  /** Where on the page the row sits; goes into the `contact_click` event. */
  place: string;
  className?: string;
};

/** The three ways to reach us, as a row of buttons the size of the hero's (Kirill, 30.10). Every click is a `contact_click` event. */
export function ContactLinks({ order = ["email", "telegram", "whatsapp"], place, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {order.map((c, i) => {
        const l = LINKS[c];
        return (
          <a
            key={c}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => trackEvent("contact_click", { channel: c, placement: place })}
            className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
          >
            {l.label}
          </a>
        );
      })}
    </div>
  );
}
