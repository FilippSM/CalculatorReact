import { calculateAutoIgnitionAverage, calculateAutoIgnitionRepeatability } from "../lib"
import { useAutoIgnitionStore } from "./autoIgnitionStore"

type AutoIgnitionCalculationInput = {
  firstT1: string
  secondT2: string
}

export const useAutoIgnitionCalculations = ({ firstT1, secondT2 }: AutoIgnitionCalculationInput) => {
  const average = calculateAutoIgnitionAverage(firstT1, secondT2)
  const repeatability = calculateAutoIgnitionRepeatability(firstT1, secondT2)

  if (useAutoIgnitionStore.getState().average !== average) {
    useAutoIgnitionStore.getState().setAverage(average)
  }

  return { repeatability }
}
