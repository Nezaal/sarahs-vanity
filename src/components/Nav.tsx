import { motion, useScroll } from "motion/react";
import { SITE } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePastHero } from "@/hooks/usePastHero";

const LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "visit", label: "Visit" },
];

const SECTION_IDS = LINKS.map((link) => link.id);

interface NavProps {
  /** id of the hero section; the bar stays hidden until it has scrolled past */
  heroId: string;
}

export default function Nav({ heroId }: NavProps) {
  const shown = usePastHero(heroId);
  const active = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();

  return (
    // layoutRoot: the bar is fixed, so the sliding pill must ignore page scroll
    <motion.nav
      layoutRoot
      aria-label="Main"
      inert={!shown}
      className={`fixed inset-x-3 top-3 z-50 mx-auto flex h-14 max-w-xl items-center justify-between rounded-full border border-plum/10 bg-cream/80 pl-1.5 pr-2 shadow-[0_12px_32px_-18px_rgba(58,28,42,0.55)] backdrop-blur-md transition-[translate,opacity] duration-700 ease-silk ${
        shown ? "translate-y-0 opacity-100" : "translate-y-[-160%] opacity-0"
      }`}
    >
      <a href={`#${heroId}`} className="flex items-center gap-2.5 rounded-full text-plum">
        {/* the emblem wears a ring that fills as the page is read */}
        <span className="relative grid size-11 place-items-center">
          <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="22" cy="22" r="21" fill="none" className="stroke-plum/10" strokeWidth="1.2" />
            <motion.circle
              cx="22"
              cy="22"
              r="21"
              fill="none"
              className="stroke-rose"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <img src="/emblem.webp" alt="" width={384} height={384} className="size-9 rounded-full" />
        </span>
        {/* the badge already carries the name, so the wordmark waits for wider screens */}
        <span className="type-title text-xl leading-none max-sm:sr-only">
          Sarah&rsquo;s <em>Vanity</em>
        </span>
        <span className="sr-only"> — {SITE.kind}, back to top</span>
      </a>

      <ul className="flex items-center">
        {LINKS.map((link) => {
          const current = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={current ? "location" : undefined}
                className={`relative block rounded-full px-3.5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  current ? "text-cream" : "text-plum/75"
                }`}
              >
                {current && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-plum"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
