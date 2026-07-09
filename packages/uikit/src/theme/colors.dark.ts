// eslint-disable-next-line no-restricted-imports

import { ShadingColor } from './colors.js'

// Linear is dark-only; dark.ts mirrors colors.ts exactly.
// This file exists so the useTheme() hook can switch palettes
// if you ever add a light mode later.

export const brand = [
  '#e8e9f7',
  '#d0d3ef',
  '#b8bce7',
  '#a0a6df',
  '#8890d7',
  '#828fff',
  '#5e6ad2',
  '#5e69d1',
  '#4a529e',
  '#363a6a'
] as ShadingColor

export const success = [
  '#e6f7eb',
  '#c2ebd0',
  '#9ddfae',
  '#79d38c',
  '#55c76a',
  '#27a644',
  '#1f8536',
  '#176427',
  '#0f4318',
  '#072209'
] as ShadingColor

export const dark = [
  '#f7f8f8',
  '#d0d6e0',
  '#8a8f98',
  '#62666d',
  '#3e3e44',
  '#34343a',
  '#23252a',
  '#18191a',
  '#141516',
  '#010102'
] as ShadingColor

export const neutral = [
  '#f5f6f6',
  '#e6e7e8',
  '#d1d3d5',
  '#b3b5b8',
  '#8a8d91',
  '#6b6e72',
  '#55585c',
  '#3e4145',
  '#2c2e32',
  '#1d1f22'
] as ShadingColor

export const danger = [
  '#fff0f0',
  '#ffd9d9',
  '#ffb3b3',
  '#ff8a8a',
  '#ff5656',
  '#e34935',
  '#bf2600',
  '#9e1b00',
  '#7a1500',
  '#5c1000'
] as ShadingColor

export const warning = [
  '#fffbf0',
  '#fff2d9',
  '#ffe8b3',
  '#ffdc8a',
  '#ffce56',
  '#ffab00',
  '#d98c00',
  '#b37200',
  '#8a5900',
  '#664200'
] as ShadingColor
