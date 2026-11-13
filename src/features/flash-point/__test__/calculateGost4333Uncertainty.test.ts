import { describe, expect, test } from "vitest"
import { calculateGost4333Uncertainty} from "../lib/calculateGost4333Uncertainty"

const baseInput = {
  correctedFlashPoint: "243",
  device: "manual" as const,
}

describe("calculateGost4333Uncertainty", () => {
  /** Считает расширенную неопределённость для manual. */
  test("calculates expanded uncertainty for manual", () => {
    const result = calculateGost4333Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.ExpandedUncertainty).toBe(6)
  })

  /** Считает расширенную неопределённость для automatic. */
  test("calculates expanded uncertainty for automatic", () => {
    const automaticResult = calculateGost4333Uncertainty({
      ...baseInput,
      device: "automatic",
    })

    expect(automaticResult).not.toBeNull()
    expect(automaticResult?.ExpandedUncertainty).toBe(6)
  })

  /** Считает процентные вклады F16–F20. */
  test("calculates percentage contributions F16-F20", () => {
    const result = calculateGost4333Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.FlashPointContribution).toBeGreaterThan(0)
    expect(result?.PressureContribution).toBeGreaterThan(0)
    expect(result?.RepeatabilityContribution).toBeGreaterThan(0)
    expect(result?.SamplingContribution).toBeGreaterThan(0)
    expect(result?.TotalContribution).toBeCloseTo(100)
  })

  /** Использует более грубый термометр выше 260 °C. */
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
    expect(belowOrEqualResult!.ExpandedUncertainty).toBe(6)
    expect(aboveResult!.ExpandedUncertainty).toBe(7)
  })

  /** Отклоняет некорректную скорректированную температуру вспышки. */
  test("rejects an invalid corrected flash point", () => {
    expect(
      calculateGost4333Uncertainty({ correctedFlashPoint: "", device: "manual" }),
    ).toBeNull()
    expect(
      calculateGost4333Uncertainty({ correctedFlashPoint: "abc", device: "manual" }),
    ).toBeNull()
  })
})
