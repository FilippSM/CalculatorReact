import { describe, expect, test } from "vitest"
import { calculateGost20287Uncertainty } from "../lib/calculateGost20287Uncertainty"

describe("calculateGost20287Uncertainty", () => {
  test("calculates expanded uncertainty for a valid freezing point", () => {
    const result = calculateGost20287Uncertainty({
      measuredFreezingPoint: "-24",
    })

    expect(result?.SampleTempAccuracy).toBe(0.1)
    expect(result?.BathTempAccuracy).toBe(0.5)
    expect(result?.RepeatabilityLimit).toBe(2)
    expect(result?.ExpandedUncertainty).toBe(1)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("returns the same budget for any valid measured freezing point", () => {
    const result = calculateGost20287Uncertainty({
      measuredFreezingPoint: "0",
    })

    expect(result?.ExpandedUncertainty).toBe(1)
  })

  test("returns null when the measured freezing point is empty or invalid", () => {
    expect(
      calculateGost20287Uncertainty({
        measuredFreezingPoint: "",
      }),
    ).toBeNull()
    expect(
      calculateGost20287Uncertainty({
        measuredFreezingPoint: "abc",
      }),
    ).toBeNull()
  })
})
