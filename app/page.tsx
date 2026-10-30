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

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WeTrio Development Lab",
  url: "https://wetrio.dev",
  parentOrganization: { "@type": "Organization", name: "WeTrio", url: "https://wetr.io" },
  email: "start@wetr.io",
  sameAs: ["https://wetr.io", "https://t.me/wetr_io"],
};

export default function Home() {
  return (
    <main className="grain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
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
