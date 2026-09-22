import { DENSITY_AT20_UNIT } from "./calculateDensity"
import { formatDensityValue } from "./formatDensityValue"

/** ГОСТ 3900-2022, табл. 2 — повторяемость r для прозрачных продуктов, кг/м³ */
export const DENSITY_AT20_REPEATABILITY_LIMIT = 0.5

export type DensityRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r по модулю разности скорректированных плотностей при 20 °C.
 * |Δρ| ≤ r → разница; |Δρ| > r → «N > r (Error)».
 */
export const calculateDensityRepeatability = (
  firstCorrected: number | null,
  secondCorrected: number | null,
): DensityRepeatabilityResult => {
  if (firstCorrected === null || secondCorrected === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(firstCorrected - secondCorrected)
  const formattedDifference = formatDensityValue(difference, DENSITY_AT20_UNIT)

  if (difference <= DENSITY_AT20_REPEATABILITY_LIMIT) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r (Error)`,
    isError: true,
  }
}
