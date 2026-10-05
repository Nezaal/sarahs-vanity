import { useScroll } from "motion/react";
import { useRef } from "react";
import CtaLink from "@/components/CtaLink";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES, SITE, whatsappUrl } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// On phones each card sticks just below the nav, one sliver lower than the
// last, so the pile shows an edge for every card already read.
const STICK_BELOW_NAV = "4.75rem";
const SLIVER_REM = 0.5;

export default function Services() {
  const listRef = useRef<HTMLOListElement>(null);
  const wide = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    // no overflow clipping on this section: it would stop the cards sticking
    <section
      id="services"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-plum px-3 pb-28 pt-20 text-cream md:px-6 md:pb-36 md:pt-28"
    >
      <div
        className="grain pointer-events-none absolute inset-0 rounded-t-[2.5rem] opacity-[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="px-3">
          <SectionHeading dark eyebrow="Services" parts={["Everything, ", { em: "head to toe." }]} />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-cream/75">
              A look at what we do. Call or message us for prices and bridal packages.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="mt-12 lg:grid lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((group, i) => (
            <li
              key={group.title}
              className="sticky mb-5 last:mb-0 lg:static lg:mb-0"
              style={{ top: `calc(${STICK_BELOW_NAV} + ${i * SLIVER_REM}rem)` }}
            >
              <ServiceCard
                group={group}
                index={i}
                total={SERVICES.length}
                progress={scrollYProgress}
                stacked={!wide}
              />
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-stretch gap-3 px-3 sm:flex-row sm:justify-center">
          <CtaLink href={SITE.phoneHref} icon="phone">
            Call to book
          </CtaLink>
          <CtaLink href={whatsappUrl()} variant="outline" icon="whatsapp" className="text-rosegold">
            WhatsApp us
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
