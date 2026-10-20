/**
 * Оценивание неопределённости определения температуры кристаллизации
 * по ГОСТ 18995.5.
 *
 *   Таблица 1 — Исходные данные:
 *     H5 — Погрешность аппарата для определения температуры кристаллизации, °C
 *     H6 — Цена наименьшего разряда цифрового табло, °C
 *     H7 — Предел повторяемости, °C
 *
 *   Таблица 2 — Результаты измерений:
 *     B11 — Температура кристаллизации, °C
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E15 — стандартная неопределённость поправки на погрешность аппарата, °C
 *     E16 — стандартная неопределённость поправки на цену деления, °C
 *     E17 — стандартная неопределённость повторяемости, °C
 *     E18 — суммарная стандартная неопределённость, °C
 *
 *     F15 — процентный вклад погрешности аппарата
 *     F16 — процентный вклад цены деления
 *     F17 — процентный вклад повторяемости
 *     F18 — сумма вкладов
 *
 *     D19 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 18995.5.
 * Температура берётся из среднего результата испытания
 * «Температура кристаллизации, °C по ГОСТ 18995.5».
 *
 * @property measuredTemperature температура кристаллизации tк.ср., °C.
 */
export type Gost18995UncertaintyInput = {
  measuredTemperature: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 18995.5.
 * @property DeviceAccuracyStandardUncertainty E15 — стандартная неопределённость погрешности аппарата, °C.
 * @property DigitalResolutionStandardUncertainty E16 — стандартная неопределённость цены деления, °C.
 * @property RepeatabilityStandardUncertainty E17 — стандартная неопределённость повторяемости, °C.
 * @property CombinedStandardUncertainty E18 — суммарная стандартная неопределённость, °C.
 * @property DeviceAccuracyContribution F15 — процентный вклад погрешности аппарата.
 * @property DigitalResolutionContribution F16 — процентный вклад цены деления.
 * @property RepeatabilityContribution F17 — процентный вклад повторяемости.
 * @property TotalContribution F18 — сумма процентных вкладов.
 * @property ExpandedUncertainty D19 — расширенная неопределённость при k = 2, °C.
 */
export type Gost18995UncertaintyResult = {
  DeviceAccuracyStandardUncertainty: number
  DigitalResolutionStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  CombinedStandardUncertainty: number
  DeviceAccuracyContribution: number
  DigitalResolutionContribution: number
  RepeatabilityContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H5 — Погрешность аппарата для определения температуры кристаллизации, °C. */
const H5DeviceAccuracy = 1.05

/** H6 — Цена наименьшего разряда цифрового табло, °C. */
const H6DigitalResolution = 0.1

/** H7 — Предел повторяемости, °C. */
const H7RepeatabilityLimit = 0.2

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
 * при k = 2. Если температура кристаллизации некорректна, расчёт невозможен.
 */
export const calculateGost18995Uncertainty = ({
  measuredTemperature,
}: Gost18995UncertaintyInput): Gost18995UncertaintyResult | null => {
  /**
   * B11 — Температура кристаллизации, °C.
   * Проверяется как обязательный результат измерения.
   */
  if (parseNumericValue(measuredTemperature) === null) return null

  /**
   * E15 — стандартная неопределённость поправки на погрешность аппарата, °C.
   *
   * Формула:
   *   E15 = H5 / √3
   */
  const E15DeviceAccuracyStandardUncertainty = H5DeviceAccuracy / Math.sqrt(3)

  /**
   * E16 — стандартная неопределённость поправки на цену деления, °C.
   *
   * Формула:
   *   E16 = H6 / (2 · √3)
   */
  const E16DigitalResolutionStandardUncertainty = H6DigitalResolution / (2 * Math.sqrt(3))

  /**
   * E17 — стандартная неопределённость повторяемости, °C.
   *
   * Формула:
   *   E17 = H7 / 2,8
   */
  const E17RepeatabilityStandardUncertainty = H7RepeatabilityLimit / 2.8

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E15² + E16² + E17²
   */
  const varianceSum =
    E15DeviceAccuracyStandardUncertainty ** 2 +
    E16DigitalResolutionStandardUncertainty ** 2 +
    E17RepeatabilityStandardUncertainty ** 2

  /**
   * E18 — суммарная стандартная неопределённость, °C.
   *
   * Формула:
   *   E18 = √varianceSum
   */
  const E18CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F15 — процентный вклад погрешности аппарата.
   *
   * Формула:
   *   F15 = (E15² / varianceSum) · 100
   */
  const F15DeviceAccuracyContribution =
    (E15DeviceAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F16 — процентный вклад цены деления.
   *
   * Формула:
   *   F16 = (E16² / varianceSum) · 100
   */
  const F16DigitalResolutionContribution =
    (E16DigitalResolutionStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F17 — процентный вклад повторяемости.
   *
   * Формула:
   *   F17 = (E17² / varianceSum) · 100
   */
  const F17RepeatabilityContribution =
    (E17RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F18 — сумма процентных вкладов.
   *
   * Формула:
   *   F18 = F15 + F16 + F17
   */
  const F18TotalContribution =
    F15DeviceAccuracyContribution +
    F16DigitalResolutionContribution +
    F17RepeatabilityContribution

  /**
   * D19 — расширенная неопределённость при k = 2, °C.
   * Округление до 1 знака после запятой.
   *
   * Формула:
   *   D19 = round(2 · E18, 1)
   */
  const D19ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E18CombinedStandardUncertainty * 10) / 10

  return {
    DeviceAccuracyStandardUncertainty: E15DeviceAccuracyStandardUncertainty,
    DigitalResolutionStandardUncertainty: E16DigitalResolutionStandardUncertainty,
    RepeatabilityStandardUncertainty: E17RepeatabilityStandardUncertainty,
    CombinedStandardUncertainty: E18CombinedStandardUncertainty,
    DeviceAccuracyContribution: F15DeviceAccuracyContribution,
    DigitalResolutionContribution: F16DigitalResolutionContribution,
    RepeatabilityContribution: F17RepeatabilityContribution,
    TotalContribution: F18TotalContribution,
    ExpandedUncertainty: D19ExpandedUncertainty,
  }
}
