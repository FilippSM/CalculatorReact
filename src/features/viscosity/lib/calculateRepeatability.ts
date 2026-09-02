import { normalizeNumber, roundToSignificantFigures, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS } from "./viscosty"

export const calculateViscosityAverage = (firstViscosity: string, secondViscosity: string): string => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)

  if (!Number.isFinite(first) || !Number.isFinite(second)) return ""

  const average = roundToSignificantFigures((first + second) / 2, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  return average.toString().replace(".", ",")
}

export type RepeatabilityResult = {
  value: string
  isError: boolean
}

const EMPTY_RESULT: RepeatabilityResult = {
  value: "",
  isError: false,
}

const formatToSignificantDigits = (value: number) =>
  roundToSignificantFigures(value, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS).toString().replace(".", ",")

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

  const difference = roundToSignificantFigures(Math.abs(first - second), VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  const roundedCalculated = roundToSignificantFigures(calculated, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  const isError = difference > roundedCalculated
  const formattedDifference = formatToSignificantDigits(difference)

  return {
    value: isError
      ? `${formattedDifference} > r=${formatToSignificantDigits(roundedCalculated)} (Error)`
      : formattedDifference,
    isError,
  }
}
