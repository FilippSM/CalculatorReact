import { calculatePourPointAverage } from "./calculatePourPointAverage"
import { calculatePourPointRepeatability } from "./calculatePourPointRepeatability"

type PourPointFormSlice = {
  pourPointFirstT1: string
  pourPointSecondT2: string
} & Record<string, string>

/** Resolves stored pour-point table fields from live calculated values. */
export const resolvePourPointFieldValue = <T extends PourPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "pourPointAverage") {
    return calculatePourPointAverage(formData.pourPointFirstT1, formData.pourPointSecondT2)
  }

  if (field === "pourPointRepeatability") {
    return calculatePourPointRepeatability(
      formData.pourPointFirstT1,
      formData.pourPointSecondT2,
    ).value
  }

  return formData[field]
}
