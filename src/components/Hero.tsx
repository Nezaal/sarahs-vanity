import { motion } from "motion/react";
import CtaLink from "@/components/CtaLink";
import RevealText from "@/components/motion/RevealText";
import Mandala from "@/components/ornaments/Mandala";
import Sparkle from "@/components/ornaments/Sparkle";
import StackSpread, { type StackSpreadCard, type StackSpreadItem } from "@/components/ui/stack-spread";
import { PHOTOS, photoSrc, photoSrcSet, type Photo } from "@/data/photos";
import { SITE, whatsappUrl } from "@/data/site";
import { EASE_SILK } from "@/lib/motion";

const PLUM = "#3a1c2a";
const CREAM = "#f7f0ea";

// Cards are about 44vw wide on phones and at most a quarter of the screen on
// desktop. The phone figure is rounded down a little so that 3x screens settle
// for the 480px files: no visible difference, about half the download.
const CARD_SIZES = "(pointer: coarse) 40vw, 26vw";

// A card with a photo. Drop the photo (see StackSpreadItem) and the card
// falls back to its tinted, labelled tile.
function photoCard(photo: Photo, label: string, tone: string, ink: string): StackSpreadItem {
  return {
    src: photoSrc(photo),
    srcSet: photoSrcSet(photo),
    sizes: CARD_SIZES,
    alt: photo.alt,
    label,
    tone,
    ink,
  };
}

// array order = stack order, back (z 2) -> front (z 9)
const CARDS: StackSpreadCard[] = [
  {
    item: photoCard(PHOTOS.threading, "Threading", "linear-gradient(160deg,#f1ddd3,#dcb8ac)", PLUM),
    stackOffset: { x: -12, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: 0.7, w: 17, h: 22 },
    targetSm: { x: -23, y: -40.2 },
    z: 2,
  },
  {
    item: photoCard(PHOTOS.spa, "Spa", "linear-gradient(200deg,#cdb38a,#a98549)", CREAM),
    stackOffset: { x: 10, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: 0.9, w: 18, h: 32 },
    targetSm: { x: 23, y: -40.2 },
    z: 3,
  },
  {
    item: photoCard(PHOTOS.henna, "Henna", "linear-gradient(170deg,#6b3140,#3a1c2a)", "#e6c9c2"),
    stackOffset: { x: -20, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: -23, y: -21.4 },
    z: 4,
  },
  {
    item: photoCard(PHOTOS.makeup, "Makeup", "linear-gradient(150deg,#e6c9c2,#c98f8b)", PLUM),
    stackOffset: { x: -3, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: 0.8, w: 25, h: 30 },
    targetSm: { x: 23, y: -21.4 },
    z: 5,
  },
  {
    item: photoCard(PHOTOS.hands, "Hands & Feet", "linear-gradient(190deg,#f3e6dd,#e3cdbf)", PLUM),
    stackOffset: { x: 14, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: 0.8, w: 18, h: 32 },
    targetSm: { x: -23, y: 21.4 },
    z: 6,
  },
  {
    item: photoCard(PHOTOS.skin, "Skin", "linear-gradient(140deg,#c98f8b,#b4706d)", CREAM),
    stackOffset: { x: -10, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: 0.9, w: 22, h: 25 },
    targetSm: { x: 23, y: 21.4 },
    z: 7,
  },
  {
    item: photoCard(PHOTOS.hair, "Hair", "linear-gradient(165deg,#4a2433,#2a1a20)", "#e6c9c2"),
    stackOffset: { x: 4, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: 0.8, w: 20, h: 26 },
    targetSm: { x: -23, y: 40.2 },
    z: 8,
  },
  {
    item: photoCard(PHOTOS.bridal, "Bridal", "linear-gradient(155deg,#f4e3d7,#e6c9c2)", PLUM),
    stackOffset: { x: 16, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: 0.9, w: 16, h: 20 },
    targetSm: { x: 23, y: 40.2 },
    z: 9,
  },
];

interface HeroProps {
  id: string;
  /** false while the intro curtain is still down */
  ready: boolean;
}

export default function Hero({ id, ready }: HeroProps) {
  return (
    <StackSpread
      id={id}
      cards={CARDS}
      ready={ready}
      scrollLength={260}
      bgColor={CREAM}
      textColor={PLUM}
      cardRadius={16}
      stackScale={0.86}
      textFadeStart={0.5}
      backdrop={
        <Mandala className="size-[132vw] max-w-none animate-turn-slow text-rosegold/70 will-change-transform md:size-[58vw]" />
      }
      intro={
        <>
          <motion.span
            className="type-eyebrow flex items-center gap-3 text-bronze"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease: EASE_SILK }}
          >
            <Sparkle className="size-2.5 text-rosegold" />
            {SITE.kind}
            <Sparkle className="size-2.5 text-rosegold" delay={1.2} />
          </motion.span>
          <RevealText
            as="h1"
            play={ready}
            delay={0.15}
            parts={["Sarah’s ", { em: "Vanity" }]}
            className="type-display mt-3 text-[16.5vw] md:text-[10vw] lg:text-[6.5vw]"
            emClassName="text-rose"
          />
        </>
      }
      footer={
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE_SILK }}
        >
          <CtaLink href={whatsappUrl(`Hi ${SITE.name}, I'd like to book an appointment.`)} variant="plum" icon="whatsapp">
            Book a visit
          </CtaLink>
        </motion.div>
      }
      heading={
        <>
          Beauty, <em className="text-rose">made</em> personal.
        </>
      }
      subtitle={SITE.tagline}
    />
  );
}
