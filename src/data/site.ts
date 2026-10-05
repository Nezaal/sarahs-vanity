// All editable site content lives here.
// TODO: replace the placeholder contact details below with the real ones.

import type { PhotoName } from "@/data/photos";

export type ServiceIconName = "hair" | "skin" | "makeup" | "threading" | "handsFeet" | "henna";

export interface ServiceGroup {
  icon: ServiceIconName;
  /** key into PHOTOS (src/data/photos.ts) */
  photo: PhotoName;
  title: string;
  note: string;
  items: string[];
}

export interface OpeningHours {
  days: string;
  time: string;
}

export const SITE = {
  name: "Sarah's Vanity",
  kind: "Ladies Beauty Parlour",
  tagline: "Hair, skin and bridal care in a calm, ladies-only space.",
  phoneDisplay: "+91 9971698891",
  phoneHref: "tel:+919971698891",
  // wa.me wants the full international number: country code, no "+" or spaces
  whatsappNumber: "9667345453",
  instagramHandle: "@sarahs_vanity01",
  instagramHref: "https://instagram.com/sarahs_vanity01",
  addressLines: ["I-36 thokar no-4, Abul fazal enclave Jamia Nagar, Okhla , New Delhi - 110025 "],
  // Whatever you would type into Google Maps to find the parlour.
  mapQuery: "Sarah's Vanity Beauty Parlour",
} as const;

export const HOURS: OpeningHours[] = [
  { days: "Monday – Saturday", time: "10:00 am – 8:00 pm" },
  { days: "Sunday", time: "By appointment" },
];

export const SERVICES: ServiceGroup[] = [
  {
    title: "Hair",
    photo: "hair",
    icon: "hair",
    note: "Cut, colour, care",
    items: ["Haircut & styling", "Colour & highlights", "Smoothening & keratin", "Hair spa"],
  },
  {
    title: "Skin",
    photo: "skin",
    icon: "skin",
    note: "Glow, gently",
    items: ["Facials", "Clean-up", "De-tan", "Bleach"],
  },
  {
    title: "Bridal & Makeup",
    photo: "bridal",
    icon: "makeup",
    note: "For the big days",
    items: ["Bridal makeup", "Engagement & party looks", "Hair-do", "Saree draping"],
  },
  {
    title: "Threading & Waxing",
    photo: "threading",
    icon: "threading",
    note: "Neat and quick",
    items: ["Eyebrows & upper lip", "Full face threading", "Arms & legs waxing", "Full body waxing"],
  },
  {
    title: "Hands & Feet",
    photo: "footSoak",
    icon: "handsFeet",
    note: "Soft and cared for",
    items: ["Manicure", "Pedicure", "Hand & foot spa", "Foot massage"],
  },
  {
    title: "Henna",
    photo: "henna",
    icon: "henna",
    note: "Mehndi for every occasion",
    items: ["Bridal mehndi", "Festive designs", "Simple & Arabic styles"],
  },
];

/** Opens a WhatsApp chat with the parlour, optionally with a message typed in. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapLinkUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
