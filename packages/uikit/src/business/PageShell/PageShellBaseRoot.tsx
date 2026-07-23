import clsx from 'clsx'

import { Box, BoxComponentProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseRootProps extends React.PropsWithChildren<BoxComponentProps> {}

export const PageShellBaseRoot = (props: PageShellBaseRootProps) => {
  return <Box {...props} className={clsx(classes.root, props.className)} />
}
