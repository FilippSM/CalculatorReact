/**
 * Расчёт неопределённости измерения плотности нефтепродуктов
 * по ГОСТ 3900 (приведение к 20 °C).
 *
 * Соответствие обозначений:
 *   H5  — погрешность ареометра, кг/м³
 *   H6  — цена деления ареометра, кг/м³
 *   H7  — погрешность термометра, °C
 *   H8  — цена деления термометра, °C
 *   H9  — погрешность поддержания температуры, °C
 *   H10 — предел повторяемости, кг/м³
 *   H23 — коэффициент чувствительности по плотности
 *   J23 — коэффициент чувствительности по температуре
 *   E23–E27 — стандартные неопределённости
 *   F23–F27 — процентные вклады
 *   F30 — расширенная неопределённость при k = 2
 */

/** Тип ареометра, определяющий H5 и H6. */
export type Gost3900HydrometerType = "ANT-2" | "ANT-1"

/** Тип термометра, определяющий H7 и H8. */
export type Gost3900ThermometerType = "LT-300" | "other"

/** Входные данные для расчёта неопределённости по ГОСТ 3900. */
export type Gost3900UncertaintyInput = {
  /** B15 — плотность при температуре испытания, кг/м³ (ρ₁). */
  densityAtTestTemperature: string | number
  /** D15 — температура пробы при испытании, °C (t₁). */
  sampleTemperature: string | number
  /** B19 — средняя плотность, приведённая к 20 °C, кг/м³ (ρср). */
  meanDensityAt20: string | number
  /** Тип ареометра для выбора H5 и H6. */
  hydrometer: Gost3900HydrometerType
  /** Тип термометра для выбора H7 и H8. */
  thermometer: Gost3900ThermometerType
}

/** Бюджет и итоговый результат расчёта неопределённости по ГОСТ 3900. */
export type Gost3900UncertaintyResult = {
  /** J23 — коэффициент чувствительности по температуре. */
  sensitivityTemperature: number
  /** E23 — стандартная неопределённость температуры испытания. */
  temperatureStandardUncertainty: number
  /** E24 — стандартная неопределённость плотности при температуре испытания. */
  densityStandardUncertainty: number
  /** E25 — стандартная неопределённость повторяемости метода. */
  repeatabilityStandardUncertainty: number
  /** E26 — стандартная неопределённость отбора проб. */
  samplingStandardUncertainty: number
  /** E27 — суммарная стандартная неопределённость результата измерений. */
  combinedStandardUncertainty: number
  /** F23 — процентный вклад температуры испытания. */
  temperatureContribution: number
  /** F24 — процентный вклад плотности при температуре испытания. */
  densityContribution: number
  /** F25 — процентный вклад повторяемости метода. */
  repeatabilityContribution: number
  /** F26 — процентный вклад отбора проб. */
  samplingContribution: number
  /** F27 — сумма процентных вкладов. */
  totalContribution: number
  /** F30 — расширенная неопределённость при k = 2, кг/м³. */
  expandedUncertainty: number
}

/** H9 — погрешность поддержания температуры, °C. */
const TEMPERATURE_STABILITY = 0.2

/** H10 — предел повторяемости метода, кг/м³. */
const REPEATABILITY_LIMIT = 0.5

/** E26 — стандартная неопределённость отбора проб, кг/м³. */
const SAMPLING_STANDARD_UNCERTAINTY = 0.000289087233166163 * 1000

/** H23 — коэффициент чувствительности по плотности. */
const DENSITY_SENSITIVITY = 1

/** Коэффициент охвата k для доверительной вероятности P = 95 %. */
const COVERAGE_FACTOR = 2

/** Преобразует число с точкой или запятой в конечное числовое значение. */
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

  /**
   * H5 — погрешность ареометра, кг/м³.
   * H5 = 1 для АНТ-2; H5 = 0,5 для АНТ-1.
   */
  const hydrometerAccuracy = hydrometer === "ANT-2" ? 1 : 0.5

  /**
   * H6 — цена деления ареометра, кг/м³.
   * H6 = 1 для АНТ-2; H6 = 0,5 для АНТ-1.
   */
  const hydrometerDivision = hydrometer === "ANT-2" ? 1 : 0.5

  /**
   * H7 — погрешность термометра, °C.
   * H7 = 0,05 для ЛТ-300; H7 = 0,1 для другого термометра.
   */
  const thermometerAccuracy = thermometer === "LT-300" ? 0.05 : 0.1

  /**
   * H8 — цена деления термометра, °C.
   * H8 = 0,01 для ЛТ-300; H8 = 0,02 для другого термометра.
   */
  const thermometerDivision = thermometer === "LT-300" ? 0.01 : 0.02

  /**
   * J23 — коэффициент чувствительности по температуре.
   *
   * Математическая формула:
   *   J23 = (B19 − B15) / (D15 − 20)
   */
  const sensitivityTemperature = (meanDensity - density) / (temperature - 20)

  /**
   * E23 — стандартная неопределённость температуры испытания.
   *
   * Математическая формула:
   *   E23 = √( (H7/√3)² + (H8/2√3)² + (H9/√3)² )
   *   E23 = √( H7²/3 + H8²/12 + H9²/3 ) — возведение в квадрат с упрощением
   */
  const temperatureStandardUncertainty = Math.sqrt(
    thermometerAccuracy ** 2 / 3 +
      thermometerDivision ** 2 / 12 +
      TEMPERATURE_STABILITY ** 2 / 3,
  )

  /**
   * E24 — стандартная неопределённость плотности
   * при температуре испытания.
   *
   * Математическая формула:
   *   E24 = √( (H5/√3)² + (H6/2√3)² )
   *   E24 = √( H5²/3 + H6²/12 ) — возведение в квадрат с упрощением
   */
  const densityStandardUncertainty = Math.sqrt(
    hydrometerAccuracy ** 2 / 3 + hydrometerDivision ** 2 / 12,
  )

  /**
   * E25 — стандартная неопределённость повторяемости метода.
   *
   * Математическая формула:
   *   E25 = H10 / 2,8
   */
  const repeatabilityStandardUncertainty = REPEATABILITY_LIMIT / 2.8

  /**
   * E26 — стандартная неопределённость отбора проб.
   *
   * Математическая формула:
   *   E26 = 0,000289087233166163 · 1000
   */
  const samplingStandardUncertainty = SAMPLING_STANDARD_UNCERTAINTY

  /**
   * Сумма дисперсий — знаменатель для суммарной неопределённости и вкладов.
   *
   * Математическая формула:
   *   varianceSum = (E23 · J23)² + (E24 · H23)² + E25² + E26²
   */
  const varianceSum =
    (temperatureStandardUncertainty * sensitivityTemperature) ** 2 +
    (densityStandardUncertainty * DENSITY_SENSITIVITY) ** 2 +
    repeatabilityStandardUncertainty ** 2 +
    samplingStandardUncertainty ** 2

  /**
   * E27 — суммарная стандартная неопределённость результата измерений.
   *
   * Математическая формула:
   *   E27 = √( (E23 · J23)² + (E24 · H23)² + E25² + E26² )
   *   E27 = √varianceSum
   */
  const combinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F23 — процентный вклад температуры испытания.
   *
   * Математическая формула:
   *   F23 = ( (E23 · J23)² / varianceSum ) · 100
   */
  const temperatureContribution =
    ((temperatureStandardUncertainty * sensitivityTemperature) ** 2 / varianceSum) * 100

  /**
   * F24 — процентный вклад плотности при температуре испытания.
   *
   * Математическая формула:
   *   F24 = ( (E24 · H23)² / varianceSum ) · 100
   */
  const densityContribution =
    ((densityStandardUncertainty * DENSITY_SENSITIVITY) ** 2 / varianceSum) * 100

  /**
   * F25 — процентный вклад повторяемости метода.
   *
   * Математическая формула:
   *   F25 = ( E25² / varianceSum ) · 100
   */
  const repeatabilityContribution =
    (repeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F26 — процентный вклад отбора проб.
   *
   * Математическая формула:
   *   F26 = ( E26² / varianceSum ) · 100
   */
  const samplingContribution = (samplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F27 — сумма процентных вкладов.
   *
   * Математическая формула:
   *   F27 = F23 + F24 + F25 + F26
   */
  const totalContribution =
    temperatureContribution +
    densityContribution +
    repeatabilityContribution +
    samplingContribution

  /**
   * F30 — расширенная неопределённость при k = 2,
   * округлённая до 1 знака после запятой.
   *
   * Математическая формула:
   *   F30 = round( k · E27, 1 )
   *   F30 = round( 2 · √varianceSum, 1 )
   */
  const expandedUncertainty =
    Math.round(COVERAGE_FACTOR * combinedStandardUncertainty * 10) / 10

  return {
    sensitivityTemperature,
    temperatureStandardUncertainty,
    densityStandardUncertainty,
    repeatabilityStandardUncertainty,
    samplingStandardUncertainty,
    combinedStandardUncertainty,
    temperatureContribution,
    densityContribution,
    repeatabilityContribution,
    samplingContribution,
    totalContribution,
    expandedUncertainty,
  }
}
