import { formatWaterContentValue, parseNumber } from "./formatWaterContent"

/**
 * Содержание воды X, % по ГОСТ 2477:
 * X = V₀ / m × 100 (массовая доля) или X = V₀ / V × 100 (объёмная доля)
 */
export const calculateWaterContent = (
  sampleRaw: string,
  waterVolumeRaw: string,
  decimalPlaces: number,
): string => {
  const sample = parseNumber(sampleRaw)
  const waterVolume = parseNumber(waterVolumeRaw)

  if (sample === null || waterVolume === null || sample === 0) return ""

  return formatWaterContentValue((waterVolume / sample) * 100, decimalPlaces)
}
