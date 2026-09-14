import { parseNumber } from "./parseNumber"

export type BaseNumberRepeatabilityResult = {
  value: string
  isError: boolean
}

const formatNumber = (value: number): string => value.toFixed(2).replace(".", ",")

const getRepeatabilityLimit = (average: number): number => {
  if (average <= 0.05) return 0.02
  if (average < 1.0) return 0.05
  if (average < 5.0) return 0.1
  if (average < 20.0) return 0.5
  if (average < 100.0) return 2.0
  return 5.0
}

/**
 * Повторяемость r: |X₁ - X₂|.
 * Предел зависит от среднего значения:
 *   ≤ 0,05 → 0,02 | 0,05–1,0 → 0,05 | 1,0–5,0 → 0,1
 *   5,0–20,0 → 0,5 | 20,0–100,0 → 2,0 | ≥ 100,0 → 5,0
 */
export const calculateBaseNumberRepeatability = (
  firstRaw: string,
  secondRaw: string,
): BaseNumberRepeatabilityResult => {
  const first = parseNumber(firstRaw)
  const second = parseNumber(secondRaw)

  if (first === null || second === null) {
    return { value: "", isError: false }
  }

  const average = (first + second) / 2
  const difference = Math.abs(first - second)
  const limit = getRepeatabilityLimit(average)

  if (difference <= limit) {
    return { value: formatNumber(difference), isError: false }
  }

  return {
    value: `${formatNumber(difference)} > r=${formatNumber(limit)} (Error)`,
    isError: true,
  }
}
