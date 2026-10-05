import { useInView } from "motion/react";
import { useRef } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { SITE, whatsappUrl } from "@/data/site";

const YEAR = new Date().getFullYear();

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#visit", label: "Visit" },
  { href: SITE.instagramHref, label: "Instagram" },
  { href: whatsappUrl(), label: "WhatsApp" },
  { href: SITE.phoneHref, label: "Call us" },
];

interface FooterProps {
  /** id of the hero section, for the back-to-top link */
  topId: string;
}

export default function Footer({ topId }: FooterProps) {
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  // the shimmer repaints its text every frame, so it only runs while on screen
  const onScreen = useInView(wordmarkRef);

  return (
    <footer className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-night px-6 pb-28 pt-16 text-cream md:pt-24">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <img src="/emblem.webp" alt="" width={384} height={384} loading="lazy" className="size-16 rounded-full" />
          <a href={`#${topId}`} className="group flex items-center gap-3 text-rosegold">
            <span className="type-button">Back to top</span>
            <span className="grid size-11 place-items-center rounded-full border border-rosegold/40 transition-transform duration-300 ease-silk group-hover:-translate-y-1 group-active:scale-90">
              <Icon name="arrow-up" className="size-4" />
            </span>
          </a>
        </div>

        <Reveal>
          <p className="type-title mt-10 max-w-sm text-[1.5rem] leading-snug text-cream/90">{SITE.tagline}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-cream/15 pt-6 sm:grid-cols-3">
          {LINKS.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="block py-2.5 text-[1.02rem] text-cream/70 transition-colors hover:text-rosegold"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* the name, as wide as the screen; -mx so it centres on the full width */}
      <p
        ref={wordmarkRef}
        className="type-display relative -mx-6 mt-16 whitespace-nowrap text-center text-[19.5vw]"
        aria-hidden="true"
      >
        <span className={onScreen ? "foil-text animate-foil" : "foil-text"}>
          Sarah&rsquo;s <em>Vanity</em>
        </span>
      </p>

      <p className="relative mt-8 text-center text-xs tracking-wide text-cream/55">
        &copy; {YEAR} {SITE.name} &middot; {SITE.kind}
      </p>
    </footer>
  );
}
