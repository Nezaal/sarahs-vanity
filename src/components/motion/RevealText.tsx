import { motion, type Variants } from "motion/react";
import { Fragment } from "react";
import { EASE_SILK, IN_VIEW } from "@/lib/motion";

/** A run of words. `em` runs are set in italic. */
export type TextPart = string | { em: string };

interface RevealTextProps {
  parts: TextPart[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** extra classes for the italic words */
  emClassName?: string;
  /** seconds before the first word moves */
  delay?: number;
  /** when given, the reveal waits for this instead of for scroll */
  play?: boolean;
}

interface Word {
  text: string;
  em: boolean;
}

const STAGGER = 0.07;

const WORD: Variants = {
  hidden: { y: "115%" },
  shown: (delay: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE_SILK, delay },
  }),
};

function toWords(parts: TextPart[]): Word[] {
  return parts.flatMap((part) => {
    const em = typeof part !== "string";
    const text = em ? part.em : part;
    return text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, em }));
  });
}

/** Headline whose words rise out of a mask, one after another. */
export default function RevealText({
  parts,
  as: Tag = "h2",
  className,
  emClassName = "",
  delay = 0,
  play,
}: RevealTextProps) {
  const words = toWords(parts);
  const label = words.map((word) => word.text).join(" ");
  const trigger =
    play === undefined
      ? { whileInView: "shown", viewport: IN_VIEW }
      : { animate: play ? "shown" : "hidden" };

  return (
    // the label carries the sentence; the split words are presentation only
    <Tag className={className} aria-label={label}>
      <motion.span className="block" aria-hidden="true" initial="hidden" {...trigger}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="word-mask">
              <motion.span
                className={word.em ? `inline-block italic ${emClassName}` : "inline-block"}
                variants={WORD}
                custom={delay + i * STAGGER}
              >
                {word.text}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
