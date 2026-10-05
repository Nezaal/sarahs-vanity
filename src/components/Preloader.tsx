import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useEffectEvent, useId, useState } from "react";
import Sparkle from "@/components/ornaments/Sparkle";
import { SITE } from "@/data/site";
import { markIntroSeen, restoreBrowserTint } from "@/lib/intro";
import { EASE_CURTAIN, EASE_SILK } from "@/lib/motion";

// The curtain stays down at least this long, so the ring can finish drawing,
// and never longer than the cap, however slow the fonts are.
const MIN_MS = 1900;
const MAX_MS = 3500;
const REDUCED_MS = 300;

// Every face the first screen is set in. Loaded by name: `document.fonts.ready`
// alone can resolve before the hero's fonts have even been requested.
const FIRST_SCREEN_FONTS = [
  '300 1em "Fraunces Variable"',
  'italic 300 1em "Fraunces Variable"',
  '500 1em "Jost Variable"',
];

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Resolves once the first screen's fonts are in. Never rejects, never throws. */
async function firstScreenFonts(): Promise<void> {
  try {
    await Promise.all(FIRST_SCREEN_FONTS.map((font) => document.fonts.load(font)));
  } catch {
    // a missing or failed font must not hold the page hostage: fall back and go on
  }
}

interface PreloaderProps {
  /** called as the curtain starts to lift */
  onDone: () => void;
}

/** Opening curtain: the emblem, a ring drawn round it, then a lift to reveal the page. */
export default function Preloader({ onDone }: PreloaderProps) {
  const reduce = useReducedMotion();
  const gradientId = useId();
  const [open, setOpen] = useState(true);

  const lift = useEffectEvent(() => {
    markIntroSeen();
    restoreBrowserTint();
    setOpen(false);
    onDone();
  });

  // One-shot: the curtain comes down on mount and lifts exactly once.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-loading");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let live = true;
    const finish = () => {
      if (!live) return;
      live = false;
      root.classList.remove("is-loading");
      lift();
    };

    const cap = setTimeout(finish, MAX_MS);
    void Promise.all([wait(reduced ? REDUCED_MS : MIN_MS), firstScreenFonts()]).then(finish);

    return () => {
      live = false;
      clearTimeout(cap);
      root.classList.remove("is-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] grid touch-none place-items-center bg-night text-cream"
          style={{ borderBottomLeftRadius: "0% 0%", borderBottomRightRadius: "0% 0%" }}
          exit={
            reduce
              ? { opacity: 0 }
              : { y: "-100%", borderBottomLeftRadius: "50% 16%", borderBottomRightRadius: "50% 16%" }
          }
          transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE_CURTAIN }}
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: EASE_SILK }}
          >
            <div className="relative size-48">
              <motion.img
                src="/emblem.webp"
                alt={SITE.name}
                width={384}
                height={384}
                className="absolute inset-3.5 size-[calc(100%-1.75rem)] rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: EASE_SILK }}
              />
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#c69479" />
                    <stop offset="0.5" stopColor="#f7dfcf" />
                    <stop offset="1" stopColor="#b07b61" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
              <Sparkle className="absolute -right-1 top-3 size-3 text-rosegold" delay={0.4} />
              <Sparkle className="absolute -left-2 bottom-8 size-2 text-rosegold" delay={1.3} />
            </div>

            <motion.p
              className="type-eyebrow mt-8 text-rosegold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_SILK }}
            >
              {SITE.kind}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
