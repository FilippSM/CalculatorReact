/**
 * Оценивание неопределённости определения температуры вспышки
 * в открытом тигле по ГОСТ 4333-2021.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     H5 — Барометр, погрешность, кПа
 *     H6 — Цена деления барометра, кПа
 *     H7 — Погрешность термометра, °C
 *     H8 — Цена деления термометра, °C
 *
 *   Таблица 2 — Результаты измерений:
 *     D12 — Предел повторяемости, °C
 *     E12 — Температура вспышки, скорректированная на стандартное атм. давление, °C
 *
 *   Коэффициенты чувствительности:
 *     G12 — коэффициент чувствительности по температуре вспышки
 *     H12 — коэффициент чувствительности по барометрическому давлению, °C/кПа
 *
 *   Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *     E16 — стандартная неопределённость температуры вспышки, °C
 *     E17 — стандартная неопределённость барометрического давления, кПа
 *     E18 — стандартная неопределённость повторяемости метода, °C
 *     E19 — стандартная неопределённость отбора проб, °C
 *     G16 — суммарная стандартная неопределённость, °C
 *
 *     F16 — процентный вклад температуры вспышки
 *     F17 — процентный вклад барометрического давления
 *     F18 — процентный вклад повторяемости метода
 *     F19 — процентный вклад отбора проб
 *     F20 — сумма вкладов
 *
 *     G18 — расширенная неопределённость (k = 2), °C
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 4333.
 * @property correctedFlashPoint E12 — среднее значение tср, °C.
 */
export type Gost4333UncertaintyInput = {
  correctedFlashPoint: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 4333.
 * @property FlashPointStandardUncertainty E16 — стандартная неопределённость температуры вспышки, °C.
 * @property PressureStandardUncertainty E17 — стандартная неопределённость барометрического давления, кПа.
 * @property RepeatabilityStandardUncertainty E18 — стандартная неопределённость повторяемости метода, °C.
 * @property SamplingStandardUncertainty E19 — стандартная неопределённость отбора проб, °C.
 * @property CombinedStandardUncertainty G16 — суммарная стандартная неопределённость, °C.
 * @property FlashPointContribution F16 — процентный вклад температуры вспышки.
 * @property PressureContribution F17 — процентный вклад барометрического давления.
 * @property RepeatabilityContribution F18 — процентный вклад повторяемости метода.
 * @property SamplingContribution F19 — процентный вклад отбора проб.
 * @property TotalContribution F20 — сумма процентных вкладов.
 * @property ExpandedUncertainty G18 — расширенная неопределённость при k = 2, °C.
 */
export type Gost4333UncertaintyResult = {
  FlashPointStandardUncertainty: number
  PressureStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  FlashPointContribution: number
  PressureContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H5 — Барометр, погрешность, кПа. */
const H5BarometerAccuracy = 0.1

/** H6 — Цена деления барометра, кПа. */
const H6BarometerDivision = 0.01

/**
 * Порог температуры вспышки для выбора погрешности термометра H7, °C.
 */
const THERMOMETER_ACCURACY_THRESHOLD = 260

/** H8 — Цена деления термометра, °C. */
const H8ThermometerDivision = 2

/** D12 — Предел повторяемости, °C. */
const D12RepeatabilityLimit = 8

/** G12 — коэффициент чувствительности по температуре вспышки. */
const G12FlashPointSensitivity = 1

/** H12 — коэффициент чувствительности по барометрическому давлению, °C/кПа. */
const H12PressureSensitivity = -0.25

/**
 * E19 — стандартная неопределённость отбора проб, °C.
 *
 * Формула:
 *   E19 = 0.306186217847897
 */
const E19SamplingStandardUncertainty = 0.306186217847897

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
 * при k = 2. Если среднее значение tср некорректно, расчёт невозможен.
 */
export const calculateGost4333Uncertainty = ({
  correctedFlashPoint,
}: Gost4333UncertaintyInput): Gost4333UncertaintyResult | null => {
  /**
   * E12 — Температура вспышки, скорректированная на стандартное
   * атмосферное давление, °C.
   * Значение берётся из «Температура вспышки в открытом тигле, °C по ГОСТ 4333»
   * из «Среднее значение tср, °C».
   */
  const E12CorrectedFlashPoint = parseNumericValue(correctedFlashPoint)

  if (E12CorrectedFlashPoint === null) {
    return null
  }

  /**
   * H7 — Термометр, погрешность, °C.
   *
   * То есть:
   *   H7 = 2 если температура вспышки ≤ 260 °C
   *   H7 = 4 иначе
   */
  const H7ThermometerAccuracy =
    E12CorrectedFlashPoint <= THERMOMETER_ACCURACY_THRESHOLD ? 2 : 4

  /**
   * E16 — стандартная неопределённость температуры вспышки,
   * измеренной термометром, °C.
   *
   * Математическая формула:
   *   E16 = √( (H7/√3)² + (H8/(2·√3))² )
   *   E16 = √( H7²/3 + H8²/12 ) — возведение в квадрат с упрощением
   */
  const E16FlashPointStandardUncertainty = Math.sqrt(
    H7ThermometerAccuracy ** 2 / 3 + H8ThermometerDivision ** 2 / 12,
  )

  /**
   * E17 — стандартная неопределённость барометрического давления, кПа.
   *
   * Математическая формула:
   *   E17 = √( (H5/√3)² + (H6/(2·√3))² )
   *   E17 = √( H5²/3 + H6²/12 ) — возведение в квадрат с упрощением
   */
  const E17PressureStandardUncertainty = Math.sqrt(
    H5BarometerAccuracy ** 2 / 3 + H6BarometerDivision ** 2 / 12,
  )

  /**
   * E18 — стандартная неопределённость повторяемости метода, °C.
   *
   * Формула:
   *   E18 = D12 / 2.8
   */
  const E18RepeatabilityStandardUncertainty = D12RepeatabilityLimit / 2.8

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E16²·G12² + E17²·H12² + E18² + E19²
   */
  const varianceSum =
    E16FlashPointStandardUncertainty ** 2 * G12FlashPointSensitivity ** 2 +
    E17PressureStandardUncertainty ** 2 * H12PressureSensitivity ** 2 +
    E18RepeatabilityStandardUncertainty ** 2 +
    E19SamplingStandardUncertainty ** 2

  /**
   * G16 — суммарная стандартная неопределённость, °C.
   *
   * Формула:
   *   G16 = √( E16²·G12² + E17²·H12² + E18² + E19² )
   */
  const G16CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * F16 — процентный вклад температуры вспышки.
   *
   * Формула:
   *   F16 = ( E16²·G12² / varianceSum ) · 100
   */
  const F16FlashPointContribution =
    ((E16FlashPointStandardUncertainty ** 2 * G12FlashPointSensitivity ** 2) / varianceSum) *
    100

  /**
   * F17 — процентный вклад барометрического давления.
   *
   * Формула:
   *   F17 = ( E17²·H12² / varianceSum ) · 100
   */
  const F17PressureContribution =
    ((E17PressureStandardUncertainty ** 2 * H12PressureSensitivity ** 2) / varianceSum) * 100

  /**
   * F18 — процентный вклад повторяемости метода.
   *
   * Формула:
   *   F18 = ( E18² / varianceSum ) · 100
   */
  const F18RepeatabilityContribution =
    (E18RepeatabilityStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F19 — процентный вклад отбора проб.
   *
   * Формула:
   *   F19 = ( E19² / varianceSum ) · 100
   */
  const F19SamplingContribution =
    (E19SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * F20 — сумма процентных вкладов.
   *
   * Формула:
   *   F20 = F16 + F17 + F18 + F19
   */
  const F20TotalContribution =
    F16FlashPointContribution +
    F17PressureContribution +
    F18RepeatabilityContribution +
    F19SamplingContribution

  /**
   * G18 — расширенная неопределённость при k = 2, °C.
   * Округлена до целого числа (температура вспышки измеряется
   * с точностью до 1 °C).
   *
   * Формула:
   *   G18 = round( 2 · G16, 0 )
   */
  const G18ExpandedUncertainty = Math.round(
    COVERAGE_FACTOR * G16CombinedStandardUncertainty,
  )

  return {
    FlashPointStandardUncertainty: E16FlashPointStandardUncertainty,
    PressureStandardUncertainty: E17PressureStandardUncertainty,
    RepeatabilityStandardUncertainty: E18RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E19SamplingStandardUncertainty,
    CombinedStandardUncertainty: G16CombinedStandardUncertainty,
    FlashPointContribution: F16FlashPointContribution,
    PressureContribution: F17PressureContribution,
    RepeatabilityContribution: F18RepeatabilityContribution,
    SamplingContribution: F19SamplingContribution,
    TotalContribution: F20TotalContribution,
    ExpandedUncertainty: G18ExpandedUncertainty,
  }
}
