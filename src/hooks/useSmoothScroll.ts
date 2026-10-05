import Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * Eased wheel + anchor scrolling, for mouse and trackpad. Touch screens are
 * left entirely to the browser: native momentum is already smooth, and Lenis
 * would only add touch listeners that hold up the start of every swipe.
 * While `paused`, the wheel is ignored (used while the intro covers the page).
 */
export function useSmoothScroll(paused = false): void {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);
}
