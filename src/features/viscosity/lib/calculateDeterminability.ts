import { normalizeNumber } from "./viscosty"

export type DeterminabilityResult = {
  value: string
  isError: boolean
}

const EMPTY_RESULT: DeterminabilityResult = {
  value: "",
  isError: false,
}

const formatToHundredths = (value: number) => value.toFixed(2).replace(".", ",")

export const calculateDeterminability = (
  firstTime: string,
  secondTime: string,
  average: string,
  formula: (value: number) => number,
): DeterminabilityResult => {
  const first = normalizeNumber(firstTime)
  const second = normalizeNumber(secondTime)
  const roundedAverage = normalizeNumber(average)

  if (!Number.isFinite(first) || !Number.isFinite(second) || !Number.isFinite(roundedAverage)) {
    return EMPTY_RESULT
  }

  const calculated = formula(roundedAverage)

  if (!Number.isFinite(calculated)) return EMPTY_RESULT

  const difference = Number(Math.abs(first - second).toFixed(2))
  const roundedCalculated = Number(calculated.toFixed(2))
  const isError = difference > roundedCalculated
  const formattedDifference = formatToHundredths(difference)

  return {
    value: isError
      ? `${formattedDifference} > d=${formatToHundredths(roundedCalculated)} (Error)`
      : formattedDifference,
    isError,
  }
}
