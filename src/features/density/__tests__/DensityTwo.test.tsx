import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Density } from "../ui/Density"

// Частичный мок: store импортирует densityApi.reducer при инициализации
vi.mock("../api/densityApi", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../api/densityApi")>()
  return {
    ...actual,
    useSaveDensityMutation: () => [vi.fn()],
  }
})

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }) as Promise<Response>,
)

test("рендерится кнопка Add calc", () => {
  render(<Density />)
  expect(screen.getByText("Add calc")).toBeInTheDocument()
  expect(screen.getByText("Add calc")).toMatchSnapshot()
})
