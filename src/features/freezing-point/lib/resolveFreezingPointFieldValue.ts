import { calculateFreezingPointAverage } from "./calculateFreezingPointAverage"
import { calculateFreezingPointRepeatability } from "./calculateFreezingPointRepeatability"

type FreezingPointFormSlice = {
  freezingPointFirstT1: string
  freezingPointSecondT2: string
} & Record<string, string>

/** Resolves stored freezing-point table fields from live calculated values. */
export const resolveFreezingPointFieldValue = <T extends FreezingPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "freezingPointAverage") {
    return calculateFreezingPointAverage(formData.freezingPointFirstT1, formData.freezingPointSecondT2)
  }

  if (field === "freezingPointRepeatability") {
    return calculateFreezingPointRepeatability(
      formData.freezingPointFirstT1,
      formData.freezingPointSecondT2,
    ).value
  }

  return formData[field]
}
