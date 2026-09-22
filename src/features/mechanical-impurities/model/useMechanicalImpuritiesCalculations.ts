import {
  calculateMechanicalImpuritiesAverage,
  calculateMechanicalImpuritiesContent,
  calculateMechanicalImpuritiesRepeatability,
} from "../lib"

type MechanicalImpuritiesCalculationInput = {
  firstM1: string
  firstM2: string
  firstM3: string
  secondM1: string
  secondM2: string
  secondM3: string
}

export const useMechanicalImpuritiesCalculations = ({
  firstM1,
  firstM2,
  firstM3,
  secondM1,
  secondM2,
  secondM3,
}: MechanicalImpuritiesCalculationInput) => {
  const firstX1 = calculateMechanicalImpuritiesContent(firstM1, firstM2, firstM3)
  const secondX2 = calculateMechanicalImpuritiesContent(secondM1, secondM2, secondM3)
  const average = calculateMechanicalImpuritiesAverage(firstX1, secondX2)
  const repeatability = calculateMechanicalImpuritiesRepeatability(firstX1, secondX2, average)

  return { firstX1, secondX2, average, repeatability }
}
