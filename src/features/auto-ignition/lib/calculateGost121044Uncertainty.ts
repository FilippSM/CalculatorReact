/**
 * Оценивание неопределённости определения температуры самовоспламенения (T), °C
 * по ГОСТ 12.1.044 п. 31.
 *
 *   Таблица 1 — Исходные данные:
 *     H5 — Погрешность поддержания температуры бани, °C
 *     H6 — Повторяемость, °C (= ОКРУГЛ(0,02·B10; 0))
 *
 *   Таблица 2 — Результаты измерений:
 *     B10 — Температура самовоспламенения, °C
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E14 — стандартная неопределённость поправки на погрешность поддержания
 *           температуры бани, °C
 *     E15 — стандартная неопределённость повторяемости, °C
 *     E16 — стандартная неопределённость отбора проб, °C
 *     E17 — суммарная стандартная неопределённость, °C
 *
 *     F14 — процентный вклад погрешности поддержания температуры бани
 *     F15 — процентный вклад повторяемости
 *     F16 — процентный вклад отбора проб
 *     F17 — сумма вкладов
 *
 *     D17 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 12.1.044 п. 31.
 * Температура берётся из среднего результата испытания
 * «Температура самовоспламенения, °С по ГОСТ 12.1.044 п. 31».
 *
 * @property measuredAutoIgnitionTemperature температура самовоспламенения tср, °C.
 */
export type Gost121044UncertaintyInput = {
  measuredAutoIgnitionTemperature: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 12.1.044 п. 31.
 * @property BathTempAccuracy H5 — погрешность поддержания температуры бани, °C.
 * @property RepeatabilityLimit H6 — повторяемость, °C.
 * @property BathTempAccuracyStandardUncertainty E14 — стандартная неопределённость погрешности поддержания температуры бани, °C.
 * @property RepeatabilityStandardUncertainty E15 — стандартная неопределённость повторяемости, °C.
 * @property SamplingStandardUncertainty E16 — стандартная неопределённость отбора проб, °C.
 * @property CombinedStandardUncertainty E17 — суммарная стандартная неопределённость, °C.
 * @property BathTempAccuracyContribution F14 — процентный вклад погрешности поддержания температуры бани.
 * @property RepeatabilityContribution F15 — процентный вклад повторяемости.
 * @property SamplingContribution F16 — процентный вклад отбора проб.
 * @property TotalContribution F17 — сумма процентных вкладов.
 * @property ExpandedUncertainty D17 — расширенная неопределённость при k = 2, °C.
 */
export type Gost121044UncertaintyResult = {
  BathTempAccuracy: number
  RepeatabilityLimit: number
  BathTempAccuracyStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  BathTempAccuracyContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H5 — Погрешность поддержания температуры бани, °C. */
const H5BathTempAccuracy = 2

/** E16 — стандартная неопределённость отбора проб, °C. */
const E16SamplingStandardUncertainty = 3.31191032487294

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
 * при k = 2. Если температура самовоспламенения некорректна, расчёт невозможен.
 */
export const calculateGost121044Uncertainty = ({
  measuredAutoIgnitionTemperature,
}: Gost121044UncertaintyInput): Gost121044UncertaintyResult | null => {
  /**
   * B10 — Температура самовоспламенения, °C.
   * По ней рассчитывается предел повторяемости H6.
   */
  const measuredTemperatureValue = parseNumericValue(measuredAutoIgnitionTemperature)
  if (measuredTemperatureValue === null) return null

  /**
   * H6 — Повторяемость, °C.
   *
   * Формула:
   *   H6 = ОКРУГЛ(0,02 · B10; 0)
   */
  const H6RepeatabilityLimit = Math.round(0.02 * measuredTemperatureValue)

  /**
   * E14 — стандартная неопределённость поправки на погрешность
   * поддержания температуры бани, °C.
   *
   * Формула:
   *   E14 = H5 / √3
   */
  const E14BathTempAccuracyStandardUncertainty = H5BathTempAccuracy / Math.sqrt(3)

  /**
   * E15 — стандартная неопределённость повторяемости, °C.
   *
   * Формула:
   *   E15 = H6 / (2,8 · √2)
   */
  const E15RepeatabilityStandardUncertainty = H6RepeatabilityLimit / (2.8 * Math.sqrt(2))

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E14² + E15² + E16²
   */
  const varianceSum =
    E14BathTempAccuracyStandardUncertainty ** 2 +
    E15RepeatabilityStandardUncertainty ** 2 +
    E16SamplingStandardUncertainty ** 2

  /**
   * E17 — суммарная стандартная неопределённость, °C.
   *
   * Формула:
   *   E17 = √varianceSum
   */
  const E17CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F14 — процентный вклад погрешности поддержания температуры бани.
   *
   * Формула:
   *   F14 = (E14² / varianceSum) · 100
   */
  const F14BathTempAccuracyContribution =
    (E14BathTempAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F15 — процентный вклад повторяемости.
   *
   * Формула:
   *   F15 = (E15² / varianceSum) · 100
   */
  const F15RepeatabilityContribution =
    (E15RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F16 — процентный вклад отбора проб.
   *
   * Формула:
   *   F16 = (E16² / varianceSum) · 100
   */
  const F16SamplingContribution = (E16SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F17 — сумма процентных вкладов.
   *
   * Формула:
   *   F17 = F14 + F15 + F16
   */
  const F17TotalContribution =
    F14BathTempAccuracyContribution + F15RepeatabilityContribution + F16SamplingContribution

  /**
   * D17 — расширенная неопределённость при k = 2, °C.
   * Округление до целого.
   *
   * Формула:
   *   D17 = round(2 · E17)
   */
  const D17ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E17CombinedStandardUncertainty)

  return {
    BathTempAccuracy: H5BathTempAccuracy,
    RepeatabilityLimit: H6RepeatabilityLimit,
    BathTempAccuracyStandardUncertainty: E14BathTempAccuracyStandardUncertainty,
    RepeatabilityStandardUncertainty: E15RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E16SamplingStandardUncertainty,
    CombinedStandardUncertainty: E17CombinedStandardUncertainty,
    BathTempAccuracyContribution: F14BathTempAccuracyContribution,
    RepeatabilityContribution: F15RepeatabilityContribution,
    SamplingContribution: F16SamplingContribution,
    TotalContribution: F17TotalContribution,
    ExpandedUncertainty: D17ExpandedUncertainty,
  }
}
