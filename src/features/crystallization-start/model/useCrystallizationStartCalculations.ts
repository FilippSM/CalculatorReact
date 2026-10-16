import {
  calculateCrystallizationStartAverage,
  calculateCrystallizationStartRepeatability,
} from "../lib/resolveCrystallizationStartFieldValue"
import { useCrystallizationStartStore } from "./crystallizationStartStore"

type CrystallizationStartCalculationInput = {
  firstT: string
  secondT: string
}

export const useCrystallizationStartCalculations = ({
  firstT,
  secondT,
}: CrystallizationStartCalculationInput) => {
  const average = calculateCrystallizationStartAverage(firstT, secondT)
  const repeatability = calculateCrystallizationStartRepeatability(firstT, secondT)

  if (useCrystallizationStartStore.getState().average !== average) {
    useCrystallizationStartStore.getState().setAverage(average)
  }

  return { repeatability }
}
