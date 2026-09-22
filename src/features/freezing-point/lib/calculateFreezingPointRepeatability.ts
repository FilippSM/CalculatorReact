import { parseNumber } from "./parseNumber"

export const FREEZING_POINT_REPEATABILITY_LIMIT = 2

export type FreezingPointRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r по модулю разности измерений.
 * |Δt| ≤ 2 → разница; |Δt| > 2 → «N > r=2 (Error)».
 */
export const calculateFreezingPointRepeatability = (
  t1Raw: string,
  t2Raw: string,
): FreezingPointRepeatabilityResult => {
  const t1 = parseNumber(t1Raw)
  const t2 = parseNumber(t2Raw)

  if (t1 === null || t2 === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(t1 - t2)
  const formattedDifference = String(difference).replace(".", ",")

  if (difference <= FREEZING_POINT_REPEATABILITY_LIMIT) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r=${FREEZING_POINT_REPEATABILITY_LIMIT} (Error)`,
    isError: true,
  }
}
