import { calculateFlowTimeAverage } from "../lib/calculateFlowTimeAverage"

type KinematicViscosity100CalculationInput = {
  firstT1: string
  firstT2: string
  secondT1: string
  secondT2: string
}

export const useKinematicViscosity100Calculations = ({
  firstT1,
  firstT2,
  secondT1,
  secondT2,
}: KinematicViscosity100CalculationInput) => ({
  firstTAverage: calculateFlowTimeAverage(firstT1, firstT2),
  secondTAverage: calculateFlowTimeAverage(secondT1, secondT2),
})
