import { formatToSignificantDigits, parseNumber } from "./formatSignificantDigits"

/** Параллели X₁/X₂ округляются на 2 значащие цифры больше, чем среднее (4). */
export const MECHANICAL_IMPURITIES_PARALLEL_SIGNIFICANT_DIGITS = 4

/**
 * Содержание мех. примесей X, % по ГОСТ 6370:
 * X = (m₁ − m₂) / m₃ × 100
 */
export const calculateMechanicalImpuritiesContent = (
  m1Raw: string,
  m2Raw: string,
  m3Raw: string,
): string => {
  const m1 = parseNumber(m1Raw)
  const m2 = parseNumber(m2Raw)
  const m3 = parseNumber(m3Raw)

  if (m1 === null || m2 === null || m3 === null || m3 === 0) return ""

  return formatToSignificantDigits(
    ((m1 - m2) / m3) * 100,
    MECHANICAL_IMPURITIES_PARALLEL_SIGNIFICANT_DIGITS,
  )
}
