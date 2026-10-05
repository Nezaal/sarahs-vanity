import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import ScrollWords from "@/components/motion/ScrollWords";
import Lotus from "@/components/ornaments/Lotus";
import RotatingBadge from "@/components/ornaments/RotatingBadge";
import Sparkle from "@/components/ornaments/Sparkle";
import { PHOTOS } from "@/data/photos";
import { HOURS, SITE } from "@/data/site";
import { EASE_SILK, IN_VIEW } from "@/lib/motion";

interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

const [mainHours, ...otherHours] = HOURS;

const FEATURES: Feature[] = [
  {
    icon: <Lotus className="size-6" />,
    title: "Ladies only",
    text: "A calm space, just for women.",
  },
  {
    icon: <ServiceIcon name="hair" className="size-5" />,
    title: "Head to toe",
    text: "Hair, skin, hands & feet, henna and bridal, all in one place.",
  },
  {
    icon: <Icon name="clock" className="size-5" />,
    title: mainHours.days,
    text: `${[mainHours.time, ...otherHours.map((row) => `${row.days} ${row.time.toLowerCase()}`)].join(". ")}.`,
  },
];

// The big photo is unveiled from the bottom up.
const UNVEIL: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.4, ease: EASE_SILK } },
};

interface AboutProps {
  id: string;
}

export default function About({ id }: AboutProps) {
  const collageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start end", "end start"] });
  // the big photo drifts inside its arch; the small one floats past it
  const drift = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const float = useTransform(scrollYProgress, [0, 1], ["24%", "-24%"]);

  return (
    <section id={id} className="overflow-x-clip bg-cream px-6 pb-32 pt-12 md:pb-44 md:pt-24">
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:gap-x-20">
        <div className="lg:col-start-2 lg:row-start-1">
          <SectionHeading
            eyebrow="Our customers"
            parts={["Trusted by the women who ", { em: "keep coming back." }]}
          />
        </div>

        <div
          ref={collageRef}
          className="relative mx-auto mt-14 max-w-md lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:w-full lg:self-center"
        >
          {/* The frame watches for the scroll; the veil inside it does the
              clipping. A box that clips itself away entirely can't be relied
              on to report that it has scrolled into view. `isolate` keeps the
              moving photo inside the rounded corners on Safari. */}
          <motion.div
            className="arch relative isolate ml-auto aspect-[3/4] w-[76%] overflow-hidden"
            initial="hidden"
            whileInView="shown"
            viewport={IN_VIEW}
          >
            <motion.div className="absolute inset-0" variants={UNVEIL}>
              <motion.div className="absolute inset-x-0 -inset-y-[9%] will-change-transform" style={{ y: drift }}>
                {/* eager: behind the veil a lazy image counts as off-screen,
                    and would only start loading once the unveiling is over */}
                <Photo
                  photo={PHOTOS.brushesWarm}
                  sizes="(min-width: 1024px) 22rem, 70vw"
                  className="h-full w-full object-cover"
                  decorative
                  eager
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="absolute bottom-[4%] left-0 w-[44%] will-change-transform" style={{ y: float }}>
            <Reveal delay={0.25}>
              <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem] border-[5px] border-cream shadow-[0_24px_50px_-24px_rgba(58,28,42,0.6)]">
                <Photo
                  photo={PHOTOS.lotus}
                  sizes="(min-width: 1024px) 13rem, 40vw"
                  className="h-full w-full object-cover"
                  decorative
                />
              </div>
            </Reveal>
          </motion.div>

          <RotatingBadge
            text={`${SITE.name} · ${SITE.kind} · `}
            className="absolute left-[2%] top-[3%] size-28 text-plum"
          >
            <Lotus className="size-9 text-rose" draw />
          </RotatingBadge>

          <Sparkle className="absolute right-[-3%] top-[38%] size-5 text-rosegold" />
          <Sparkle className="absolute bottom-[-2%] left-[52%] size-3 text-rose" delay={1.4} />
        </div>

        <div className="mt-20 lg:col-start-2 lg:row-start-2 lg:mt-12">
          <ScrollWords
            className="type-title text-[1.6rem] leading-[1.32] text-plum md:text-[1.9rem]"
            text="From a quick threading before work to the morning of the wedding, our customers return to us, and bring their mothers, sisters and friends along."
          />

          <ul className="mt-12 border-t border-plum/15">
            {FEATURES.map((feature, i) => (
              <li key={feature.title} className="border-b border-plum/15">
                <Reveal delay={i * 0.08} className="flex items-center gap-5 py-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-rose/40 text-rose">
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="type-title text-[1.3rem] leading-tight text-plum">{feature.title}</h3>
                    <p className="mt-0.5 text-[1.02rem] leading-snug text-ink/75">{feature.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
