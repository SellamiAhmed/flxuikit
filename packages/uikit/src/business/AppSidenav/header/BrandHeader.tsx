import { Anchor, Box, Divider, MantineText } from '../../../primitive/index.js'
import classes from '../index.module.css'
import type { AppSidenavBrand } from '../types.js'

interface BrandHeaderProps {
  brand: AppSidenavBrand
}

export const BrandHeader = ({ brand }: BrandHeaderProps) => {
  return (
    <>
      <Box className={classes.header}>
        <Anchor href={brand.href} className={classes.brand} underline="never">
          <span className={classes.brandIcon} aria-hidden="true">
            {brand.icon}
          </span>
          <MantineText component="span" className={classes.brandName}>
            {brand.name}
          </MantineText>
        </Anchor>
      </Box>

      <Divider className={classes.divider} />
    </>
  )
}
