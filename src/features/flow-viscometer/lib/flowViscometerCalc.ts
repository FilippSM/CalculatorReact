import type { Viscosity } from "@/features/viscosity/constans/constans-visc"

export type FlowViscometerCalibrationFilter = "all" | "calibrated" | "nonCalibrated"

export type FlowViscometerMatch = Viscosity & {
  flowTime: number
}

const parseNumber = (raw: string): number | null => {
  const normalized = raw.replace(",", ".").trim()
  if (normalized === "") return null
  const n = Number(normalized)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

const passesCalibrationFilter = (item: Viscosity, filter: FlowViscometerCalibrationFilter): boolean => {
  if (filter === "all") return true
  if (filter === "calibrated") return item.calibration
  return !item.calibration
}

export const getFlowViscometerMatches = (
  items: readonly Viscosity[],
  filter: FlowViscometerCalibrationFilter,
  minFlowTimeRaw: string,
  estimatedViscosityRaw: string,
): FlowViscometerMatch[] => {
  const minFlowTime = parseNumber(minFlowTimeRaw)
  const viscosity = parseNumber(estimatedViscosityRaw)
  if (minFlowTime === null || viscosity === null) return []

  const out: FlowViscometerMatch[] = []
  for (const item of items) {
    if (!passesCalibrationFilter(item, filter)) continue
    const flowTime = viscosity / item.constant
    if (flowTime >= minFlowTime) {
      out.push({ ...item, flowTime })
    }
  }
  return out
}
