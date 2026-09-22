import { formatDensityValue } from "./formatDensityValue"

/** Среднее значение ρср = (ρ₁ + ρ₂) / 2 */
export const calculateDensityAverage = (
  firstCorrected: number | null,
  secondCorrected: number | null,
  unit: string,
): string => {
  if (firstCorrected === null || secondCorrected === null) return ""

  return formatDensityValue((firstCorrected + secondCorrected) / 2, unit)
}
