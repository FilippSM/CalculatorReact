import { useAutoIgnitionStore } from "../model/autoIgnitionStore"
import { calculateAutoIgnitionRepeatability } from "./calculateAutoIgnitionRepeatability"

type AutoIgnitionFormSlice = {
  autoIgnitionFirstT1: string
  autoIgnitionSecondT2: string
} & Record<string, string>

/** Resolves stored auto-ignition table fields from live calculated values. */
export const resolveAutoIgnitionFieldValue = <T extends AutoIgnitionFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "autoIgnitionAverage") {
    return useAutoIgnitionStore.getState().average
  }

  if (field === "autoIgnitionRepeatability") {
    return calculateAutoIgnitionRepeatability(formData.autoIgnitionFirstT1, formData.autoIgnitionSecondT2)
      .value
  }

  return formData[field]
}
