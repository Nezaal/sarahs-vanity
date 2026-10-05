import { useEffect, useState } from "react";

// A thin band just above the middle of the screen: whichever section crosses
// it is the one being read.
const READING_BAND = "-45% 0px -54% 0px";

/**
 * Id of the section currently on screen, or null between sections.
 * `ids` must be a stable array (define it outside the component).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: READING_BAND },
    );

    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
