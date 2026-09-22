import { calculateBaseNumberAverage, calculateBaseNumberRepeatability } from "../lib"

type BaseNumberCalculationInput = {
  firstValue: string
  secondValue: string
}

export const useBaseNumberCalculations = ({ firstValue, secondValue }: BaseNumberCalculationInput) => {
  const average = calculateBaseNumberAverage(firstValue, secondValue)
  const repeatability = calculateBaseNumberRepeatability(firstValue, secondValue)

  return { average, repeatability }
}
