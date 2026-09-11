import { parseNumber } from "./parseNumber"

/** Среднее значение tср = (t₁ + t₂) / 2, округлённое до целого */
export const calculateAutoIgnitionAverage = (firstRaw: string, secondRaw: string): string => {
  const first = parseNumber(firstRaw)
  const second = parseNumber(secondRaw)

  if (first === null || second === null) return ""

  return String(Math.round((first + second) / 2))
}
