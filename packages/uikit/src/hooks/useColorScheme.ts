import { useLocalStorage, useColorScheme as useSystemColorScheme } from '@mantine/hooks'

export interface UseColorSchemeOptions {
  getInitialValueInEffect?: boolean
  key?: string
}

export const useColorScheme = (
  defaultValue: 'light' | 'dark' | 'auto' = 'auto',
  options: UseColorSchemeOptions = {}
) => {
  const { getInitialValueInEffect = false, key = 'mantine-color-scheme' } = options

  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark' | 'auto'>({
    key,
    defaultValue,
    getInitialValueInEffect
  })

  // Always track the OS preference — needed to resolve 'auto' to a concrete value.
  const systemColorScheme = useSystemColorScheme('light', { getInitialValueInEffect })

  const resolvedColorScheme: 'light' | 'dark' = colorScheme === 'auto' ? systemColorScheme : colorScheme

  const toggleColorScheme = () => {
    // Toggle off the *resolved* value, not the raw stored value — otherwise
    // toggling while colorScheme === 'auto' lands on the wrong branch and
    // the first click appears to do nothing (or double-flips).
    setColorScheme(resolvedColorScheme === 'light' ? 'dark' : 'light')
  }

  return {
    colorScheme,
    resolvedColorScheme,
    setColorScheme,
    systemColorScheme,
    toggleColorScheme
  }
}
