import { Box } from '../../../primitive/index.js'

import classes from './ExpandNavbarButtonPlaceholder.module.css'

export interface ExpandNavbarButtonPlaceholderProps {
  /** Optional override for the rail width (defaults to CSS var --app-shell-rail-width) */
  railWidth?: number | string
}

export const ExpandNavbarButtonPlaceholder = ({
  railWidth
}: ExpandNavbarButtonPlaceholderProps = {}) => {
  return (
    <Box
      className={classes.placeholder}
      aria-hidden="true"
      style={
        railWidth
          ? ({ '--app-shell-rail-width': typeof railWidth === 'number' ? `${railWidth}px` : railWidth } as React.CSSProperties)
          : undefined
      }
    />
  )
}
