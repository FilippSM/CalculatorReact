import { calculateFreezingPointAverage, calculateFreezingPointRepeatability } from "../lib"

type FreezingPointCalculationInput = {
  firstT1: string
  secondT2: string
}

export const useFreezingPointCalculations = ({ firstT1, secondT2 }: FreezingPointCalculationInput) => {
  const average = calculateFreezingPointAverage(firstT1, secondT2)
  const repeatability = calculateFreezingPointRepeatability(firstT1, secondT2)

  return { average, repeatability }
}
