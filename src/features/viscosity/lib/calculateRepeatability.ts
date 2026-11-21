import { normalizeNumber, roundToSignificantFigures, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS } from "./viscosty"

const formatToDecimalPlaces = (value: number, decimalPlaces: number) =>
  value.toFixed(decimalPlaces).replace(".", ",")

const formatToHundredths = (value: number) => formatToDecimalPlaces(value, 2)

export const calculateViscosityAverage = (firstViscosity: string, secondViscosity: string): string => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)

  if (!Number.isFinite(first) || !Number.isFinite(second)) return ""

  const average = roundToSignificantFigures((first + second) / 2, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  const decimalPlaces = Math.max(
    0,
    VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS - 1 - Math.floor(Math.log10(Math.abs(average))),
  )

  return formatToDecimalPlaces(average, decimalPlaces)
}

export type RepeatabilityResult = {
  value: string
  isError: boolean
}

const EMPTY_RESULT: RepeatabilityResult = {
  value: "",
  isError: false,
}

/**
 * Фактическая повторяемость в %:
 *   |ν₁ − ν₂| / νср · 100
 * Ошибка, если абсолютная разность больше предела r(νср) из прецизионности.
 */
export const calculateRepeatability = (
  firstViscosity: string,
  secondViscosity: string,
  averageValue: string,
  formula: (value: number) => number,
): RepeatabilityResult => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)
  const average = normalizeNumber(averageValue)

  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(average) || average === 0) {
    return EMPTY_RESULT
  }

  const limitAbsolute = formula(average)

  if (!Number.isFinite(limitAbsolute)) return EMPTY_RESULT

  const differenceAbsolute = Math.abs(first - second)
  const differencePercent = Number(((differenceAbsolute / average) * 100).toFixed(2))
  const limitPercent = Number(((limitAbsolute / average) * 100).toFixed(2))
  const isError = differenceAbsolute > limitAbsolute
  const formattedDifference = formatToHundredths(differencePercent)

  return {
    value: isError
      ? `${formattedDifference} > r=${formatToHundredths(limitPercent)} (Error)`
      : formattedDifference,
    isError,
  }
}
