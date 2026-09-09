import {
  calculateNoackLossEvaporation,
  calculateNoackLossAverage,
  calculateNoackLossRepeatability,
} from "../lib"

type NoackLossCalculationInput = {
  firstA: string
  firstB: string
  firstC: string
  secondA: string
  secondB: string
  secondC: string
}

export const useNoackLossCalculations = ({
  firstA,
  firstB,
  firstC,
  secondA,
  secondB,
  secondC,
}: NoackLossCalculationInput) => {
  const firstEvaporationLoss = calculateNoackLossEvaporation(firstA, firstB, firstC)
  const secondEvaporationLoss = calculateNoackLossEvaporation(secondA, secondB, secondC)
  const average = calculateNoackLossAverage(firstEvaporationLoss, secondEvaporationLoss)
  const repeatability = calculateNoackLossRepeatability(firstEvaporationLoss, secondEvaporationLoss)

  return { firstEvaporationLoss, secondEvaporationLoss, average, repeatability }
}
