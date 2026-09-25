/**
 * Оценивание неопределённости определения плотности антифризов (ρ)
 * по ГОСТ 18995.1.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     B5  — Ареометр АОН-1, погрешность, г/см³
 *     B6  — Цена деления шкалы ареометра, г/см³
 *     B7  — Погрешность термометра, °C
 *     B8  — Цена единицы младшего разряда измеряемой температуры, °C
 *     B9  — Предел повторяемости, г/см³
 *
 *   Таблица 4 — Среднее значение:
 *     F14 — Температура испытания (средняя), °C
 *     G14 — Плотность (средняя), г/см³
 *
 *   Таблица 5 — Бюджет суммарной стандартной неопределённости:
 *     D21 — стандартная неопределённость плотности
 *     D22 — стандартная неопределённость температуры
 *     D23 — стандартная неопределённость повторяемости
 *     D24 — стандартная неопределённость отбора проб
 *
 *     E21 — относительная стандартная неопределённость плотности
 *     E22 — относительная стандартная неопределённость температуры
 *     E23 — относительная стандартная неопределённость повторяемости
 *     E24 — относительная стандартная неопределённость отбора проб
 *
 *     D25 — суммарная стандартная неопределённость
 *
 *     F21 — процентный вклад плотности
 *     F22 — процентный вклад температуры
 *     F23 — процентный вклад повторяемости
 *     F24 — процентный вклад отбора проб
 *     F25 — сумма вкладов
 *
 *     F28 — расширенная неопределённость (k = 2), г/см³
 */

/** Тип термометра, определяющий B7 и B8. */
export type Gost18995ThermometerType = "LT-300" | "other"

/** Входные данные для расчёта неопределённости по ГОСТ 18995.1. */
export type Gost18995UncertaintyInput = {
  /** G14 — плотность (средняя), г/см³. */
  meanDensity: string | number
  /** Тип термометра для выбора B7 и B8. */
  thermometer: Gost18995ThermometerType
}

/** Бюджет и итоговый результат расчёта неопределённости по ГОСТ 18995.1. */
export type Gost18995UncertaintyResult = {
  /** D21 — стандартная неопределённость плотности, измеренной ареометром, г/см³. */
  DensityStandardUncertainty: number
  /** D22 — стандартная неопределённость температуры, измеренной термометром, °C. */
  TemperatureStandardUncertainty: number
  /** D23 — стандартная неопределённость повторяемости метода, г/см³. */
  RepeatabilityStandardUncertainty: number
  /** D24 — стандартная неопределённость отбора проб, г/см³. */
  SamplingStandardUncertainty: number
  /** E21 — относительная стандартная неопределённость плотности. */
  RelativeDensityStandardUncertainty: number
  /** E22 — относительная стандартная неопределённость температуры. */
  RelativeTemperatureStandardUncertainty: number
  /** E23 — относительная стандартная неопределённость повторяемости метода. */
  RelativeRepeatabilityStandardUncertainty: number
  /** E24 — относительная стандартная неопределённость отбора проб. */
  RelativeSamplingStandardUncertainty: number
  /** D25 — суммарная стандартная неопределённость, г/см³. */
  CombinedStandardUncertainty: number
  /** F21 — процентный вклад плотности. */
  DensityContribution: number
  /** F22 — процентный вклад температуры. */
  TemperatureContribution: number
  /** F23 — процентный вклад повторяемости метода. */
  RepeatabilityContribution: number
  /** F24 — процентный вклад отбора проб. */
  SamplingContribution: number
  /** F25 — сумма процентных вкладов. */
  TotalContribution: number
  /** F28 — расширенная неопределённость при k = 2, г/см³. */
  ExpandedUncertainty: number
}

/** B5 — Ареометр АОН-1, погрешность, г/см³. */
const B5HydrometerAccuracy = 0.001

/** B6 — Цена деления шкалы ареометра, г/см³. */
const B6HydrometerDivision = 0.001

/**
 * B9 — Предел повторяемости, г/см³.
 * По таблице: 0.001.
 */
const B9RepeatabilityLimit = 0.001

/** F14 — Температура испытания (средняя), °C. */
const F14MeanTestTemperature = 20

/**
 * D24 — стандартная неопределённость отбора проб, г/см³.
 *
 * Формула:
 *   D24 = 0.00045316348318951
 */
const D24SamplingStandardUncertainty = 0.00045316348318951

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
 * при k = 2. Если средняя плотность некорректна или равна нулю,
 * расчёт по относительным неопределённостям невозможен.
 */
export const calculateGost18995Uncertainty = ({
  meanDensity,
  thermometer,
}: Gost18995UncertaintyInput): Gost18995UncertaintyResult | null => {
  /**
   * G14 — Плотность (средняя), г/см³.
   * Значение берётся из «Плотность при 20°C, г/см³ по ГОСТ 18995.1»
   * из «Среднее значение ρ₂₀».
   */
  const G14MeanDensity = parseNumericValue(meanDensity)

  if (G14MeanDensity === null || G14MeanDensity <= 0) {
    return null
  }

  /**
   * B7 — Погрешность термометра, °C.
   * То есть:
   *   B7 = 0.05 если термометр ЛТ-300
   *   B7 = 0.1  иначе
   */
  const B7ThermometerAccuracy = thermometer === "LT-300" ? 0.05 : 0.1

  /**
   * B8 — Цена единицы младшего разряда измеряемой температуры, °C.
   *
   * То есть:
   *   B8 = 0.05 если термометр ЛТ-300
   *   B8 = 0.1  иначе
   */
  const B8ThermometerResolution = thermometer === "LT-300" ? 0.05 : 0.1

  /**
   * D21 — стандартная неопределённость плотности,
   * измеренной ареометром, г/см³.
   *
   * Математическая формула:
   *   D21 = √( (B5/√3)² + (B6/(2·√3))² )
   *   D21 = √( B5²/3 + B6²/12 ) — возведение в квадрат с упрощением
   */
  const D21DensityStandardUncertainty = Math.sqrt(
    B5HydrometerAccuracy ** 2 / 3 + B6HydrometerDivision ** 2 / 12,
  )

  /**
   * D22 — стандартная неопределённость температуры,
   * измеренной термометром, °C.
   *
   * Математическая формула:
   *   D22 = √( (B7/√3)² + (B8/(2·√3))² )
   *   D22 = √( B7²/3 + B8²/12 ) — возведение в квадрат с упрощением
   */
  const D22TemperatureStandardUncertainty = Math.sqrt(
    B7ThermometerAccuracy ** 2 / 3 + B8ThermometerResolution ** 2 / 12,
  )

  /**
   * D23 — стандартная неопределённость повторяемости метода, г/см³.
   *
   * Формула:
   *   D23 = B9 / 2.8
   */
  const D23RepeatabilityStandardUncertainty = B9RepeatabilityLimit / 2.8

  /**
   * E21 — относительная стандартная неопределённость плотности,
   * измеренной ареометром.
   *
   * Математическая формула:
   *   E21 = D21 / G14
   */
  const E21RelativeDensityStandardUncertainty =
    D21DensityStandardUncertainty / G14MeanDensity

  /**
   * E22 — относительная стандартная неопределённость температуры,
   * измеренной термометром.
   *
   * Математическая формула:
   *   E22 = D22 / F14
   */
  const E22RelativeTemperatureStandardUncertainty =
    D22TemperatureStandardUncertainty / F14MeanTestTemperature

  /**
   * E23 — относительная стандартная неопределённость повторяемости метода.
   *
   * Математическая формула:
   *   E23 = D23 / G14
   */
  const E23RelativeRepeatabilityStandardUncertainty =
    D23RepeatabilityStandardUncertainty / G14MeanDensity

  /**
   * E24 — относительная стандартная неопределённость отбора проб.
   *
   * Математическая формула:
   *   E24 = D24 / G14
   */
  const E24RelativeSamplingStandardUncertainty =
    D24SamplingStandardUncertainty / G14MeanDensity

  /**
   * Сумма квадратов относительных неопределённостей —
   * знаменатель для суммарной неопределённости и вкладов.
   *
   * Математическая формула:
   *   relativeVarianceSum = E21² + E22² + E23² + E24²
   */
  const relativeVarianceSum =
    E21RelativeDensityStandardUncertainty ** 2 +
    E22RelativeTemperatureStandardUncertainty ** 2 +
    E23RelativeRepeatabilityStandardUncertainty ** 2 +
    E24RelativeSamplingStandardUncertainty ** 2

  /**
   * D25 — суммарная стандартная неопределённость, г/см³.
   * Рассчитана через относительные неопределённости.
   *
   * Excel: =C24*КОРЕНЬ(E21^2 + E22^2 + E23^2 + E24^2)
   *
   * Формула:
   *   D25 = G14 · √( E21² + E22² + E23² + E24² )
   */
  const D25CombinedStandardUncertainty =
    G14MeanDensity * Math.sqrt(relativeVarianceSum)

  /**
   * F21 — процентный вклад плотности.
   *
   * Формула:
   *   F21 = ( E21² / (E21² + E22² + E23² + E24²) ) · 100
   */
  const F21DensityContribution =
    (E21RelativeDensityStandardUncertainty ** 2 / relativeVarianceSum) * 100

  /**
   * F22 — процентный вклад температуры.
   *
   * Формула:
   *   F22 = ( E22² / (E21² + E22² + E23² + E24²) ) · 100
   */
  const F22TemperatureContribution =
    (E22RelativeTemperatureStandardUncertainty ** 2 / relativeVarianceSum) * 100

  /**
   * F23 — процентный вклад повторяемости метода.
   *
   * Формула:
   *   F23 = ( E23² / (E21² + E22² + E23² + E24²) ) · 100
   */
  const F23RepeatabilityContribution =
    (E23RelativeRepeatabilityStandardUncertainty ** 2 / relativeVarianceSum) * 100

  /**
   * F24 — процентный вклад отбора проб.
   *
   * Формула:
   *   F24 = ( E24² / (E21² + E22² + E23² + E24²) ) · 100
   */
  const F24SamplingContribution =
    (E24RelativeSamplingStandardUncertainty ** 2 / relativeVarianceSum) * 100

  /**
   * F25 — сумма процентных вкладов.
   *
   * Формула:
   *   F25 = F21 + F22 + F23 + F24
   */
  const F25TotalContribution =
    F21DensityContribution +
    F22TemperatureContribution +
    F23RepeatabilityContribution +
    F24SamplingContribution

  /**
   * F28 — расширенная неопределённость при k = 2,
   * округлённая до 3 знаков после запятой (г/см³).
   *
   * Формула:
   *   F28 = round( 2 · D25, 3 )
   */
  const F28ExpandedUncertainty =
    Math.round(COVERAGE_FACTOR * D25CombinedStandardUncertainty * 1000) / 1000

  return {
    DensityStandardUncertainty: D21DensityStandardUncertainty,
    TemperatureStandardUncertainty: D22TemperatureStandardUncertainty,
    RepeatabilityStandardUncertainty: D23RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: D24SamplingStandardUncertainty,
    RelativeDensityStandardUncertainty: E21RelativeDensityStandardUncertainty,
    RelativeTemperatureStandardUncertainty: E22RelativeTemperatureStandardUncertainty,
    RelativeRepeatabilityStandardUncertainty: E23RelativeRepeatabilityStandardUncertainty,
    RelativeSamplingStandardUncertainty: E24RelativeSamplingStandardUncertainty,
    CombinedStandardUncertainty: D25CombinedStandardUncertainty,
    DensityContribution: F21DensityContribution,
    TemperatureContribution: F22TemperatureContribution,
    RepeatabilityContribution: F23RepeatabilityContribution,
    SamplingContribution: F24SamplingContribution,
    TotalContribution: F25TotalContribution,
    ExpandedUncertainty: F28ExpandedUncertainty,
  }
}
