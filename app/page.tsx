import { Header } from "@/components/Header";
import { Build } from "@/components/sections/Build";
import { Contact } from "@/components/sections/Contact";
import { Engage } from "@/components/sections/Engage";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Projects } from "@/components/sections/Projects";
import { Proof } from "@/components/sections/Proof";
import { Stack } from "@/components/sections/Stack";
import { Versus } from "@/components/sections/Versus";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { loadContent, loadSeo } from "@/lib/content";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { loadTeam, loadTestimonials } from "@/lib/studio";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function Home() {
  const [copy, seo, team, testimonials] = await Promise.all([loadContent(), loadSeo(), loadTeam(), loadTestimonials()]);
  return (
    <main id="main" className="grain">
      <a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <JsonLd data={organizationJsonLd(seo.description)} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(copy.faq.items)} />
      <Header copy={copy.nav} />
      <Hero copy={copy.hero} />
      <Proof copy={copy.brands} />
      {/* what you get → proof → what we can do for you → how and how much → who → questions → the form (audit, 31.10) */}
      <Products copy={copy.products} />
      <Projects copy={copy.projects} />
      <Versus copy={copy.versus} />
      <Build copy={copy.services} />
      <Process copy={copy.process} />
      <Engage copy={copy.engage} />
      <Stack copy={copy.stack} />
      <Team copy={copy.team} members={team} />
      <Testimonials copy={copy.testimonials} items={testimonials} />
      <Faq copy={copy.faq} />
      <Contact copy={copy.contact} />
      <Footer copy={copy.footer} nav={copy.nav} />
    </main>
  );
}
