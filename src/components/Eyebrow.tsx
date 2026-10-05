import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SILK, IN_VIEW } from "@/lib/motion";

const RULE: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.9, ease: EASE_SILK } },
};

const LABEL: Variants = {
  hidden: { opacity: 0, x: -10 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease: EASE_SILK } },
};

interface EyebrowProps {
  children: ReactNode;
  /** rose gold for dark backgrounds, bronze otherwise */
  dark?: boolean;
  className?: string;
}

/** Small tracked label with a rule that draws itself in. */
export default function Eyebrow({ children, dark = false, className = "" }: EyebrowProps) {
  return (
    <motion.p
      className={`type-eyebrow flex items-center gap-3 ${dark ? "text-rosegold" : "text-bronze"} ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={IN_VIEW}
    >
      <motion.span className="h-px w-10 origin-left bg-current" variants={RULE} aria-hidden="true" />
      <motion.span variants={LABEL}>{children}</motion.span>
    </motion.p>
  );
}
