import { describe, expect, test } from "vitest"
import { calculateGost18995Uncertainty } from "../lib/calculateGost18995Uncertainty"

const baseInput = {
  meanDensity: "1,071",
  thermometer: "LT-300" as const,
}

describe("calculateGost18995Uncertainty", () => {
  test("calculates expanded uncertainty with k=2", () => {
    const result = calculateGost18995Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.ExpandedUncertainty).toBe(0.004)
    expect(result?.ExpandedUncertainty).toBe(
      Math.round(result!.CombinedStandardUncertainty * 2 * 1000) / 1000,
    )
  })

  test("calculates percentage contributions F21-F25", () => {
    const result = calculateGost18995Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.DensityContribution).toBeGreaterThan(0)
    expect(result?.TemperatureContribution).toBeGreaterThan(0)
    expect(result?.RepeatabilityContribution).toBeGreaterThan(0)
    expect(result?.SamplingContribution).toBeGreaterThan(0)
    expect(result?.TotalContribution).toBeCloseTo(100)
    expect(result?.TotalContribution).toBeCloseTo(
      result!.DensityContribution +
        result!.TemperatureContribution +
        result!.RepeatabilityContribution +
        result!.SamplingContribution,
    )
  })

  test("uses the selected thermometer", () => {
    const lt300Result = calculateGost18995Uncertainty(baseInput)
    const otherResult = calculateGost18995Uncertainty({
      ...baseInput,
      thermometer: "other",
    })

    expect(lt300Result).not.toBeNull()
    expect(otherResult).not.toBeNull()
    expect(otherResult!.TemperatureStandardUncertainty).toBeGreaterThan(
      lt300Result!.TemperatureStandardUncertainty,
    )
    expect(otherResult!.ExpandedUncertainty).toBeGreaterThan(
      lt300Result!.ExpandedUncertainty,
    )
  })

  test("returns null for an invalid mean density", () => {
    expect(calculateGost18995Uncertainty({ ...baseInput, meanDensity: "" })).toBeNull()
    expect(calculateGost18995Uncertainty({ ...baseInput, meanDensity: 0 })).toBeNull()
  })
})
