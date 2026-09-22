import { viscosityPrecisionData } from "../constans/viscosityPrecisionData"
import { calculateDeterminability } from "../lib/calculateDeterminability"
import { calculateFlowTimeAverage } from "../lib/calculateFlowTimeAverage"
import { calculateProtocolViscosity } from "../lib/calculateProtocolViscosity"
import { calculateRepeatability, calculateViscosityAverage } from "../lib/calculateRepeatability"

type KinematicViscosityCalculationInput = {
  firstT1: string
  firstT2: string
  secondT1: string
  secondT2: string
  firstConstant: string
  secondConstant: string
  precisionName: string
}

export const useKinematicViscosityCalculations = ({
  firstT1,
  firstT2,
  secondT1,
  secondT2,
  firstConstant,
  secondConstant,
  precisionName,
}: KinematicViscosityCalculationInput) => {
  const firstTAverage = calculateFlowTimeAverage(firstT1, firstT2)
  const secondTAverage = calculateFlowTimeAverage(secondT1, secondT2)
  const firstV1 = calculateProtocolViscosity(firstTAverage, firstConstant)
  const secondV2 = calculateProtocolViscosity(secondTAverage, secondConstant)
  const average = calculateViscosityAverage(firstV1, secondV2)
  const precision = viscosityPrecisionData.find((item) => item.name === precisionName)
  const emptyDeterminability = { value: "", isError: false }
  const emptyRepeatability = { value: "", isError: false }

  return {
    firstTAverage,
    secondTAverage,
    firstV1,
    secondV2,
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
