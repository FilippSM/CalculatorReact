import {
  calculateFlashPointAverage,
  calculateFlashPointCorrectedTemperature,
  calculateFlashPointCorrection,
  calculateFlashPointRepeatability,
} from "../lib"
import { useFlashPointStore } from "./flashPointStore"

type FlashPointDeviceType = "manual" | "automatic"

type FlashPointCalculationInput = {
  pressure: string
  firstMeasurementTemperature: string
  secondMeasurementTemperature: string
  device: FlashPointDeviceType
}

export const useFlashPointCalculations = ({
  pressure,
  firstMeasurementTemperature,
  secondMeasurementTemperature,
  device,
}: FlashPointCalculationInput) => {
  const calculatedCorrection = calculateFlashPointCorrection(pressure)
  const correction = device === "automatic" ? "-" : calculatedCorrection
  const correctionForTemperature = device === "automatic" ? "0" : calculatedCorrection

  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    firstMeasurementTemperature,
    correctionForTemperature,
  )
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    secondMeasurementTemperature,
    correctionForTemperature,
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
