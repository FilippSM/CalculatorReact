import { parseNumber } from "./parseNumber"

export type DynamicViscosity30RepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r по модулю разности измерений.
 * |Δη| ≤ ηср * 0.031 → разница; |Δη| > ηср * 0.031 → «N > r=X (Error)».
 */
export const calculateDynamicViscosity30Repeatability = (
  eta1Raw: string,
  eta2Raw: string,
): DynamicViscosity30RepeatabilityResult => {
  const eta1 = parseNumber(eta1Raw)
  const eta2 = parseNumber(eta2Raw)

  if (eta1 === null || eta2 === null) {
    return { value: "", isError: false }
  }

  const average = (eta1 + eta2) / 2
  const difference = Math.abs(eta1 - eta2)
  const limit = Math.round(average * 0.031 * 10) / 10
  const formattedDifference = String(difference).replace(".", ",")
  const formattedLimit = String(limit).replace(".", ",")

  if (difference <= limit) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r=${formattedLimit} (Error)`,
    isError: true,
  }
}
