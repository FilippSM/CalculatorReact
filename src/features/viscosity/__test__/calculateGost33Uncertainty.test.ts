import { describe, expect, test } from "vitest"
import { calculateGost33Uncertainty } from "../lib/calculateGost33Uncertainty"

describe("calculateGost33Uncertainty", () => {
  test("calculates expanded uncertainty for reference Excel inputs", () => {
    const result = calculateGost33Uncertainty({
      averageFlowTime: 100,
      viscometerConstant: 0.01,
      kinematicViscosity: "1,000",
      detectionLimitPercent: 0.2,
      repeatabilityLimitPercent: 0.11,
    })

    expect(result?.TotalContribution).toBeCloseTo(100)
    expect(result?.ExpandedUncertainty).toBe(0.004)
  })

  test("rounds expanded uncertainty to the decimal places of the mean", () => {
    const resultNearSeven = calculateGost33Uncertainty({
      averageFlowTime: "239,65",
      viscometerConstant: "0,030584",
      kinematicViscosity: "7,333",
      detectionLimitPercent: 0.13,
      repeatabilityLimitPercent: 0.26,
    })

    expect(resultNearSeven?.ExpandedUncertainty).toBe(0.005)

    const resultNearEleven = calculateGost33Uncertainty({
      averageFlowTime: 100,
      viscometerConstant: 0.01,
      kinematicViscosity: "10,88",
      detectionLimitPercent: 0.2,
      repeatabilityLimitPercent: 0.11,
    })

    expect(resultNearEleven?.ExpandedUncertainty).toBe(0.02)
  })

  test("returns null when required inputs are empty or invalid", () => {
    expect(
      calculateGost33Uncertainty({
        averageFlowTime: "",
        viscometerConstant: 0.01,
        kinematicViscosity: "1,000",
        detectionLimitPercent: 0.2,
        repeatabilityLimitPercent: 0.11,
      }),
    ).toBeNull()

    expect(
      calculateGost33Uncertainty({
        averageFlowTime: 100,
        viscometerConstant: 0.01,
        kinematicViscosity: 0,
        detectionLimitPercent: 0.2,
        repeatabilityLimitPercent: 0.11,
      }),
    ).toBeNull()
  })
})
