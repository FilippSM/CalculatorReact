import { describe, expect, test } from "vitest"
import { calculateGost6479Uncertainty } from "../lib/calculateGost6479Uncertainty"

const baseInput = {
  filterWithImpuritiesMass: "47,0257",
  cleanFilterMass: "47,0245",
  sampleMass: "10,03",
  meanMassFraction: "0,013",
}

describe("calculateGost6479Uncertainty", () => {
  test("calculates expanded uncertainty with k=2 rounded to mean decimal places", () => {
    const result = calculateGost6479Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.ExpandedUncertainty).toBe(0.018)
  })

  test("calculates percentage contributions E21-E26", () => {
    const result = calculateGost6479Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.SampleMassContribution).toBeGreaterThanOrEqual(0)
    expect(result?.FilterWithImpuritiesContribution).toBeGreaterThan(0)
    expect(result?.CleanFilterContribution).toBeGreaterThan(0)
    expect(result?.RepeatabilityContribution).toBeGreaterThan(0)
    expect(result?.SamplingContribution).toBe(0)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("returns null for invalid masses or mean", () => {
    expect(calculateGost6479Uncertainty({ ...baseInput, sampleMass: "" })).toBeNull()
    expect(calculateGost6479Uncertainty({ ...baseInput, sampleMass: 0 })).toBeNull()
    expect(calculateGost6479Uncertainty({ ...baseInput, meanMassFraction: "" })).toBeNull()
    expect(
      calculateGost6479Uncertainty({ ...baseInput, filterWithImpuritiesMass: "abc" }),
    ).toBeNull()
  })
})
