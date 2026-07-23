import clsx from 'clsx'

import { Box, BoxComponentProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseBodyProps extends React.PropsWithChildren<BoxComponentProps> {}

export const PageShellBaseBody = (props: PageShellBaseBodyProps) => {
  return (
    <Box
      {...props}
      className={clsx(classes.body, props.className)}
    />
  )
}
