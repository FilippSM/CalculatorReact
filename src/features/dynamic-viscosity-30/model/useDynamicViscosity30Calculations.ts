import { calculateDynamicViscosity30Average, calculateDynamicViscosity30Repeatability } from "../lib"

type DynamicViscosity30CalculationInput = {
  firstEta1: string
  secondEta2: string
}

export const useDynamicViscosity30Calculations = ({ firstEta1, secondEta2 }: DynamicViscosity30CalculationInput) => {
  const average = calculateDynamicViscosity30Average(firstEta1, secondEta2)
  const repeatability = calculateDynamicViscosity30Repeatability(firstEta1, secondEta2)

  return { average, repeatability }
}
