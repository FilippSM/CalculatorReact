import { describe, expect, test } from "vitest"
import { calculateGost18995Uncertainty } from "../lib/calculateGost18995Uncertainty"

describe("calculateGost18995Uncertainty", () => {
  test("calculates uncertainty when the temperature is above 100 °C", () => {
    const result = calculateGost18995Uncertainty({
      measuredTemperature: "246,3",
    })

    expect(result?.RepeatabilityLimit).toBe(2.5)
    expect(result?.ExpandedUncertainty).toBe(1.3)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("calculates uncertainty when the temperature is 100 °C or below", () => {
    const result = calculateGost18995Uncertainty({
      measuredTemperature: "100",
    })

    expect(result?.RepeatabilityLimit).toBe(1.4)
    expect(result?.ExpandedUncertainty).toBe(0.7)
  })

  test("returns null when the measured temperature is empty or invalid", () => {
    expect(
      calculateGost18995Uncertainty({
        measuredTemperature: "",
      }),
    ).toBeNull()
  })
})
