import { SITE } from "@/data/site";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-plum px-6 py-12 text-center text-cream">
      <p className="font-display text-3xl tracking-tight">
        Sarah&rsquo;s <em>Vanity</em>
      </p>
      <p className="mt-2 text-[0.65rem] font-normal uppercase tracking-[0.35em] text-blush/70">
        {SITE.kind}
      </p>
      <p className="mt-8 text-xs text-cream/50">
        &copy; {YEAR} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
