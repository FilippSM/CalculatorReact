const REPEATABILITY_LIMIT = 8

const parseTemperature = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const temperature = Number(normalized)
  if (!Number.isFinite(temperature)) return null

  return temperature
}

const formatDifference = (value: number): string => {
  const rounded = Math.round(value * 1000) / 1000
  return String(rounded).replace(".", ",")
}

export type FlashPointRepeatabilityResult = {
  value: string
  isError: boolean
}

/**
 * Повторяемость r по модулю разности скорректированных температур вспышки.
 * |Δt| ≤ 8 → разница; |Δt| > 8 → «N > r (Error)».
 */
export const calculateFlashPointRepeatability = (
  firstCorrectedRaw: string,
  secondCorrectedRaw: string,
): FlashPointRepeatabilityResult => {
  const first = parseTemperature(firstCorrectedRaw)
  const second = parseTemperature(secondCorrectedRaw)

  if (first === null || second === null) {
    return { value: "", isError: false }
  }

  const difference = Math.abs(first - second)
  const formattedDifference = formatDifference(difference)

  if (difference <= REPEATABILITY_LIMIT) {
    return { value: formattedDifference, isError: false }
  }

  return {
    value: `${formattedDifference} > r (Error)`,
    isError: true,
  }
}
