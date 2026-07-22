import { createContext, type RefObject } from 'react'

export const NavMenuRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null)
