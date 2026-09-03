import { normalizeNumber, roundToSignificantFigures, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS } from "./viscosty"

const getDecimalPlaces = (value: string) => {
  const [, fraction = ""] = value.replace(",", ".").split(".")
  return fraction.length
}

const formatToDecimalPlaces = (value: number, decimalPlaces: number) => value.toFixed(decimalPlaces).replace(".", ",")

export const calculateViscosityAverage = (firstViscosity: string, secondViscosity: string): string => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)

  if (!Number.isFinite(first) || !Number.isFinite(second)) return ""

  const average = roundToSignificantFigures((first + second) / 2, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  const decimalPlaces = Math.max(0, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS - 1 - Math.floor(Math.log10(Math.abs(average))))

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

export const calculateRepeatability = (
  firstViscosity: string,
  secondViscosity: string,
  averageValue: string,
  formula: (value: number) => number,
): RepeatabilityResult => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)
  const average = normalizeNumber(averageValue)

  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(average)) {
    return EMPTY_RESULT
  }

  const calculated = formula(average)

  if (!Number.isFinite(calculated)) return EMPTY_RESULT

  const decimalPlaces = getDecimalPlaces(averageValue)
  const difference = Number(Math.abs(first - second).toFixed(decimalPlaces))
  const roundedCalculated = Number(calculated.toFixed(decimalPlaces))
  const isError = difference > roundedCalculated
  const formattedDifference = formatToDecimalPlaces(difference, decimalPlaces)

  return {
    value: isError
      ? `${formattedDifference} > r=${formatToDecimalPlaces(roundedCalculated, decimalPlaces)} (Error)`
      : formattedDifference,
    isError,
  }
}
