import {
  calculateCrystallizationAverage,
  calculateCrystallizationRepeatability,
} from "../lib/resolveCrystallizationFieldValue"
import { useCrystallizationStore } from "./crystallizationStore"

type CrystallizationCalculationInput = {
  firstT: string
  secondT: string
}

export const useCrystallizationCalculations = ({ firstT, secondT }: CrystallizationCalculationInput) => {
  const average = calculateCrystallizationAverage(firstT, secondT)
  const repeatability = calculateCrystallizationRepeatability(firstT, secondT)

  if (useCrystallizationStore.getState().average !== average) {
    useCrystallizationStore.getState().setAverage(average)
  }

  return { repeatability }
}
