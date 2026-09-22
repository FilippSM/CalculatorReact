import { calculateFlashPointCorrectedTemperature } from "./calculateFlashPointCorrectedTemperature"
import { calculateFlashPointCorrection } from "./calculateFlashPointCorrection"
import { calculateFlashPointRepeatability } from "./calculateFlashPointRepeatability"

const pressureFields = new Set([
  "firstMeasurementPressure",
  "secondMeasurementPressure",
])

const correctionFields = new Set([
  "firstMeasurementCorrection",
  "secondMeasurementCorrection",
])

type FlashPointFormSlice = {
  pressure: string
  firstMeasurementTemperature: string
  secondMeasurementTemperature: string
} & Record<string, string>

/** Resolves stored flash-point table fields from live calculated values. */
export const resolveFlashPointFieldValue = <T extends FlashPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  const correction = calculateFlashPointCorrection(formData.pressure)
  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    formData.firstMeasurementTemperature,
    correction,
  )
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    formData.secondMeasurementTemperature,
    correction,
  )

  if (pressureFields.has(field)) {
    return formData.pressure
  }

  if (correctionFields.has(field)) {
    return correction
  }

  if (field === "firstMeasurementCorrectedTemperature") {
    return firstCorrectedTemperature
  }

  if (field === "secondMeasurementCorrectedTemperature") {
    return secondCorrectedTemperature
  }

  if (field === "repeatability") {
    return calculateFlashPointRepeatability(
      firstCorrectedTemperature,
      secondCorrectedTemperature,
    ).value
  }

  return formData[field]
}
