// Henna-style mandala: rings of petals around a centre, drawn on a grid whose
// origin is the middle of the artwork. Coloured by `currentColor`.

interface PetalRing {
  count: number;
  /** one petal, pointing straight up from the centre */
  d: string;
}

const PETAL_RINGS: PetalRing[] = [
  { count: 12, d: "M0-14c6.5-5 6.5-12 0-18-6.5 6-6.5 13 0 18z" },
  { count: 16, d: "M0-42c8.5-6 8.5-15 0-22-8.5 7-8.5 16 0 22zM0-47v-12" },
  { count: 24, d: "M0-70c6-6 6-14 0-20-6 6-6 14 0 20z" },
];

const SCALLOPS = 48;
const DOTS = 32;

const steps = (count: number) => Array.from({ length: count }, (_, i) => (360 / count) * i);

interface MandalaProps {
  className?: string;
}

export default function Mandala({ className }: MandalaProps) {
  return (
    <svg
      viewBox="-106 -106 212 212"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {[5, 12, 34, 66, 68, 96].map((r) => (
        <circle key={r} r={r} />
      ))}
      <circle r={92} strokeWidth={0.9} strokeDasharray="0.01 3.2" />

      {PETAL_RINGS.map((ring) =>
        steps(ring.count).map((angle) => (
          <path key={`${ring.count}-${angle}`} d={ring.d} transform={`rotate(${angle})`} />
        )),
      )}

      {steps(DOTS).map((angle) => (
        <circle key={angle} cy={-38} r={0.7} fill="currentColor" stroke="none" transform={`rotate(${angle})`} />
      ))}

      {steps(SCALLOPS).map((angle) => (
        <path key={angle} d="M-6.28-95.8a6.3 6.3 0 0 1 12.56 0" transform={`rotate(${angle})`} />
      ))}
    </svg>
  );
}
