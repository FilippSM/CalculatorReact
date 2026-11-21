/**
 * Оценивание неопределённости определения водородного показателя (pH)
 * по ГОСТ 28084.
 *
 *   Таблица 1 — Исходные данные:
 *     E5 — Погрешность pH-метра, ед. pH
 *     E6 — Разрешающая способность pH-метра, ед. pH
 *     E7 — Предел повторяемости, ед. pH
 *
 *   Таблица 2 — Результаты измерений:
 *     H5 — Водородный показатель (pH)
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E12 — стандартная неопределённость поправки на погрешность pH-метра, ед. pH
 *     E13 — стандартная неопределённость поправки на разрешающую способность, ед. pH
 *     E14 — стандартная неопределённость повторяемости, ед. pH
 *     E15 — стандартная неопределённость отбора проб, ед. pH
 *     E16 — суммарная стандартная неопределённость, ед. pH
 *
 *     G12 — процентный вклад погрешности pH-метра
 *     G13 — процентный вклад разрешающей способности
 *     G14 — процентный вклад повторяемости
 *     G15 — процентный вклад отбора проб
 *     G16 — сумма вкладов
 *
 *     E21 — расширенная неопределённость (k = 2), ед. pH
 */

/** Тип pH-метра, определяющий E5. */
export type Gost28084PhMeter = "J0088992" | "other"

/**
 * Входные данные для расчёта неопределённости по ГОСТ 28084.
 * Значение pH берётся из среднего результата испытания
 * «Показатель концентрации водородных ионов (pH), ед. pH по ГОСТ 28084 по п.4.8».
 *
 * @property measuredPh H5 — среднее значение pH, ед. pH.
 * @property phMeter тип pH-метра для выбора E5.
 */
export type Gost28084UncertaintyInput = {
  measuredPh: string | number
  phMeter: Gost28084PhMeter
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 28084.
 * @property PhMeterAccuracyStandardUncertainty E12 — стандартная неопределённость погрешности pH-метра, ед. pH.
 * @property PhMeterResolutionStandardUncertainty E13 — стандартная неопределённость разрешающей способности, ед. pH.
 * @property RepeatabilityStandardUncertainty E14 — стандартная неопределённость повторяемости, ед. pH.
 * @property SamplingStandardUncertainty E15 — стандартная неопределённость отбора проб, ед. pH.
 * @property CombinedStandardUncertainty E16 — суммарная стандартная неопределённость, ед. pH.
 * @property PhMeterAccuracyContribution G12 — процентный вклад погрешности pH-метра.
 * @property PhMeterResolutionContribution G13 — процентный вклад разрешающей способности.
 * @property RepeatabilityContribution G14 — процентный вклад повторяемости.
 * @property SamplingContribution G15 — процентный вклад отбора проб.
 * @property TotalContribution G16 — сумма процентных вкладов.
 * @property ExpandedUncertainty E21 — расширенная неопределённость при k = 2, ед. pH.
 */
export type Gost28084UncertaintyResult = {
  PhMeterAccuracyStandardUncertainty: number
  PhMeterResolutionStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  PhMeterAccuracyContribution: number
  PhMeterResolutionContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/**
 * E5 — Погрешность pH-метра, ед. pH.
 * E5 = 0,1 для HI8424 № J0088992; E5 = 0,05 для другого pH-метра.
 */
const E5PhMeterAccuracyByType = {
  J0088992: 0.1,
  other: 0.05,
} as const

/** E6 — Разрешающая способность pH-метра, ед. pH. */
const E6PhMeterResolution = 0.01

/** E7 — Предел повторяемости, ед. pH. */
const E7RepeatabilityLimit = 0.1

/** E15 — стандартная неопределённость отбора проб, ед. pH. */
const E15SamplingStandardUncertainty = 0.0342782730020049

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
 * при k = 2. Если среднее значение pH некорректно, расчёт невозможен.
 */
export const calculateGost28084Uncertainty = ({
  measuredPh,
  phMeter,
}: Gost28084UncertaintyInput): Gost28084UncertaintyResult | null => {
  /**
   * H5 — Водородный показатель (pH).
   * Проверяется как обязательный результат измерения.
   */
  if (parseNumericValue(measuredPh) === null) return null

  /**
   * E5 — Погрешность pH-метра, ед. pH.
   */
  const E5PhMeterAccuracy = E5PhMeterAccuracyByType[phMeter]

  /**
   * E12 — стандартная неопределённость поправки на погрешность pH-метра, ед. pH.
   *
   * Формула:
   *   E12 = E5 / √3
   */
  const E12PhMeterAccuracyStandardUncertainty = E5PhMeterAccuracy / Math.sqrt(3)

  /**
   * E13 — стандартная неопределённость поправки на разрешающую способность, ед. pH.
   *
   * Формула:
   *   E13 = E6 / (2 · √3)
   */
  const E13PhMeterResolutionStandardUncertainty = E6PhMeterResolution / (2 * Math.sqrt(3))

  /**
   * E14 — стандартная неопределённость повторяемости, ед. pH.
   *
   * Формула:
   *   E14 = E7 / 2,8
   */
  const E14RepeatabilityStandardUncertainty = E7RepeatabilityLimit / 2.8

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E12² + E13² + E14² + E15²
   */
  const varianceSum =
    E12PhMeterAccuracyStandardUncertainty ** 2 +
    E13PhMeterResolutionStandardUncertainty ** 2 +
    E14RepeatabilityStandardUncertainty ** 2 +
    E15SamplingStandardUncertainty ** 2

  /**
   * E16 — суммарная стандартная неопределённость, ед. pH.
   *
   * Формула:
   *   E16 = √varianceSum
   */
  const E16CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * G12 — процентный вклад погрешности pH-метра.
   *
   * Формула:
   *   G12 = (E12² / varianceSum) · 100
   */
  const G12PhMeterAccuracyContribution =
    (E12PhMeterAccuracyStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * G13 — процентный вклад разрешающей способности.
   *
   * Формула:
   *   G13 = (E13² / varianceSum) · 100
   */
  const G13PhMeterResolutionContribution =
    (E13PhMeterResolutionStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * G14 — процентный вклад повторяемости.
   *
   * Формула:
   *   G14 = (E14² / varianceSum) · 100
   */
  const G14RepeatabilityContribution =
    (E14RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * G15 — процентный вклад отбора проб.
   *
   * Формула:
   *   G15 = (E15² / varianceSum) · 100
   */
  const G15SamplingContribution = (E15SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * G16 — сумма процентных вкладов.
   *
   * Формула:
   *   G16 = G12 + G13 + G14 + G15
   */
  const G16TotalContribution =
    G12PhMeterAccuracyContribution +
    G13PhMeterResolutionContribution +
    G14RepeatabilityContribution +
    G15SamplingContribution

  /**
   * E21 — расширенная неопределённость при k = 2, ед. pH.
   * Округление до 1 знака после запятой.
   *
   * Формула:
   *   E21 = round(2 · E16, 1)
   */
  const E21ExpandedUncertainty = Math.round(COVERAGE_FACTOR * E16CombinedStandardUncertainty * 10) / 10

  return {
    PhMeterAccuracyStandardUncertainty: E12PhMeterAccuracyStandardUncertainty,
    PhMeterResolutionStandardUncertainty: E13PhMeterResolutionStandardUncertainty,
    RepeatabilityStandardUncertainty: E14RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E15SamplingStandardUncertainty,
    CombinedStandardUncertainty: E16CombinedStandardUncertainty,
    PhMeterAccuracyContribution: G12PhMeterAccuracyContribution,
    PhMeterResolutionContribution: G13PhMeterResolutionContribution,
    RepeatabilityContribution: G14RepeatabilityContribution,
    SamplingContribution: G15SamplingContribution,
    TotalContribution: G16TotalContribution,
    ExpandedUncertainty: E21ExpandedUncertainty,
  }
}
