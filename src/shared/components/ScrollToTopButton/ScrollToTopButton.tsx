import { ArrowUpIcon } from "@/shared/icons"
import clsx from "clsx"
import type { ComponentPropsWithRef } from "react"
import styles from "./ScrollToTopButton.module.scss"

export type ScrollToTopButtonProps = Omit<ComponentPropsWithRef<"button">, "children" | "type">

export const ScrollToTopButton = ({ className, ...rest }: ScrollToTopButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      aria-label="Прокрутить наверх"
      {...rest}
    >
      <ArrowUpIcon className={styles.icon} width={24} height={24} />
    </button>
  )
}
