import clsx from 'clsx'
import React from 'react'

import { Box, BoxProps } from '../../primitive/index.js'
import { token, type TokenName } from '../../theme/fns.js'
import { Color } from '../../theme/index.js'

import classes from './index.module.css'

const DOT_BG_TOKEN: Record<Color, TokenName> = {
  brand: 'color.background.brand.bold',
  danger: 'color.background.danger.bold',
  warning: 'color.background.warning.bold',
  success: 'color.background.success.bold',
  discovery: 'color.background.discovery.bold',
  neutral: 'color.background.neutral.bold'
}

export interface DotProps extends BoxProps {
  color: Color
  size?: number
  pulse?: boolean
}

export const Dot: React.FC<DotProps> = ({ color, size = 8, pulse, className, style, ...rest }) => {
  return (
    <Box
      className={clsx(classes.dot, pulse && classes.pulse, className)}
      style={{
        backgroundColor: token(DOT_BG_TOKEN[color] ?? DOT_BG_TOKEN.neutral),
        height: size,
        width: size,
        minWidth: size,
        borderRadius: '50%',
        flexShrink: 0,
        ...style
      }}
      {...rest}
    />
  )
}
