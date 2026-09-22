import { calculateBaseNumberAverage } from "./calculateBaseNumberAverage"
import { calculateBaseNumberRepeatability } from "./calculateBaseNumberRepeatability"

type BaseNumberFormSlice = {
  baseNumberFirstValue: string
  baseNumberSecondValue: string
} & Record<string, string>

/** Resolves stored base-number table fields from live calculated values. */
export const resolveBaseNumberFieldValue = <T extends BaseNumberFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "baseNumberAverage") {
    return calculateBaseNumberAverage(formData.baseNumberFirstValue, formData.baseNumberSecondValue)
  }

  if (field === "baseNumberRepeatability") {
    return calculateBaseNumberRepeatability(formData.baseNumberFirstValue, formData.baseNumberSecondValue).value
  }

  return formData[field]
}
