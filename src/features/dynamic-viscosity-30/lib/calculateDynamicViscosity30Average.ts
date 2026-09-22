import { parseNumber } from "./parseNumber"

/** Среднее значение ηср = round((η₁ + η₂) / 2) до целого */
export const calculateDynamicViscosity30Average = (eta1Raw: string, eta2Raw: string): string => {
  const eta1 = parseNumber(eta1Raw)
  const eta2 = parseNumber(eta2Raw)

  if (eta1 === null || eta2 === null) return ""

  return String(Math.round((eta1 + eta2) / 2))
}
