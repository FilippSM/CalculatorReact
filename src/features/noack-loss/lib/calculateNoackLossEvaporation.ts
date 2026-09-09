import { parseNumber } from "./parseNumber"

/**
 * Потери от испарения, % = (B - C) / (B - A) * 100
 * Округление до 3 знаков после запятой.
 */
export const calculateNoackLossEvaporation = (
  aRaw: string,
  bRaw: string,
  cRaw: string,
): string => {
  const a = parseNumber(aRaw)
  const b = parseNumber(bRaw)
  const c = parseNumber(cRaw)

  if (a === null || b === null || c === null) return ""

  const denominator = b - a
  if (denominator === 0) return ""

  const loss = ((b - c) / denominator) * 100
  return String(Math.round(loss * 1000) / 1000).replace(".", ",")
}
