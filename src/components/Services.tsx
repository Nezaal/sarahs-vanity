import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES, SITE } from "@/data/site";

const CARD = [
  "h-full rounded-2xl border border-cream/15 p-7 backdrop-blur-sm",
  "bg-[radial-gradient(120%_90%_at_0%_0%,rgba(247,240,234,0.16),rgba(247,240,234,0.05))]",
  "transition duration-300 ease-out",
  "hover:-translate-y-1 hover:border-rosegold/70 hover:shadow-[0_20px_45px_-20px_rgba(220,174,150,0.55)]",
].join(" ");

export default function Services() {
  return (
    <section id="services" className="bg-plum px-6 py-20 text-cream md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="Services">
            Everything, <em>head to toe.</em>
          </SectionHeading>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-cream/70">
            A look at what we do. Call or message us for prices and bridal packages.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((group, i) => (
            <li key={group.title}>
              {/* hover lift sits on the inner card so it doesn't fight Reveal's transform */}
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className={CARD}>
                  <ServiceIcon name={group.icon} className="h-9 w-9 text-rosegold" />
                  <p className="mt-5 text-[0.65rem] font-normal uppercase tracking-[0.3em] text-rosegold">
                    {group.note}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">{group.title}</h3>
                  <ul className="mt-5 space-y-2.5 border-t border-rosegold/35 pt-5 text-[0.95rem] text-cream/85">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={SITE.phoneHref}
            className="rounded-full bg-rosegold px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-plum transition-colors hover:bg-cream"
          >
            Call to book
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-rosegold/60 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-rosegold transition-colors hover:border-rosegold hover:bg-rosegold/10"
          >
            WhatsApp us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
