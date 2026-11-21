import { calculateFreezingPointAverage, calculateFreezingPointRepeatability } from "../lib"
import { useFreezingPointStore } from "./freezingPointStore"

type FreezingPointCalculationInput = {
  firstT1: string
  secondT2: string
}

export const useFreezingPointCalculations = ({ firstT1, secondT2 }: FreezingPointCalculationInput) => {
  const average = calculateFreezingPointAverage(firstT1, secondT2)
  const repeatability = calculateFreezingPointRepeatability(firstT1, secondT2)

  if (useFreezingPointStore.getState().average !== average) {
    useFreezingPointStore.getState().setAverage(average)
  }

  return { repeatability }
}
