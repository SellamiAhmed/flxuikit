import '../globals.css'

import { ThemeProvider as UikitThemeProvider } from '@flxui/uikit/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function UikitSync({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  // avoid hydration mismatch: next-themes doesn't know the real theme
  // until mounted on the client, so default to 'auto' until then
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const colorScheme = !mounted ? 'auto' : theme === 'system' ? 'auto' : (theme as 'light' | 'dark')

  return <UikitThemeProvider colorScheme={colorScheme}>{children}</UikitThemeProvider>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <UikitSync>
        <Component {...pageProps} />
      </UikitSync>
    </NextThemeProvider>
  )
}
