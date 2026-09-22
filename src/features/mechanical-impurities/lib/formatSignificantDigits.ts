export const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  return value
}

/** Округление до `digits` значащих цифр без scientific notation. */
export const formatToSignificantDigits = (value: number, digits: number): string => {
  if (value === 0) return "0"

  const sign = value < 0 ? "-" : ""
  const absolute = Math.abs(value)
  const order = Math.floor(Math.log10(absolute))
  const factor = 10 ** (digits - order - 1)
  const rounded = Math.round(absolute * factor) / factor
  const roundedOrder = Math.floor(Math.log10(rounded))
  const decimalPlaces = Math.max(0, digits - roundedOrder - 1)

  return `${sign}${rounded.toFixed(decimalPlaces).replace(".", ",")}`
}
