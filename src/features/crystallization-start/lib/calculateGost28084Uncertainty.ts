/**
 * Оценивание неопределённости определения температуры начала кристаллизации
 * по ГОСТ 28084.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     B11 — Погрешность аппарата для определения температуры начала кристаллизации, °C
 *     B12 — Цена наименьшего разряда цифрового табло, °C
 *     B13 — Предел повторяемости, °C
 *
 *   Таблица 2 — Результаты измерений:
 *     B11 — Температура начала кристаллизации, °C
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E15 — стандартная неопределённость поправки на погрешность аппарата, °C
 *     E16 — стандартная неопределённость поправки на цену наименьшего разряда, °C
 *     E17 — стандартная неопределённость повторяемости метода, °C
 *     E18 — стандартная неопределённость отбора проб, °C
 *     E19 — суммарная стандартная неопределённость, °C
 *
 *     F15 — процентный вклад погрешности аппарата
 *     F16 — процентный вклад цены наименьшего разряда
 *     F17 — процентный вклад повторяемости
 *     F18 — процентный вклад отбора проб
 *     F19 — сумма вкладов
 *
 *     D19 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 28084.
 * Температура берётся из среднего результата испытания
 * «Температура начала кристаллизации, °C по ГОСТ 28084 по п.4.3».
 *
 * @property measuredTemperature температура начала кристаллизации tн.к., °C.
 */
export type Gost28084UncertaintyInput = {
  measuredTemperature: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 28084.
 * @property ApparatusAccuracy B11 — погрешность аппарата, °C.
 * @property ApparatusAccuracyStandardUncertainty E15 — стандартная неопределённость погрешности аппарата, °C.
 * @property DisplayResolutionStandardUncertainty E16 — стандартная неопределённость цены наименьшего разряда, °C.
 * @property RepeatabilityStandardUncertainty E17 — стандартная неопределённость повторяемости метода, °C.
 * @property SamplingStandardUncertainty E18 — стандартная неопределённость отбора проб, °C.
 * @property CombinedStandardUncertainty E19 — суммарная стандартная неопределённость, °C.
 * @property ApparatusAccuracyContribution F15 — процентный вклад погрешности аппарата.
 * @property DisplayResolutionContribution F16 — процентный вклад цены наименьшего разряда.
 * @property RepeatabilityContribution F17 — процентный вклад повторяемости.
 * @property SamplingContribution F18 — процентный вклад отбора проб.
 * @property TotalContribution F19 — сумма процентных вкладов.
 * @property ExpandedUncertainty D19 — расширенная неопределённость при k = 2, °C.
 */
export type Gost28084UncertaintyResult = {
  ApparatusAccuracy: number
  ApparatusAccuracyStandardUncertainty: number
  DisplayResolutionStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  ApparatusAccuracyContribution: number
  DisplayResolutionContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** B12 — Цена наименьшего разряда цифрового табло, °C. */
const B12DisplayResolution = 0.1

/** B13 — Предел повторяемости, °C. */
const B13RepeatabilityLimit = 2

/** E18 — стандартная неопределённость отбора проб, °C. */
const E18SamplingStandardUncertainty = 0.039528470752111

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
 * при k = 2. Если температура начала кристаллизации некорректна, расчёт невозможен.
 */
export const calculateGost28084Uncertainty = ({
  measuredTemperature,
}: Gost28084UncertaintyInput): Gost28084UncertaintyResult | null => {
  /**
   * Температура начала кристаллизации, °C.
   * По ней выбирается погрешность аппарата B11.
   */
  const measuredTemperatureValue = parseNumericValue(measuredTemperature)
  if (measuredTemperatureValue === null) return null

  /**
   * B11 — Погрешность аппарата, °C.
   *
   * Формула:
   *   B11 = 1, если t ≤ −40
   *   B11 = 1,5 иначе
   */
  const B11ApparatusAccuracy = measuredTemperatureValue >= -40 ? 1 : 1.5

  /**
   * E15 — стандартная неопределённость поправки на погрешность аппарата, °C.
   *
   * Формула:
   *   E15 = B11 / √3
   */
  const E15ApparatusAccuracyStandardUncertainty = B11ApparatusAccuracy / Math.sqrt(3)

  /**
   * E16 — стандартная неопределённость поправки на цену наименьшего разряда, °C.
   *
   * Формула:
   *   E16 = B12 / (2 · √3)
   */
  const E16DisplayResolutionStandardUncertainty = B12DisplayResolution / (2 * Math.sqrt(3))

  /**
   * E17 — стандартная неопределённость повторяемости метода, °C.
   *
   * Формула:
   *   E17 = B13 / 2,8
   */
  const E17RepeatabilityStandardUncertainty = B13RepeatabilityLimit / 2.8

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E15² + E16² + E17² + E18²
   */
  const varianceSum =
    E15ApparatusAccuracyStandardUncertainty ** 2 +
    E16DisplayResolutionStandardUncertainty ** 2 +
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
   * F15 — процентный вклад погрешности аппарата.
   *
   * Формула:
   *   F15 = (E15² / varianceSum) · 100
   */
  const F15ApparatusAccuracyContribution =
    (E15ApparatusAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F16 — процентный вклад цены наименьшего разряда.
   *
   * Формула:
   *   F16 = (E16² / varianceSum) · 100
   */
  const F16DisplayResolutionContribution =
    (E16DisplayResolutionStandardUncertainty ** 2 / varianceSum) * 100

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
    F15ApparatusAccuracyContribution +
    F16DisplayResolutionContribution +
    F17RepeatabilityContribution +
    F18SamplingContribution

  /**
   * D19 — расширенная неопределённость при k = 2, °C.
   * Округление до 1 знака после запятой.
   *
   * Формула:
   *   D19 = round(2 · E19, 1)
   */
  const D19ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E19CombinedStandardUncertainty * 10) / 10

  return {
    ApparatusAccuracy: B11ApparatusAccuracy,
    ApparatusAccuracyStandardUncertainty: E15ApparatusAccuracyStandardUncertainty,
    DisplayResolutionStandardUncertainty: E16DisplayResolutionStandardUncertainty,
    RepeatabilityStandardUncertainty: E17RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E18SamplingStandardUncertainty,
    CombinedStandardUncertainty: E19CombinedStandardUncertainty,
    ApparatusAccuracyContribution: F15ApparatusAccuracyContribution,
    DisplayResolutionContribution: F16DisplayResolutionContribution,
    RepeatabilityContribution: F17RepeatabilityContribution,
    SamplingContribution: F18SamplingContribution,
    TotalContribution: F19TotalContribution,
    ExpandedUncertainty: D19ExpandedUncertainty,
  }
}
