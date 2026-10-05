import type { ReactNode } from "react";
import type { ServiceIconName } from "@/data/site";

const HENNA_PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

// Line-art glyphs on a 24x24 grid; colour comes from `currentColor`.
const PATHS: Record<ServiceIconName, ReactNode> = {
  // scissors
  hair: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88" />
      <path d="M14.47 14.48 20 20" />
      <path d="M8.12 8.12 12 12" />
    </>
  ),
  // lotus
  skin: (
    <>
      <path d="M12 5c2.2 2.6 3.3 5.2 3.3 7.8S14.2 17.5 12 19c-2.2-1.5-3.3-3.6-3.3-6.2S9.8 7.6 12 5z" />
      <path d="M8.7 12.2C6.6 10.9 4.6 10.5 2.5 10.8c.3 3.6 2.6 6.9 9.5 8.2" />
      <path d="M15.3 12.2c2.1-1.3 4.1-1.7 6.2-1.4-.3 3.6-2.6 6.9-9.5 8.2" />
    </>
  ),
  // lipstick
  makeup: (
    <>
      <rect x="8.5" y="13" width="7" height="8" rx="1" />
      <path d="M9.5 13v-3h5v3" />
      <path d="M10.5 10V5.5l3-2.5v7" />
    </>
  ),
  // brow and eye
  threading: (
    <>
      <path d="M3 8.5c3.5-3.5 9.5-4.5 18-1" />
      <path d="M4 15c2.5-3 5.2-4.5 8-4.5s5.5 1.5 8 4.5c-2.5 3-5.2 4.5-8 4.5S6.5 18 4 15z" />
      <circle cx="12" cy="15" r="2" />
    </>
  ),
  // open hand
  handsFeet: (
    <>
      <path d="M18 11V6a2 2 0 0 0-4 0" />
      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </>
  ),
  // mehndi flower
  henna: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      {HENNA_PETAL_ANGLES.map((angle) => (
        <ellipse key={angle} cx="12" cy="6" rx="2" ry="3.4" transform={`rotate(${angle} 12 12)`} />
      ))}
    </>
  ),
};

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
