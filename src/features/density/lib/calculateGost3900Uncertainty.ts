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
  SensitivityTemperature: number
  /** E23 — стандартная неопределённость температуры испытания. */
  TemperatureStandardUncertainty: number
  /** E24 — стандартная неопределённость плотности при температуре испытания. */
  DensityStandardUncertainty: number
  /** E25 — стандартная неопределённость повторяемости метода. */
  RepeatabilityStandardUncertainty: number
  /** E26 — стандартная неопределённость отбора проб. */
  SamplingStandardUncertainty: number
  /** E27 — суммарная стандартная неопределённость результата измерений. */
  CombinedStandardUncertainty: number
  /** F23 — процентный вклад температуры испытания. */
  TemperatureContribution: number
  /** F24 — процентный вклад плотности при температуре испытания. */
  DensityContribution: number
  /** F25 — процентный вклад повторяемости метода. */
  RepeatabilityContribution: number
  /** F26 — процентный вклад отбора проб. */
  SamplingContribution: number
  /** F27 — сумма процентных вкладов. */
  TotalContribution: number
  /** F30 — расширенная неопределённость при k = 2, кг/м³. */
  ExpandedUncertainty: number
}

/** H9 — погрешность поддержания температуры, °C. */
const H9TemperatureStability = 0.2

/** H10 — предел повторяемости метода, кг/м³. */
const H10RepeatabilityLimit = 0.5

/** E26 — стандартная неопределённость отбора проб, кг/м³. */
const E26SamplingStandardUncertainty = 0.000289087233166163 * 1000

/** H23 — коэффициент чувствительности по плотности. */
const H23DensitySensitivity = 1

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
  /** B15 — плотность при температуре испытания, кг/м³ (ρ₁). */
  const B15DensityAtTestTemperature = parseNumericValue(densityAtTestTemperature)
  /** D15 — температура пробы при испытании, °C (t₁). */
  const D15SampleTemperature = parseNumericValue(sampleTemperature)
  /** B19 — средняя плотность, приведённая к 20 °C, кг/м³ (ρср). */
  const B19MeanDensityAt20 = parseNumericValue(meanDensityAt20)

  if (
    B15DensityAtTestTemperature === null ||
    D15SampleTemperature === null ||
    B19MeanDensityAt20 === null ||
    D15SampleTemperature === 20
  ) {
    return null
  }

  /**
   * H5 — погрешность ареометра, кг/м³.
   * H5 = 1 для АНТ-2; H5 = 0,5 для АНТ-1.
   */
  const H5HydrometerAccuracy = hydrometer === "ANT-2" ? 1 : 0.5

  /**
   * H6 — цена деления ареометра, кг/м³.
   * H6 = 1 для АНТ-2; H6 = 0,5 для АНТ-1.
   */
  const H6HydrometerDivision = hydrometer === "ANT-2" ? 1 : 0.5

  /**
   * H7 — погрешность термометра, °C.
   * H7 = 0,05 для ЛТ-300; H7 = 0,1 для другого термометра.
   */
  const H7ThermometerAccuracy = thermometer === "LT-300" ? 0.05 : 0.1

  /**
   * H8 — цена деления термометра, °C.
   * H8 = 0,01 для ЛТ-300; H8 = 0,02 для другого термометра.
   */
  const H8ThermometerDivision = thermometer === "LT-300" ? 0.01 : 0.02

  /**
   * J23 — коэффициент чувствительности по температуре.
   *
   * Математическая формула:
   *   J23 = (B19 − B15) / (D15 − 20)
   */
  const J23SensitivityTemperature =
    (B19MeanDensityAt20 - B15DensityAtTestTemperature) / (D15SampleTemperature - 20)

  /**
   * E23 — стандартная неопределённость температуры испытания.
   *
   * Математическая формула:
   *   E23 = √( (H7/√3)² + (H8/2√3)² + (H9/√3)² )
   *   E23 = √( H7²/3 + H8²/12 + H9²/3 ) — возведение в квадрат с упрощением
   */
  const E23TemperatureStandardUncertainty = Math.sqrt(
    H7ThermometerAccuracy ** 2 / 3 +
      H8ThermometerDivision ** 2 / 12 +
      H9TemperatureStability ** 2 / 3,
  )

  /**
   * E24 — стандартная неопределённость плотности
   * при температуре испытания.
   *
   * Математическая формула:
   *   E24 = √( (H5/√3)² + (H6/2√3)² )
   *   E24 = √( H5²/3 + H6²/12 ) — возведение в квадрат с упрощением
   */
  const E24DensityStandardUncertainty = Math.sqrt(
    H5HydrometerAccuracy ** 2 / 3 + H6HydrometerDivision ** 2 / 12,
  )

  /**
   * E25 — стандартная неопределённость повторяемости метода.
   *
   * Математическая формула:
   *   E25 = H10 / 2,8
   */
  const E25RepeatabilityStandardUncertainty = H10RepeatabilityLimit / 2.8

  /**
   * Сумма дисперсий — знаменатель для суммарной неопределённости и вкладов.
   *
   * Математическая формула:
   *   varianceSum = (E23 · J23)² + (E24 · H23)² + E25² + E26²
   */
  const varianceSum =
    (E23TemperatureStandardUncertainty * J23SensitivityTemperature) ** 2 +
    (E24DensityStandardUncertainty * H23DensitySensitivity) ** 2 +
    E25RepeatabilityStandardUncertainty ** 2 +
    E26SamplingStandardUncertainty ** 2

  /**
   * E27 — суммарная стандартная неопределённость результата измерений.
   *
   * Математическая формула:
   *   E27 = √( (E23 · J23)² + (E24 · H23)² + E25² + E26² )
   *   E27 = √varianceSum
   */
  const E27CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F23 — процентный вклад температуры испытания.
   *
   * Математическая формула:
   *   F23 = ( (E23 · J23)² / varianceSum ) · 100
   */
  const F23TemperatureContribution =
    ((E23TemperatureStandardUncertainty * J23SensitivityTemperature) ** 2 / varianceSum) * 100

  /**
   * F24 — процентный вклад плотности при температуре испытания.
   *
   * Математическая формула:
   *   F24 = ( (E24 · H23)² / varianceSum ) · 100
   */
  const F24DensityContribution =
    ((E24DensityStandardUncertainty * H23DensitySensitivity) ** 2 / varianceSum) * 100

  /**
   * F25 — процентный вклад повторяемости метода.
   *
   * Математическая формула:
   *   F25 = ( E25² / varianceSum ) · 100
   */
  const F25RepeatabilityContribution =
    (E25RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F26 — процентный вклад отбора проб.
   *
   * Математическая формула:
   *   F26 = ( E26² / varianceSum ) · 100
   */
  const F26SamplingContribution =
    (E26SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F27 — сумма процентных вкладов.
   *
   * Математическая формула:
   *   F27 = F23 + F24 + F25 + F26
   */
  const F27TotalContribution =
    F23TemperatureContribution +
    F24DensityContribution +
    F25RepeatabilityContribution +
    F26SamplingContribution

  /**
   * F30 — расширенная неопределённость при k = 2,
   * округлённая до 1 знака после запятой.
   *
   * Математическая формула:
   *   F30 = round( k · E27, 1 )
   *   F30 = round( 2 · √varianceSum, 1 )
   */
  const F30ExpandedUncertainty =
    Math.round(COVERAGE_FACTOR * E27CombinedStandardUncertainty * 10) / 10

  return {
    SensitivityTemperature: J23SensitivityTemperature,
    TemperatureStandardUncertainty: E23TemperatureStandardUncertainty,
    DensityStandardUncertainty: E24DensityStandardUncertainty,
    RepeatabilityStandardUncertainty: E25RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E26SamplingStandardUncertainty,
    CombinedStandardUncertainty: E27CombinedStandardUncertainty,
    TemperatureContribution: F23TemperatureContribution,
    DensityContribution: F24DensityContribution,
    RepeatabilityContribution: F25RepeatabilityContribution,
    SamplingContribution: F26SamplingContribution,
    TotalContribution: F27TotalContribution,
    ExpandedUncertainty: F30ExpandedUncertainty,
  }
}
