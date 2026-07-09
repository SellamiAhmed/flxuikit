// eslint-disable-next-line no-restricted-imports
import type { MantineColorsTuple } from "@mantine/core";

export type ShadingColor = MantineColorsTuple;

// ═══════════════════════════════════════════════════════
// Linear Dark-Canvas Palette
// Index 0 = lightest tint  |  Index 9 = darkest shade
// ═══════════════════════════════════════════════════════

/** Brand lavender-blue accent — primary CTA, focus rings, links */
export const brand = [
  "#e8e9f7", // 0
  "#d0d3ef",
  "#b8bce7",
  "#a0a6df",
  "#8890d7",
  "#828fff", // 5 — primary-hover
  "#5e6ad2", // 6 — primary (anchor)
  "#5e69d1", // 7 — primary-focus
  "#4a529e",
  "#363a6a", // 9
] as ShadingColor;

/** Success green — status pills, success indicators */
export const success = [
  "#e6f7eb",
  "#c2ebd0",
  "#9ddfae",
  "#79d38c",
  "#55c76a",
  "#27a644", // 5 — semantic-success
  "#1f8536",
  "#176427",
  "#0f4318",
  "#072209",
] as ShadingColor;

/** Dark scale = surface + ink + hairline in one ladder.
 *  0-3: ink text    |  4-6: borders    |  7-9: surfaces
 */
export const dark = [
  "#f7f8f8", // 0 — ink
  "#d0d6e0", // 1 — ink-muted
  "#8a8f98", // 2 — ink-subtle
  "#62666d", // 3 — ink-tertiary
  "#3e3e44", // 4 — hairline-tertiary
  "#34343a", // 5 — hairline-strong
  "#23252a", // 6 — hairline
  "#18191a", // 7 — surface-3
  "#141516", // 8 — surface-2
  "#010102", // 9 — canvas
] as ShadingColor;

/** Neutral gray — for secondary UI, disabled states */
export const neutral = [
  "#f5f6f6",
  "#e6e7e8",
  "#d1d3d5",
  "#b3b5b8",
  "#8a8d91",
  "#6b6e72",
  "#55585c",
  "#3e4145",
  "#2c2e32",
  "#1d1f22",
] as ShadingColor;

/** Danger red — errors, destructive actions */
export const danger = [
  "#fff0f0",
  "#ffd9d9",
  "#ffb3b3",
  "#ff8a8a",
  "#ff5656",
  "#e34935",
  "#bf2600",
  "#9e1b00",
  "#7a1500",
  "#5c1000",
] as ShadingColor;

/** Warning amber — alerts, cautions */
export const warning = [
  "#fffbf0",
  "#fff2d9",
  "#ffe8b3",
  "#ffdc8a",
  "#ffce56",
  "#ffab00",
  "#d98c00",
  "#b37200",
  "#8a5900",
  "#664200",
] as ShadingColor;
