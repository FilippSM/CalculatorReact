import { PinLocation, SearchIcon, VisibilityIcon, VisibilityOffIcon } from "@/shared/icons"
import clsx from "clsx"
import styles from "./Input.module.scss"
import { useState, type ChangeEvent, type ComponentPropsWithRef } from "react"
import { Label } from "../Label/Label"

export type InputProps = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: "password" | "search" | "text" | "email" | "location"
  errorPosition?: "inline" | "absolute"
} & ComponentPropsWithRef<"input">

export const Input = ({
  type = "text",
  onValueChange,
  onChange,
  label,
  value,
  errorMessage,
  className,
  disabled,
  required,
  errorPosition = "inline",
  ...rest
}: InputProps) => {

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.currentTarget.value)
    onChange?.(e)
  }

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <Label disabled={disabled} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </Label>
      )}

      <div className={styles.inputContainer}>
        <input
          className={clsx(styles.input, type === "search" && styles.search, errorMessage && styles.error)}
          value={value ?? ""}
          type={inputType}
          disabled={disabled}
          onChange={handleChange}
          {...rest}
        />

        {errorMessage && (
          <div className={clsx(styles.errorMessage, errorPosition === "absolute" && styles.errorAbsolute)}>
            {!disabled && <p>{errorMessage}</p>}
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            className={styles.iconButton}
            onMouseDown={(e) => {
              e.preventDefault()
              setShowPassword((prev) => !prev)
            }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        )}

        {type === "search" && <SearchIcon className={styles.searchIcon} />}

        {type === "location" && <PinLocation className={styles.locationIcon} />}
      </div>
    </div>
  )
}
