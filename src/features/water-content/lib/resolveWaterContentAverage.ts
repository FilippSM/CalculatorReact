import { calculateWaterContent } from "./calculateWaterContent"
import { calculateWaterContentAverage } from "./calculateWaterContentAverage"
import { getWaterContentIntermediateDecimalPlaces } from "./formatWaterContent"
import { useWaterContentStore } from "../model/waterContentStore"

type WaterContentAverageInput = {
  firstSample: string
  firstWaterVolume: string
  secondSample: string
  secondWaterVolume: string
  receiverTrap: string
}

/**
 * Среднее значение Xср, % по ГОСТ 2477.
 * Берёт значение из store (если испытание уже посчитано в UI),
 * иначе пересчитывает по входным данным.
 */
export const resolveWaterContentAverage = ({
  firstSample,
  firstWaterVolume,
  secondSample,
  secondWaterVolume,
  receiverTrap,
}: WaterContentAverageInput): string => {
  const storedAverage = useWaterContentStore.getState().average
  if (storedAverage !== "") return storedAverage

  const intermediateDecimalPlaces = getWaterContentIntermediateDecimalPlaces(receiverTrap)
  const firstValue = calculateWaterContent(firstSample, firstWaterVolume, intermediateDecimalPlaces)
  const secondValue = calculateWaterContent(
    secondSample,
    secondWaterVolume,
    intermediateDecimalPlaces,
  )

  return calculateWaterContentAverage(firstValue, secondValue)
}
