import { parseNumber } from "./parseNumber"

export type BaseNumberRepeatabilityResult = {
  value: string
  isError: boolean
}

const formatNumber = (value: number): string => value.toFixed(2).replace(".", ",")

/**
 * Повторяемость r: |X₁ - X₂|.
 * Предел: среднее * 0,02.
 * Если разница > предела → «N > r=limit (Error)»; иначе → разница.
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
  const limit = average * 0.02

  if (difference <= limit) {
    return { value: formatNumber(difference), isError: false }
  }

  return {
    value: `${formatNumber(difference)} > r=${formatNumber(limit)} (Error)`,
    isError: true,
  }
}
