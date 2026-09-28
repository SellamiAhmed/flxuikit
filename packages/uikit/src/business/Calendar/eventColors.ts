import { token, type TokenName } from '../../theme/fns.js'
import type { Color } from '../../theme/theme.js'

interface EventColorTokens {
  background: TokenName
  border: TokenName
  text: TokenName
}

const EVENT_COLOR_MAP: Record<Color, EventColorTokens> = {
  brand: { background: 'color.background.brand.subtlest', border: 'color.border.brand', text: 'color.text.brand' },
  danger: { background: 'color.background.danger', border: 'color.border.danger', text: 'color.text.danger' },
  warning: { background: 'color.background.warning', border: 'color.border.warning', text: 'color.text.warning' },
  success: { background: 'color.background.success', border: 'color.border.success', text: 'color.text.success' },
  discovery: {
    background: 'color.background.discovery.subtle',
    border: 'color.border.discovery',
    text: 'color.text.discovery'
  },
  neutral: {
    background: 'color.background.accent.gray.subtlest',
    border: 'color.border',
    text: 'color.text.subtle'
  }
}

/** Returns CSS custom properties for one event's color, to set inline per-instance. */
export function getEventColorVars(color: Color = 'neutral'): Record<string, string> {
  const t = EVENT_COLOR_MAP[color] ?? EVENT_COLOR_MAP.neutral
  return {
    '--event-bg': token(t.background),
    '--event-border': token(t.border),
    '--event-text': token(t.text)
  }
}
