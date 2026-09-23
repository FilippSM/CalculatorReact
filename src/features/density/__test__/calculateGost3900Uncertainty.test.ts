import { describe, expect, test } from "vitest"
import { calculateGost3900Uncertainty } from "../lib/calculateGost3900Uncertainty"

const baseInput = {
  densityAtTestTemperature: "863,0",
  sampleTemperature: "21,0",
  meanDensityAt20: "871,4",
  hydrometer: "ANT-2" as const,
  thermometer: "LT-300" as const,
}

describe("calculateGost3900Uncertainty", () => {
  test("calculates expanded uncertainty with k=2", () => {
    const result = calculateGost3900Uncertainty(baseInput)

    expect(result).not.toBeNull()
    expect(result?.sensitivityTemperature).toBeCloseTo(8.4)
    expect(result?.expandedUncertainty).toBe(2.5)
    expect(result?.expandedUncertainty).toBe(
      Math.round(result!.combinedStandardUncertainty * 2 * 10) / 10,
    )
  })

  test("uses the selected measuring instruments", () => {
    const ant2Result = calculateGost3900Uncertainty(baseInput)
    const ant1Result = calculateGost3900Uncertainty({
      ...baseInput,
      hydrometer: "ANT-1",
      thermometer: "other",
    })

    expect(ant1Result).not.toBeNull()
    expect(ant2Result).not.toBeNull()
    expect(ant1Result?.densityStandardUncertainty).toBeLessThan(
      ant2Result!.densityStandardUncertainty,
    )
    expect(ant1Result?.temperatureStandardUncertainty).toBeGreaterThan(
      ant2Result!.temperatureStandardUncertainty,
    )
  })

  test("returns null when source values cannot be used in the formula", () => {
    expect(
      calculateGost3900Uncertainty({
        ...baseInput,
        sampleTemperature: "20,0",
      }),
    ).toBeNull()
    expect(
      calculateGost3900Uncertainty({
        ...baseInput,
        densityAtTestTemperature: "",
      }),
    ).toBeNull()
  })
})
