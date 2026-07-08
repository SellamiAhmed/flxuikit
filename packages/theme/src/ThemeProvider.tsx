// eslint-disable-next-line no-restricted-imports
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { ModalsProvider, ModalsProviderProps } from '@mantine/modals'
import { Notifications, NotificationsProps } from '@mantine/notifications'
import { ReactNode } from 'react'

import { useTheme } from './theme.js'

export interface ThemeProviderProps {
  children: ReactNode
  colorScheme?: 'light' | 'dark' | 'auto'
  theme?: MantineThemeOverride
  notifications?: NotificationsProps
  modals?: ModalsProviderProps
}

export function ThemeProvider({
  children,
  colorScheme = 'dark',
  theme: themeOverride,
  notifications,
  modals,
}: ThemeProviderProps) {
  const resolvedScheme: 'light' | 'dark' =
    colorScheme === 'auto' ? 'dark' : colorScheme

  const theme = useTheme(resolvedScheme)

  return (
    <MantineProvider
      forceColorScheme={resolvedScheme}
      theme={themeOverride ? { ...theme, ...themeOverride } : theme}
    >
      <Notifications position="top-center" {...notifications} />
      <ModalsProvider {...modals}>{children}</ModalsProvider>
    </MantineProvider>
  )
}