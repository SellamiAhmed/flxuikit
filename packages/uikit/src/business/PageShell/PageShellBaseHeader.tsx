import clsx from 'clsx'

import { Group, GroupProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseHeaderProps extends GroupProps {
  sticky?: boolean
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
}

export const PageShellBaseHeader = ({
  sticky,
  leftSection,
  rightSection,
  children,
  ...rest
}: PageShellBaseHeaderProps) => {
  return (
    <Group
      wrap="nowrap"
      justify="space-between"
      gap={0}
      {...rest}
      className={clsx(classes.header, rest.className)}
      data-sticky={sticky || undefined}
    >
      {leftSection}
      <div className={classes.headerCenter}>{children}</div>
      {rightSection}
    </Group>
  )
}
