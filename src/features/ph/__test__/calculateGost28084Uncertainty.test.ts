import { describe, expect, test } from "vitest"
import { calculateGost28084Uncertainty } from "../lib/Gost_28084"

describe("calculateGost28084Uncertainty", () => {
  test("calculates uncertainty for HI8424 J0088992", () => {
    const result = calculateGost28084Uncertainty({
      measuredPh: "8,7",
      phMeter: "J0088992",
    })

    expect(result?.ExpandedUncertainty).toBe(0.2)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("calculates uncertainty for another pH meter", () => {
    const result = calculateGost28084Uncertainty({
      measuredPh: "8,7",
      phMeter: "other",
    })

    expect(result?.ExpandedUncertainty).toBe(0.1)
  })

  test("returns null when the measured pH is empty or invalid", () => {
    expect(
      calculateGost28084Uncertainty({
        measuredPh: "",
        phMeter: "J0088992",
      }),
    ).toBeNull()
  })
})
