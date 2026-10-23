import { describe, expect, test } from "vitest"
import { calculateGost20287Uncertainty } from "../lib/calculateGost20287Uncertainty"

describe("calculateGost20287Uncertainty", () => {
  test("calculates expanded uncertainty for a valid pour point", () => {
    const result = calculateGost20287Uncertainty({
      measuredPourPoint: "-21",
    })

    expect(result?.SampleTempAccuracy).toBe(0.1)
    expect(result?.BathTempAccuracy).toBe(0.5)
    expect(result?.RepeatabilityLimit).toBe(6)
    expect(result?.ExpandedUncertainty).toBe(3)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("returns the same budget for any valid measured pour point", () => {
    const result = calculateGost20287Uncertainty({
      measuredPourPoint: "0",
    })

    expect(result?.ExpandedUncertainty).toBe(3)
  })

  test("returns null when the measured pour point is empty or invalid", () => {
    expect(
      calculateGost20287Uncertainty({
        measuredPourPoint: "",
      }),
    ).toBeNull()
    expect(
      calculateGost20287Uncertainty({
        measuredPourPoint: "abc",
      }),
    ).toBeNull()
  })
})
