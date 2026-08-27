import { calculateFlashPointCorrection } from "./calculateFlashPointCorrection"

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
} & Record<string, string>

/** Resolves stored flash-point table fields from live metadata pressure. */
export const resolveFlashPointFieldValue = <T extends FlashPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (pressureFields.has(field)) {
    return formData.pressure
  }

  if (correctionFields.has(field)) {
    return calculateFlashPointCorrection(formData.pressure)
  }

  return formData[field]
}
