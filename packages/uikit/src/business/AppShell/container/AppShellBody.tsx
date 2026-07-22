import clsx from 'clsx'

import { Box, BoxProps, ElementProps } from '../../../primitive/index.js'
import classes from '../index.module.css'

interface AppShellBodyProps extends BoxProps, ElementProps<'main'> {}

export const AppShellBody = ({ className, ...rest }: AppShellBodyProps) => {
  return (
    <Box
      component="main"
      {...rest}
      className={clsx(classes.appShellBody, className, 'flexui-app-shell-body')}
    />
  )
}
