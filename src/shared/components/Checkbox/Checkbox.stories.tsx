import { useState, type ComponentPropsWithRef } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "@/shared/components/Checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Checkbox",
  },
  argTypes: {
    disabled: {
      type: "boolean",
    },
    onChange: {
      action: "changed",
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
}

const ControlledCheckbox = (args: ComponentPropsWithRef<typeof Checkbox>) => {
  const [checked, setChecked] = useState(args.checked ?? false)

  return <Checkbox {...args} checked={checked} onValueChange={setChecked} />
}

export const Controlled: Story = {
  args: {
    checked: true,
  },
  render: (args) => <ControlledCheckbox {...args} />,
}
