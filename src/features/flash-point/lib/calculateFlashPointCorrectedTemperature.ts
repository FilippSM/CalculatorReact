const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  return value
}

const formatTemperature = (value: number): string => {
  const rounded = Math.round(value * 1000) / 1000
  return String(rounded).replace(".", ",")
}

/** t₀ скорректированное = t₀ + поправка */
export const calculateFlashPointCorrectedTemperature = (
  temperatureRaw: string,
  correctionRaw: string,
): string => {
  const temperature = parseNumber(temperatureRaw)
  const correction = parseNumber(correctionRaw)

  if (temperature === null || correction === null) return ""

  return formatTemperature(temperature + correction)
}
