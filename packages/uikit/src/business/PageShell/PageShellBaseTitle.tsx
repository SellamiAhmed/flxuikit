import clsx from 'clsx'

import { Typography, TypographyProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseTitleProps extends React.PropsWithChildren<TypographyProps> {
  className?: string
}

export const PageShellBaseTitle = (props: PageShellBaseTitleProps) => {
  return (
    <Typography variant="headline-lg" component="div" {...props} className={clsx(classes.title, props.className)} />
  )
}
