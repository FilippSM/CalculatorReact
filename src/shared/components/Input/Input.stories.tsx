import { Input } from "@/shared/components/Input"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  argTypes: {
    disabled: {
      type: "boolean",
    },
  },
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#000000" }, // color(dark, 900)
        light: { name: "Light", value: "#FFFFFF" }, // color(light, 100)
      },
    },
  },
  tags: ["autodocs"],
  title: "Components/Input",
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "text",
  },
}

export const WithError: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "text",
    errorMessage: "error",
  },
}

export const WithLongError: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "text",
    errorMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  render: (args) => {
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Input {...args} />
      </div>
    )
  },
}

export const InputPassword: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "password",
  },
}

export const InputPasswordWithError: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "password",
    errorMessage: "error",
  },
}

export const InputSearch: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "search",
  },
}

export const InputSearchWithError: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "search",
    errorMessage: "error",
  },
}

export const InputDisabled: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "text",
    disabled: true,
  },
}

export const InputPasswordDisabled: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "password",
    disabled: true,
  },
}

export const InputSearchDisabled: Story = {
  args: {
    label: "label",
    placeholder: "input",
    type: "search",
    disabled: true,
  },
}
