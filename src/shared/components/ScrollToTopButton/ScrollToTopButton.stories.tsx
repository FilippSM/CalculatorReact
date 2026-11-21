import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollToTopButton } from "./ScrollToTopButton"

const meta = {
  title: "Components/ScrollToTopButton",
  component: ScrollToTopButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
  args: {
    style: { position: "static" },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ScrollToTopButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
