import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import Eyebrow from "@/components/Eyebrow";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/motion/RevealText";
import { PHOTOS, type Photo as PhotoData } from "@/data/photos";
import { SITE } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const RAIL_ONE: PhotoData[] = [
  PHOTOS.makeup,
  PHOTOS.hairVine,
  PHOTOS.mehndiBangles,
  PHOTOS.hands,
  PHOTOS.spa,
  PHOTOS.brideProfile,
];

const RAIL_TWO: PhotoData[] = [
  PHOTOS.brushPowder,
  PHOTOS.henna,
  PHOTOS.bridal,
  PHOTOS.hair,
  PHOTOS.footSoak,
  PHOTOS.threading,
];

// How far a rail slides, as a share of its own length, while the section
// crosses the screen. Rails are longer (in screens) on phones, so they can
// travel further without running out of photos.
const TRAVEL_PHONE = 46;
const TRAVEL_WIDE = 22;

interface RailProps {
  photos: PhotoData[];
  x: MotionValue<string>;
}

function Rail({ photos, x }: RailProps) {
  return (
    <motion.ul className="flex w-max items-start gap-3 will-change-transform md:gap-5" style={{ x }}>
      {photos.map((photo, i) => (
        <li
          key={photo.name}
          // every other frame is an arch, set a step lower
          className={`w-[42vw] shrink-0 overflow-hidden md:w-[26vw] lg:w-[22vw] ${
            i % 2 ? "arch mt-7" : "rounded-[1.25rem]"
          }`}
        >
          <Photo
            photo={photo}
            // 40vw, not the true 42: keeps 3x phones on the 480px files
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 26vw, 40vw"
            className="aspect-[3/4] w-full object-cover"
          />
        </li>
      ))}
    </motion.ul>
  );
}

/** Two rails of photos that slide past each other as the page scrolls. */
export default function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  const wide = useMediaQuery("(min-width: 768px)");
  const travel = wide ? TRAVEL_WIDE : TRAVEL_PHONE;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftward = useTransform(scrollYProgress, [0, 1], ["2%", `-${travel}%`]);
  const rightward = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, "2%"]);

  return (
    <section
      ref={ref}
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-cream pb-24 pt-20 md:pb-32 md:pt-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* "Inspiration", not "our work": several of these are stock photos */}
        <Eyebrow>Inspiration</Eyebrow>
        <RevealText
          as="h2"
          parts={["Looks we ", { em: "adore." }]}
          className="type-display mt-5 text-[clamp(2.75rem,12.5vw,5rem)]"
          emClassName="text-rose"
        />

        <Reveal delay={0.2}>
          <a
            href={SITE.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex items-center gap-4 text-plum"
          >
            <span className="grid size-12 place-items-center rounded-full border border-plum/20 transition-colors duration-300 group-hover:bg-plum group-hover:text-cream">
              <Icon name="instagram" className="size-5" />
            </span>
            <span>
              <span className="type-eyebrow block text-bronze">More on Instagram</span>
              <span className="type-title mt-1 block text-[1.3rem] leading-tight">{SITE.instagramHandle}</span>
            </span>
          </a>
        </Reveal>
      </div>

      <div className="mt-12 space-y-3 md:space-y-5">
        <Rail photos={RAIL_ONE} x={leftward} />
        <Rail photos={RAIL_TWO} x={rightward} />
      </div>
    </section>
  );
}
