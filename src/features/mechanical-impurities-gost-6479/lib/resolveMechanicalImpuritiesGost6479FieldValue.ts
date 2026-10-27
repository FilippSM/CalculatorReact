import { useMechanicalImpuritiesGost6479Store } from "../model/mechanicalImpuritiesGost6479Store"

type MechanicalImpuritiesGost6479FormSlice = Record<string, string>

/** Resolves stored mechanical-impurities (GOST 6479) table fields from the Zustand store. */
export const resolveMechanicalImpuritiesGost6479FieldValue = <
  T extends MechanicalImpuritiesGost6479FormSlice,
>(
  formData: T,
  field: keyof T & string,
): string => {
  const store = useMechanicalImpuritiesGost6479Store.getState()

  if (field === "mechanicalImpuritiesGost6479FirstX1") {
    return store.firstX1
  }

  if (field === "mechanicalImpuritiesGost6479SecondX2") {
    return store.secondX2
  }

  if (field === "mechanicalImpuritiesGost6479Average") {
    return store.average
  }

  if (field === "mechanicalImpuritiesGost6479Repeatability") {
    return store.repeatabilityValue
  }

  return formData[field]
}
