import { describe, expect, test } from "vitest"
import { calculateGost2477Uncertainty } from "../lib/calculateGost2477Uncertainty"

describe("calculateGost2477Uncertainty", () => {
  test("calculates expanded uncertainty for mass fraction with k=2", () => {
    const result = calculateGost2477Uncertainty({
      waterShare: "mass",
      receiverCapacity: 10,
      waterVolume: 1,
      sampleAmount: 100,
    })

    expect(result?.ExpandedUncertainty).toBe(0.05)
    expect(result?.SamplingStandardUncertainty).toBe(0.025)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("calculates expanded uncertainty for volume fraction with k=2", () => {
    const result = calculateGost2477Uncertainty({
      waterShare: "volume",
      receiverCapacity: 10,
      waterVolume: 1,
      sampleAmount: 100,
    })

    expect(result?.ExpandedUncertainty).toBe(0.2)
    expect(result?.SamplingStandardUncertainty).toBe(0.1)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  test("returns null when inputs are empty, invalid, or sample amount is zero", () => {
    expect(
      calculateGost2477Uncertainty({
        waterShare: "mass",
        receiverCapacity: 10,
        waterVolume: "",
        sampleAmount: 100,
      }),
    ).toBeNull()
    expect(
      calculateGost2477Uncertainty({
        waterShare: "volume",
        receiverCapacity: 5,
        waterVolume: 1,
        sampleAmount: 0,
      }),
    ).toBeNull()
  })
})
