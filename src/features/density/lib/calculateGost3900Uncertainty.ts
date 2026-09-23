/**
 * Расчёт неопределённости измерения плотности нефтепродуктов
 * по ГОСТ 3900 (приведение к 20 °C).
 */

export type Gost3900HydrometerType = "ANT-2" | "ANT-1"
export type Gost3900ThermometerType = "LT-300" | "other"

export type Gost3900UncertaintyInput = {
  densityAtTestTemperature: string | number
  sampleTemperature: string | number
  meanDensityAt20: string | number
  hydrometer: Gost3900HydrometerType
  thermometer: Gost3900ThermometerType
}

export type Gost3900UncertaintyResult = {
  sensitivityTemperature: number
  temperatureStandardUncertainty: number
  densityStandardUncertainty: number
  repeatabilityStandardUncertainty: number
  samplingStandardUncertainty: number
  combinedStandardUncertainty: number
  expandedUncertainty: number
}

const TEMPERATURE_STABILITY = 0.2
const REPEATABILITY_LIMIT = 0.5
const SAMPLING_STANDARD_UNCERTAINTY = 0.000289087233166163 * 1000
const COVERAGE_FACTOR = 2

const parseNumericValue = (value: string | number): number | null => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null
  }

  const normalizedValue = value.trim().replace(",", ".")
  if (normalizedValue === "") return null

  const parsedValue = Number(normalizedValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

/**
 * Возвращает бюджет неопределённости и расширенную неопределённость U
 * при k = 2. Если исходные значения некорректны или t₁ = 20 °C,
 * расчёт по формуле коэффициента чувствительности невозможен.
 */
export const calculateGost3900Uncertainty = ({
  densityAtTestTemperature,
  sampleTemperature,
  meanDensityAt20,
  hydrometer,
  thermometer,
}: Gost3900UncertaintyInput): Gost3900UncertaintyResult | null => {
  const density = parseNumericValue(densityAtTestTemperature)
  const temperature = parseNumericValue(sampleTemperature)
  const meanDensity = parseNumericValue(meanDensityAt20)

  if (density === null || temperature === null || meanDensity === null || temperature === 20) {
    return null
  }

  // H5, H6 — погрешность и цена деления ареометра, кг/м³.
  const hydrometerAccuracy = hydrometer === "ANT-2" ? 1 : 0.5
  const hydrometerDivision = hydrometer === "ANT-2" ? 1 : 0.5

  // H7, H8 — погрешность и цена деления термометра, °C.
  const thermometerAccuracy = thermometer === "LT-300" ? 0.05 : 0.1
  const thermometerDivision = thermometer === "LT-300" ? 0.01 : 0.02

  // J23 = (B19 − B15) / (D15 − 20).
  const sensitivityTemperature = (meanDensity - density) / (temperature - 20)

  // E23 = √(H7²/3 + H8²/12 + H9²/3).
  const temperatureStandardUncertainty = Math.sqrt(
    thermometerAccuracy ** 2 / 3 +
      thermometerDivision ** 2 / 12 +
      TEMPERATURE_STABILITY ** 2 / 3,
  )

  // E24 = √(H5²/3 + H6²/12).
  const densityStandardUncertainty = Math.sqrt(
    hydrometerAccuracy ** 2 / 3 + hydrometerDivision ** 2 / 12,
  )

  // E25 = H10 / 2,8.
  const repeatabilityStandardUncertainty = REPEATABILITY_LIMIT / 2.8
  const samplingStandardUncertainty = SAMPLING_STANDARD_UNCERTAINTY

  const varianceSum =
    (temperatureStandardUncertainty * sensitivityTemperature) ** 2 +
    densityStandardUncertainty ** 2 +
    repeatabilityStandardUncertainty ** 2 +
    samplingStandardUncertainty ** 2
  const combinedStandardUncertainty = Math.sqrt(varianceSum)

  // U = k · u_c, k = 2; результат округляется до 0,1 кг/м³.
  const expandedUncertainty =
    Math.round(COVERAGE_FACTOR * combinedStandardUncertainty * 10) / 10

  return {
    sensitivityTemperature,
    temperatureStandardUncertainty,
    densityStandardUncertainty,
    repeatabilityStandardUncertainty,
    samplingStandardUncertainty,
    combinedStandardUncertainty,
    expandedUncertainty,
  }
}
