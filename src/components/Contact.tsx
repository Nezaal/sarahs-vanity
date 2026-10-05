import type { ReactNode } from "react";
import CtaLink from "@/components/CtaLink";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { HOURS, SITE, mapEmbedUrl, mapLinkUrl, whatsappUrl } from "@/data/site";

interface DetailProps {
  icon: IconName;
  label: string;
  /** seconds; staggers the rows as they scroll in */
  delay: number;
  children: ReactNode;
}

function Detail({ icon, label, delay, children }: DetailProps) {
  return (
    // the icon hangs in the left gutter, so the row stays a plain dt + dd pair
    <Reveal delay={delay} className="relative border-t border-plum/15 py-6 pl-16">
      <dt className="type-eyebrow text-bronze">
        <span className="absolute left-0 top-6 grid size-11 place-items-center rounded-full border border-rose/40 text-rose">
          <Icon name={icon} className="size-[1.15rem]" />
        </span>
        {label}
      </dt>
      <dd className="mt-2 text-[1.08rem] leading-relaxed text-ink/85">{children}</dd>
    </Reveal>
  );
}

const LINK = "underline decoration-plum/30 underline-offset-4 transition-colors hover:text-rose";
const BIG_LINK = `type-title text-[1.5rem] leading-tight text-plum ${LINK}`;

export default function Contact() {
  return (
    <section id="visit" className="bg-cream px-6 pb-32 pt-20 md:pb-40 md:pt-28">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading eyebrow="Contact" parts={["Come ", { em: "visit us." }]} />

          <dl className="mt-10 border-b border-plum/15">
            <Detail icon="pin" label="Address" delay={0}>
              <address className="not-italic">
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </Detail>

            <Detail icon="phone" label="Phone" delay={0.06}>
              <a href={SITE.phoneHref} className={BIG_LINK}>
                {SITE.phoneDisplay}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className={`mt-2 block w-fit text-[0.98rem] ${LINK}`}
              >
                Message on WhatsApp
              </a>
            </Detail>

            <Detail icon="clock" label="Hours" delay={0.12}>
              {/* stacked on phones, where a day range and its times don't fit one line */}
              {HOURS.map((row) => (
                <span key={row.days} className="flex flex-col py-1 leading-snug sm:flex-row sm:justify-between sm:gap-4">
                  <span>{row.days}</span>
                  <span className="text-ink/60">{row.time}</span>
                </span>
              ))}
            </Detail>

            <Detail icon="instagram" label="Instagram" delay={0.18}>
              <a href={SITE.instagramHref} target="_blank" rel="noreferrer" className={BIG_LINK}>
                {SITE.instagramHandle}
              </a>
            </Detail>
          </dl>
        </div>

        <Reveal delay={0.15} className="mt-12 md:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-plum/10 bg-shell md:aspect-auto md:h-full md:min-h-[32rem]">
            {/* On touch screens the map is a picture, not a second scroller:
                a finger dragging over it keeps scrolling the page. */}
            <iframe
              title={`Map showing ${SITE.name}`}
              src={mapEmbedUrl(SITE.mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0 pointer-coarse:pointer-events-none"
            />
            <div className="absolute inset-x-4 bottom-4 flex">
              <CtaLink href={mapLinkUrl(SITE.mapQuery)} variant="plum" icon="pin" className="flex-1">
                Get directions
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
