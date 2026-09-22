import { parseNumber } from "./parseNumber"

const formatNumber = (value: number): string => value.toFixed(1).replace(".", ",")

/** Среднее значение Xср = большее из X₁ и X₂ */
export const calculateColorCntAverage = (x1Raw: string, x2Raw: string): string => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) return ""

  return formatNumber(Math.max(x1, x2))
}
