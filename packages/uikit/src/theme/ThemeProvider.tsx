// src/theme/ThemeProvider.tsx
// eslint-disable-next-line no-restricted-imports
import { MantineProvider, MantineThemeOverride, mergeMantineTheme } from '@mantine/core'
import { ModalsProvider, ModalsProviderProps } from '@mantine/modals'
import { Notifications, NotificationsProps } from '@mantine/notifications'
import { ReactNode, useMemo } from 'react'

import { useSystemColorScheme } from '../hooks/index.js'

import { useTheme } from './theme.js'

export interface ThemeProviderProps {
  children: ReactNode
  colorScheme: 'light' | 'dark' | 'auto'
  theme?: MantineThemeOverride
  notifications?: NotificationsProps
  modals?: ModalsProviderProps
}

export function ThemeProvider({
  children,
  colorScheme,
  theme: themeOverride,
  notifications,
  modals
}: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme(colorScheme === 'auto' ? undefined : colorScheme, {
    getInitialValueInEffect: false
  })

  const colorSchemeResult = (colorScheme === 'auto' ? systemColorScheme : colorScheme) as 'light' | 'dark'
  const baseTheme = useTheme(colorSchemeResult)

  const finalTheme = useMemo(
    () => (themeOverride ? mergeMantineTheme(baseTheme, themeOverride) : baseTheme),
    [baseTheme, themeOverride]
  )

  // Manual CSS variables for body/text — replaces Emotion runtime
  const canvas = colorSchemeResult === 'dark' ? '#010102' : '#ffffff'
  const ink = colorSchemeResult === 'dark' ? '#f7f8f8' : '#111111'

  return (
    <>
      <style>{`
        :root {
          --mantine-color-body: ${canvas};
          --mantine-color-text: ${ink};
          --linear-canvas: ${canvas};
          --linear-ink: ${ink};
        }
        html, body {
          background-color: ${canvas} !important;
          color: ${ink} !important;
        }
      `}</style>
      <MantineProvider theme={finalTheme} forceColorScheme={colorSchemeResult}>
        <Notifications position="top-center" {...notifications} />
        <ModalsProvider {...modals}>{children}</ModalsProvider>
      </MantineProvider>
    </>
  )
}
