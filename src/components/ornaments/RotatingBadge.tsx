import { useId, type ReactNode } from "react";

// Text runs round a circle of this radius, on a 120-unit grid.
const RADIUS = 47;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Average width of one character of the ring's type, in grid units (measured
// for Jost Medium capitals at 8.5 units).
const AVERAGE_ADVANCE = 4.4;

interface RotatingBadgeProps {
  /** set round the ring; end it with a separator so the loop closes neatly */
  text: string;
  /** sits still in the middle */
  children?: ReactNode;
  /** must position the badge (`absolute` or `relative`) and size it */
  className: string;
}

/** Slowly turning ring of text, like a stamp or seal. Decorative. */
export default function RotatingBadge({ text, children, className }: RotatingBadgeProps) {
  const pathId = useId();
  // `textLength` stretches the text to close the ring exactly. The tracking
  // gets it most of the way first, for browsers that ignore textLength on a path.
  const tracking = CIRCUMFERENCE / text.length - AVERAGE_ADVANCE;

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-turn">
        <defs>
          <path
            id={pathId}
            d={`M60 60m-${RADIUS} 0a${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 1 -${RADIUS * 2} 0`}
          />
        </defs>
        <text
          className="fill-current font-sans text-[8.5px] font-medium uppercase"
          style={{ letterSpacing: `${tracking}px` }}
        >
          <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
