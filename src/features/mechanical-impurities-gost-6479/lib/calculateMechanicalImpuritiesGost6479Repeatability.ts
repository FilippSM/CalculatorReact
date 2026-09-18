import { formatToSignificantDigits, parseNumber } from "@/features/mechanical-impurities/lib"

export type MechanicalImpuritiesGost6479RepeatabilityResult = {
  value: string
  isError: boolean
}

/** Норма повторяемости r по ГОСТ 6479 фиксированная: 0,0025. */
export const MECHANICAL_IMPURITIES_GOST6479_REPEATABILITY_LIMIT = 0.0025

const REPEATABILITY_SIGNIFICANT_DIGITS = 2

/** Убирает незначащие нули в конце дробной части: 0,0020 -> 0,002. */
const stripTrailingZeros = (value: string): string => {
  if (!value.includes(",")) return value

  const stripped = value.replace(/0+$/u, "").replace(/,$/u, "")

  return stripped === "" || stripped === "-" ? "0" : stripped
}

const formatLimit = () =>
  stripTrailingZeros(
    formatToSignificantDigits(MECHANICAL_IMPURITIES_GOST6479_REPEATABILITY_LIMIT, 4),
  )

/**
 * Повторяемость по ГОСТ 6479: |X₁ − X₂|, округлённая до 2 значащих цифр.
 * Если модуль разности > r = 0,0025 → «разность > r=0,0025 (Error)»,
 * иначе выводится только значение разности.
 */
export const calculateMechanicalImpuritiesGost6479Repeatability = (
  x1Raw: string,
  x2Raw: string,
): MechanicalImpuritiesGost6479RepeatabilityResult => {
  const x1 = parseNumber(x1Raw)
  const x2 = parseNumber(x2Raw)

  if (x1 === null || x2 === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(x1 - x2)
  const formattedDifference = stripTrailingZeros(
    formatToSignificantDigits(difference, REPEATABILITY_SIGNIFICANT_DIGITS),
  )

  if (difference > MECHANICAL_IMPURITIES_GOST6479_REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=${formatLimit()} (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}
