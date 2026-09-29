import {
  calculateFlashPointAverage,
  calculateFlashPointCorrectedTemperature,
  calculateFlashPointCorrection,
  calculateFlashPointRepeatability,
} from "../lib"
import { useFlashPointStore } from "./flashPointStore"

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
  const average = calculateFlashPointAverage(
    firstCorrectedTemperature,
    secondCorrectedTemperature,
  )

  if (useFlashPointStore.getState().averageCorrectedTemperature !== average) {
    useFlashPointStore.getState().setAverageCorrectedTemperature(average)
  }

  return {
    correction,
    firstCorrectedTemperature,
    secondCorrectedTemperature,
    repeatability,
  }
}
