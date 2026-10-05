import Eyebrow from "@/components/Eyebrow";
import RevealText, { type TextPart } from "@/components/motion/RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  /** headline text; `{ em }` runs are set in italic */
  parts: TextPart[];
  /** on a dark background: rose gold label, foil italics */
  dark?: boolean;
}

export default function SectionHeading({ eyebrow, parts, dark = false }: SectionHeadingProps) {
  return (
    <header>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <RevealText
        as="h2"
        parts={parts}
        className="type-display mt-5 text-[clamp(2.75rem,12.5vw,5rem)]"
        emClassName={dark ? "foil-text" : "text-rose"}
      />
    </header>
  );
}
