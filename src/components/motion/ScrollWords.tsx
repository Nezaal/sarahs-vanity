import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";

interface WordProps {
  text: string;
  progress: MotionValue<number>;
  /** slice of the paragraph's scroll progress in which this word lights up */
  range: [number, number];
}

const DIM = 0.18;

function Word({ text, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [DIM, 1]);
  return <motion.span style={{ opacity }}>{text}</motion.span>;
}

interface ScrollWordsProps {
  text: string;
  className?: string;
}

/** Paragraph that brightens word by word as it is scrolled through. */
export default function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] });
  const words = text.split(" ");

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word
            text={word}
            progress={scrollYProgress}
            // each word overlaps the next, so the light travels smoothly
            range={[i / words.length, Math.min((i + 2) / words.length, 1)]}
          />{" "}
        </Fragment>
      ))}
    </p>
  );
}
