import { viscosityPrecisionData } from "../constans/viscosityPrecisionData"
import { calculateDeterminability } from "../lib/calculateDeterminability"
import { calculateFlowTimeAverage } from "../lib/calculateFlowTimeAverage"
import { calculateRepeatability } from "../lib/calculateRepeatability"

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
  const precision = viscosityPrecisionData.find((item) => item.name === precisionName)

  return {
    firstTAverage,
    secondTAverage,
    firstDeterminability: precision ? calculateDeterminability(firstTAverage, precision.d) : "",
    secondDeterminability: precision ? calculateDeterminability(secondTAverage, precision.d) : "",
    repeatability: precision ? calculateRepeatability(firstV1, secondV2, precision.r) : "",
  }
}
