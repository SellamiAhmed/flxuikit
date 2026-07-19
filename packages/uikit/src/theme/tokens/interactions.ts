/**
 * Interaction Overlay Tokens — Light Mode
 */

export const interactionColors = {
  'color.interaction.hovered': 'rgba(0, 0, 0, 0.06)',
  'color.interaction.pressed': 'rgba(0, 0, 0, 0.12)'
} as const

export type InteractionColorToken = keyof typeof interactionColors
