// eslint-disable-next-line no-restricted-imports
import { MantineProvider, MantineThemeOverride, mergeMantineTheme } from '@mantine/core'
import { ModalsProvider, ModalsProviderProps } from '@mantine/modals'
import { Notifications, NotificationsProps } from '@mantine/notifications'
import { ReactNode, useMemo } from 'react'

import { useTheme } from './theme.js'
import './tokens.css' // ← import once

export interface ThemeProviderProps {
  children: ReactNode
  /** Pass the already-resolved 'light' | 'dark' value — resolve 'auto' upstream with useColorScheme(). */
  colorScheme: 'light' | 'dark'
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
  const baseTheme = useTheme(colorScheme)

  const finalTheme = useMemo(
    () => (themeOverride ? mergeMantineTheme(baseTheme, themeOverride) : baseTheme),
    [baseTheme, themeOverride]
  )

  return (
    <MantineProvider theme={finalTheme} forceColorScheme={colorScheme}>
      <Notifications position="top-center" {...notifications} />
      <ModalsProvider {...modals}>{children}</ModalsProvider>
    </MantineProvider>
  )
}
