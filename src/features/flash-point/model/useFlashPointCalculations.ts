import { useEffect } from "react"
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

  /** t₁ скорректированная: первое измерение + поправка на давление */
  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    firstMeasurementTemperature,
    correctionForTemperature,
  )
  /** t₂ скорректированная: второе измерение + поправка на давление */
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    secondMeasurementTemperature,
    correctionForTemperature,
  )
  /** Повторяемость r: |t₁ − t₂|; ошибка, если разница > 8 °C */
  const repeatability = calculateFlashPointRepeatability(
    firstCorrectedTemperature,
    secondCorrectedTemperature,
  )
  /** Среднее скорректированных температур: tср = round((t₁ + t₂) / 2) */
  const average = calculateFlashPointAverage(
    firstCorrectedTemperature,
    secondCorrectedTemperature,
  )

  /** Синхронизация среднего в store для UI, неопределённости и экспорта */
  useEffect(() => {
    useFlashPointStore.getState().setAverageCorrectedTemperature(average)
  }, [average])

  return {
    correction,
    firstCorrectedTemperature,
    secondCorrectedTemperature,
    repeatability,
  }
}
