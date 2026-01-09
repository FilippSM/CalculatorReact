import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: { onClick: { action: "clicked" } },
  args: {
    children: "Button",
    "aria-label": "button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
}

export const TextButton: Story = {
  args: {
    variant: "textButton",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}
