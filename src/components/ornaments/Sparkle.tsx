interface SparkleProps {
  className?: string;
  /** seconds; offsets the twinkle so neighbours don't pulse together */
  delay?: number;
  /** hold still instead of twinkling */
  still?: boolean;
}

/** Four-point star, coloured by `currentColor`. */
export default function Sparkle({ className = "", delay = 0, still = false }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`${still ? "" : "animate-twinkle"} ${className}`}
      style={still ? undefined : { animationDelay: `${delay}s` }}
    >
      <path d="M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12C7.5 11.2 11.2 7.5 12 0z" />
    </svg>
  );
}
