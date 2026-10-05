import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

function isPast(heroId: string, scrollY: number): boolean {
  const hero = document.getElementById(heroId);
  const threshold = hero ? hero.offsetHeight - window.innerHeight * 0.5 : 0;
  return scrollY > threshold;
}

/** True once the page has scrolled most of the way through the hero. */
export function usePastHero(heroId: string): boolean {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setPast(isPast(heroId, y));
  });

  return past;
}
