import { parseNumber } from "./parseNumber"

const formatNumber = (value: number): string => value.toFixed(1).replace(".", ",")

/** Среднее значение X = (X₁ + X₂) / 2, округлённое до 1 знака */
export const calculateBaseNumberAverage = (firstRaw: string, secondRaw: string): string => {
  const first = parseNumber(firstRaw)
  const second = parseNumber(secondRaw)

  if (first === null || second === null) return ""

  return formatNumber((first + second) / 2)
}
