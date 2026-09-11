import { parseNumber } from "./parseNumber"

export type ColorCntRepeatabilityResult = {
  value: string
  isError: boolean
}

const formatNumber = (value: number): string => value.toFixed(1).replace(".", ",")

/**
 * Повторяемость: |X₁ - X₂|.
 * Если разница ≤ 0,5 → числовое значение; иначе → «N > r=0,5 (Error)».
 */
export const calculateColorCntRepeatability = (
  x1Raw: string,
  x2Raw: string,
): ColorCntRepeatabilityResult => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(x1 - x2)

  if (difference <= 0.5) {
    return { value: formatNumber(difference), isError: false }
  }

  return {
    value: `${formatNumber(difference)} > r=0,5 (Error)`,
    isError: true,
  }
}
