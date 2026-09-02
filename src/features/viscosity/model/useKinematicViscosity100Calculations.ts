import { viscosityPrecisionData } from "../constans/viscosityPrecisionData"
import { calculateDeterminability } from "../lib/calculateDeterminability"
import { calculateFlowTimeAverage } from "../lib/calculateFlowTimeAverage"
import { calculateRepeatability, calculateViscosityAverage } from "../lib/calculateRepeatability"

type KinematicViscosity100CalculationInput = {
  firstT1: string
  firstT2: string
  secondT1: string
  secondT2: string
  firstV1: string
  secondV2: string
  precisionName: string
}

export const useKinematicViscosity100Calculations = ({
  firstT1,
  firstT2,
  secondT1,
  secondT2,
  firstV1,
  secondV2,
  precisionName,
}: KinematicViscosity100CalculationInput) => {
  const firstTAverage = calculateFlowTimeAverage(firstT1, firstT2)
  const secondTAverage = calculateFlowTimeAverage(secondT1, secondT2)
  const average = calculateViscosityAverage(firstV1, secondV2)
  const precision = viscosityPrecisionData.find((item) => item.name === precisionName)
  const emptyDeterminability = { value: "", isError: false }
  const emptyRepeatability = { value: "", isError: false }

  return {
    firstTAverage,
    secondTAverage,
    average,
    firstDeterminability: precision
      ? calculateDeterminability(firstT1, firstT2, firstTAverage, precision.d)
      : emptyDeterminability,
    secondDeterminability: precision
      ? calculateDeterminability(secondT1, secondT2, secondTAverage, precision.d)
      : emptyDeterminability,
    repeatability: precision ? calculateRepeatability(firstV1, secondV2, average, precision.r) : emptyRepeatability,
  }
}
