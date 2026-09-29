const parseTemperature = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const temperature = Number(normalized)
  if (!Number.isFinite(temperature)) return null

  return temperature
}

/** Среднее значение tср = round((t₁ + t₂) / 2) до целого */
export const calculateFlashPointAverage = (
  firstCorrectedRaw: string,
  secondCorrectedRaw: string,
): string => {
  const first = parseTemperature(firstCorrectedRaw)
  const second = parseTemperature(secondCorrectedRaw)

  if (first === null || second === null) return ""

  return String(Math.round((first + second) / 2))
}
