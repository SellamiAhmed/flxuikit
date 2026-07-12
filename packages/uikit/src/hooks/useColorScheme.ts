import { useLocalStorage, useColorScheme as useSystemColorScheme } from '@mantine/hooks'

export interface UseColorSchemeOptions {
  getInitialValueInEffect?: boolean
  key?: string
}

export const useColorScheme = (
  defaultValue: 'light' | 'dark' | 'auto' = 'auto',
  options: UseColorSchemeOptions = {}
) => {
  const { getInitialValueInEffect = false, key = 'mantine-color-scheme' } = options // ← TiDBCloud key

  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark' | 'auto'>({
    key,
    defaultValue,
    getInitialValueInEffect
  })

  const systemColorScheme = useSystemColorScheme(defaultValue === 'auto' ? undefined : defaultValue, {
    getInitialValueInEffect
  })

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return {
    colorScheme,
    setColorScheme,
    systemColorScheme,
    toggleColorScheme
  }
}
