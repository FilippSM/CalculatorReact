import { normalizeNumber } from "./viscosty"

export const calculateDeterminability = (average: string, formula: (value: number) => number): string => {
  const roundedAverage = normalizeNumber(average)

  if (!Number.isFinite(roundedAverage)) return ""

  const result = formula(roundedAverage)
  return Number.isFinite(result) ? result.toFixed(2).replace(".", ",") : ""
}
