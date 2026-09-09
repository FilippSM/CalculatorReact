import { parseNumber } from "./parseNumber"

export type NoackLossRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r, %:
 * r = 0.095 * sqrt(среднее значение)
 * Если |X₁ - X₂| > r → «разница > r=... (Error)»
 */
export const calculateNoackLossRepeatability = (
  x1Raw: string,
  x2Raw: string,
): NoackLossRepeatabilityResult => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) {
    return { value: "", isError: false }
  }

  const avg = (x1 + x2) / 2
  if (avg <= 0) {
    return { value: "", isError: false }
  }

  const limit = 0.095 * Math.sqrt(avg)
  const difference = Math.abs(x1 - x2)
  const formattedDifference = String(Math.round(difference * 100) / 100).replace(".", ",")
  const formattedLimit = String(Math.round(limit * 100) / 100).replace(".", ",")

  if (difference <= limit) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r=${formattedLimit} (Error)`,
    isError: true,
  }
}
