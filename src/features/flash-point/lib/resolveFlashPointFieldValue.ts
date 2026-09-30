import { useFlashPointStore } from "../model/flashPointStore"
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
  flashPointEquipmentDevice?: string
} & Record<string, string>

const isAutomaticDevice = (equipmentDevice: string | undefined): boolean =>
  Boolean(equipmentDevice?.includes("Автоматический"))

/** Resolves stored flash-point table fields from live calculated values. */
export const resolveFlashPointFieldValue = <T extends FlashPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  const isAutomatic = isAutomaticDevice(formData.flashPointEquipmentDevice)
  const calculatedCorrection = calculateFlashPointCorrection(formData.pressure)
  const correction = isAutomatic ? "-" : calculatedCorrection
  const correctionForTemperature = isAutomatic ? "0" : calculatedCorrection

  const firstCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    formData.firstMeasurementTemperature,
    correctionForTemperature,
  )
  const secondCorrectedTemperature = calculateFlashPointCorrectedTemperature(
    formData.secondMeasurementTemperature,
    correctionForTemperature,
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

  if (field === "averageCorrectedTemperature") {
    return useFlashPointStore.getState().averageCorrectedTemperature
  }

  return formData[field]
}
