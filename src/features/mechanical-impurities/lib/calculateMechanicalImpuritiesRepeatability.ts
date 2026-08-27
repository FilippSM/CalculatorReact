import { formatToSignificantDigits, parseNumber } from "./formatSignificantDigits"

export type MechanicalImpuritiesRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Норма повторяемости r по среднему Xср, %:
 * ≤ 0,01 → 0,0025
 * ≤ 0,1 → 0,005
 * ≤ 1,0 → 0,01
 * > 1,0 → 0,1
 */
export const getMechanicalImpuritiesRepeatabilityLimit = (average: number): number => {
  if (average <= 0.01) return 0.0025
  if (average <= 0.1) return 0.005
  if (average <= 1) return 0.01
  return 0.1
}

/**
 * Повторяемость: |X₁ − X₂|.
 * Если разница ≤ r (по среднему) → разница; иначе «N > r (Error)».
 */
export const calculateMechanicalImpuritiesRepeatability = (
  x1Raw: string,
  x2Raw: string,
  averageRaw: string,
): MechanicalImpuritiesRepeatabilityResult => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)
  const average = parseNumber(averageRaw)

  if (x1 === null || x2 === null || average === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(x1 - x2)
  const limit = getMechanicalImpuritiesRepeatabilityLimit(average)
  const formattedDifference = formatToSignificantDigits(difference, 4)

  if (difference <= limit) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r (Error)`,
    isError: true,
  }
}
