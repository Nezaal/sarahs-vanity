// Remembers, per browser tab, that the opening curtain has already played, so
// a reload or a trip back to the page goes straight in. index.html reads the
// same key, and sets the same colours, before the app boots; keep the two in
// step.

const SEEN_KEY = "sv:intro-seen";

// The page's own cream. index.html starts the browser tint at the curtain's
// colour instead, so the status bar matches the intro.
const PAGE_TINT = "#f7f0ea";

export function introSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // storage blocked (private mode, embedded views): just play the intro
    return false;
  }
}

/** Hands the phone's status bar and toolbar back to the page colour. */
export function restoreBrowserTint(): void {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", PAGE_TINT);
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // nothing to do: the intro simply plays again next time
  }
}
