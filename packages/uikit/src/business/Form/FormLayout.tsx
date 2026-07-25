import { Flex, FlexProps } from '../../primitive/index.js'

import classes from './FormLayout.module.css'

export type FormLayoutType = 'horizontal' | 'vertical' | 'none'

export interface FormLayoutProps extends FlexProps {
  layout?: FormLayoutType
}

export const FormLayout: React.FC<FormLayoutProps> = ({ layout = 'vertical', children, ...rest }) => {
  if (layout === 'none') {
    return <>{children}</>
  }
  return (
    <Flex direction={layout === 'vertical' ? 'column' : 'row'} className={classes.root} {...rest}>
      {children}
    </Flex>
  )
}
