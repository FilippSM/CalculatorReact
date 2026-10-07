import { describe, expect, test } from "vitest"
import { calculateGost4333Uncertainty } from "../lib/calculateGost4333Uncertainty"

const baseInput = {
  correctedFlashPoint: "243",
  device: "manual" as const,
}

describe("calculateGost4333Uncertainty", () => {
  test("calculates expanded uncertainty with k=2", () => {
    const result = calculateGost4333Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.ExpandedUncertainty).toBe(6)
    expect(result?.ExpandedUncertainty).toBe(
      Math.round(result!.CombinedStandardUncertainty * 2),
    )
  })

  test("calculates percentage contributions F16-F20", () => {
    const result = calculateGost4333Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.FlashPointContribution).toBeGreaterThan(0)
    expect(result?.PressureContribution).toBeGreaterThan(0)
    expect(result?.RepeatabilityContribution).toBeGreaterThan(0)
    expect(result?.SamplingContribution).toBeGreaterThan(0)
    expect(result?.TotalContribution).toBeCloseTo(100)
    expect(result?.TotalContribution).toBeCloseTo(
      result!.FlashPointContribution +
        result!.PressureContribution +
        result!.RepeatabilityContribution +
        result!.SamplingContribution,
    )
  })

  test("uses automatic varianceSum formula E43² + E18² + E19²", () => {
    const manualResult = calculateGost4333Uncertainty(baseInput)
    const automaticResult = calculateGost4333Uncertainty({
      ...baseInput,
      device: "automatic",
    })

    expect(automaticResult).not.toBeNull()
    expect(automaticResult?.ExpandedUncertainty).toBe(
      Math.round(automaticResult!.CombinedStandardUncertainty * 2),
    )
    expect(automaticResult?.CombinedStandardUncertainty).not.toBe(
      manualResult?.CombinedStandardUncertainty,
    )
  })

  test("uses a coarser thermometer above 260 °C", () => {
    const belowOrEqualResult = calculateGost4333Uncertainty({
      correctedFlashPoint: "260",
      device: "manual",
    })
    const aboveResult = calculateGost4333Uncertainty({
      correctedFlashPoint: "261",
      device: "manual",
    })

    expect(belowOrEqualResult).not.toBeNull()
    expect(aboveResult).not.toBeNull()
    expect(aboveResult!.FlashPointStandardUncertainty).toBeGreaterThan(
      belowOrEqualResult!.FlashPointStandardUncertainty,
    )
    expect(aboveResult!.ExpandedUncertainty).toBeGreaterThan(
      belowOrEqualResult!.ExpandedUncertainty,
    )
    expect(belowOrEqualResult!.ExpandedUncertainty).toBe(6)
    expect(aboveResult!.ExpandedUncertainty).toBe(7)
  })

  test("returns null for an invalid corrected flash point", () => {
    expect(
      calculateGost4333Uncertainty({ correctedFlashPoint: "", device: "manual" }),
    ).toBeNull()
    expect(
      calculateGost4333Uncertainty({ correctedFlashPoint: "abc", device: "manual" }),
    ).toBeNull()
  })
})
