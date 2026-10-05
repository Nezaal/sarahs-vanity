import { MotionConfig } from "motion/react";
import { useState } from "react";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Lookbook from "@/components/Lookbook";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Ribbons from "@/components/Ribbons";
import Services from "@/components/Services";
import WhatsAppFab from "@/components/WhatsAppFab";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { introSeen } from "@/lib/intro";

const HERO_ID = "top";

export default function App() {
  // The opening curtain plays once per tab; after that the page goes straight in.
  const [skipIntro] = useState(introSeen);
  const [entered, setEntered] = useState(skipIntro);

  useSmoothScroll(!entered);

  return (
    // "user": anyone who has asked their device for less motion gets fades, not movement
    <MotionConfig reducedMotion="user">
      {!skipIntro && <Preloader onDone={() => setEntered(true)} />}
      {/* inert while the curtain is down, so the keyboard can't reach what it hides */}
      <div inert={!entered}>
        <Nav heroId={HERO_ID} />
        <main>
          <Hero id={HERO_ID} ready={entered} />
          <Ribbons />
          <About id="about" />
          <Services />
          <Lookbook />
          <Booking />
          <Contact />
        </main>
        <Footer topId={HERO_ID} />
        <WhatsAppFab heroId={HERO_ID} />
      </div>
    </MotionConfig>
  );
}
