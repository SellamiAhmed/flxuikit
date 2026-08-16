// eslint-disable-next-line no-restricted-imports
import { MantineProvider, MantineThemeOverride, mergeMantineTheme } from '@mantine/core'
import { useColorScheme as useSystemColorScheme } from '@mantine/hooks'
import { ModalsProvider, ModalsProviderProps } from '@mantine/modals'
import { Notifications, NotificationsProps } from '@mantine/notifications'
import { ReactNode, useMemo } from 'react'

import { useTheme } from './theme.js'
import './tokens.css' // ← import once

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
  // Resolve 'auto' to the OS preference. Only subscribes to the system
  // media query when colorScheme === 'auto' (passing undefined otherwise
  // still calls the hook, but its value is simply unused below).
  const systemColorScheme = useSystemColorScheme(colorScheme === 'auto' ? undefined : colorScheme, {
    getInitialValueInEffect: false
  })

  const resolvedColorScheme: 'light' | 'dark' = colorScheme === 'auto' ? systemColorScheme : colorScheme

  const baseTheme = useTheme(resolvedColorScheme)

  const finalTheme = useMemo(
    () => (themeOverride ? mergeMantineTheme(baseTheme, themeOverride) : baseTheme),
    [baseTheme, themeOverride]
  )

  return (
    <MantineProvider theme={finalTheme} forceColorScheme={resolvedColorScheme}>
      <Notifications position="top-center" {...notifications} />
      <ModalsProvider {...modals}>{children}</ModalsProvider>
    </MantineProvider>
  )
}
