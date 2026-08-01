import { Button, ButtonProps, ElementProps, Flex, FlexProps } from '../../primitive/index.js'

import classes from './FormActions.module.css'

type ActionButtonProps = Omit<ButtonProps, 'children'> &
  ElementProps<'button'> & {
    [p: `data-${string}`]: string
  }

export interface FormActionsProps extends FlexProps {
  loading?: boolean
  disabled?: boolean
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
  cancelText?: React.ReactNode
  cancelProps?: ActionButtonProps
  confirmText?: React.ReactNode
  confirmProps?: ActionButtonProps
}

export const FormActions: React.FC<FormActionsProps> = ({
  disabled,
  cancelProps,
  confirmProps,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onCancel,
  onConfirm,
  loading,
  ...rest
}) => {
  return (
    <Flex justify="flex-end" className={classes.root} {...rest}>
      {cancelText && (
        <Button onClick={onCancel} variant="default" {...cancelProps}>
          {cancelText}
        </Button>
      )}
      <Button type="submit" onClick={onConfirm} loading={loading} disabled={disabled} {...confirmProps}>
        {confirmText}
      </Button>
    </Flex>
  )
}

FormActions.displayName = 'HookFormActions'
