/**
 * Оценивание неопределённости определения температуры текучести (T), °C
 * по ГОСТ 20287 (Метод А).
 *
 *   Таблица 1 — Исходные данные:
 *     H5 — Погрешность измерения температуры пробы, °C
 *     H6 — Погрешность поддержания температуры бани, °C
 *     H7 — Повторяемость, °C
 *
 *   Таблица 2 — Результаты измерений:
 *     B11 — Температура текучести, °C
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E15 — стандартная неопределённость поправки на погрешность измерения
 *           температуры пробы, °C
 *     E16 — стандартная неопределённость поправки на погрешность поддержания
 *           температуры бани, °C
 *     E17 — стандартная неопределённость повторяемости, °C
 *     E18 — стандартная неопределённость отбора проб, °C
 *     E19 — суммарная стандартная неопределённость, °C
 *
 *     F15 — процентный вклад погрешности измерения температуры пробы
 *     F16 — процентный вклад погрешности поддержания температуры бани
 *     F17 — процентный вклад повторяемости
 *     F18 — процентный вклад отбора проб
 *     F19 — сумма вкладов
 *
 *     D19 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 20287 (Метод А).
 * Температура берётся из среднего результата испытания
 * «Температура текучести,°С по ГОСТ 20287 (Метод А)».
 *
 * @property measuredPourPoint температура текучести tср, °C.
 */
export type Gost20287UncertaintyInput = {
  measuredPourPoint: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 20287 (Метод А).
 * @property SampleTempAccuracy H5 — погрешность измерения температуры пробы, °C.
 * @property BathTempAccuracy H6 — погрешность поддержания температуры бани, °C.
 * @property RepeatabilityLimit H7 — повторяемость, °C.
 * @property SampleTempAccuracyStandardUncertainty E15 — стандартная неопределённость погрешности измерения температуры пробы, °C.
 * @property BathTempAccuracyStandardUncertainty E16 — стандартная неопределённость погрешности поддержания температуры бани, °C.
 * @property RepeatabilityStandardUncertainty E17 — стандартная неопределённость повторяемости, °C.
 * @property SamplingStandardUncertainty E18 — стандартная неопределённость отбора проб, °C.
 * @property CombinedStandardUncertainty E19 — суммарная стандартная неопределённость, °C.
 * @property SampleTempAccuracyContribution F15 — процентный вклад погрешности измерения температуры пробы.
 * @property BathTempAccuracyContribution F16 — процентный вклад погрешности поддержания температуры бани.
 * @property RepeatabilityContribution F17 — процентный вклад повторяемости.
 * @property SamplingContribution F18 — процентный вклад отбора проб.
 * @property TotalContribution F19 — сумма процентных вкладов.
 * @property ExpandedUncertainty D19 — расширенная неопределённость при k = 2, °C.
 */
export type Gost20287UncertaintyResult = {
  SampleTempAccuracy: number
  BathTempAccuracy: number
  RepeatabilityLimit: number
  SampleTempAccuracyStandardUncertainty: number
  BathTempAccuracyStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  SampleTempAccuracyContribution: number
  BathTempAccuracyContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H5 — Погрешность измерения температуры пробы, °C. */
const H5SampleTempAccuracy = 0.1

/** H6 — Погрешность поддержания температуры бани, °C. */
const H6BathTempAccuracy = 0.5

/** H7 — Повторяемость, °C. */
const H7RepeatabilityLimit = 6

/** E18 — стандартная неопределённость отбора проб, °C. */
const E18SamplingStandardUncertainty = 0.353553390593274

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
 * при k = 2. Если температура текучести некорректна, расчёт невозможен.
 */
export const calculateGost20287Uncertainty = ({
  measuredPourPoint,
}: Gost20287UncertaintyInput): Gost20287UncertaintyResult | null => {
  /**
   * B11 — Температура текучести, °C.
   * Бюджет не зависит от величины tср, но без корректного результата расчёт не выполняется.
   */
  const measuredPourPointValue = parseNumericValue(measuredPourPoint)
  if (measuredPourPointValue === null) return null

  /**
   * E15 — стандартная неопределённость поправки на погрешность
   * измерения температуры пробы, °C.
   *
   * Формула:
   *   E15 = H5 / √3
   */
  const E15SampleTempAccuracyStandardUncertainty = H5SampleTempAccuracy / Math.sqrt(3)

  /**
   * E16 — стандартная неопределённость поправки на погрешность
   * поддержания температуры бани, °C.
   *
   * Формула:
   *   E16 = H6 / √3
   */
  const E16BathTempAccuracyStandardUncertainty = H6BathTempAccuracy / Math.sqrt(3)

  /**
   * E17 — стандартная неопределённость повторяемости, °C.
   *
   * Формула:
   *   E17 = H7 / (2,8 · √2)
   */
  const E17RepeatabilityStandardUncertainty = H7RepeatabilityLimit / (2.8 * Math.sqrt(2))

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E15² + E16² + E17² + E18²
   */
  const varianceSum =
    E15SampleTempAccuracyStandardUncertainty ** 2 +
    E16BathTempAccuracyStandardUncertainty ** 2 +
    E17RepeatabilityStandardUncertainty ** 2 +
    E18SamplingStandardUncertainty ** 2

  /**
   * E19 — суммарная стандартная неопределённость, °C.
   *
   * Формула:
   *   E19 = √varianceSum
   */
  const E19CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F15 — процентный вклад погрешности измерения температуры пробы.
   *
   * Формула:
   *   F15 = (E15² / varianceSum) · 100
   */
  const F15SampleTempAccuracyContribution =
    (E15SampleTempAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F16 — процентный вклад погрешности поддержания температуры бани.
   *
   * Формула:
   *   F16 = (E16² / varianceSum) · 100
   */
  const F16BathTempAccuracyContribution =
    (E16BathTempAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F17 — процентный вклад повторяемости.
   *
   * Формула:
   *   F17 = (E17² / varianceSum) · 100
   */
  const F17RepeatabilityContribution =
    (E17RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F18 — процентный вклад отбора проб.
   *
   * Формула:
   *   F18 = (E18² / varianceSum) · 100
   */
  const F18SamplingContribution = (E18SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F19 — сумма процентных вкладов.
   *
   * Формула:
   *   F19 = F15 + F16 + F17 + F18
   */
  const F19TotalContribution =
    F15SampleTempAccuracyContribution +
    F16BathTempAccuracyContribution +
    F17RepeatabilityContribution +
    F18SamplingContribution

  /**
   * D19 — расширенная неопределённость при k = 2, °C.
   * Округление до целого.
   *
   * Формула:
   *   D19 = round(2 · E19)
   */
  const D19ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E19CombinedStandardUncertainty)

  return {
    SampleTempAccuracy: H5SampleTempAccuracy,
    BathTempAccuracy: H6BathTempAccuracy,
    RepeatabilityLimit: H7RepeatabilityLimit,
    SampleTempAccuracyStandardUncertainty: E15SampleTempAccuracyStandardUncertainty,
    BathTempAccuracyStandardUncertainty: E16BathTempAccuracyStandardUncertainty,
    RepeatabilityStandardUncertainty: E17RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E18SamplingStandardUncertainty,
    CombinedStandardUncertainty: E19CombinedStandardUncertainty,
    SampleTempAccuracyContribution: F15SampleTempAccuracyContribution,
    BathTempAccuracyContribution: F16BathTempAccuracyContribution,
    RepeatabilityContribution: F17RepeatabilityContribution,
    SamplingContribution: F18SamplingContribution,
    TotalContribution: F19TotalContribution,
    ExpandedUncertainty: D19ExpandedUncertainty,
  }
}
