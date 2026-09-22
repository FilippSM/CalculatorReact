import { calculateColorCntAverage } from "./calculateColorCntAverage"
import { calculateColorCntRepeatability } from "./calculateColorCntRepeatability"

type ColorCntFormSlice = {
  colorCntFirstX1: string
  colorCntSecondX2: string
} & Record<string, string>

/** Resolves stored color-cnt table fields from live calculated values. */
export const resolveColorCntFieldValue = <T extends ColorCntFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "colorCntAverage") {
    return calculateColorCntAverage(formData.colorCntFirstX1, formData.colorCntSecondX2)
  }

  if (field === "colorCntRepeatability") {
    return calculateColorCntRepeatability(formData.colorCntFirstX1, formData.colorCntSecondX2).value
  }

  return formData[field]
}
