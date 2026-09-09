import { parseNumber } from "./parseNumber"

/**
 * Среднее значение Xср, % = (X₁ + X₂) / 2
 * Округление до 1 знака после запятой.
 */
export const calculateNoackLossAverage = (x1Raw: string, x2Raw: string): string => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) return ""

  const avg = (x1 + x2) / 2
  return String(Math.round(avg * 10) / 10).replace(".", ",")
}
