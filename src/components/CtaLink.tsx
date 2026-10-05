import { motion } from "motion/react";
import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

type CtaVariant = "foil" | "plum" | "outline";

const BASE =
  "type-button relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8";

const VARIANTS: Record<CtaVariant, string> = {
  foil: "foil-fill text-plum shadow-[0_16px_36px_-16px_rgba(220,174,150,0.75)]",
  plum: "bg-plum text-cream shadow-[0_16px_32px_-16px_rgba(58,28,42,0.8)]",
  // takes its colour from the surrounding text
  outline: "border border-current/35 transition-colors duration-300 hover:bg-current/10",
};

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  icon?: IconName;
  className?: string;
}

/** Pill-shaped call to action. Filled variants carry a slow travelling shine. */
export default function CtaLink({ href, children, variant = "foil", icon, className = "" }: CtaLinkProps) {
  const external = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
    >
      {variant !== "outline" && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-shine bg-linear-to-r from-transparent via-white/50 to-transparent motion-reduce:hidden"
          aria-hidden="true"
        />
      )}
      {icon && <Icon name={icon} className="relative size-[1.05rem] shrink-0" />}
      <span className="relative">{children}</span>
    </motion.a>
  );
}
