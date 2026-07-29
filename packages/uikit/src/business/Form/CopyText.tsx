import { IconCopy } from '@tabler/icons-react'

import {
  Box,
  BoxProps,
  CopyButton,
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
  ActionIcon
} from '../../primitive/index.js'

import classes from './CopyText.module.css'

export interface FormCopyTextProps extends BoxProps {
  value: string
  timeout?: number
  onClick?: () => void
  valueProps?: TypographyProps
  tooltipProps?: TooltipProps
  size?: number
}

export const FormCopyText = ({
  timeout = 3000,
  value,
  valueProps,
  tooltipProps,
  size = 16,
  onClick,
  ...props
}: FormCopyTextProps) => {
  return (
    <CopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Box className={classes.root} {...props}>
          <Typography variant="body-lg" className={classes.value} {...valueProps}>
            {value}
          </Typography>
          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow {...tooltipProps}>
            <ActionIcon
              aria-label="Copy"
              variant="transparent"
              className={classes.icon}
              onClick={() => {
                copy()
                onClick?.()
              }}
            >
              <IconCopy size={size} />
            </ActionIcon>
          </Tooltip>
        </Box>
      )}
    </CopyButton>
  )
}
