import { AnimatedTestimonialGrid, type Testimonial } from "@/components/ui/testimonial-2";

// First eight show on tablet + desktop, the last four on phones.
const PHOTOS: Testimonial[] = [
  { imgSrc: "/images/bridal.jpg", alt: "Bridal makeup" },
  { imgSrc: "/images/hair.jpg", alt: "Hair styling" },
  { imgSrc: "/images/makeup.jpg", alt: "Makeup" },
  { imgSrc: "/images/nails.jpg", alt: "Nail care" },
  { imgSrc: "/images/Henna.jpg", alt: "Henna design" },
  { imgSrc: "/images/skin.jpg", alt: "Skin care" },
  { imgSrc: "/images/spa.jpg", alt: "Spa treatment" },
  { imgSrc: "/images/threading.jpg", alt: "Threading" },
  { imgSrc: "/images/bridal.jpg", alt: "Bridal makeup" },
  { imgSrc: "/images/Henna.jpg", alt: "Henna design" },
  { imgSrc: "/images/hair.jpg", alt: "Hair styling" },
  { imgSrc: "/images/nails.jpg", alt: "Nail care" },
];

interface TrustedByProps {
  id: string;
}

export default function TrustedBy({ id }: TrustedByProps) {
  return (
    <div className="w-full bg-cream">
      <AnimatedTestimonialGrid
        id={id}
        testimonials={PHOTOS}
        badgeText="Our customers"
        title={
          <>
            Trusted by the women
            <br />
            who <em>keep coming back.</em>
          </>
        }
        description="From a quick threading before work to the morning of the wedding, our customers return to us, and bring their mothers, sisters and friends along."
      />
    </div>
  );
}
