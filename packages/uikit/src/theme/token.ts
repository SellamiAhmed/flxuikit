// src/theme/tokens.ts
export interface LinearTokens {
  canvas: string
  surface1: string
  surface2: string
  surface3: string
  surface4: string
  hairline: string
  hairlineStrong: string
  hairlineTertiary: string
  ink: string
  inkMuted: string
  inkSubtle: string
  inkTertiary: string
  primary: string
  primaryHover: string
  primaryFocus: string
  onPrimary: string
}

export const darkTokens: LinearTokens = {
  canvas: '#010102',
  surface1: '#0f1011',
  surface2: '#141516',
  surface3: '#18191a',
  surface4: '#191a1b',
  hairline: '#23252a',
  hairlineStrong: '#34343a',
  hairlineTertiary: '#3e3e44',
  ink: '#f7f8f8',
  inkMuted: '#d0d6e0',
  inkSubtle: '#8a8f98',
  inkTertiary: '#62666d',
  primary: '#5e6ad2',
  primaryHover: '#828fff',
  primaryFocus: '#5e69d1',
  onPrimary: '#ffffff'
}

export const lightTokens: LinearTokens = {
  canvas: '#ffffff',
  surface1: '#f5f6f6',
  surface2: '#f6f7f7',
  surface3: '#e6e7e8',
  surface4: '#d1d3d5',
  hairline: '#e5e5e5',
  hairlineStrong: '#d4d4d4',
  hairlineTertiary: '#c4c4c4',
  ink: '#111111',
  inkMuted: '#333333',
  inkSubtle: '#555555',
  inkTertiary: '#777777',
  primary: '#5e6ad2',
  primaryHover: '#828fff',
  primaryFocus: '#5e69d1',
  onPrimary: '#ffffff'
}
