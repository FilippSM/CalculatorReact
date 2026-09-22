import {
  calculateDensity,
  DENSITY_AT20_CORRECTION,
  DENSITY_AT20_UNIT,
  DENSITY_NO_CORRECTION,
} from "../lib/calculateDensity"
import { calculateDensityAverage } from "../lib/calculateDensityAverage"
import { calculateDensityRepeatability } from "../lib/calculateDensityRepeatability"
import { formatDensityValue } from "../lib/formatDensityValue"

type DensityAt20CalculationInput = {
  firstRho: string
  firstT: string
  secondRho: string
  secondT: string
}

export const useDensityAt20Calculations = ({
  firstRho,
  firstT,
  secondRho,
  secondT,
}: DensityAt20CalculationInput) => {
  const firstRhoAt20 = calculateDensity(firstRho, firstT, DENSITY_AT20_UNIT, DENSITY_NO_CORRECTION)
  const secondRhoAt20 = calculateDensity(secondRho, secondT, DENSITY_AT20_UNIT, DENSITY_NO_CORRECTION)
  const firstCorrected = calculateDensity(
    firstRho,
    firstT,
    DENSITY_AT20_UNIT,
    DENSITY_AT20_CORRECTION,
  )
  const secondCorrected = calculateDensity(
    secondRho,
    secondT,
    DENSITY_AT20_UNIT,
    DENSITY_AT20_CORRECTION,
  )

  const repeatability = calculateDensityRepeatability(firstCorrected, secondCorrected)

  return {
    firstRhoAt20:
      firstRhoAt20 === null ? "" : formatDensityValue(firstRhoAt20, DENSITY_AT20_UNIT),
    secondRhoAt20:
      secondRhoAt20 === null ? "" : formatDensityValue(secondRhoAt20, DENSITY_AT20_UNIT),
    firstRhoAt20Corrected:
      firstCorrected === null ? "" : formatDensityValue(firstCorrected, DENSITY_AT20_UNIT),
    secondRhoAt20Corrected:
      secondCorrected === null ? "" : formatDensityValue(secondCorrected, DENSITY_AT20_UNIT),
    average: calculateDensityAverage(firstCorrected, secondCorrected, DENSITY_AT20_UNIT),
    repeatability,
  }
}
