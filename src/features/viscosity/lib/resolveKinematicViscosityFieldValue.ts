import { viscosityPrecisionData } from "../constans/viscosityPrecisionData"
import { calculateDeterminability } from "../lib/calculateDeterminability"
import { calculateFlowTimeAverage } from "../lib/calculateFlowTimeAverage"
import { calculateProtocolViscosity } from "../lib/calculateProtocolViscosity"
import { calculateRepeatability, calculateViscosityAverage } from "../lib/calculateRepeatability"

type KinematicViscosityFormSlice = {
  kinematicViscosity100FirstT1: string
  kinematicViscosity100FirstT2: string
  kinematicViscosity100FirstViscometerConstant: string
  kinematicViscosity100SecondT1: string
  kinematicViscosity100SecondT2: string
  kinematicViscosity100SecondViscometerConstant: string
  kinematicViscosity40FirstT1: string
  kinematicViscosity40FirstT2: string
  kinematicViscosity40FirstViscometerConstant: string
  kinematicViscosity40SecondT1: string
  kinematicViscosity40SecondT2: string
  kinematicViscosity40SecondViscometerConstant: string
} & Record<string, string>

const getPrecision = (precisionName: string) =>
  viscosityPrecisionData.find((item) => item.name === precisionName)

const DEFAULT_PRECISION_NAME = "Компаундированные масла при 40 °С и 100 °С"

/** Resolves stored kinematic viscosity table fields from live calculated values. */
export const resolveKinematicViscosityFieldValue = <T extends KinematicViscosityFormSlice>(
  formData: T,
  field: keyof T & string,
  precisionName: string = DEFAULT_PRECISION_NAME,
): string => {
  const isViscosity100 = field.startsWith("kinematicViscosity100")
  const prefix = isViscosity100 ? "kinematicViscosity100" : "kinematicViscosity40"

  const firstT1 = formData[`${prefix}FirstT1` as keyof T] as string
  const firstT2 = formData[`${prefix}FirstT2` as keyof T] as string
  const firstConstant = formData[`${prefix}FirstViscometerConstant` as keyof T] as string
  const secondT1 = formData[`${prefix}SecondT1` as keyof T] as string
  const secondT2 = formData[`${prefix}SecondT2` as keyof T] as string
  const secondConstant = formData[`${prefix}SecondViscometerConstant` as keyof T] as string

  const firstTAverage = calculateFlowTimeAverage(firstT1, firstT2)
  const secondTAverage = calculateFlowTimeAverage(secondT1, secondT2)
  const firstV1 = calculateProtocolViscosity(firstTAverage, firstConstant)
  const secondV2 = calculateProtocolViscosity(secondTAverage, secondConstant)

  if (field === `${prefix}FirstTAverage`) {
    return firstTAverage
  }

  if (field === `${prefix}SecondTAverage`) {
    return secondTAverage
  }

  if (field === `${prefix}FirstV1`) {
    return firstV1
  }

  if (field === `${prefix}SecondV2`) {
    return secondV2
  }

  if (field === `${prefix}Average`) {
    return calculateViscosityAverage(firstV1, secondV2)
  }

  const precision = getPrecision(precisionName)

  if (field === `${prefix}FirstDeterminability`) {
    if (!precision) return ""
    return calculateDeterminability(firstT1, firstT2, firstTAverage, precision.d).value
  }

  if (field === `${prefix}SecondDeterminability`) {
    if (!precision) return ""
    return calculateDeterminability(secondT1, secondT2, secondTAverage, precision.d).value
  }

  if (field === `${prefix}Repeatability`) {
    if (!precision) return ""
    return calculateRepeatability(firstV1, secondV2, calculateViscosityAverage(firstV1, secondV2), precision.r).value
  }

  return formData[field]
}

export const calculateKinematicViscosityRepeatability = (
  firstV1: string,
  secondV2: string,
  average: string,
  precisionName: string = DEFAULT_PRECISION_NAME,
) => {
  const precision = getPrecision(precisionName)
  if (!precision) return { value: "", isError: false }

  return calculateRepeatability(firstV1, secondV2, average, precision.r)
}
