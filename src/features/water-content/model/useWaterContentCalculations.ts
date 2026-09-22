import { calculateWaterContent } from "../lib/calculateWaterContent"
import { calculateWaterContentAverage } from "../lib/calculateWaterContentAverage"
import { calculateWaterContentRepeatability } from "../lib/calculateWaterContentRepeatability"
import {
  getWaterContentIntermediateDecimalPlaces,
  WATER_CONTENT_FINAL_DECIMAL_PLACES,
} from "../lib/formatWaterContent"

type WaterContentCalculationInput = {
  firstSample: string
  firstWaterVolume: string
  secondSample: string
  secondWaterVolume: string
  receiverTrap: string
}

export const useWaterContentCalculations = ({
  firstSample,
  firstWaterVolume,
  secondSample,
  secondWaterVolume,
  receiverTrap,
}: WaterContentCalculationInput) => {
  const intermediateDecimalPlaces = getWaterContentIntermediateDecimalPlaces(receiverTrap)
  const firstValue = calculateWaterContent(firstSample, firstWaterVolume, intermediateDecimalPlaces)
  const secondValue = calculateWaterContent(secondSample, secondWaterVolume, intermediateDecimalPlaces)
  const average = calculateWaterContentAverage(firstValue, secondValue, WATER_CONTENT_FINAL_DECIMAL_PLACES)
  const repeatability = calculateWaterContentRepeatability(
    firstValue,
    secondValue,
    firstWaterVolume,
    secondWaterVolume,
    WATER_CONTENT_FINAL_DECIMAL_PLACES,
  )

  return { firstValue, secondValue, average, repeatability }
}
