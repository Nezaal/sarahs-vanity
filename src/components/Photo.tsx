import { photoSrc, photoSrcSet, type Photo as PhotoData } from "@/data/photos";

interface PhotoProps {
  photo: PhotoData;
  /** how wide the image is drawn, as an `<img sizes>` value */
  sizes: string;
  className?: string;
  /** load straight away instead of when scrolled near */
  eager?: boolean;
  /** purely decorative: hidden from screen readers */
  decorative?: boolean;
}

/** A site photo at the right resolution, tinted with its own colour until it loads. */
export default function Photo({ photo, sizes, className, eager = false, decorative = false }: PhotoProps) {
  const [width, height] = photo.sizes[photo.sizes.length - 1];

  return (
    <img
      src={photoSrc(photo)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      width={width}
      height={height}
      alt={decorative ? "" : photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={{ backgroundColor: photo.tone, objectPosition: photo.focus }}
    />
  );
}
