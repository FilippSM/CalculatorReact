/**
 * Оценивание неопределённости определения температуры кипения при давлении 101,3 кПа
 * по ГОСТ 18995.6.
 *
 *   Таблица 1 — Исходные данные:
 *     H5 — Погрешность термометра, °C
 *     H6 — Цена деления термометра, °C
 *     H7 — Повторяемость, °C
 *
 *   Таблица 2 — Результаты измерений:
 *     B11 — Температура кипения, °C
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E15 — стандартная неопределённость температуры испытания, °C
 *     E16 — стандартная неопределённость повторяемости, °C
 *     E17 — суммарная стандартная неопределённость, °C
 *
 *     F15 — процентный вклад температуры испытания
 *     F16 — процентный вклад повторяемости
 *     F17 — сумма вкладов
 *
 *     D19 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 18995.6.
 * Температура берётся из среднего результата испытания
 * «Температура кипения при давлении 101,3 кПа (760 мм. рт. ст.), °C по ГОСТ 18995.6».
 *
 * @property measuredTemperature температура кипения tср, °C.
 */
export type Gost18995UncertaintyInput = {
  measuredTemperature: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 18995.6.
 * @property RepeatabilityLimit H7 — предел повторяемости, °C.
 * @property TestTemperatureStandardUncertainty E15 — стандартная неопределённость температуры испытания, °C.
 * @property RepeatabilityStandardUncertainty E16 — стандартная неопределённость повторяемости, °C.
 * @property CombinedStandardUncertainty E17 — суммарная стандартная неопределённость, °C.
 * @property TestTemperatureContribution F15 — процентный вклад температуры испытания.
 * @property RepeatabilityContribution F16 — процентный вклад повторяемости.
 * @property TotalContribution F17 — сумма процентных вкладов.
 * @property ExpandedUncertainty D19 — расширенная неопределённость при k = 2, °C.
 */
export type Gost18995UncertaintyResult = {
  RepeatabilityLimit: number
  TestTemperatureStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  CombinedStandardUncertainty: number
  TestTemperatureContribution: number
  RepeatabilityContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H5 — Погрешность термометра, °C. */
const H5ThermometerAccuracy = 0.05

/** H6 — Цена деления термометра, °C. */
const H6ThermometerDivision = 0.01

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
 * при k = 2. Если температура кипения некорректна, расчёт невозможен.
 */
export const calculateGost18995Uncertainty = ({
  measuredTemperature,
}: Gost18995UncertaintyInput): Gost18995UncertaintyResult | null => {
  /**
   * B11 — Температура кипения, °C.
   * По ней выбирается предел повторяемости H7.
   */
  const measuredTemperatureValue = parseNumericValue(measuredTemperature)
  if (measuredTemperatureValue === null) return null

  /**
   * H7 — Повторяемость, °C.
   *
   * Формула:
   *   H7 = 1,4, если t ≤ 100
   *   H7 = 2,5 иначе
   */
  const H7RepeatabilityLimit = measuredTemperatureValue <= 100 ? 1.4 : 2.5

  /**
   * E15 — стандартная неопределённость температуры испытания, °C.
   *
   * Формула:
   *   E15 = √( (H5 / √3)² + (H6 / (2 · √3))² )
   */
  const E15TestTemperatureStandardUncertainty = Math.sqrt(
    H5ThermometerAccuracy ** 2 / 3 + H6ThermometerDivision ** 2 / (4 * 3),
  )

  /**
   * E16 — стандартная неопределённость повторяемости, °C.
   *
   * Формула:
   *   E16 = H7 / (2,8 · √2)
   */
  const E16RepeatabilityStandardUncertainty = H7RepeatabilityLimit / (2.8 * Math.sqrt(2))

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E15² + E16²
   */
  const varianceSum =
    E15TestTemperatureStandardUncertainty ** 2 + E16RepeatabilityStandardUncertainty ** 2

  /**
   * E17 — суммарная стандартная неопределённость, °C.
   *
   * Формула:
   *   E17 = √varianceSum
   */
  const E17CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F15 — процентный вклад температуры испытания.
   *
   * Формула:
   *   F15 = (E15² / varianceSum) · 100
   */
  const F15TestTemperatureContribution =
    (E15TestTemperatureStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F16 — процентный вклад повторяемости.
   *
   * Формула:
   *   F16 = (E16² / varianceSum) · 100
   */
  const F16RepeatabilityContribution =
    (E16RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F17 — сумма процентных вкладов.
   *
   * Формула:
   *   F17 = F15 + F16
   */
  const F17TotalContribution = F15TestTemperatureContribution + F16RepeatabilityContribution

  /**
   * D19 — расширенная неопределённость при k = 2, °C.
   * Округление до 1 знака после запятой.
   *
   * Формула:
   *   D19 = round(2 · E17, 1)
   */
  const D19ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E17CombinedStandardUncertainty * 10) / 10

  return {
    RepeatabilityLimit: H7RepeatabilityLimit,
    TestTemperatureStandardUncertainty: E15TestTemperatureStandardUncertainty,
    RepeatabilityStandardUncertainty: E16RepeatabilityStandardUncertainty,
    CombinedStandardUncertainty: E17CombinedStandardUncertainty,
    TestTemperatureContribution: F15TestTemperatureContribution,
    RepeatabilityContribution: F16RepeatabilityContribution,
    TotalContribution: F17TotalContribution,
    ExpandedUncertainty: D19ExpandedUncertainty,
  }
}
