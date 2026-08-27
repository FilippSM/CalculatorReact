const STANDARD_PRESSURE_KPA = 101.3
const CORRECTION_FACTOR = 0.25
const FORMULA_PRESSURE_THRESHOLD = 82

const parsePressure = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null

  const pressure = Number(normalized)
  if (!Number.isFinite(pressure)) return null

  return pressure
}

const formatCorrection = (value: number): string => String(Math.round(value))

/**
 * Поправка температуры вспышки по атмосферному давлению p, кПа.
 * 1) 81.3–81.9 → 4
 * 2) 73.3–81.2 → 6
 * 3) p ≥ 82 → 0,25 × (101,3 − p)
 * 4) иначе → 0
 */
export const calculateFlashPointCorrection = (pressureRaw: string): string => {
  const pressure = parsePressure(pressureRaw)
  if (pressure === null) return ""

  if (pressure >= 81.3 && pressure <= 81.9) return "4"
  if (pressure >= 73.3 && pressure <= 81.2) return "6"

  if (pressure >= FORMULA_PRESSURE_THRESHOLD) {
    return formatCorrection(CORRECTION_FACTOR * (STANDARD_PRESSURE_KPA - pressure))
  }

  return "0"
}
