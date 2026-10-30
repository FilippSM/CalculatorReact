import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentType, SVGProps } from "react"
import { ArrowDownIcon } from "./ArrowDownIcon"
import { ArrowUpIcon } from "./ArrowUpIcon"
import { PinLocation } from "./PinLocation"
import { SearchIcon } from "./SearchIcon"
import { VisibilityIcon } from "./VisibilityIcon"
import { VisibilityOffIcon } from "./VisibilityOffIcon"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const icons: { name: string; Icon: IconComponent }[] = [
  { name: "ArrowDownIcon", Icon: ArrowDownIcon },
  { name: "ArrowUpIcon", Icon: ArrowUpIcon },
  { name: "PinLocation", Icon: PinLocation },
  { name: "SearchIcon", Icon: SearchIcon },
  { name: "VisibilityIcon", Icon: VisibilityIcon },
  { name: "VisibilityOffIcon", Icon: VisibilityOffIcon },
]

const meta = {
  title: "Icons",
  tags: ["autodocs"],
  args: {
    width: 24,
    height: 24,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 24,
        padding: 24,
        background: "#333",
        color: "#fff",
        borderRadius: 8,
        minWidth: 400,
      }}
    >
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon {...args} />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const ArrowDown: Story = {
  render: (args) => <ArrowDownIcon {...args} />,
}

export const ArrowUp: Story = {
  render: (args) => <ArrowUpIcon {...args} />,
}

export const Pin: Story = {
  render: (args) => <PinLocation {...args} />,
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: "#333", borderRadius: 8, color: "#fff" }}>
        <Story />
      </div>
    ),
  ],
}

export const Search: Story = {
  render: (args) => <SearchIcon {...args} />,
}

export const Visibility: Story = {
  render: (args) => <VisibilityIcon {...args} />,
}

export const VisibilityOff: Story = {
  render: (args) => <VisibilityOffIcon {...args} />,
}
