import { calculatePourPointAverage, calculatePourPointRepeatability } from "../lib"

type PourPointCalculationInput = {
  firstT1: string
  secondT2: string
}

export const usePourPointCalculations = ({ firstT1, secondT2 }: PourPointCalculationInput) => {
  const average = calculatePourPointAverage(firstT1, secondT2)
  const repeatability = calculatePourPointRepeatability(firstT1, secondT2)

  return { average, repeatability }
}
