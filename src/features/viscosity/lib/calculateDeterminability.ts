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

/**
 * Фактическая определяемость в %:
 *   |t₁ − t₂| / tср · 100
 * Ошибка, если абсолютная разность больше предела d(tср) из прецизионности.
 */
export const calculateDeterminability = (
  firstTime: string,
  secondTime: string,
  average: string,
  formula: (value: number) => number,
): DeterminabilityResult => {
  const first = normalizeNumber(firstTime)
  const second = normalizeNumber(secondTime)
  const roundedAverage = normalizeNumber(average)

  if (
    !Number.isFinite(first) ||
    !Number.isFinite(second) ||
    !Number.isFinite(roundedAverage) ||
    roundedAverage === 0
  ) {
    return EMPTY_RESULT
  }

  const limitAbsolute = formula(roundedAverage)

  if (!Number.isFinite(limitAbsolute)) return EMPTY_RESULT

  const differenceAbsolute = Math.abs(first - second)
  const differencePercent = Number(((differenceAbsolute / roundedAverage) * 100).toFixed(2))
  const limitPercent = Number(((limitAbsolute / roundedAverage) * 100).toFixed(2))
  const isError = differenceAbsolute > limitAbsolute
  const formattedDifference = formatToHundredths(differencePercent)

  return {
    value: isError
      ? `${formattedDifference} > d=${formatToHundredths(limitPercent)} (Error)`
      : formattedDifference,
    isError,
  }
}
