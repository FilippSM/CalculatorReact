import { calculatePhAverage, calculatePhRepeatability } from "../lib/resolvePhFieldValue"
import { usePhStore } from "./phStore"

type PhCalculationInput = {
  firstPh: string
  secondPh: string
}

export const usePhCalculations = ({ firstPh, secondPh }: PhCalculationInput) => {
  const average = calculatePhAverage(firstPh, secondPh)
  const repeatability = calculatePhRepeatability(firstPh, secondPh)

  if (usePhStore.getState().average !== average) {
    usePhStore.getState().setAverage(average)
  }

  return { repeatability }
}
