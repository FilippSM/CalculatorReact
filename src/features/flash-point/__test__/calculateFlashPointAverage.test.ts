import { describe, expect, test } from "vitest"
import { calculateFlashPointAverage } from "../lib/calculateFlashPointAverage"
import { calculateFlashPointCorrectedTemperature } from "../lib/calculateFlashPointCorrectedTemperature"
import { calculateFlashPointCorrection } from "../lib/calculateFlashPointCorrection"

type FlashPointDeviceType = "manual" | "automatic"

type FlashPointAverageInput = {
  pressure: string
  firstMeasurementTemperature: string
  secondMeasurementTemperature: string
  device: FlashPointDeviceType
}

/** Полный цикл как в useFlashPointCalculations: поправка → t₁/t₂ → среднее. */
const calculateFlashPointAverageFromInputs = ({
  pressure,
  firstMeasurementTemperature,
  secondMeasurementTemperature,
  device,
}: FlashPointAverageInput): string => {
  const calculatedCorrection = calculateFlashPointCorrection(pressure)
  const correctionForTemperature = device === "automatic" ? "0" : calculatedCorrection

  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    firstMeasurementTemperature,
    correctionForTemperature,
  )
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    secondMeasurementTemperature,
    correctionForTemperature,
  )

  return calculateFlashPointAverage(
    firstCorrectedTemperature,
    secondCorrectedTemperature,
  )
}

describe("calculateFlashPointAverage", () => {
  /** Считает среднее двух скорректированных температур. */
  test("calculates average of two corrected temperatures", () => {
    expect(calculateFlashPointAverage("120", "124")).toBe("122")
  })

  /** Полный цикл: pressure 99.5, manual*/
  test("calculates average for manual at 99.5", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.5",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      device: "manual",
    })

    expect(result).toBe("122")
  })

  /** Полный цикл: pressure 99.5, manual*/
  test("calculates average for manual at 99.5", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.5",
      firstMeasurementTemperature: "250",
      secondMeasurementTemperature: "254",
      device: "manual",
    })

    expect(result).toBe("252")
  })

  /** Полный цикл: pressure 99.2, manual*/
  test("calculates average for manual at 99.2", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.2",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      device: "manual",
    })

    expect(result).toBe("123")
  })

  /** Полный цикл: pressure 99.2, manual*/
  test("calculates average for manual at 99.2", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.2",
      firstMeasurementTemperature: "250",
      secondMeasurementTemperature: "254",
      device: "manual",
    })

    expect(result).toBe("253")
  })

  /** Полный цикл: pressure 99.5, automatic*/
  test("calculates average for automatic at 99.5", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.5",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      device: "automatic",
    })

    expect(result).toBe("122")
  })

  /** Полный цикл: pressure 99.5, automatic*/
  test("calculates average for automatic at 99.5", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.5",
      firstMeasurementTemperature: "250",
      secondMeasurementTemperature: "254",
      device: "automatic",
    })

    expect(result).toBe("252")
  })

  /** Полный цикл: pressure 99.2, automatic*/
  test("calculates average for automatic at 99.2", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.2",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      device: "automatic",
    })

    expect(result).toBe("122")
  })

  /** Полный цикл: pressure 99.2, automatic*/
  test("calculates average for automatic at 99.2", () => {
    const result = calculateFlashPointAverageFromInputs({
      pressure: "99.2",
      firstMeasurementTemperature: "250",
      secondMeasurementTemperature: "254",
      device: "automatic",
    })

    expect(result).toBe("252")
  })
})
