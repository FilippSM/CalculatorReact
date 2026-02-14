import * as SelectPrimitive from "@radix-ui/react-select"
import { ArrowDownIcon } from "@/shared/icons"
import clsx from "clsx"
import styles from "./Select.module.scss"
import { useId, type ComponentPropsWithRef } from "react"
import { Label } from "../Label/Label"
import { useThemeStore } from "@/app/store"

type Props = {
  label?: string
  id?: string
  isPagination?: boolean
} & ComponentPropsWithRef<typeof SelectPrimitive.Trigger>

function Select({ disabled, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root disabled={disabled} {...props} />
}

function SelectGroup(props: ComponentPropsWithRef<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />
}

function SelectValue(props: ComponentPropsWithRef<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />
}

function SelectTrigger({ id, label, className, isPagination = false, children, ...props }: Props) {
  const theme = useThemeStore((state) => state.theme)
  
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <>
      {label && <Label htmlFor={selectId}>{label}</Label>}

      <SelectPrimitive.Trigger
        id={selectId}
        className={clsx(styles.trigger, styles[`trigger--${theme}`], isPagination && styles.pagination, className)}
        {...props}
      >
        {children}

        <SelectPrimitive.Icon asChild>
          <ArrowDownIcon
            className={styles.icon}
            width={isPagination ? "16px" : "24px"}
            height={isPagination ? "16px" : "24px"}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </>
  )
}

function SelectContent({
  className,
  position = "popper",
  children,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Content>) {
  const theme = useThemeStore((state) => state.theme)
  
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={clsx(styles.content, styles[`content--${theme}`], className)} position={position} {...props}>
        <SelectPrimitive.Viewport className={clsx(position === "popper" && styles.viewport)}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label className={clsx(styles.label, className)} {...props} />
}

function SelectItem({
  className,
  children,
  isPagination = false,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Item> & { isPagination?: boolean }) {
  const theme = useThemeStore((state) => state.theme)
  
  return (
    <SelectPrimitive.Item
      className={clsx(styles.item, styles[`item--${theme}`],isPagination ? styles.itemPagination : styles.itemDefault, className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
