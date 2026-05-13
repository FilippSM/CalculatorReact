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
 * Учитываются только строки, где заполнены обе вязкости (пара 100 °C + 40 °C).
 * По ним усредняются v100 и v40, затем calculateIV(avg100, avg40) — без смешивания
 * неполной строки с данными из другой.
 */
export function calculateEntityViscosityIndexFromGroups(
  groups: ReadonlyArray<{ viscosity100: string; viscosity40: string }>,
): number | null {
  const completePairs = groups
    .map((g) => {
      const v100 = normalizeNumber(g.viscosity100)
      const v40 = normalizeNumber(g.viscosity40)
      if (isNaN(v100) || isNaN(v40) || v100 <= 0 || v40 <= 0) return null
      return { v100, v40 }
    })
    .filter((p): p is { v100: number; v40: number } => p !== null)

  if (completePairs.length === 0) return null

  const avg100 = completePairs.reduce((s, p) => s + p.v100, 0) / completePairs.length
  const avg40 = completePairs.reduce((s, p) => s + p.v40, 0) / completePairs.length
  const value = calculateIV(avg100, avg40)
  return isNaN(value) || !isFinite(value) ? null : value
}
