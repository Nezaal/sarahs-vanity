// Every photo on the site. Files live in /public/images as WebP, in one or two
// widths: `<name>-<width>.webp`. To swap a photo, export the new one at the
// same widths and keep the file names (or update the entry here).

export interface Photo {
  /** file stem in /public/images */
  name: string;
  alt: string;
  /** [width, height] of each file, smallest first */
  sizes: [number, number][];
  /** dominant colour, painted while the file loads */
  tone: string;
  /** CSS object-position: the part to keep when the photo is cropped */
  focus?: string;
}

export const PHOTOS = {
  bridal: {
    name: "bridal",
    alt: "Bride in red and gold with bridal makeup and mehndi",
    tone: "#b88868",
    sizes: [[480, 592], [735, 907]],
    focus: "50% 18%",
  },
  hair: {
    name: "hair",
    alt: "Long, glossy layered brown hair",
    tone: "#281818",
    sizes: [[449, 801]],
    focus: "50% 40%",
  },
  makeup: {
    name: "makeup",
    alt: "Soft glam makeup with a smoky eye and nude lip",
    tone: "#e8a888",
    sizes: [[480, 720], [736, 1104]],
    focus: "50% 28%",
  },
  henna: {
    name: "henna",
    alt: "Detailed mandala mehndi on the back of both hands",
    tone: "#481808",
    sizes: [[480, 725], [735, 1110]],
  },
  skin: {
    name: "skin",
    alt: "Close-up of glowing, dewy skin",
    tone: "#a86848",
    sizes: [[480, 853], [576, 1024]],
    focus: "50% 35%",
  },
  spa: {
    name: "spa",
    alt: "Face mask surrounded by skincare, salts and a candle",
    tone: "#d8c8b8",
    sizes: [[480, 601], [958, 1200]],
  },
  threading: {
    name: "threading",
    alt: "Eyebrow being shaped with thread",
    tone: "#e8c8c8",
    sizes: [[480, 540], [720, 810]],
  },

  // Stock photos from Unsplash (free licence), used for mood rather than as
  // examples of work. Replace with the parlour's own photos whenever you can.
  // https://unsplash.com/photos/2ph_5F1J8dc
  brushesWarm: {
    name: "brushes-warm",
    alt: "Makeup brushes with gold handles in warm light",
    tone: "#2a1a12",
    sizes: [[480, 720], [960, 1440]],
  },
  // https://unsplash.com/photos/4gR0hMB5Gd8
  brushFan: {
    name: "brush-fan",
    alt: "Rose gold fan brush against black",
    tone: "#0c0a0b",
    sizes: [[480, 720], [960, 1441]],
    focus: "50% 38%",
  },
  // https://unsplash.com/photos/6ZXJFyTCZ_w
  brushPowder: {
    name: "brush-powder",
    alt: "Powder brushes in a cloud of shimmer",
    tone: "#0c0a0b",
    sizes: [[480, 672], [960, 1344]],
  },
  // https://unsplash.com/photos/27pGOj-JyX4
  brideProfile: {
    name: "bride-profile",
    alt: "Bride in red with roses pinned in her hair",
    tone: "#c8c8c8",
    sizes: [[480, 600], [960, 1200]],
    focus: "50% 20%",
  },
  // https://unsplash.com/photos/uIyzZCdCnWc
  hairVine: {
    name: "hair-vine",
    alt: "Loose waves pinned with a pearl hair vine",
    tone: "#c8c8c8",
    sizes: [[480, 721], [960, 1443]],
    focus: "50% 28%",
  },
  // https://unsplash.com/photos/HKqTFsaVCV0
  hands: {
    name: "hands-soft",
    alt: "Soft, cared-for hands in warm light",
    tone: "#bba377",
    sizes: [[480, 639], [960, 1278]],
    focus: "70% 70%",
  },
  // https://unsplash.com/photos/xugoOgRPngU
  footSoak: {
    name: "foot-soak",
    alt: "Feet soaking in a wooden bowl beside rolled towels and white flowers",
    tone: "#706357",
    sizes: [[480, 640], [960, 1280]],
    focus: "50% 62%",
  },
  // https://unsplash.com/photos/kYqIq1SLJoc
  mehndiBangles: {
    name: "mehndi-bangles",
    alt: "Mehndi hands with red bangles and bridal jewellery",
    tone: "#381818",
    sizes: [[480, 720], [960, 1440]],
  },
  // https://unsplash.com/photos/yanhwFwyoaU
  lotus: {
    name: "lotus-dark",
    alt: "Pink lotus in bloom",
    tone: "#282818",
    sizes: [[480, 720], [960, 1440]],
  },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof PHOTOS;

const fileUrl = (name: string, width: number) => `/images/${name}-${width}.webp`;

/** Largest file, for browsers that ignore `srcset`. */
export function photoSrc(p: Photo): string {
  return fileUrl(p.name, p.sizes[p.sizes.length - 1][0]);
}

export function photoSrcSet(p: Photo): string {
  return p.sizes.map(([width]) => `${fileUrl(p.name, width)} ${width}w`).join(", ");
}
