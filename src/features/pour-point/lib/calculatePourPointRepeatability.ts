import { parseNumber } from "./parseNumber"

export const POUR_POINT_REPEATABILITY_LIMIT = 6

export type PourPointRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r по модулю разности измерений.
 * |Δt| ≤ 6 → разница; |Δt| > 6 → «N > r=6 (Error)».
 */
export const calculatePourPointRepeatability = (
  t1Raw: string,
  t2Raw: string,
): PourPointRepeatabilityResult => {
  const t1 = parseNumber(t1Raw)
  const t2 = parseNumber(t2Raw)

  if (t1 === null || t2 === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(t1 - t2)
  const formattedDifference = String(difference).replace(".", ",")

  if (difference <= POUR_POINT_REPEATABILITY_LIMIT) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r=${POUR_POINT_REPEATABILITY_LIMIT} (Error)`,
    isError: true,
  }
}
