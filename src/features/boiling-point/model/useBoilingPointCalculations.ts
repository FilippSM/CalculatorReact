import {
  calculateBoilingPointAverage,
  calculateBoilingPointRepeatability,
} from "../lib/resolveBoilingPointFieldValue"
import { useBoilingPointStore } from "./boilingPointStore"

type BoilingPointCalculationInput = {
  firstX0: string
  secondX0: string
}

export const useBoilingPointCalculations = ({ firstX0, secondX0 }: BoilingPointCalculationInput) => {
  const average = calculateBoilingPointAverage(firstX0, secondX0)
  const repeatability = calculateBoilingPointRepeatability(firstX0, secondX0)

  if (useBoilingPointStore.getState().average !== average) {
    useBoilingPointStore.getState().setAverage(average)
  }

  return { repeatability }
}
