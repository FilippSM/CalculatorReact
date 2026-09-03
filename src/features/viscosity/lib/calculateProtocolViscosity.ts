import { calculateViscosity, normalizeNumber, PROTOCOL_VISCOSITY_SIGNIFICANT_DIGITS } from "./viscosty"

export const calculateProtocolViscosity = (averageTime: string, constant: string): string => {
  const time = normalizeNumber(averageTime)
  const viscometerConstant = normalizeNumber(constant)
  const result = calculateViscosity(time, viscometerConstant, PROTOCOL_VISCOSITY_SIGNIFICANT_DIGITS)

  if (!Number.isFinite(result)) return ""

  return result.toString().replace(".", ",")
}
