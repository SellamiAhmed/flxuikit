import clsx from 'clsx'

import { Group, GroupProps, ElementProps } from '../../../primitive/index.js'
import classes from '../index.module.css'

interface AppShellMainProps extends GroupProps, ElementProps<'div'> {}

export const AppShellMain = ({ className, ...rest }: AppShellMainProps) => {
  return (
    <Group
      gap={0}
      wrap="nowrap"
      align="stretch"
      {...rest}
      className={clsx(classes.appShellMain, className, 'tiui-app-shell-main')}
    />
  )
}
