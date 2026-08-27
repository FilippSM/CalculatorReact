import { calculateFlashPointCorrection } from "../lib"

export const useFlashPointCalculations = (pressure: string) => {
  const correction = calculateFlashPointCorrection(pressure)

  return { correction }
}
