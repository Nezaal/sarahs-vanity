import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import TrustedBy from "@/components/TrustedBy";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HERO_ID = "top";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav heroId={HERO_ID} />
      <main>
        <Hero id={HERO_ID} />
        <TrustedBy id="about" />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
