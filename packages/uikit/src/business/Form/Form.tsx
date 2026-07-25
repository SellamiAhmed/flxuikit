import { useSafeState } from 'ahooks'
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Mode,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm
} from 'react-hook-form'

import { Box, BoxProps, ElementProps } from '../../primitive/index.js'

import { useHookFormContext } from './context.js'
import classes from './Form.module.css'
import { FormActions, FormActionsProps } from './FormActions.js'
import { FormErrorMessage, FormErrorMessageProps } from './FormErrorMessage.js'
import { FormLayout, FormLayoutProps, FormLayoutType } from './FormLayout.js'

const getErrorMessage = (e: any) => e?.message

export interface FormProps<T extends FieldValues = object> extends BoxProps, Omit<ElementProps<'form'>, 'onSubmit'> {
  errorMessage?: string
  formMode?: Mode
  reValidateMode?: UseFormProps['reValidateMode']
  defaultValues?: DefaultValues<T>
  form?: UseFormReturn<T>
  withActions?: boolean
  actionsProps?: FormActionsProps
  errorMessageProps?: Omit<FormErrorMessageProps, 'message'>
  layout?: FormLayoutType
  layoutProps?: Omit<FormLayoutProps, 'layout'>
  stopPropagation?: boolean
  preventDefault?: boolean

  onSubmit: SubmitHandler<T>
  onRefresh?: () => void
  onError?: () => any
  onCancel?: () => void
  onFormUnMount?: () => void
}

const _Form = <T extends object = {}>({
  children,
  form,
  formMode,
  reValidateMode = 'onChange',
  defaultValues,
  onSubmit,
  onFormUnMount,
  onCancel,
  withActions = true,
  actionsProps,
  errorMessageProps,
  layout = 'vertical',
  layoutProps,
  onError,
  stopPropagation,
  preventDefault,
  ...rest
}: FormProps<T>) => {
  const [submitError, setSubmitError] = useSafeState('')
  const [submitting, setSubmitting] = useSafeState(false)
  const defaultMethods = useForm<T>({
    mode: formMode,
    reValidateMode,
    defaultValues
  })

  const methods = form || defaultMethods
  const { handleSubmit } = methods
  const context = useHookFormContext()

  const submit: SubmitHandler<T> = async (data, event) => {
    setSubmitError('')
    setSubmitting(true)
    try {
      await onSubmit(data, event)
      setSubmitting(false)
    } catch (e) {
      const handleError = onError || context?.onError || getErrorMessage
      setSubmitError(handleError?.(e))
      setSubmitting(false)
    }
  }

  const handleDismissErrorMessage = () => {
    setSubmitError('')
  }

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        {...rest}
        onSubmit={(e) => {
          if (stopPropagation) {
            e?.stopPropagation()
          }
          if (preventDefault) {
            e?.preventDefault()
          }
          return handleSubmit(submit)(e)
        }}
      >
        <FormLayout layout={layout} {...layoutProps}>
          {children}
        </FormLayout>
        {withActions && (
          <>
            {submitError && (
              <div className={classes.errorWrapper}>
                <FormErrorMessage message={submitError} onDismiss={handleDismissErrorMessage} {...errorMessageProps} />
              </div>
            )}
            <FormActions onCancel={onCancel} loading={submitting} {...actionsProps} />
          </>
        )}
      </Box>
    </FormProvider>
  )
}

type FormType = typeof _Form

export const Form = _Form as any as FormType & {
  Actions: typeof FormActions
  ErrorMessage: typeof FormErrorMessage
  Layout: typeof FormLayout
}

Form.Actions = FormActions
Form.ErrorMessage = FormErrorMessage
Form.Layout = FormLayout
