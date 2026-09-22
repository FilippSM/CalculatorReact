import { calculateMechanicalImpuritiesAverage } from "./calculateMechanicalImpuritiesAverage"
import { calculateMechanicalImpuritiesContent } from "./calculateMechanicalImpuritiesContent"
import { calculateMechanicalImpuritiesRepeatability } from "./calculateMechanicalImpuritiesRepeatability"

type MechanicalImpuritiesFormSlice = {
  mechanicalImpuritiesFirstM1: string
  mechanicalImpuritiesFirstM2: string
  mechanicalImpuritiesFirstM3: string
  mechanicalImpuritiesSecondM1: string
  mechanicalImpuritiesSecondM2: string
  mechanicalImpuritiesSecondM3: string
} & Record<string, string>

/** Resolves stored mechanical-impurities table fields from live calculated values. */
export const resolveMechanicalImpuritiesFieldValue = <T extends MechanicalImpuritiesFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  const firstX1 = calculateMechanicalImpuritiesContent(
    formData.mechanicalImpuritiesFirstM1,
    formData.mechanicalImpuritiesFirstM2,
    formData.mechanicalImpuritiesFirstM3,
  )
  const secondX2 = calculateMechanicalImpuritiesContent(
    formData.mechanicalImpuritiesSecondM1,
    formData.mechanicalImpuritiesSecondM2,
    formData.mechanicalImpuritiesSecondM3,
  )
  const average = calculateMechanicalImpuritiesAverage(firstX1, secondX2)

  if (field === "mechanicalImpuritiesFirstX1") {
    return firstX1
  }

  if (field === "mechanicalImpuritiesSecondX2") {
    return secondX2
  }

  if (field === "mechanicalImpuritiesAverage") {
    return average
  }

  if (field === "mechanicalImpuritiesRepeatability") {
    return calculateMechanicalImpuritiesRepeatability(firstX1, secondX2, average).value
  }

  return formData[field]
}
