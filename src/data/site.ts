// All editable site content lives here.
// TODO: replace the placeholder contact details below with the real ones.

export type ServiceIconName = "hair" | "skin" | "makeup" | "threading" | "nails" | "henna";

export interface ServiceGroup {
  icon: ServiceIconName;
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
  whatsappHref: "https://wa.me/9971698891",
  instagramHandle: "@sarahs_vanity01",
  instagramHref: "https://instagram.com/sarahs_vanity01",
  addressLines: ["Street address, landmark", "Area, City – PIN code"],
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
    icon: "hair",
    note: "Cut, colour, care",
    items: ["Haircut & styling", "Colour & highlights", "Smoothening & keratin", "Hair spa"],
  },
  {
    title: "Skin",
    icon: "skin",
    note: "Glow, gently",
    items: ["Facials", "Clean-up", "De-tan", "Bleach"],
  },
  {
    title: "Bridal & Makeup",
    icon: "makeup",
    note: "For the big days",
    items: ["Bridal makeup", "Engagement & party looks", "Hair-do", "Saree draping"],
  },
  {
    title: "Threading & Waxing",
    icon: "threading",
    note: "Neat and quick",
    items: ["Eyebrows & upper lip", "Full face threading", "Arms & legs waxing", "Full body waxing"],
  },
  {
    title: "Nails",
    icon: "nails",
    note: "Hands and feet",
    items: ["Manicure", "Pedicure", "Gel polish", "Nail art"],
  },
  {
    title: "Henna",
    icon: "henna",
    note: "Mehndi for every occasion",
    items: ["Bridal mehndi", "Festive designs", "Simple & Arabic styles"],
  },
];

export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapLinkUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
