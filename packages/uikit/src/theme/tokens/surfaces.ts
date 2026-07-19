/**
 * Elevation Surface Tokens — Light Mode (Shadcn mapping)
 */

export const surfaceColors = {
  /* ── Base surface ── */
  'elevation.surface': '#FFFFFF',
  'elevation.surface.hovered': '#FAFAFA',
  'elevation.surface.pressed': '#F4F4F5',

  /* ── Overlay surface ── */
  'elevation.surface.overlay': '#FFFFFF',
  'elevation.surface.overlay.hovered': '#FAFAFA',
  'elevation.surface.overlay.pressed': '#F4F4F5',

  /* ── Raised surface ── */
  'elevation.surface.raised': '#FFFFFF',
  'elevation.surface.raised.hovered': '#FAFAFA',
  'elevation.surface.raised.pressed': '#F4F4F5',

  /* ── Sunken surface ── */
  'elevation.surface.sunken': '#F4F4F5',

  /* ── Container surface ── */
  'elevation.surface.container': '#F4F4F5',
  'elevation.surface.container.hovered': '#E4E4E7',
  'elevation.surface.container.pressed': '#D4D4D8'
} as const

export type SurfaceColorToken = keyof typeof surfaceColors
