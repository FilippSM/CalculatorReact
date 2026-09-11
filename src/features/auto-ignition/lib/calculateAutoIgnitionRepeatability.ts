import { parseNumber } from "./parseNumber"

export type AutoIgnitionRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r: |t₁ - t₂|, округлённое до целого.
 * Предел: среднее * 0,02.
 * Если разница > предела → «N > r=limit (Error)»; иначе → разница.
 */
export const calculateAutoIgnitionRepeatability = (
  firstRaw: string,
  secondRaw: string,
): AutoIgnitionRepeatabilityResult => {
  const first = parseNumber(firstRaw)
  const second = parseNumber(secondRaw)

  if (first === null || second === null) {
    return { value: "", isError: false }
  }

  const average = (first + second) / 2
  const difference = Math.abs(first - second)
  const limit = average * 0.02

  if (difference <= limit) {
    return { value: String(Math.round(difference)), isError: false }
  }

  return {
    value: `${Math.round(difference)} > r=${Math.round(limit)} (Error)`,
    isError: true,
  }
}
