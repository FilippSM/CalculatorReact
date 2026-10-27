import {
  calculateMechanicalImpuritiesAverage,
  calculateMechanicalImpuritiesContent,
} from "@/features/mechanical-impurities"
import { calculateMechanicalImpuritiesGost6479Repeatability } from "../lib"
import { useMechanicalImpuritiesGost6479Store } from "./mechanicalImpuritiesGost6479Store"

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

  const store = useMechanicalImpuritiesGost6479Store.getState()
  if (
    store.firstX1 !== firstX1 ||
    store.secondX2 !== secondX2 ||
    store.average !== average ||
    store.repeatabilityValue !== repeatability.value ||
    store.repeatabilityIsError !== repeatability.isError
  ) {
    store.setResults({
      firstX1,
      secondX2,
      average,
      repeatabilityValue: repeatability.value,
      repeatabilityIsError: repeatability.isError,
    })
  }
}
