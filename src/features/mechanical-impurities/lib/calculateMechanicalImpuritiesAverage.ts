import { formatToSignificantDigits, parseNumber } from "./formatSignificantDigits"

/** Окончательный результат Xср — на 2 значащие цифры меньше, чем параллели (2). */
export const MECHANICAL_IMPURITIES_AVERAGE_SIGNIFICANT_DIGITS = 2

/** Среднее значение Xср = (X₁ + X₂) / 2 */
export const calculateMechanicalImpuritiesAverage = (x1Raw: string, x2Raw: string): string => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) return ""

  return formatToSignificantDigits(
    (x1 + x2) / 2,
    MECHANICAL_IMPURITIES_AVERAGE_SIGNIFICANT_DIGITS,
  )
}
