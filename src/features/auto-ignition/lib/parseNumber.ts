const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  return value
}

export { parseNumber }
