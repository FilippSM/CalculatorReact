import { describe, expect, test } from "vitest"
import { calculateGost6370Uncertainty } from "../lib/calculateGost6370Uncertainty"

const baseInput = {
  filterWithImpuritiesMass: "47,0329",
  cleanFilterMass: "47,0315",
  sampleMass: "100,00",
}

describe("calculateGost6370Uncertainty", () => {
  test("calculates expanded uncertainty with k=2", () => {
    const result = calculateGost6370Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.ExpandedUncertainty).toBe(0.0018)
  })

  test("calculates percentage contributions E21-E26", () => {
    const result = calculateGost6370Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.SampleMassContribution).toBeGreaterThanOrEqual(0)
    expect(result?.FilterWithImpuritiesContribution).toBeGreaterThan(0)
    expect(result?.CleanFilterContribution).toBeGreaterThan(0)
    expect(result?.RepeatabilityContribution).toBeGreaterThan(0)
    expect(result?.SamplingContribution).toBe(0)
    expect(result?.TotalContribution).toBeCloseTo(100)
    expect(result?.TotalContribution).toBeCloseTo(
      result!.SampleMassContribution +
        result!.FilterWithImpuritiesContribution +
        result!.CleanFilterContribution +
        result!.RepeatabilityContribution +
        result!.SamplingContribution,
    )
  })

  test("returns null for invalid masses", () => {
    expect(calculateGost6370Uncertainty({ ...baseInput, sampleMass: "" })).toBeNull()
    expect(calculateGost6370Uncertainty({ ...baseInput, sampleMass: 0 })).toBeNull()
    expect(calculateGost6370Uncertainty({ ...baseInput, filterWithImpuritiesMass: "abc" })).toBeNull()
  })
})
