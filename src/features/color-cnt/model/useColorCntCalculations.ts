import { calculateColorCntAverage, calculateColorCntRepeatability } from "../lib"

type ColorCntCalculationInput = {
  firstX1: string
  secondX2: string
}

export const useColorCntCalculations = ({ firstX1, secondX2 }: ColorCntCalculationInput) => {
  const average = calculateColorCntAverage(firstX1, secondX2)
  const repeatability = calculateColorCntRepeatability(firstX1, secondX2)

  return { average, repeatability }
}
