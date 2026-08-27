import { useEffect } from "react"
import { calculateFlashPointCorrection } from "../lib"

type FlashPointCalculationFields = {
  pressure: string
  firstMeasurementPressure: string
  firstMeasurementCorrection: string
  secondMeasurementPressure: string
  secondMeasurementCorrection: string
}

type UpdateFlashPointField = (
  field: keyof FlashPointCalculationFields,
  value: string,
) => void

export const useFlashPointCalculations = (
  formData: FlashPointCalculationFields,
  updateTestData: UpdateFlashPointField,
) => {
  useEffect(() => {
    if (formData.firstMeasurementPressure !== formData.pressure) {
      updateTestData("firstMeasurementPressure", formData.pressure)
    }

    if (formData.secondMeasurementPressure !== formData.pressure) {
      updateTestData("secondMeasurementPressure", formData.pressure)
    }
    // Синхронизация только при изменении давления в метаданных
  }, [formData.pressure])

  useEffect(() => {
    const correction = calculateFlashPointCorrection(formData.pressure)

    if (correction !== formData.firstMeasurementCorrection) {
      updateTestData("firstMeasurementCorrection", correction)
    }

    if (correction !== formData.secondMeasurementCorrection) {
      updateTestData("secondMeasurementCorrection", correction)
    }
    // Пересчёт поправки только при изменении давления в метаданных
  }, [formData.pressure])
}
