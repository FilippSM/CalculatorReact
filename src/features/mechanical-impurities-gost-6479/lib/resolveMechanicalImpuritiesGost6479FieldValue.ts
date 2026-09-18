import {
  calculateMechanicalImpuritiesAverage,
  calculateMechanicalImpuritiesContent,
} from "@/features/mechanical-impurities"
import { calculateMechanicalImpuritiesGost6479Repeatability } from "./calculateMechanicalImpuritiesGost6479Repeatability"

type MechanicalImpuritiesGost6479FormSlice = {
  mechanicalImpuritiesGost6479FirstM1: string
  mechanicalImpuritiesGost6479FirstM2: string
  mechanicalImpuritiesGost6479FirstM3: string
  mechanicalImpuritiesGost6479SecondM1: string
  mechanicalImpuritiesGost6479SecondM2: string
  mechanicalImpuritiesGost6479SecondM3: string
} & Record<string, string>

/** Resolves stored mechanical-impurities (GOST 6479) table fields from live calculated values. */
export const resolveMechanicalImpuritiesGost6479FieldValue = <
  T extends MechanicalImpuritiesGost6479FormSlice,
>(
  formData: T,
  field: keyof T & string,
): string => {
  const firstX1 = calculateMechanicalImpuritiesContent(
    formData.mechanicalImpuritiesGost6479FirstM1,
    formData.mechanicalImpuritiesGost6479FirstM2,
    formData.mechanicalImpuritiesGost6479FirstM3,
  )
  const secondX2 = calculateMechanicalImpuritiesContent(
    formData.mechanicalImpuritiesGost6479SecondM1,
    formData.mechanicalImpuritiesGost6479SecondM2,
    formData.mechanicalImpuritiesGost6479SecondM3,
  )
  const average = calculateMechanicalImpuritiesAverage(firstX1, secondX2)

  if (field === "mechanicalImpuritiesGost6479FirstX1") {
    return firstX1
  }

  if (field === "mechanicalImpuritiesGost6479SecondX2") {
    return secondX2
  }

  if (field === "mechanicalImpuritiesGost6479Average") {
    return average
  }

  if (field === "mechanicalImpuritiesGost6479Repeatability") {
    return calculateMechanicalImpuritiesGost6479Repeatability(firstX1, secondX2).value
  }

  return formData[field]
}
