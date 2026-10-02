import Lenis from "lenis";
import { useEffect } from "react";

/** Eased wheel + anchor scrolling. Touch keeps native momentum scrolling. */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
}
