import { IconAlertCircle } from '@tabler/icons-react'
import DOMPurify from 'dompurify'
import { useEffect, useRef, useState } from 'react'

import { Alert, AlertProps } from '../../primitive/index.js'

import classes from './FormErrorMessage.module.css'

export interface FormErrorMessageProps extends Omit<AlertProps, 'children'> {
  message: string
  onDismiss?: () => void
  autoScroll?: boolean
  closable?: boolean
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  message,
  onDismiss,
  autoScroll,
  closable = false,
  ...rest
}) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!autoScroll) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [autoScroll, message])

  useEffect(() => {
    setShow(true)
  }, [message])

  if (!message || !show) {
    return null
  }

  return (
    <Alert
      className={classes.alert}
      withCloseButton={Boolean(onDismiss) || closable}
      color="danger"
      icon={<IconAlertCircle />}
      onClose={() => {
        setShow(false)
        onDismiss?.()
      }}
      {...rest}
    >
      <div className={classes.message} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} />
      <div ref={bottomRef} />
    </Alert>
  )
}

FormErrorMessage.displayName = 'HookFormErrorMessage'
