import { describe, expect, test } from "vitest"
import { calculateGost28084Uncertainty } from "../lib/calculateGost28084Uncertainty"

describe("calculateGost28084Uncertainty", () => {
  test("calculates uncertainty when the temperature is above -40 °C", () => {
    const result = calculateGost28084Uncertainty({
      measuredTemperature: "-20,3",
    })

    expect(result?.ApparatusAccuracy).toBe(1.5)
    expect(result?.ExpandedUncertainty).toBe(2.2)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("calculates uncertainty when the temperature is -40 °C or below", () => {
    const result = calculateGost28084Uncertainty({
      measuredTemperature: "-40",
    })

    expect(result?.ApparatusAccuracy).toBe(1)
    expect(result?.ExpandedUncertainty).toBe(1.8)
  })

  test("returns null when the measured temperature is empty or invalid", () => {
    expect(
      calculateGost28084Uncertainty({
        measuredTemperature: "",
      }),
    ).toBeNull()
  })
})
