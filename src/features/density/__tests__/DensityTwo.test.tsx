import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Density } from '../ui/Density'

// Мокаем RTK Query
vi.mock('../api/densityApi', () => ({
  useSaveDensityMutation: () => [vi.fn()]
}))

// Мокаем fetch ПРАВИЛЬНО - он должен возвращать Promise
global.fetch = vi.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }) as Promise<Response>
)

test("рендерится кнопка Save", () => {
  render(<Density />)
  expect(screen.getByText("Save")).toBeInTheDocument()
  expect(screen.getByText("Save")).toMatchSnapshot()
})
