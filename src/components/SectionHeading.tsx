import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
}

export default function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <header>
      <p className="flex items-center gap-3 text-[0.7rem] font-normal uppercase tracking-[0.35em] text-gold">
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[2.6rem] leading-[1.05] tracking-tight md:text-6xl">
        {children}
      </h2>
    </header>
  );
}
