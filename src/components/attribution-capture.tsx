"use client";

// ============================================================
// T3 — ATTRIBUTION CAPTURE MOUNT   [REV 1]
//
// ⚠ MOUNT THIS IN THE ROOT LAYOUT, not only on /get-started.
//
// A visitor who lands on / with ?utm_source=... and then clicks through
// to the worksheet has already lost the parameters by the time the
// worksheet mounts. attribution_events is immutable and written once at
// create, so a first touch missed here is missed permanently — and the
// question ad spend exists to answer is "which ad produced this lead".
//
// In src/app/layout.tsx, inside <body>:
//
//     import AttributionCapture from "@/components/attribution-capture";
//     ...
//     <AttributionCapture />
//     {children}
//
// Renders nothing. captureFirstTouch() is idempotent — it skips the
// write when a value already exists — so a second mount on client-side
// navigation cannot overwrite the original touch.
// ============================================================

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";

export default function AttributionCapture() {
  useEffect(() => { captureFirstTouch(); }, []);
  return null;
}
