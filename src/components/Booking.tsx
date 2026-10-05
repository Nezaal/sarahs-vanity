import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaLink from "@/components/CtaLink";
import Eyebrow from "@/components/Eyebrow";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/motion/RevealText";
import RotatingBadge from "@/components/ornaments/RotatingBadge";
import Sparkle from "@/components/ornaments/Sparkle";
import { PHOTOS } from "@/data/photos";
import { SITE, whatsappUrl } from "@/data/site";

/** Dark card with the one thing we want people to do: get in touch. */
export default function Booking() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // the shimmer repaints its text every frame, so it only runs while on screen
  const onScreen = useInView(cardRef);

  return (
    <section className="bg-cream px-3 pb-8 md:px-6">
      <div
        ref={cardRef}
        className="relative isolate mx-auto flex min-h-[40rem] max-w-5xl flex-col items-center justify-end overflow-hidden rounded-[2.25rem] bg-night px-6 pb-10 pt-24 text-center text-cream md:min-h-[36rem] md:pb-16"
      >
        <motion.div
          className="absolute inset-x-0 -inset-y-[10%] -z-10 will-change-transform"
          style={{ y: drift }}
        >
          <Photo
            photo={PHOTOS.brushFan}
            sizes="(min-width: 1024px) 64rem, 94vw"
            className="h-full w-full object-cover"
            decorative
          />
        </motion.div>
        {/* scrim: the photo stays clear at the top, the words stay readable below */}
        <div
          className="absolute inset-0 -z-10 bg-linear-to-t from-night from-25% via-night/70 via-55% to-transparent"
          aria-hidden="true"
        />

        <RotatingBadge
          text="Book your visit · Book your visit · "
          className="absolute right-5 top-5 size-24 text-rosegold"
        >
          <Sparkle still className="size-4" />
        </RotatingBadge>
        <Sparkle className="absolute left-8 top-16 size-3 text-rosegold" delay={0.6} />
        <Sparkle className="absolute left-[18%] top-[42%] size-2 text-cream" delay={1.8} />

        <Eyebrow dark>Appointments</Eyebrow>
        <RevealText
          as="h2"
          parts={["Your chair ", { em: "is waiting." }]}
          className="type-display mt-5 text-[clamp(2.9rem,13vw,5.25rem)]"
          emClassName={onScreen ? "foil-text animate-foil" : "foil-text"}
        />
        <Reveal delay={0.25}>
          <p className="mx-auto mt-5 max-w-xs text-[1.08rem] leading-relaxed text-cream/75">
            Call or message us for prices and bridal packages.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaLink href={whatsappUrl(`Hi ${SITE.name}, I'd like to book an appointment.`)} icon="whatsapp">
            Book on WhatsApp
          </CtaLink>
          <CtaLink href={SITE.phoneHref} variant="outline" icon="phone">
            {SITE.phoneDisplay}
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
