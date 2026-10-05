import Marquee from "@/components/motion/Marquee";
import Sparkle from "@/components/ornaments/Sparkle";
import { SERVICES } from "@/data/site";

// "Bridal & Makeup" reads better on a ticker as two words.
const WORDS = SERVICES.flatMap((group) => group.title.split(" & "));

// Repeated so one copy is always wider than the screen and the loop never shows a gap.
const RUN = [...WORDS, ...WORDS, ...WORDS];

const BAND =
  "type-title absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 py-3.5 text-[1.55rem] italic leading-none";

function Run() {
  return (
    <>
      {RUN.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5">{word}</span>
          <Sparkle still className="size-2.5 opacity-60" />
        </span>
      ))}
    </>
  );
}

/** Two crossed ribbons of service names, drifting in opposite directions. Decorative. */
export default function Ribbons() {
  return (
    <div className="relative h-56 overflow-hidden bg-cream" aria-hidden="true">
      <Marquee reverse speed={1.4} className={`${BAND} rotate-[7deg] bg-rosegold text-plum`}>
        <Run />
      </Marquee>
      <Marquee
        speed={1.8}
        className={`${BAND} rotate-[-6deg] bg-plum text-cream shadow-[0_18px_40px_-20px_rgba(42,26,32,0.7)]`}
      >
        <Run />
      </Marquee>
    </div>
  );
}
