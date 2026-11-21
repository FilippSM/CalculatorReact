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
    expect(result?.ExpandedUncertainty).toBe(0.005)
  })

  test("rounds expanded uncertainty to the decimal places of the mean", () => {
    const resultNearSeven = calculateGost33Uncertainty({
      averageFlowTime: "239,65",
      viscometerConstant: "0,030584",
      kinematicViscosity: "7,333",
      detectionLimitPercent: 0.13,
      repeatabilityLimitPercent: 0.26,
      testTemperature: 100,
    })

    expect(resultNearSeven?.ExpandedUncertainty).toBe(0.03)

    const resultNearEleven = calculateGost33Uncertainty({
      averageFlowTime: 100,
      viscometerConstant: 0.01,
      kinematicViscosity: "10,88",
      detectionLimitPercent: 0.2,
      repeatabilityLimitPercent: 0.11,
    })

    expect(resultNearEleven?.ExpandedUncertainty).toBe(0.04)
  })

  test("calculates expanded uncertainty for 40 °C with zero sampling uncertainty", () => {
    const result = calculateGost33Uncertainty({
      averageFlowTime: "327,91",
      viscometerConstant: "0,112311",
      kinematicViscosity: "36,83",
      detectionLimitPercent: 0.13,
      repeatabilityLimitPercent: 0.26,
      testTemperature: 40,
      samplingStandardUncertainty: 0,
    })

    expect(result?.SamplingStandardUncertainty).toBe(0)
    expect(result?.ExpandedUncertainty).toBe(0.15)
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
