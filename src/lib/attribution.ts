// ============================================================
// T3 — FIRST-TOUCH ATTRIBUTION   [REV 1]
//
// Captured at LANDING, not at submit. By the time a visitor reaches the
// end of the worksheet the UTM parameters are long gone from the URL,
// and lead.attribution_events is immutable and written once at create.
//
// ⚠ MOUNT THIS ON EVERY PAGE, not just /get-started. A visitor who
// lands on / with utm_source and then clicks through to /get-started
// has already lost the parameters by the time the worksheet mounts.
// See <AttributionCapture /> at the bottom and the root-layout note.
//
// Storage: sessionStorage. First touch means FIRST — the write is
// skipped if a value is already present, so navigating to a second
// UTM-tagged page cannot overwrite the original.
// ============================================================

const KEY = "progro_first_touch";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
};

// Column limits from T1 REV 3 attribution_len_check. Truncating here
// keeps a long campaign string from failing the insert at create time,
// which would surface to the visitor as a generic error.
const LIMITS: Record<keyof Attribution, number> = {
  utm_source: 120, utm_medium: 120, utm_campaign: 200,
  utm_term: 200, utm_content: 200, referrer: 2048, landing_page: 2048,
};

const clip = (v: string | null, max: number) =>
  v && v.trim() ? v.trim().slice(0, max) : undefined;

export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;          // FIRST touch only

    const p = new URLSearchParams(window.location.search);
    const a: Attribution = {
      utm_source: clip(p.get("utm_source"), LIMITS.utm_source),
      utm_medium: clip(p.get("utm_medium"), LIMITS.utm_medium),
      utm_campaign: clip(p.get("utm_campaign"), LIMITS.utm_campaign),
      utm_term: clip(p.get("utm_term"), LIMITS.utm_term),
      utm_content: clip(p.get("utm_content"), LIMITS.utm_content),
      referrer: clip(document.referrer || null, LIMITS.referrer),
      landing_page: clip(window.location.href, LIMITS.landing_page),
    };

    // Written even with no UTMs: landing_page and referrer answer "how
    // did they arrive" for organic traffic too, and a row that exists
    // with nulls is more useful than no row.
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Private browsing can throw on sessionStorage. Attribution is
    // nice-to-have; it must never block an intake.
  }
}

export function readFirstTouch(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch { return {}; }
}
