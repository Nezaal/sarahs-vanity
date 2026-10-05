import { motion, useTransform, type MotionValue } from "motion/react";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import ServiceIcon from "@/components/ServiceIcon";
import { PHOTOS } from "@/data/photos";
import { SITE, whatsappUrl, type ServiceGroup } from "@/data/site";

// Card papers, cycled so neighbours in the pile are told apart.
const PAPERS = ["bg-cream", "bg-shell", "bg-[#ecd5cc]"];

// How much a card shrinks for each card that lands on top of it, and how far
// it dims once covered.
const SHRINK_PER_CARD = 0.03;
const COVERED_SHADE = 0.4;

const CHIP = "absolute top-3 rounded-full bg-cream/90 text-plum";

interface ServiceCardProps {
  group: ServiceGroup;
  index: number;
  total: number;
  /** scroll progress through the whole list, 0 to 1 */
  progress: MotionValue<number>;
  /** phone layout: cards pile up as they are scrolled past */
  stacked: boolean;
}

export default function ServiceCard({ group, index, total, progress, stacked }: ServiceCardProps) {
  // Cards reach the pile at even steps through the list; from its own step
  // on, a card sinks back a little for every card that lands on it.
  const steps = Math.max(total - 1, 1);
  const cardsOnTop = total - 1 - index;
  const landed = Math.min(index / steps, 0.999);
  const covered = Math.min(landed + 1 / steps, 1);

  const scale = useTransform(progress, [landed, 1], [1, 1 - cardsOnTop * SHRINK_PER_CARD]);
  const shade = useTransform(progress, [landed, covered], [0, cardsOnTop > 0 ? COVERED_SHADE : 0]);

  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <motion.article
      className={`relative flex h-[calc(100vh-8.75rem)] max-h-[35rem] min-h-[24rem] origin-top flex-col overflow-hidden rounded-[1.75rem] p-2.5 text-plum shadow-[0_-12px_40px_-14px_rgba(20,8,14,0.6)] will-change-transform supports-[height:1svh]:h-[calc(100svh-8.75rem)] lg:h-full lg:max-h-none lg:min-h-0 lg:shadow-none lg:will-change-auto ${PAPERS[index % PAPERS.length]}`}
      style={stacked ? { scale } : undefined}
    >
      <div className="relative min-h-24 flex-1 overflow-hidden rounded-[1.3rem] lg:aspect-[4/3] lg:flex-none">
        <Photo
          photo={PHOTOS[group.photo]}
          sizes="(min-width: 1024px) 20rem, 92vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className={`${CHIP} left-3 px-3 py-1.5 text-[0.62rem] font-medium tracking-[0.2em]`}>
          {number} / {count}
        </span>
        <span className={`${CHIP} right-3 grid size-10 place-items-center`}>
          <ServiceIcon name={group.icon} className="size-5" />
        </span>
      </div>

      <div className="px-3 pb-2.5 pt-5">
        <p className="type-eyebrow text-bronze">{group.note}</p>
        <h3 className="type-display mt-2 text-[2.15rem]">{group.title}</h3>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-plum/20 px-3 py-1.5 text-[0.92rem] font-normal leading-none text-ink/85"
            >
              {item}
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl(`Hi ${SITE.name}, I'd like to book: ${group.title}.`)}
          target="_blank"
          rel="noreferrer"
          className="group mt-4 flex items-center justify-between border-t border-plum/15 pt-3"
        >
          <span className="type-button">Book {group.title.toLowerCase()}</span>
          <span className="grid size-9 place-items-center rounded-full bg-plum text-cream transition-transform duration-300 ease-silk group-hover:rotate-45 group-active:scale-90">
            <Icon name="arrow" className="size-4" />
          </span>
        </a>
      </div>

      {stacked && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-night will-change-[opacity]"
          style={{ opacity: shade }}
          aria-hidden="true"
        />
      )}
    </motion.article>
  );
}
