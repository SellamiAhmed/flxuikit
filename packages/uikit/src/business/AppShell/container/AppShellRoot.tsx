import clsx from 'clsx'

import { Stack } from '../../../primitive/index.js'
import classes from '../index.module.css'

export const AppShellRoot = ({ children }: React.PropsWithChildren) => {
  return (
    <Stack gap={0} className={clsx(classes.appShellRoot, 'flexui-app-shell-root')}>
      {children}
    </Stack>
  )
}
