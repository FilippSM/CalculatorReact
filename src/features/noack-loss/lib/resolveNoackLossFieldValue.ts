import { calculateNoackLossEvaporation } from "./calculateNoackLossEvaporation"
import { calculateNoackLossAverage } from "./calculateNoackLossAverage"
import { calculateNoackLossRepeatability } from "./calculateNoackLossRepeatability"

type NoackLossFormSlice = {
  noackLossFirstCrucibleA: string
  noackLossFirstCrucibleB: string
  noackLossFirstCrucibleC: string
  noackLossSecondCrucibleA: string
  noackLossSecondCrucibleB: string
  noackLossSecondCrucibleC: string
} & Record<string, string>

/** Resolves stored noack-loss table fields from live calculated values. */
export const resolveNoackLossFieldValue = <T extends NoackLossFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  const firstEvaporation = calculateNoackLossEvaporation(
    formData.noackLossFirstCrucibleA,
    formData.noackLossFirstCrucibleB,
    formData.noackLossFirstCrucibleC,
  )
  const secondEvaporation = calculateNoackLossEvaporation(
    formData.noackLossSecondCrucibleA,
    formData.noackLossSecondCrucibleB,
    formData.noackLossSecondCrucibleC,
  )

  if (field === "noackLossFirstEvaporationLoss") return firstEvaporation
  if (field === "noackLossSecondEvaporationLoss") return secondEvaporation
  if (field === "noackLossAverage") {
    return calculateNoackLossAverage(firstEvaporation, secondEvaporation)
  }
  if (field === "noackLossRepeatability") {
    return calculateNoackLossRepeatability(firstEvaporation, secondEvaporation).value
  }

  return formData[field]
}
