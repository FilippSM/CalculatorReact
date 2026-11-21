import { describe, expect, test } from "vitest"
import { calculateGost18995Uncertainty } from "../lib/calculateGost18995Uncertainty"

describe("calculateGost18995Uncertainty", () => {
  test("calculates expanded uncertainty with k=2", () => {
    const result = calculateGost18995Uncertainty({
      measuredTemperature: "-14,8",
    })

    expect(result?.ExpandedUncertainty).toBe(1.2)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("returns null when the measured temperature is empty or invalid", () => {
    expect(
      calculateGost18995Uncertainty({
        measuredTemperature: "",
      }),
    ).toBeNull()
  })
})
