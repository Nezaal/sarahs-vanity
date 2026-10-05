import { motion } from "motion/react";
import { EASE_SILK, IN_VIEW } from "@/lib/motion";

// Centre petal first, then outwards in pairs, then the water line: the order
// the strokes are drawn in.
const STROKES = [
  "M24 8c5 7 7 14 0 26-7-12-5-19 0-26z",
  "M24 34c-8-4-13-11-12-20 6 3 10 9 12 20",
  "M24 34c8-4 13-11 12-20-6 3-10 9-12 20",
  "M24 34c-9 1-17-3-20-12 7 0 14 4 20 12",
  "M24 34c9 1 17-3 20-12-7 0-14 4-20 12",
  "M10 41c7-3 21-3 28 0",
];

interface LotusProps {
  className?: string;
  /** draw the strokes in when scrolled into view, instead of showing them outright */
  draw?: boolean;
}

/** Line-art lotus, after the one in the logo. Coloured by `currentColor`. */
export default function Lotus({ className, draw = false }: LotusProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {STROKES.map((d, i) =>
        draw ? (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={IN_VIEW}
            transition={{ duration: 1.4, delay: i * 0.14, ease: EASE_SILK }}
          />
        ) : (
          <path key={d} d={d} />
        ),
      )}
    </svg>
  );
}
