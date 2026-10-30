import { CONTACT_EMAIL, DESCRIPTION, OG_IMAGE, SHORT_NAME, SITE_NAME, SITE_ORIGIN, STUDIO_ORG_ID, STUDIO_ORIGIN } from "./site";

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/**
 * Organization, not ProfessionalService (that is a LocalBusiness and expects an address and opening hours we do not
 * publish). The Lab is a child of the studio: `parentOrganization` points at wetr.io's own Organization node.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: SHORT_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/icon.svg`,
    image: `${SITE_ORIGIN}${OG_IMAGE}`,
    description: DESCRIPTION,
    areaServed: "Worldwide",
    parentOrganization: {
      "@type": "Organization",
      "@id": STUDIO_ORG_ID,
      name: "WeTrio Agency",
      alternateName: "WeTrio",
      url: `${STUDIO_ORIGIN}/`,
    },
    knowsAbout: [
      "SaaS Development",
      "Web Application Development",
      "Client Portals",
      "Dashboards and Internal Tools",
      "AI Features and Automation",
      "API Integration",
      "MVP Development",
      "Product Design",
    ],
    sameAs: [`${STUDIO_ORIGIN}/`],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "sales",
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SHORT_NAME,
    url: `${SITE_ORIGIN}/`,
    publisher: { "@id": ORG_ID },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
