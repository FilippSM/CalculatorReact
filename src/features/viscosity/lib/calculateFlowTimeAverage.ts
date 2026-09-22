import { normalizeNumber } from "./viscosty"

export const calculateFlowTimeAverage = (t1: string, t2: string): string => {
  const first = normalizeNumber(t1)
  const second = normalizeNumber(t2)

  if (isNaN(first) || isNaN(second)) return ""

  const average = (first + second) / 2
  return average.toFixed(2).replace(".", ",")
}
