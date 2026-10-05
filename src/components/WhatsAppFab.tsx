import { AnimatePresence, motion } from "motion/react";
import Icon from "@/components/Icon";
import { SITE, whatsappUrl } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePastHero } from "@/hooks/usePastHero";

// The service cards pin to the screen and each has its own booking link, so
// the button steps aside there rather than sit on top of them.
const STEP_ASIDE_FOR = ["services"];

interface WhatsAppFabProps {
  /** id of the hero section; the button appears once it has scrolled past */
  heroId: string;
}

/** Floating "chat with us" button, within reach of a thumb for most of the page. */
export default function WhatsAppFab({ heroId }: WhatsAppFabProps) {
  const pastHero = usePastHero(heroId);
  const steppedAside = useActiveSection(STEP_ASIDE_FOR) !== null;
  const shown = pastHero && !steppedAside;

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={whatsappUrl(`Hi ${SITE.name}, I'd like to book an appointment.`)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with ${SITE.name} on WhatsApp`}
          className="foil-fill fixed right-4 z-40 grid size-14 place-items-center rounded-full text-plum shadow-[0_14px_30px_-10px_rgba(42,26,32,0.6)]"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 20 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <span
            className="absolute inset-0 animate-halo rounded-full border border-rosegold"
            aria-hidden="true"
          />
          <Icon name="whatsapp" className="relative size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
