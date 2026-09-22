export const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  return value
}

export const WATER_CONTENT_FINAL_DECIMAL_PLACES = 2
export const WATER_CONTENT_INTERMEDIATE_DECIMAL_PLACES_5CM3 = 3
export const WATER_CONTENT_INTERMEDIATE_DECIMAL_PLACES_10CM3 = 2

export const formatWaterContentValue = (value: number, decimalPlaces: number): string =>
  value.toFixed(decimalPlaces).replace(".", ",")

export const getWaterContentIntermediateDecimalPlaces = (receiverTrap: string): number =>
  receiverTrap.includes("5 см")
    ? WATER_CONTENT_INTERMEDIATE_DECIMAL_PLACES_5CM3
    : WATER_CONTENT_INTERMEDIATE_DECIMAL_PLACES_10CM3
