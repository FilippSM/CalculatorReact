import { normalizeNumber, roundToSignificantFigures, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS } from "./viscosty"

export const calculateRepeatability = (
  firstViscosity: string,
  secondViscosity: string,
  formula: (value: number) => number,
): string => {
  const first = normalizeNumber(firstViscosity)
  const second = normalizeNumber(secondViscosity)

  if (!Number.isFinite(first) || !Number.isFinite(second)) return ""

  const average = roundToSignificantFigures((first + second) / 2, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
  const result = formula(average)

  if (!Number.isFinite(result)) return ""

  return roundToSignificantFigures(result, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS).toString().replace(".", ",")
}
