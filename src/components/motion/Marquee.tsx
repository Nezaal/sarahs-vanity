import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** % of one copy's width travelled per second */
  speed?: number;
  /** start out travelling right instead of left */
  reverse?: boolean;
  className?: string;
}

const VELOCITY_SPRING = { damping: 50, stiffness: 400 };

/** Keeps `value` inside [min, max), wrapping round at the ends. */
function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * Endless ticker. It drifts on its own, speeds up while the page is being
 * scrolled, and turns to follow the scroll direction.
 */
export default function Marquee({ children, speed = 4, reverse = false, className = "" }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), VELOCITY_SPRING);
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  // two copies sit side by side, so one loop is half the track
  const x = useTransform(offset, (value) => `${wrap(-50, 0, value)}%`);

  const heading = useRef(reverse ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;

    const push = boost.get();
    if (push < 0) heading.current = reverse ? -1 : 1;
    else if (push > 0) heading.current = reverse ? 1 : -1;

    const step = heading.current * speed * (delta / 1000);
    offset.set(offset.get() + step + step * Math.abs(push));
  });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
