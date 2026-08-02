// eslint-disable-next-line no-restricted-imports -- test-only Mantine access, see eslint override for test/** files
import { MantineProvider } from '@mantine/core'
import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

// If your theme.ts exports a configured MantineThemeOverride, import and
// pass it here so `token()` calls inside component styles resolve exactly
// as they do in the real app. Adjust the import path once confirmed.
// import { theme } from '../theme/index.js'

function Providers({ children }: { children: ReactNode }) {
  return <MantineProvider /* theme={theme} */>{children}</MantineProvider>
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult {
  return rtlRender(ui, { wrapper: Providers, ...options })
}

// Named re-exports instead of `export *` — avoids the non-portable inferred
// type issue and satisfies no-restricted-syntax (only relative/type exports
// may use `export *`).
export {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  cleanup,
  act,
  renderHook,
  type RenderOptions,
  type RenderResult
} from '@testing-library/react'
