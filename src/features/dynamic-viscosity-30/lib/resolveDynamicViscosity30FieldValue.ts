import { calculateDynamicViscosity30Average } from "./calculateDynamicViscosity30Average"
import { calculateDynamicViscosity30Repeatability } from "./calculateDynamicViscosity30Repeatability"

type DynamicViscosity30FormSlice = {
  dynamicViscosity30FirstEta1: string
  dynamicViscosity30SecondEta2: string
} & Record<string, string>

/** Resolves stored dynamic-viscosity-30 table fields from live calculated values. */
export const resolveDynamicViscosity30FieldValue = <T extends DynamicViscosity30FormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "dynamicViscosity30Average") {
    return calculateDynamicViscosity30Average(formData.dynamicViscosity30FirstEta1, formData.dynamicViscosity30SecondEta2)
  }

  if (field === "dynamicViscosity30Repeatability") {
    return calculateDynamicViscosity30Repeatability(
      formData.dynamicViscosity30FirstEta1,
      formData.dynamicViscosity30SecondEta2,
    ).value
  }

  return formData[field]
}
