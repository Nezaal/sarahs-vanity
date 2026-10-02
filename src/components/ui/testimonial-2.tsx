// Adapted for Sarah's Vanity: site colours and fonts, no CTA button, images
// animate in when scrolled to, and the float is deterministic per image.

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// --- TYPE DEFINITIONS ---
export interface Testimonial {
  imgSrc: string;
  alt: string;
}

export interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: ReactNode;
  description: ReactNode;
  id?: string;
  className?: string;
}

interface ImagePosition {
  style: CSSProperties;
  className: string;
}

// --- PRE-DEFINED POSITIONS FOR THE IMAGES ---
// The first eight are for tablet + desktop, the last four for phones.
const imagePositions: ImagePosition[] = [
  { style: { top: "6%", left: "14%" }, className: "hidden lg:block w-24 h-24" },
  { style: { top: "12%", left: "36%" }, className: "hidden md:block w-20 h-20" },
  { style: { top: "8%", right: "14%" }, className: "hidden md:block w-28 h-28" },
  { style: { top: "44%", right: "5%" }, className: "hidden lg:block w-24 h-24" },
  { style: { top: "46%", left: "4%" }, className: "hidden md:block w-28 h-28" },
  { style: { bottom: "6%", left: "20%" }, className: "hidden lg:block w-20 h-20" },
  { style: { bottom: "10%", left: "46%" }, className: "hidden md:block w-20 h-20" },
  { style: { bottom: "6%", right: "16%" }, className: "hidden md:block w-24 h-24" },
  // Phone positions (simpler layout)
  { style: { top: "7%", left: "6%" }, className: "block md:hidden w-16 h-16" },
  { style: { top: "4%", right: "9%" }, className: "block md:hidden w-20 h-20" },
  { style: { bottom: "4%", left: "9%" }, className: "block md:hidden w-20 h-20" },
  { style: { bottom: "7%", right: "6%" }, className: "block md:hidden w-16 h-16" },
];

// --- ANIMATION LOGIC ---
// Varied per image, but stable across renders.
const enterDelay = (index: number) => (index % 5) * 0.1;
const floatDistance = (index: number) => -(6 + ((index * 5) % 12));
const floatDuration = (index: number) => 5 + ((index * 3) % 4);

// --- COMPONENT ---
export function AnimatedTestimonialGrid({
  testimonials,
  badgeText = "Testimonials",
  title,
  description,
  id,
  className = "",
}: AnimatedTestimonialGridProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-36 md:py-48 ${className}`}
    >
      {/* Absolutely Positioned Images */}
      {testimonials.slice(0, imagePositions.length).map((testimonial, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-2xl shadow-[0_14px_30px_-12px_rgba(58,28,42,0.45)] ${imagePositions[index].className}`}
          style={imagePositions[index].style}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: enterDelay(index) }}
          whileHover={{ scale: 1.1, zIndex: 20 }}
        >
          <motion.img
            src={testimonial.imgSrc}
            alt={testimonial.alt}
            loading="lazy"
            draggable={false}
            className="h-full w-full rounded-2xl object-cover"
            animate={reduce ? undefined : { y: [0, floatDistance(index), 0] }}
            transition={{
              duration: floatDuration(index),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div className="mb-5 inline-block rounded-full border border-gold/40 bg-shell px-4 py-1.5 text-[0.65rem] font-normal uppercase tracking-[0.3em] text-gold">
            {badgeText}
          </div>
        )}
        <h2 className="max-w-3xl font-display text-[2.6rem] leading-[1.05] tracking-tight text-plum md:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
          {description}
        </p>
      </div>
    </section>
  );
}
