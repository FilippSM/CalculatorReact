import {
  calculateDensity,
  DENSITY_AT20_CORRECTION,
  DENSITY_AT20_UNIT,
  DENSITY_NO_CORRECTION,
} from "./calculateDensity"
import { calculateDensityAverage } from "./calculateDensityAverage"
import { calculateDensityRepeatability } from "./calculateDensityRepeatability"
import { formatDensityValue } from "./formatDensityValue"

type DensityAt20FormSlice = {
  densityAt20FirstRho: string
  densityAt20FirstT: string
  densityAt20SecondRho: string
  densityAt20SecondT: string
} & Record<string, string>

const formatDensityAt20 = (density: string, temperature: string, correction: string): string => {
  const result = calculateDensity(density, temperature, DENSITY_AT20_UNIT, correction)

  if (result === null) return ""

  return formatDensityValue(result, DENSITY_AT20_UNIT)
}

/** Resolves stored density-at-20 table fields from live calculated values. */
export const resolveDensityAt20FieldValue = <T extends DensityAt20FormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  const firstCorrected = calculateDensity(
    formData.densityAt20FirstRho,
    formData.densityAt20FirstT,
    DENSITY_AT20_UNIT,
    DENSITY_AT20_CORRECTION,
  )
  const secondCorrected = calculateDensity(
    formData.densityAt20SecondRho,
    formData.densityAt20SecondT,
    DENSITY_AT20_UNIT,
    DENSITY_AT20_CORRECTION,
  )

  if (field === "densityAt20FirstRhoAt20") {
    return formatDensityAt20(formData.densityAt20FirstRho, formData.densityAt20FirstT, DENSITY_NO_CORRECTION)
  }

  if (field === "densityAt20SecondRhoAt20") {
    return formatDensityAt20(formData.densityAt20SecondRho, formData.densityAt20SecondT, DENSITY_NO_CORRECTION)
  }

  if (field === "densityAt20FirstRhoAt20Corrected") {
    return formatDensityAt20(formData.densityAt20FirstRho, formData.densityAt20FirstT, DENSITY_AT20_CORRECTION)
  }

  if (field === "densityAt20SecondRhoAt20Corrected") {
    return formatDensityAt20(formData.densityAt20SecondRho, formData.densityAt20SecondT, DENSITY_AT20_CORRECTION)
  }

  if (field === "densityAt20Average") {
    return calculateDensityAverage(firstCorrected, secondCorrected, DENSITY_AT20_UNIT)
  }

  if (field === "densityAt20Repeatability") {
    return calculateDensityRepeatability(firstCorrected, secondCorrected).value
  }

  return formData[field]
}
