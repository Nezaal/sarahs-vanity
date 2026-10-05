// Shared timing so every reveal on the site moves the same way.

/** Long, soft ease-out for things arriving. */
export const EASE_SILK = [0.22, 1, 0.36, 1] as const;

/** Slow in, slow out, for big moves like the intro curtain. */
export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

/** Scroll reveals fire once, a little way inside the viewport. */
export const IN_VIEW = { once: true, margin: "-12% 0px" } as const;
