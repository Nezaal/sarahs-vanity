import StackSpread, { type StackSpreadCard } from "@/components/ui/stack-spread";
import { SITE } from "@/data/site";

const PLUM = "#3a1c2a";
const CREAM = "#f7f0ea";

// Photos live in /public/images. Remove an item's `src` and it falls back
// to its tinted, labelled tile.
// array order = stack order, back (z 2) -> front (z 9)
const CARDS: StackSpreadCard[] = [
  {
    item: { src: "/images/threading.jpg", label: "Threading", tone: "linear-gradient(160deg,#f1ddd3,#dcb8ac)", ink: PLUM },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: 0.7, w: 17, h: 22 },
    targetSm: { x: -22, y: -38.5 },
    z: 2,
  },
  {
    item: { src: "/images/spa.jpg", label: "Spa", tone: "linear-gradient(200deg,#cdb38a,#a98549)", ink: CREAM },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: 0.9, w: 18, h: 32 },
    targetSm: { x: 22, y: -38.5 },
    z: 3,
  },
  {
    item: { src: "/images/Henna.jpg", label: "Henna", tone: "linear-gradient(170deg,#6b3140,#3a1c2a)", ink: "#e6c9c2" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: -22, y: -20.5 },
    z: 4,
  },
  {
    item: { src: "/images/makeup.jpg", label: "Makeup", tone: "linear-gradient(150deg,#e6c9c2,#c98f8b)", ink: PLUM },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: 0.8, w: 25, h: 30 },
    targetSm: { x: 22, y: -20.5 },
    z: 5,
  },
  {
    item: { src: "/images/nails.jpg", label: "Nails", tone: "linear-gradient(190deg,#f3e6dd,#e3cdbf)", ink: PLUM },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: 0.8, w: 18, h: 32 },
    targetSm: { x: -22, y: 20.5 },
    z: 6,
  },
  {
    item: { src: "/images/skin.jpg", label: "Skin", tone: "linear-gradient(140deg,#c98f8b,#b4706d)", ink: CREAM },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: 0.9, w: 22, h: 25 },
    targetSm: { x: 22, y: 20.5 },
    z: 7,
  },
  {
    item: { src: "/images/hair.jpg", label: "Hair", tone: "linear-gradient(165deg,#4a2433,#2a1a20)", ink: "#e6c9c2" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: 0.8, w: 20, h: 26 },
    targetSm: { x: -22, y: 38.5 },
    z: 8,
  },
  {
    item: { src: "/images/bridal.jpg", label: "Bridal", tone: "linear-gradient(155deg,#f4e3d7,#e6c9c2)", ink: PLUM },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: 0.9, w: 16, h: 20 },
    targetSm: { x: 22, y: 38.5 },
    z: 9,
  },
];

interface HeroProps {
  id: string;
}

export default function Hero({ id }: HeroProps) {
  return (
    <StackSpread
      id={id}
      cards={CARDS}
      scrollLength={280}
      bgColor={CREAM}
      textColor={PLUM}
      cardRadius={14}
      intro={
        <>
          <span className="text-[0.7rem] font-normal uppercase tracking-[0.35em] opacity-70">
            {SITE.kind}
          </span>
          <h1 className="mt-2 font-display text-[13vw] leading-none tracking-tight md:text-[5vw]">
            Sarah&rsquo;s <em>Vanity</em>
          </h1>
        </>
      }
      heading={
        <>
          Beauty, <em className="opacity-70">made</em> personal.
        </>
      }
      subtitle={SITE.tagline}
    />
  );
}
