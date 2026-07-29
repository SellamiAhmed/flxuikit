import rawCountries from './rawCountries.js'

export const phoneMasks = rawCountries.reduce<Record<string, string>>(
  (acc, country) => {
    const iso2 = country[2] as string
    const format = country[4] as string | undefined
    if (format) acc[iso2] = format
    return acc
  },
  { cn: '...........' }
) // keep China default that your primitive expects
