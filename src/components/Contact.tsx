import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { HOURS, SITE, mapEmbedUrl, mapLinkUrl } from "@/data/site";

interface DetailProps {
  label: string;
  children: ReactNode;
}

function Detail({ label, children }: DetailProps) {
  return (
    <div className="border-t border-plum/15 py-5">
      <dt className="text-[0.65rem] font-normal uppercase tracking-[0.3em] text-gold">{label}</dt>
      <dd className="mt-2 text-[1.05rem] leading-relaxed text-ink/85">{children}</dd>
    </div>
  );
}

const LINK = "underline decoration-plum/30 underline-offset-4 transition-colors hover:text-rose";

export default function Contact() {
  return (
    <section id="visit" className="bg-cream px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Contact">
              Come <em>visit us.</em>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10">
              <Detail label="Address">
                <address className="not-italic">
                  {SITE.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={mapLinkUrl(SITE.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-2 inline-block text-[0.95rem] ${LINK}`}
                >
                  Get directions
                </a>
              </Detail>

              <Detail label="Phone">
                <a href={SITE.phoneHref} className={LINK}>
                  {SITE.phoneDisplay}
                </a>
                <span className="mx-3 text-plum/30" aria-hidden="true">
                  /
                </span>
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className={LINK}>
                  WhatsApp
                </a>
              </Detail>

              <Detail label="Hours">
                {HOURS.map((row) => (
                  <span key={row.days} className="flex justify-between gap-4">
                    <span>{row.days}</span>
                    <span className="text-ink/60">{row.time}</span>
                  </span>
                ))}
              </Detail>

              <Detail label="Instagram">
                <a href={SITE.instagramHref} target="_blank" rel="noreferrer" className={LINK}>
                  {SITE.instagramHandle}
                </a>
              </Detail>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 md:mt-0">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-plum/10 bg-shell md:aspect-auto md:h-full md:min-h-[32rem]">
            <iframe
              title={`Map showing ${SITE.name}`}
              src={mapEmbedUrl(SITE.mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
