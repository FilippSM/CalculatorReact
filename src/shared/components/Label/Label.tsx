import * as LabelRadix from "@radix-ui/react-label"
import { clsx } from "clsx"
import type { ComponentPropsWithRef } from "react"
import styles from "./Label.module.scss"

type Props = {
  disabled?: boolean
} & ComponentPropsWithRef<typeof LabelRadix.Root>

export const Label = ({ children, className, htmlFor, disabled, ...rest }: Props) => {
  return (
    <LabelRadix.Root
      className={clsx(styles.label, disabled ? styles.disabled : styles.active, className)}
      htmlFor={disabled ? "" : htmlFor}
      asChild
      {...rest}
    >
      <label>{children}</label>
    </LabelRadix.Root>
  )
}
