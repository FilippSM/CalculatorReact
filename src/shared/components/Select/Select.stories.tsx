import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/shared/components/Select/Select"
import {  useState, type ComponentPropsWithRef } from "react"

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[210px]" label={"Select-box"}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Select-box 1</SelectItem>
          <SelectItem value="2">Select-box 2</SelectItem>
          <SelectItem value="3">Select-box 3</SelectItem>
        </SelectContent>
      </>
    ),
  },
}

export const SelectWithSideRight: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]" label={"Select-box"}>
          <SelectValue placeholder="Select-box" />
        </SelectTrigger>
        <SelectContent side="right" align="start">
          <SelectItem value="1">Select-box 1</SelectItem>
          <SelectItem value="2">Select-box 2</SelectItem>
          <SelectItem value="3">Select-box 3</SelectItem>
        </SelectContent>
      </>
    ),
  },
}

export const SelectDisabled: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]" label={"Select-box"}>
          <SelectValue placeholder="Select-box" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Select-box 1</SelectItem>
          <SelectItem value="2">Select-box 2</SelectItem>
          <SelectItem value="3">Select-box 3</SelectItem>
        </SelectContent>
      </>
    ),
    disabled: true,
  },
}

/* export const SelectWithLanguage: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <FlagRussiaIcon />
            Russian
          </SelectItem>
          <SelectItem value="2">
            <FlagUKIcon />
            English
          </SelectItem>
        </SelectContent>
      </>
    ),
    defaultValue: "1",
  },
} */

export const SelectWithGroup: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]" label={"Select-box"}>
          <SelectValue placeholder="Select item" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="1">Item 1</SelectItem>
            <SelectItem value="2">Item 2</SelectItem>
            <SelectItem value="3">Item 3</SelectItem>
            <SelectItem value="4">Item 4</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Group 2</SelectLabel>
            <SelectItem value="5">Item 5</SelectItem>
            <SelectItem value="6">Item 6</SelectItem>
          </SelectGroup>
        </SelectContent>
      </>
    ),
  },
}

export const SelectForPagination: Story = {
  args: {
    children: (
      <>
        <SelectTrigger isPagination>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10" isPagination>
            10
          </SelectItem>
          <SelectItem value="20" isPagination>
            20
          </SelectItem>
          <SelectItem value="30" isPagination>
            30
          </SelectItem>
          <SelectItem value="50" isPagination>
            50
          </SelectItem>
          <SelectItem value="100" isPagination>
            100
          </SelectItem>
        </SelectContent>
      </>
    ),
    defaultValue: "10",
  },
}

const ControlledSelect = (args: ComponentPropsWithRef<typeof Select>) => {
  const [value, setValue] = useState(args.value ?? "1")

  return (
    <Select {...args} value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]" label={"Select-box"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Select-box 1</SelectItem>
        <SelectItem value="2">Select-box 2</SelectItem>
        <SelectItem value="3">Select-box 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    value: "3",
  },
}
