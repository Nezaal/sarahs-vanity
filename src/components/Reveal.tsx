import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SILK, IN_VIEW } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
}

/** Fades content up the first time it scrolls into view. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.9, delay, ease: EASE_SILK }}
    >
      {children}
    </motion.div>
  );
}
