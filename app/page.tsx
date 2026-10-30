import { Header } from "@/components/Header";
import { Build } from "@/components/sections/Build";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Projects } from "@/components/sections/Projects";
import { Proof } from "@/components/sections/Proof";
import { Stack } from "@/components/sections/Stack";
import { FAQ } from "@/lib/faq";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Home() {
  return (
    <main className="grain">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <Header />
      <Hero />
      <Proof />
      <Products />
      <Projects />
      <Build />
      <Stack />
      <Process />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
