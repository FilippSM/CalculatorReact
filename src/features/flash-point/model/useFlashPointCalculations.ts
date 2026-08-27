import {
  calculateFlashPointCorrectedTemperature,
  calculateFlashPointCorrection,
  calculateFlashPointRepeatability,
} from "../lib"

type FlashPointCalculationInput = {
  pressure: string
  firstMeasurementTemperature: string
  secondMeasurementTemperature: string
}

export const useFlashPointCalculations = ({
  pressure,
  firstMeasurementTemperature,
  secondMeasurementTemperature,
}: FlashPointCalculationInput) => {
  const correction = calculateFlashPointCorrection(pressure)
  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    firstMeasurementTemperature,
    correction,
  )
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    secondMeasurementTemperature,
    correction,
  )
  const repeatability = calculateFlashPointRepeatability(
    firstCorrectedTemperature,
    secondCorrectedTemperature,
  )

  return {
    correction,
    firstCorrectedTemperature,
    secondCorrectedTemperature,
    repeatability,
  }
}
