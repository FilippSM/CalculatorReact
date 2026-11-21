import {
  useId,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import clsx from "clsx"
import { useThemeStore } from "@/app/store"
import styles from "./Checkbox.module.scss"

export type CheckboxProps = {
  label?: ReactNode
  /** When true, clicking the label text also toggles the checkbox. Default: false */
  labelClickable?: boolean
  /** Class for the label text only (`className` styles the whole wrapper). */
  labelClassName?: string
  onLabelClick?: () => void
  onValueChange?: (checked: boolean) => void
} & Omit<ComponentPropsWithRef<"input">, "type">

export const Checkbox = ({
  id,
  label,
  labelClickable = false,
  labelClassName,
  onLabelClick,
  className,
  disabled,
  onChange,
  onValueChange,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const theme = useThemeStore((state) => state.theme)
  const isLabelAction = Boolean(onLabelClick) && !disabled

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.currentTarget.checked)
    onChange?.(event)
  }

  /** Enter/Space on the label trigger onLabelClick; Space default scroll is prevented. */
  const handleLabelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onLabelClick || disabled) return
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    onLabelClick()
  }

  const labelClasses = clsx(
    styles.label,
    labelClickable && styles.labelClickable,
    isLabelAction && styles.labelAction,
    labelClassName,
  )

  /** Focusable label action props when onLabelClick is set. */
  const labelActionProps = isLabelAction
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: onLabelClick,
        onKeyDown: handleLabelKeyDown,
      }
    : undefined

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
          <label className={labelClasses} htmlFor={checkboxId} {...labelActionProps}>
            {label}
          </label>
        ) : (
          <span className={labelClasses} {...labelActionProps}>
            {label}
          </span>
        ))}
    </div>
  )
}
