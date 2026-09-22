import {
  formatWaterContentValue,
  parseNumber,
  WATER_CONTENT_FINAL_DECIMAL_PLACES,
} from "./formatWaterContent"

export type WaterContentRepeatabilityResult = {
  value: string
  isError: boolean
}

const EMPTY_RESULT: WaterContentRepeatabilityResult = {
  value: "",
  isError: false,
}

const BASE_REPEATABILITY = 0.1
const VOLUME_THRESHOLD = 1

/**
 * Норма повторяемости r, %:
 * V₀ ≤ 1,0 см³ → 0,1
 * V₀ > 1,0 см³ → max(0,1; 2% среднего объёма воды)
 */
export const getWaterContentRepeatabilityLimit = (averageWaterVolume: number): number => {
  if (averageWaterVolume <= VOLUME_THRESHOLD) return BASE_REPEATABILITY

  return Math.max(BASE_REPEATABILITY, averageWaterVolume * 0.02)
}

/**
 * Повторяемость: |X₁ − X₂|.
 * При превышении: «разница > r=норма (Error)».
 */
export const calculateWaterContentRepeatability = (
  firstValueRaw: string,
  secondValueRaw: string,
  firstWaterVolumeRaw: string,
  secondWaterVolumeRaw: string,
  decimalPlaces: number = WATER_CONTENT_FINAL_DECIMAL_PLACES,
): WaterContentRepeatabilityResult => {
  const firstValue = parseNumber(firstValueRaw)
  const secondValue = parseNumber(secondValueRaw)
  const firstWaterVolume = parseNumber(firstWaterVolumeRaw)
  const secondWaterVolume = parseNumber(secondWaterVolumeRaw)

  if (
    firstValue === null ||
    secondValue === null ||
    firstWaterVolume === null ||
    secondWaterVolume === null
  ) {
    return EMPTY_RESULT
  }

  const averageWaterVolume = (firstWaterVolume + secondWaterVolume) / 2
  const difference = Math.abs(firstValue - secondValue)
  const limit = getWaterContentRepeatabilityLimit(averageWaterVolume)
  const roundedDifference = Number(difference.toFixed(decimalPlaces))
  const roundedLimit = Number(limit.toFixed(decimalPlaces))
  const formattedDifference = formatWaterContentValue(roundedDifference, decimalPlaces)
  const formattedLimit = formatWaterContentValue(roundedLimit, decimalPlaces)
  const isError = roundedDifference > roundedLimit

  return {
    value: isError ? `${formattedDifference} > r=${formattedLimit} (Error)` : formattedDifference,
    isError,
  }
}
