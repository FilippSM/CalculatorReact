/**
 * Оценивание неопределённости определения массовой доли механических примесей (X)
 * по ГОСТ 6479.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     G5 — Весы лабораторные электронные PS 6000/C2/N, погрешность, г
 *     G6 — Весы лабораторные электронные AS 220/C2, погрешность, г
 *     G7 — Расхождение между двумя последовательными взвешиваниями, г
 *     G8 — Предел повторяемости, %
 *
 *   Таблица 2 — Результаты измерений:
 *     A13 — Масса испытуемого нефтепродукта, г (m₃)
 *     B13 — Масса стаканчика с фильтром с примесями, г (m₁)
 *     C13 — Масса стаканчика с чистым фильтром, г (m₂)
 *     D12 — Среднее значение массовой доли, %
 *     F13 — Коэффициент чувствительности (C1)
 *     G13 — Коэффициент чувствительности (C2)
 *     H13 — Коэффициент чувствительности (C3)
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
 *     ExpandedUncertainty — расширенная неопределённость (k = 2), %
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 6479.
 * Массы берутся из первого измерения испытания
 * «Содержание механических примесей, % по ГОСТ 6479»,
 * среднее — из Среднее значение X, %.
 *
 * @property sampleMass A13 — масса пробы m₃, г.
 * @property filterWithImpuritiesMass B13 — масса стакана + фильтр + мех. примеси m₁, г.
 * @property cleanFilterMass C13 — масса стакана + фильтр m₂, г.
 * @property meanMassFraction D12 — среднее значение массовой доли Xср, %.
 */
export type Gost6479UncertaintyInput = {
  sampleMass: string | number
  filterWithImpuritiesMass: string | number
  cleanFilterMass: string | number
  meanMassFraction: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 6479.
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
 * @property ExpandedUncertainty расширенная неопределённость при k = 2, %.
 */
export type Gost6479UncertaintyResult = {
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

/** G5 — Весы лабораторные электронные PS 6000/C2/N, погрешность, г. */
const G5BalanceAccuracy = 0.01

/** G6 — Весы лабораторные электронные AS 220/C2, погрешность, г. */
const G6BalanceAccuracy = 0.0001

/** G7 — Расхождение между двумя последовательными взвешиваниями, г. */
const G7WeighingRepeatability = 0.0004

/** G8 — Предел повторяемости, %. */
const G8RepeatabilityLimit = 0.025

/** D25 — стандартная неопределённость отбора проб, %. */
const D25SamplingStandardUncertainty = 0

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
 * Число знаков после запятой у D12 (среднего значения)
 * для округления расширенной неопределённости.
 */
const getDecimalPlaces = (value: string | number): number => {
  const normalized =
    typeof value === "number" ? value.toString() : value.trim().replace(",", ".")

  if (!normalized.includes(".")) return 0

  return normalized.split(".")[1]?.length ?? 0
}

/**
 * Возвращает бюджет неопределённости и расширенную неопределённость U
 * при k = 2. Если массы или среднее некорректны, либо m₃ = 0, расчёт невозможен.
 */
export const calculateGost6479Uncertainty = ({
  sampleMass,
  filterWithImpuritiesMass,
  cleanFilterMass,
  meanMassFraction,
}: Gost6479UncertaintyInput): Gost6479UncertaintyResult | null => {
  /**
   * A13 — Масса испытуемого нефтепродукта, г (m₃).
   * B13 — Масса стаканчика с фильтром с примесями, г (m₁).
   * C13 — Масса стаканчика с чистым фильтром, г (m₂).
   * D12 — Среднее значение массовой доли, %.
   */
  const A13SampleMass = parseNumericValue(sampleMass)
  const B13FilterWithImpuritiesMass = parseNumericValue(filterWithImpuritiesMass)
  const C13CleanFilterMass = parseNumericValue(cleanFilterMass)
  const D12MeanMassFraction = parseNumericValue(meanMassFraction)

  if (
    A13SampleMass === null ||
    B13FilterWithImpuritiesMass === null ||
    C13CleanFilterMass === null ||
    D12MeanMassFraction === null ||
    A13SampleMass === 0
  ) {
    return null
  }

  /**
   * F13 — коэффициент чувствительности C1.
   *
   * Формула:
   *   F13 = (B13 − C13) · 100 / A13²
   */
  const F13SensitivitySampleMass =
    ((B13FilterWithImpuritiesMass - C13CleanFilterMass) * 100) / A13SampleMass ** 2

  /**
   * G13 — коэффициент чувствительности C2.
   *
   * Формула:
   *   G13 = 100 / A13
   */
  const G13SensitivityFilterWithImpurities = 100 / A13SampleMass

  /**
   * H13 — коэффициент чувствительности C3.
   *
   * Формула:
   *   H13 = −100 / A13
   */
  const H13SensitivityCleanFilter = -100 / A13SampleMass

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
   *   varianceSum = D21²·F13² + D22²·G13² + D23²·H13² + D24² + D25²
   */
  const varianceSum =
    D21SampleMassStandardUncertainty ** 2 * F13SensitivitySampleMass ** 2 +
    D22FilterWithImpuritiesStandardUncertainty ** 2 * G13SensitivityFilterWithImpurities ** 2 +
    D23CleanFilterStandardUncertainty ** 2 * H13SensitivityCleanFilter ** 2 +
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
   *   E21 = ( D21²·F13² / varianceSum ) · 100
   */
  const E21SampleMassContribution =
    ((D21SampleMassStandardUncertainty ** 2 * F13SensitivitySampleMass ** 2) / varianceSum) * 100

  /**
   * E22 — процентный вклад массы стаканчика с фильтром с примесями.
   *
   * Формула:
   *   E22 = ( D22²·G13² / varianceSum ) · 100
   */
  const E22FilterWithImpuritiesContribution =
    ((D22FilterWithImpuritiesStandardUncertainty ** 2 *
      G13SensitivityFilterWithImpurities ** 2) /
      varianceSum) *
    100

  /**
   * E23 — процентный вклад массы стаканчика с чистым фильтром.
   *
   * Формула:
   *   E23 = ( D23²·H13² / varianceSum ) · 100
   */
  const E23CleanFilterContribution =
    ((D23CleanFilterStandardUncertainty ** 2 * H13SensitivityCleanFilter ** 2) / varianceSum) * 100

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
   * Расширенная неопределённость при k = 2, %.
   * Округляется до числа знаков после запятой у D12.
   *
   * Формула:
   *   U = round(2 · D26, decimalPlaces(D12))
   */
  const decimalPlaces = getDecimalPlaces(meanMassFraction)
  const ExpandedUncertainty = Number(
    (COVERAGE_FACTOR * D26CombinedStandardUncertainty).toFixed(decimalPlaces),
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
    ExpandedUncertainty,
  }
}
