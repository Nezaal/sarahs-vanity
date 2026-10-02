import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { SITE } from "@/data/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#visit", label: "Visit" },
];

interface NavProps {
  /** id of the hero section; the bar stays hidden until it has scrolled past */
  heroId: string;
}

export default function Nav({ heroId }: NavProps) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const hero = document.getElementById(heroId);
    const threshold = hero ? hero.offsetHeight - window.innerHeight * 0.5 : 0;
    setShown(y > threshold);
  });

  return (
    <nav
      aria-label="Main"
      inert={!shown}
      className={`fixed inset-x-0 top-0 z-50 border-b border-plum/10 bg-cream/85 backdrop-blur-md transition-all duration-500 ${
        shown ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl tracking-tight text-plum">
          <img src="/favicon.png" alt="" width={40} height={40} className="h-10 w-10" />
          {/* the badge already carries the name, so the wordmark waits for wider screens */}
          <span className="max-sm:sr-only">
            Sarah&rsquo;s <em>Vanity</em>
          </span>
          <span className="sr-only"> — {SITE.kind}, back to top</span>
        </a>
        <ul className="flex items-center gap-4 text-[0.68rem] font-normal uppercase tracking-[0.2em] text-plum/80 md:gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="py-2 transition-colors hover:text-rose">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
