import { parseNumber } from "./parseNumber"

/** Среднее значение tср = round((t₁ + t₂) / 2) до целого */
export const calculateFreezingPointAverage = (t1Raw: string, t2Raw: string): string => {
  const t1 = parseNumber(t1Raw)
  const t2 = parseNumber(t2Raw)

  if (t1 === null || t2 === null) return ""

  return String(Math.round((t1 + t2) / 2))
}
