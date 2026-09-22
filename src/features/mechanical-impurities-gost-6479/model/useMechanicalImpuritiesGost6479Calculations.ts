import {
  calculateMechanicalImpuritiesAverage,
  calculateMechanicalImpuritiesContent,
} from "@/features/mechanical-impurities"
import { calculateMechanicalImpuritiesGost6479Repeatability } from "../lib"

type MechanicalImpuritiesGost6479CalculationInput = {
  firstM1: string
  firstM2: string
  firstM3: string
  secondM1: string
  secondM2: string
  secondM3: string
}

export const useMechanicalImpuritiesGost6479Calculations = ({
  firstM1,
  firstM2,
  firstM3,
  secondM1,
  secondM2,
  secondM3,
}: MechanicalImpuritiesGost6479CalculationInput) => {
  const firstX1 = calculateMechanicalImpuritiesContent(firstM1, firstM2, firstM3)
  const secondX2 = calculateMechanicalImpuritiesContent(secondM1, secondM2, secondM3)
  const average = calculateMechanicalImpuritiesAverage(firstX1, secondX2)
  const repeatability = calculateMechanicalImpuritiesGost6479Repeatability(firstX1, secondX2)

  return { firstX1, secondX2, average, repeatability }
}
