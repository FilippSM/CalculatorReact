import s from "./button.module.css"
import type { ComponentPropsWithoutRef } from "react"

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outlined" | "text"
  fullWidth?: boolean
} & ComponentPropsWithoutRef<"button">

export const Button = ({ variant = "primary", fullWidth, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={`${s[variant]} ${className ? className : ""} ${fullWidth ? s.fullWidth : ""}`}/>
  )
}
