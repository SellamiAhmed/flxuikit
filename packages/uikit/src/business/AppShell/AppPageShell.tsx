import clsx from 'clsx'

import { Group } from '../../primitive/index.js'
import {
    PageShellBaseBackButton,
    PageShellBaseBody,
    PageShellBaseHeader,
    PageShellBaseRoot,
    PageShellBaseTitle,
    type PageShellBaseBodyProps,
    type PageShellBaseHeaderProps,
    type PageShellBaseRootProps
} from '../PageShell/page-shell-base.js'

import classes from './AppPageShell.module.css'
import { ExpandNavbarButtonPlaceholder } from './navbar/ExpandNavbarButtonPlaceholder.js'

const DEFAULT_PAGE_MAX_WIDTH = 1920

export interface AppPageShellProps {
  maxWidth?: string
  withHeader?: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  wrapperProps?: PageShellBaseRootProps
  headerProps?: PageShellBaseHeaderProps & {
    withBack?: boolean
    onBackClick?: () => void
  }
  bodyProps?: PageShellBaseBodyProps
}

export const AppPageShell = ({
  withHeader = true,
  headerProps,
  bodyProps,
  wrapperProps,
  maxWidth = `${DEFAULT_PAGE_MAX_WIDTH}px`,
  ...rest
}: AppPageShellProps) => {
  if (!withHeader) {
    return (
      <PageShellBaseRoot
        {...bodyProps}
        className={clsx(classes.shellNoHeader, bodyProps?.className)}
        style={{
          ...bodyProps?.style,
          '--app-shell-page-max-width': maxWidth,
        } as React.CSSProperties}
      >
        {rest.children}
      </PageShellBaseRoot>
    )
  }

  const { withBack, onBackClick, ...headerPropsWithoutBack } = headerProps ?? {}

  return (
    <PageShellBaseRoot
      {...wrapperProps}
      className={clsx(classes.shell, wrapperProps?.className)}
      style={{
        ...wrapperProps?.style,
        '--app-shell-page-max-width': maxWidth,
      } as React.CSSProperties}
    >
      <PageShellBaseHeader
        {...headerPropsWithoutBack}
        sticky={headerPropsWithoutBack.sticky}
        className={clsx(classes.header, headerPropsWithoutBack.className)}
        leftSection={
          <Group wrap="nowrap" gap={0}>
            <ExpandNavbarButtonPlaceholder />
            {withBack && <PageShellBaseBackButton onClick={onBackClick} />}
          </Group>
        }
      >
        <PageShellBaseTitle>{rest.title}</PageShellBaseTitle>
      </PageShellBaseHeader>

      <PageShellBaseBody
        {...bodyProps}
        className={clsx(classes.body, bodyProps?.className)}
      >
        {rest.children}
      </PageShellBaseBody>
    </PageShellBaseRoot>
  )
}
