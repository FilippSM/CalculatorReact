import { formatWaterContentValue, parseNumber, WATER_CONTENT_FINAL_DECIMAL_PLACES } from "./formatWaterContent"

/** Среднее значение Xср = (X₁ + X₂) / 2 */
export const calculateWaterContentAverage = (
  firstValueRaw: string,
  secondValueRaw: string,
  decimalPlaces: number = WATER_CONTENT_FINAL_DECIMAL_PLACES,
): string => {
  const firstValue = parseNumber(firstValueRaw)
  const secondValue = parseNumber(secondValueRaw)

  if (firstValue === null || secondValue === null) return ""

  return formatWaterContentValue((firstValue + secondValue) / 2, decimalPlaces)
}
