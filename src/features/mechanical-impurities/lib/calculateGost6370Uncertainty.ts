import { roundToSignificantDigits } from "./formatSignificantDigits"

/**
 * Оценивание неопределённости определения массовой доли механических примесей (X)
 * по ГОСТ 6370.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     G5 — Весы лабораторные электронные PS 10100/C2/MS, погрешность, г
 *     G6 — Весы лабораторные электронные AS 220/C2, погрешность, г
 *     G7 — Расхождение между двумя последовательными взвешиваниями, г
 *     G8 — Предел повторяемости, %
 *
 *   Таблица 2 — Результаты измерений:
 *     A13 — Масса испытуемого нефтепродукта, г (m₃)
 *     B13 — Масса стаканчика с фильтром с примесями, г (m₁)
 *     C13 — Масса стаканчика с чистым фильтром, г (m₂)
 *     F12 — Коэффициент чувствительности (C1)
 *     G12 — Коэффициент чувствительности (C2)
 *     H12 — Коэффициент чувствительности (C3)
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     D21 — стандартная неопределённость массы испытуемого нефтепродукта, г
 *     D22 — стандартная неопределённость массы стаканчика с фильтром с примесями, г
 *     D23 — стандартная неопределённость массы стаканчика с чистым фильтром, г
 *     D24 — стандартная неопределённость повторяемости метода, %
 *     D25 — стандартная неопределённость отбора проб, %
 *     D26 — суммарная стандартная неопределённость, %
 *
 *     E21 — процентный вклад массы испытуемого нефтепродукта
 *     E22 — процентный вклад массы стаканчика с фильтром с примесями
 *     E23 — процентный вклад массы стаканчика с чистым фильтром
 *     E24 — процентный вклад повторяемости метода
 *     E25 — процентный вклад отбора проб
 *     E26 — сумма вкладов
 *
 *     E29 — расширенная неопределённость (k = 2), %
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 6370.
 * Значения берутся из первого измерения испытания
 * «Содержание механических примесей, % по ГОСТ 6370».
 *
 * @property sampleMass A13 — масса пробы m₃, г.
 * @property filterWithImpuritiesMass B13 — масса стакана + фильтр + мех. примеси m₁, г.
 * @property cleanFilterMass C13 — масса стакана + фильтр m₂, г.
 */
export type Gost6370UncertaintyInput = {
  sampleMass: string | number
  filterWithImpuritiesMass: string | number
  cleanFilterMass: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 6370.
 * @property SampleMassStandardUncertainty D21 — стандартная неопределённость массы пробы, г.
 * @property FilterWithImpuritiesStandardUncertainty D22 — стандартная неопределённость массы стакана с примесями, г.
 * @property CleanFilterStandardUncertainty D23 — стандартная неопределённость массы чистого фильтра, г.
 * @property RepeatabilityStandardUncertainty D24 — стандартная неопределённость повторяемости метода, %.
 * @property SamplingStandardUncertainty D25 — стандартная неопределённость отбора проб, %.
 * @property CombinedStandardUncertainty D26 — суммарная стандартная неопределённость, %.
 * @property SampleMassContribution E21 — процентный вклад массы пробы.
 * @property FilterWithImpuritiesContribution E22 — процентный вклад массы стакана с примесями.
 * @property CleanFilterContribution E23 — процентный вклад массы чистого фильтра.
 * @property RepeatabilityContribution E24 — процентный вклад повторяемости метода.
 * @property SamplingContribution E25 — процентный вклад отбора проб.
 * @property TotalContribution E26 — сумма процентных вкладов.
 * @property ExpandedUncertainty E29 — расширенная неопределённость при k = 2, %.
 */
export type Gost6370UncertaintyResult = {
  SampleMassStandardUncertainty: number
  FilterWithImpuritiesStandardUncertainty: number
  CleanFilterStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  SampleMassContribution: number
  FilterWithImpuritiesContribution: number
  CleanFilterContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** G5 — Весы лабораторные электронные PS 10100/C2/MS, погрешность, г. */
const G5BalanceAccuracy = 0.05

/** G6 — Весы лабораторные электронные AS 220/C2, погрешность, г. */
const G6BalanceAccuracy = 0.0001

/** G7 — Расхождение между двумя последовательными взвешиваниями, г. */
const G7WeighingRepeatability = 0.0004

/** G8 — Предел повторяемости, %. */
const G8RepeatabilityLimit = 0.0025

/**
 * D25 — стандартная неопределённость отбора проб, %.
 */
const D25SamplingStandardUncertainty = 0

/** Коэффициент охвата k для доверительной вероятности P = 95 %. */
const COVERAGE_FACTOR = 2

/** Число значащих цифр для расширенной неопределённости. */
const EXPANDED_UNCERTAINTY_SIGNIFICANT_DIGITS = 2

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
 * при k = 2. Если массы некорректны или m₃ = 0, расчёт невозможен.
 */
export const calculateGost6370Uncertainty = ({
  sampleMass,
  filterWithImpuritiesMass,
  cleanFilterMass,
}: Gost6370UncertaintyInput): Gost6370UncertaintyResult | null => {
  /**
   * A13 — Масса испытуемого нефтепродукта, г (m₃).
   * B13 — Масса стаканчика с фильтром с примесями, г (m₁).
   * C13 — Масса стаканчика с чистым фильтром, г (m₂).
   */
  const A13SampleMass = parseNumericValue(sampleMass)
  const B13FilterWithImpuritiesMass = parseNumericValue(filterWithImpuritiesMass)
  const C13CleanFilterMass = parseNumericValue(cleanFilterMass)

  if (
    A13SampleMass === null ||
    B13FilterWithImpuritiesMass === null ||
    C13CleanFilterMass === null ||
    A13SampleMass === 0
  ) {
    return null
  }

  /**
   * F12 — коэффициент чувствительности C1.
   *
   * Формула:
   *   F12 = (B13 − C13) · 100 / A13²
   */
  const F12SensitivitySampleMass =
    ((B13FilterWithImpuritiesMass - C13CleanFilterMass) * 100) / A13SampleMass ** 2

  /**
   * G12 — коэффициент чувствительности C2.
   *
   * Формула:
   *   G12 = 100 / A13
   */
  const G12SensitivityFilterWithImpurities = 100 / A13SampleMass

  /**
   * H12 — коэффициент чувствительности C3.
   *
   * Формула:
   *   H12 = −100 / A13
   */
  const H12SensitivityCleanFilter = -100 / A13SampleMass

  /**
   * D21 — стандартная неопределённость массы испытуемого нефтепродукта, г.
   *
   * Формула:
   *   D21 = G5 / √3
   */
  const D21SampleMassStandardUncertainty = G5BalanceAccuracy / Math.sqrt(3)

  /**
   * D22 — стандартная неопределённость массы стаканчика с фильтром с примесями, г.
   *
   * Формула:
   *   D22 = √( (G6/√3)² + (G7/2.8)² )
   */
  const D22FilterWithImpuritiesStandardUncertainty = Math.sqrt(
    (G6BalanceAccuracy / Math.sqrt(3)) ** 2 + (G7WeighingRepeatability / 2.8) ** 2,
  )

  /**
   * D23 — стандартная неопределённость массы стаканчика с чистым фильтром, г.
   *
   * Формула:
   *   D23 = √( (G6/√3)² + (G7/2.8)² )
   */
  const D23CleanFilterStandardUncertainty = Math.sqrt(
    (G6BalanceAccuracy / Math.sqrt(3)) ** 2 + (G7WeighingRepeatability / 2.8) ** 2,
  )

  /**
   * D24 — стандартная неопределённость повторяемости метода, %.
   *
   * Формула:
   *   D24 = G8 / 2.8
   */
  const D24RepeatabilityStandardUncertainty = G8RepeatabilityLimit / 2.8

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = D21²·F12² + D22²·G12² + D23²·H12² + D24² + D25²
   */
  const varianceSum =
    D21SampleMassStandardUncertainty ** 2 * F12SensitivitySampleMass ** 2 +
    D22FilterWithImpuritiesStandardUncertainty ** 2 * G12SensitivityFilterWithImpurities ** 2 +
    D23CleanFilterStandardUncertainty ** 2 * H12SensitivityCleanFilter ** 2 +
    D24RepeatabilityStandardUncertainty ** 2 +
    D25SamplingStandardUncertainty ** 2

  /**
   * D26 — суммарная стандартная неопределённость, %.
   *
   * Формула:
   *   D26 = √varianceSum
   */
  const D26CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * E21 — процентный вклад массы испытуемого нефтепродукта.
   *
   * Формула:
   *   E21 = ( D21²·F12² / varianceSum ) · 100
   */
  const E21SampleMassContribution =
    ((D21SampleMassStandardUncertainty ** 2 * F12SensitivitySampleMass ** 2) / varianceSum) *
    100

  /**
   * E22 — процентный вклад массы стаканчика с фильтром с примесями.
   *
   * Формула:
   *   E22 = ( D22²·G12² / varianceSum ) · 100
   */
  const E22FilterWithImpuritiesContribution =
    ((D22FilterWithImpuritiesStandardUncertainty ** 2 *
      G12SensitivityFilterWithImpurities ** 2) /
      varianceSum) *
    100

  /**
   * E23 — процентный вклад массы стаканчика с чистым фильтром.
   *
   * Формула:
   *   E23 = ( D23²·H12² / varianceSum ) · 100
   */
  const E23CleanFilterContribution =
    ((D23CleanFilterStandardUncertainty ** 2 * H12SensitivityCleanFilter ** 2) / varianceSum) *
    100

  /**
   * E24 — процентный вклад повторяемости метода.
   *
   * Формула:
   *   E24 = ( D24² / varianceSum ) · 100
   */
  const E24RepeatabilityContribution =
    (D24RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * E25 — процентный вклад отбора проб.
   *
   * Формула:
   *   E25 = ( D25² / varianceSum ) · 100
   */
  const E25SamplingContribution = (D25SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * E26 — сумма процентных вкладов.
   *
   * Формула:
   *   E26 = E21 + E22 + E23 + E24 + E25
   */
  const E26TotalContribution =
    E21SampleMassContribution +
    E22FilterWithImpuritiesContribution +
    E23CleanFilterContribution +
    E24RepeatabilityContribution +
    E25SamplingContribution

  /**
   * E29 — расширенная неопределённость при k = 2, %.
   * Округление до 2 значащих цифр.
   *
   * Формула:
   *   E29 = round( 2 · D26, 2 знач. цифры )
   */
  const E29ExpandedUncertainty = roundToSignificantDigits(
    COVERAGE_FACTOR * D26CombinedStandardUncertainty,
    EXPANDED_UNCERTAINTY_SIGNIFICANT_DIGITS,
  )

  return {
    SampleMassStandardUncertainty: D21SampleMassStandardUncertainty,
    FilterWithImpuritiesStandardUncertainty: D22FilterWithImpuritiesStandardUncertainty,
    CleanFilterStandardUncertainty: D23CleanFilterStandardUncertainty,
    RepeatabilityStandardUncertainty: D24RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: D25SamplingStandardUncertainty,
    CombinedStandardUncertainty: D26CombinedStandardUncertainty,
    SampleMassContribution: E21SampleMassContribution,
    FilterWithImpuritiesContribution: E22FilterWithImpuritiesContribution,
    CleanFilterContribution: E23CleanFilterContribution,
    RepeatabilityContribution: E24RepeatabilityContribution,
    SamplingContribution: E25SamplingContribution,
    TotalContribution: E26TotalContribution,
    ExpandedUncertainty: E29ExpandedUncertainty,
  }
}
