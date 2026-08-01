import clsx from 'clsx'
import { forwardRef } from 'react'

import { Box, type BoxComponentProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseBodyProps extends React.PropsWithChildren<BoxComponentProps> {}

export const PageShellBaseBody = forwardRef<HTMLDivElement, PageShellBaseBodyProps>(({ className, ...props }, ref) => {
  return <Box ref={ref} {...props} className={clsx(classes.body, className)} />
})

PageShellBaseBody.displayName = 'PageShellBaseBody'
