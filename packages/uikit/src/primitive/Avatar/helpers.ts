// ═══════════════════════════════════════════════════════
// NAME RESOLUTION
// ═══════════════════════════════════════════════════════

export interface PersonNameParts {
  firstName?: string | null
  lastName?: string | null
}

/** Accepts either a pre-joined display name string, or raw DB fields. */
export type AvatarNameInput = string | PersonNameParts

/** Normalizes any consumer DB shape into a single display string. */
export function resolveDisplayName(input: AvatarNameInput): string {
  if (typeof input === 'string') return input.trim()

  const first = input.firstName?.trim() ?? ''
  const last = input.lastName?.trim() ?? ''
  return [first, last].filter(Boolean).join(' ')
}

export function getInitials(input: AvatarNameInput, maxChars = 2): string {
  if (typeof input !== 'string') {
    const first = input.firstName?.trim()?.[0]
    const last = input.lastName?.trim()?.[0]
    const initials = [first, last].filter(Boolean).join('')
    if (initials) return initials.slice(0, maxChars).toUpperCase()
    return '?'
  }

  const parts = input.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, maxChars).toUpperCase()
  return parts
    .slice(0, maxChars)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

// ═══════════════════════════════════════════════════════
// DETERMINISTIC COLOR
// ═══════════════════════════════════════════════════════

const AVATAR_PALETTE = ['brand', 'success', 'warning', 'danger', 'discovery', 'neutral'] as const

export type AvatarColor = (typeof AVATAR_PALETTE)[number]

export function getColorFromString(seed: AvatarNameInput): AvatarColor {
  const str = resolveDisplayName(seed) || 'unknown'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash |= 0
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

// ═══════════════════════════════════════════════════════
// SIZE SCALE
// ═══════════════════════════════════════════════════════

export const AVATAR_SIZES = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56
} as const

export type AvatarSize = keyof typeof AVATAR_SIZES

// ═══════════════════════════════════════════════════════
// GROUP TRUNCATION
// ═══════════════════════════════════════════════════════

export function truncateForGroup<T>(items: T[], max: number): { visible: T[]; overflow: number } {
  if (items.length <= max) return { visible: items, overflow: 0 }
  return { visible: items.slice(0, max), overflow: items.length - max }
}
