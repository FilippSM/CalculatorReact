export const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  return value
}

/** Округление до `digits` значащих цифр. */
export const roundToSignificantDigits = (value: number, digits: number): number => {
  if (value === 0) return 0

  const multiplier = 10 ** (digits - 1 - Math.floor(Math.log10(Math.abs(value))))
  return Math.round(value * multiplier) / multiplier
}

/** Округление до `digits` значащих цифр без scientific notation. */
export const formatToSignificantDigits = (value: number, digits: number): string => {
  const rounded = roundToSignificantDigits(value, digits)
  if (rounded === 0) return "0"

  const sign = rounded < 0 ? "-" : ""
  const absolute = Math.abs(rounded)
  const order = Math.floor(Math.log10(absolute))
  const decimalPlaces = Math.max(0, digits - order - 1)

  return `${sign}${absolute.toFixed(decimalPlaces).replace(".", ",")}`
}
