import { describe, expect, test } from "vitest"
import { calculateGost121044Uncertainty } from "../lib/calculateGost121044Uncertainty"

describe("calculateGost121044Uncertainty", () => {
  test("calculates expanded uncertainty for 250 °C", () => {
    const result = calculateGost121044Uncertainty({
      measuredAutoIgnitionTemperature: "250",
    })

    expect(result?.BathTempAccuracy).toBe(2)
    expect(result?.RepeatabilityLimit).toBe(5)
    expect(result?.ExpandedUncertainty).toBe(7)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("calculates expanded uncertainty for the protocol average 351 °C", () => {
    const result = calculateGost121044Uncertainty({
      measuredAutoIgnitionTemperature: "351",
    })

    expect(result?.RepeatabilityLimit).toBe(7)
    expect(result?.ExpandedUncertainty).toBe(8)
  })

  test("returns null when the measured temperature is empty or invalid", () => {
    expect(
      calculateGost121044Uncertainty({
        measuredAutoIgnitionTemperature: "",
      }),
    ).toBeNull()
    expect(
      calculateGost121044Uncertainty({
        measuredAutoIgnitionTemperature: "abc",
      }),
    ).toBeNull()
  })
})
