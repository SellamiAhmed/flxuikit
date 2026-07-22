import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { NavMenuRefContext } from './nav-menu-ref-context.js'

export const NavMenuPortal = ({ children }: React.PropsWithChildren) => {
  const ctx = useContext(NavMenuRefContext)
  const [target, setTarget] = useState<HTMLDivElement>()

  useEffect(() => {
    if (ctx?.current) {
      setTarget(ctx.current)
    }
  }, [ctx])

  if (!ctx) {
    // NavMenuPortal must be used within a NavMenuRefContext
    return null
  }

  if (!target) {
    return null
  }

  return createPortal(children, target)
}
