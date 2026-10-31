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
import { FAQ } from "@/lib/faq";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { loadTeam, loadTestimonials } from "@/lib/studio";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function Home() {
  const [team, testimonials] = await Promise.all([loadTeam(), loadTestimonials()]);
  return (
    <main id="main" className="grain">
      <a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <Header />
      <Hero />
      <Proof />
      {/* what you get → proof → what we can do for you → how and how much → who → questions → the form (audit, 31.10) */}
      <Products />
      <Build />
      <Projects />
      <Versus />
      <Process />
      <Engage />
      <Stack />
      <Team members={team} />
      <Testimonials items={testimonials} />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
