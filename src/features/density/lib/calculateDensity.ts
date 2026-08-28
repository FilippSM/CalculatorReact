import { valuesDensity } from "./bdDensity"

export const DENSITY_AT20_UNIT = "кг/м³"
export const DENSITY_AT20_CORRECTION = "0.0014"
export const DENSITY_NO_CORRECTION = "0"

export const calculateDensity = (
  density: string,
  temperature: string,
  unit: string,
  correction: string,
): number | null => {
  if (!density || !temperature) return null

  try {
    let numDens = Number(density.replace(",", "."))

    if (unit === "кг/м³" && numDens > 1.11) {
      numDens = numDens / 1000
    } else if (unit === "г/см³" && numDens > 1.11) {
      numDens = numDens / 1000
    }

    const numTemp = temperature.replace(",", ".")
    const aroundNumDens = (Math.ceil(numDens * 100) / 100).toFixed(3)
    const densForTable = String(aroundNumDens).padEnd(6, "0")
    let tempForTable = numTemp

    if (!numTemp.includes(".")) {
      tempForTable = tempForTable.padEnd(tempForTable.length + 2, ".0")
    }

    const correctionDensity = Number(aroundNumDens) - numDens

    if (!valuesDensity[densForTable] || !valuesDensity[densForTable][tempForTable]) {
      return null
    }

    const densInTable = valuesDensity[densForTable][tempForTable]
    let densityInTable = densInTable - correctionDensity + Number(correction)

    if (unit === "кг/м³") {
      densityInTable = densityInTable * 1000
    }

    return densityInTable
  } catch (error) {
    console.log("Error calculating density:", error)
    return null
  }
}
