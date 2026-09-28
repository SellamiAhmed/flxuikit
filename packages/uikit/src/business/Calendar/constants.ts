/**
 * Height thresholds (px) that drive EventCard's progressive information
 * disclosure. Below `full`, secondary details (time, location, attendees)
 * collapse into a single inline line. Below `compact`, only the title shows.
 */
export const EVENT_CARD_DENSITY_THRESHOLDS = {
  full: 44,
  compact: 24
} as const
