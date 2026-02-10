import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import styles from './Button.module.scss'
import type { ComponentPropsWithRef } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'textButton' | 'theme'
  asChild?: boolean
  fullWidth?: boolean
  themeMode?: 'light' | 'dark'
} & ComponentPropsWithRef<'button'>

export const Button = ({
  asChild = false,
  variant = 'primary',
  className,
  fullWidth = false,
  themeMode = 'light',
  ...rest
}: Props) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={clsx(
        styles.button,
        styles[variant],
        themeMode && styles[`${variant}--${themeMode}`],
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    />
  )
}
