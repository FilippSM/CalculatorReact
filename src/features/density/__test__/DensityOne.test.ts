import { describe, test, expect } from "vitest"
import { cleanNumericInput } from "../ui/Density"

describe("cleanNumericInput", () => {
  test("removes all letters", () => {
    expect(cleanNumericInput("abc")).toBe("")
    expect(cleanNumericInput("hello123world")).toBe("123")
    expect(cleanNumericInput("test123test456test")).toBe("123456")
    expect(cleanNumericInput("test123test456test")).toMatchSnapshot()
  })
})
