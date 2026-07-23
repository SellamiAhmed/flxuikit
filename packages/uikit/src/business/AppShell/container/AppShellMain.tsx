import clsx from 'clsx'

import { ElementProps, Group, GroupProps } from '../../../primitive/index.js'
import classes from '../index.module.css'

interface AppShellMainProps extends GroupProps, ElementProps<'div'> {}

export const AppShellMain = ({ className, ...rest }: AppShellMainProps) => {
  return (
    <Group
      gap={0}
      wrap="nowrap"
      align="stretch"
      {...rest}
      className={clsx(classes.appShellMain, className, 'flexui-app-shell-root')}
    />
  )
}
