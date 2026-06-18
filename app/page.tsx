import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { Values } from "@/components/sections/values";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { FloatingWhatsApp } from "@/components/cta/floating-whatsapp";
import { SectionTracker } from "@/components/analytics/section-tracker";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="topo">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Values />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SectionTracker />
    </>
  );
}
