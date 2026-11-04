import { useId, type ChangeEvent, type ComponentPropsWithRef, type ReactNode } from "react"
import clsx from "clsx"
import { useThemeStore } from "@/app/store"
import styles from "./Checkbox.module.scss"

export type CheckboxProps = {
  label?: ReactNode
  /** When true, clicking the label text also toggles the checkbox. Default: false */
  labelClickable?: boolean
  onValueChange?: (checked: boolean) => void
} & Omit<ComponentPropsWithRef<"input">, "type">

export const Checkbox = ({
  id,
  label,
  labelClickable = false,
  className,
  disabled,
  onChange,
  onValueChange,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const theme = useThemeStore((state) => state.theme)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.currentTarget.checked)
    onChange?.(event)
  }

  const labelClassName = clsx(styles.label, labelClickable && styles.labelClickable)

  return (
    <div
      className={clsx(
        styles.wrapper,
        styles[`wrapper--${theme}`],
        disabled && styles.disabled,
        className,
      )}
    >
      <label className={styles.controlLabel} htmlFor={checkboxId}>
        <input
          {...rest}
          id={checkboxId}
          className={styles.input}
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
        />
        <span className={styles.control} aria-hidden="true" />
      </label>
      {label &&
        (labelClickable ? (
          <label className={labelClassName} htmlFor={checkboxId}>
            {label}
          </label>
        ) : (
          <span className={labelClassName}>{label}</span>
        ))}
    </div>
  )
}
