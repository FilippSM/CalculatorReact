import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// Автоматически очищаем после каждого теста
afterEach(() => {
  cleanup()
})

// Мокаем fetch если нужно
if (typeof global !== "undefined") {
  global.fetch = vi.fn()
}

// Для подавления предупреждений в тестах
console.error = vi.fn()
console.warn = vi.fn()
