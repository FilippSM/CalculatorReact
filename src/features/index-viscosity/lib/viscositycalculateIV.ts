import { calculateIV, normalizeNumber } from "@/features/viscosity/lib/viscosty"

/** Индекс вязкости по двум введённым кинематическим вязкостям (100 °C и 40 °C), мм²/с. */
export function calculateViscosityIndexForStrings(viscosity100: string, viscosity40: string): number | null {
  const v100 = normalizeNumber(viscosity100)
  const v40 = normalizeNumber(viscosity40)
  if (isNaN(v100) || isNaN(v40) || v100 <= 0 || v40 <= 0) return null
  const value = calculateIV(v100, v40)
  return isNaN(value) || !isFinite(value) ? null : value
}

/**
 * Как в ViscosityCalculator: усредняются все валидные вязкости по 100 °C и по 40 °C по группам,
 * затем вызывается calculateIV(avg100, avg40).
 */
export function calculateEntityViscosityIndexFromGroups(
  groups: ReadonlyArray<{ viscosity100: string; viscosity40: string }>,
): number | null {
  const v100s = groups.map((g) => normalizeNumber(g.viscosity100)).filter((n) => !isNaN(n) && n > 0)
  const v40s = groups.map((g) => normalizeNumber(g.viscosity40)).filter((n) => !isNaN(n) && n > 0)
  if (v100s.length === 0 || v40s.length === 0) return null
  const avg100 = v100s.reduce((s, x) => s + x, 0) / v100s.length
  const avg40 = v40s.reduce((s, x) => s + x, 0) / v40s.length
  const value = calculateIV(avg100, avg40)
  return isNaN(value) || !isFinite(value) ? null : value
}
