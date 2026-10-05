// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for Sarah's Vanity: cards, copy and colours come in as props, a
// card without a photo renders as a tinted, labelled tile, and the cluster
// deals itself in once `ready` flips.

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

// Scroll progress where the cluster starts scattering and where it finishes.
const SCATTER_START = 0.12;
const SCATTER_END = 0.9;

// Takes the steps out of wheel and keyboard scrolling, and gives a dragged
// finger a little weight. Overdamped, so it never overshoots.
const PROGRESS_SPRING = { stiffness: 150, damping: 28, mass: 0.35 };

// Phone browsers report a taller viewport (vh) than they show while their
// toolbars are out (svh). Anything that must be on screen before the first
// scroll is placed with svh, falling back to vh where svh is unknown.
const SVH = typeof CSS !== "undefined" && CSS.supports("height", "1svh") ? "svh" : "vh";

// Where the clustered pile sits, relative to the stage's true centre: a touch
// above the middle of the visible screen. Eases to zero as the cards spread.
const REST_LIFT = `(47${SVH} - 50vh)`;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 1,
    small: true,
    colX: 23,
    card: { w: 44, h: 18 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    // Touch vs. mouse, not raw width: a narrow but mouse-driven frame keeps
    // the desktop scatter + pointer parallax; only real touch devices drop to
    // the stacked column layout.
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  /** photo url; when omitted the card shows `tone` + `label` instead */
  src?: string;
  /** responsive candidates for `src`, as `<img srcset>` / `<img sizes>` */
  srcSet?: string;
  sizes?: string;
  alt?: string;
  label?: string;
  /** any CSS background, used when there is no photo (and while one loads) */
  tone?: string;
  /** label colour on a tinted card */
  ink?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  /** final x/y (vw/vh) for tablet + mobile; falls back to `target` */
  targetSm?: { x: number; y: number };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (vw/vh) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

interface CardProps {
  card: StackSpreadCard;
  /** position in the deal, back of the pile first */
  order: number;
  progress: MotionValue<number>;
  /** deal the card in; until then it waits off-stage */
  ready: boolean;
  reduce: boolean | null;
  clusterRotation: boolean;
  /** uniform rest-scale for every card; null = use each card's own scale */
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  /** scale of the cards while clustered, before the scatter */
  stackScale: number;
  /** corner radius on each card, in px (desktop) */
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}

function Card({
  card,
  order,
  progress,
  ready,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: CardProps) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  // final resting spot: column grid on small screens, scatter on desktop
  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  // -50% keeps card centred on its anchor
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh + ${1 - p} * ${REST_LIFT})`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      {/* the deal: its own layer, so it never fights the scroll transforms */}
      <motion.div
        className="h-full w-full"
        initial={flat ? false : { opacity: 0, y: "55%", rotate: order % 2 ? 12 : -12, scale: 0.84 }}
        animate={ready ? { opacity: 1, y: "0%", rotate: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 110, damping: 17, delay: 0.1 + order * 0.07 }}
      >
        <CardFace item={item} cardRadius={cardRadius} />
      </motion.div>
    </motion.div>
  );
}

interface CardFaceProps {
  item: StackSpreadItem;
  cardRadius: number;
}

function CardFace({ item, cardRadius }: CardFaceProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden shadow-[0_14px_34px_-14px_rgba(58,28,42,0.45)] max-md:rounded-[4vw]"
      style={{ borderRadius: `${cardRadius}px`, background: item.tone }}
    >
      {item.src ? (
        <>
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            alt={item.alt ?? item.label ?? ""}
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {item.label && (
            <>
              {/* scrim keeps the label readable on light photos */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(42,26,32,0.7)] to-transparent"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-[10%] left-[10%] font-display text-[clamp(1.1rem,2.2vw,2.2rem)] italic leading-none text-cream max-md:text-[6vw]"
                aria-hidden="true"
              >
                {item.label}
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="absolute inset-[6%] border border-current opacity-25"
            style={{ color: item.ink, borderRadius: `${Math.max(cardRadius - 4, 0)}px` }}
            aria-hidden="true"
          />
          <span
            className="absolute bottom-[12%] left-[12%] font-display text-[clamp(1.1rem,2.2vw,2.2rem)] italic leading-none max-md:text-[6vw]"
            style={{ color: item.ink }}
          >
            {item.label}
          </span>
        </>
      )}
    </div>
  );
}

function ScrollCue() {
  return (
    <div
      className="flex flex-col items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.32em]"
      aria-hidden="true"
    >
      <span>Scroll</span>
      <span className="relative block h-7 w-px overflow-hidden bg-current/20">
        <span className="absolute inset-0 animate-cue bg-current" />
      </span>
    </div>
  );
}

export interface StackSpreadProps {
  cards: StackSpreadCard[];
  /** shown above the cluster before the scatter, fades out as it starts */
  intro?: ReactNode;
  /** shown below the cluster before the scatter (a call to action, say) */
  footer?: ReactNode;
  /** ornament behind the cluster; fades out as the cards spread */
  backdrop?: ReactNode;
  /** centre headline revealed once the cards spread */
  heading: ReactNode;
  subtitle?: string;
  id?: string;
  /** deal the cards in; hold at false while an intro covers the page */
  ready?: boolean;
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
  /** show the scroll cue at the bottom until the scatter begins */
  showScrollHint?: boolean;
}

export default function StackSpread({
  cards,
  intro,
  footer,
  backdrop,
  heading,
  subtitle,
  id,
  ready = true,
  scrollLength = 350,
  bgColor = "#ececeb",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#141414",
  textFadeStart = 0.3,
  showScrollHint = true,
}: StackSpreadProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const travel = useSpring(scrollYProgress, PROGRESS_SPRING);

  // hold, scatter, then settle
  const progress = useTransform(
    travel,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  // centre text always fades in on scroll; the scale-in is dropped only when
  // reduced motion is confirmed (`true`), not on the null SSR value.
  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);

  // intro, footer and backdrop: there while clustered, gone once the scatter is under way
  const hintOpacity = useTransform(scrollYProgress, [0, SCATTER_START], [1, 0]);
  const introOpacity = useTransform(progress, [0, 0.18], [1, 0]);
  const backdropOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const backdropScale = useTransform(progress, [0, 0.45], [1, 1.3]);

  // the footer can hold links, so it must stop taking taps once it has faded
  const [atRest, setAtRest] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setAtRest(p < SCATTER_START * 0.6);
  });

  return (
    <section
      id={id}
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ornament, behind the cluster */}
        {backdrop && (
          <motion.div
            className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `47${SVH}`, opacity: backdropOpacity, scale: noScale ? 1 : backdropScale }}
          >
            {backdrop}
          </motion.div>
        )}

        {/* intro, above the cluster */}
        {intro && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-20 flex flex-col items-center px-6 text-center"
            style={{ top: `max(4.5${SVH}, 1.75rem)`, color: textColor, opacity: introOpacity }}
          >
            {intro}
          </motion.div>
        )}

        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {/* on phones the headline lives in the gap between the photo rows,
              so on short screens it shrinks with the height to stay inside it */}
          <h2
            className="type-display w-full text-[4.8vw] max-md:text-[min(11.5vw,calc(12.6vh-35px))]"
            style={{ color: textColor }}
          >
            {heading}
          </h2>
          {subtitle && (
            <p
              className="mt-[1.2vw] w-full max-w-[38ch] text-[1.15vw] leading-relaxed max-md:mt-3 max-md:text-[3.9vw] max-md:leading-snug"
              style={{ color: textColor, opacity: 0.75 }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              order={i}
              progress={progress}
              ready={ready}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* footer + scroll cue, pinned to the bottom of the visible screen */}
        {(footer || showScrollHint) && (
          <motion.div
            inert={!atRest}
            className="absolute inset-x-0 z-20 flex -translate-y-full flex-col items-center gap-4 px-6 pb-4"
            style={{ top: `100${SVH}`, color: textColor, opacity: hintOpacity }}
          >
            {footer}
            {showScrollHint && <ScrollCue />}
          </motion.div>
        )}
      </div>
    </section>
  );
}
