/**
 * Оценивание неопределённости определения содержания воды в нефти
 * по ГОСТ 2477.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     B13 — Вместимость приемника-ловушки, см³
 *     H5  — Погрешность приемника-ловушки, см³
 *     H6  — Цена деления шкалы приемника-ловушки, см³
 *     H7  — Погрешность цилиндра, см³
 *     H8  — Погрешность весов, г
 *     H9  — Предел повторяемости, %
 *
 *   Таблица 2 — Результаты измерений (массовая доля):
 *     C13 — Объем воды в приемнике-ловушке, см³
 *     D13 — Масса испытуемого образца, г
 *
 *   Таблица 3 — Результаты измерений (объемная доля):
 *     C17 — Объем воды в приемнике-ловушке, см³
 *     D17 — Объем образца, см³
 *
 *   Таблица 4 — Бюджет (массовая доля):
 *     E21 — стандартная неопределённость объема воды, см³
 *     E22 — стандартная неопределённость массы образца, г
 *     E23 — стандартная неопределённость отбора проб, %
 *     E24 — суммарная стандартная неопределённость, %
 *     H21…H24 — процентные вклады
 *     E42 — расширенная неопределённость (k = 2), %
 *
 *   Таблица 5 — Бюджет (объемная доля):
 *     E35 — стандартная неопределённость объема воды, см³
 *     E36 — стандартная неопределённость объема образца, см³
 *     E37 — стандартная неопределённость отбора проб, %
 *     E38 — суммарная стандартная неопределённость, %
 *     H35…H38 — процентные вклады
 *     E38 (расш.) — расширенная неопределённость (k = 2), %
 */

/** Тип доли воды: массовая или объёмная. */
export type Gost2477WaterShareType = "mass" | "volume"

/** Вместимость приемника-ловушки, см³. */
export type Gost2477ReceiverCapacity = 2 | 5 | 10 | 25

/**
 * Входные данные для расчёта неопределённости по ГОСТ 2477.
 * Значения берутся из первого измерения испытания
 * «Содержание воды, % по ГОСТ 2477».
 *
 * @property waterShare тип доли воды (массовая / объёмная).
 * @property receiverCapacity B13 — вместимость приемника-ловушки, см³.
 * @property waterVolume C13/C17 — объём воды в приемнике-ловушке, см³.
 * @property sampleAmount D13 — масса образца, г, или D17 — объём образца, см³.
 */
export type Gost2477UncertaintyInput = {
  waterShare: Gost2477WaterShareType
  receiverCapacity: Gost2477ReceiverCapacity
  waterVolume: string | number
  sampleAmount: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 2477.
 * @property WaterVolumeStandardUncertainty E21/E35 — стандартная неопределённость объёма воды, см³.
 * @property SampleAmountStandardUncertainty E22/E36 — стандартная неопределённость массы/объёма образца.
 * @property SamplingStandardUncertainty E23/E37 — стандартная неопределённость отбора проб, %.
 * @property CombinedStandardUncertainty E24/E38 — суммарная стандартная неопределённость, %.
 * @property WaterVolumeContribution H21/H35 — процентный вклад объёма воды.
 * @property SampleAmountContribution H22/H36 — процентный вклад массы/объёма образца.
 * @property SamplingContribution H23/H37 — процентный вклад отбора проб.
 * @property TotalContribution H24/H38 — сумма процентных вкладов.
 * @property ExpandedUncertainty E42 / E38_расш — расширенная неопределённость при k = 2, %.
 */
export type Gost2477UncertaintyResult = {
  WaterVolumeStandardUncertainty: number
  SampleAmountStandardUncertainty: number
  SamplingStandardUncertainty: number
  CombinedStandardUncertainty: number
  WaterVolumeContribution: number
  SampleAmountContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H7 — Погрешность цилиндра, см³. */
const H7CylinderAccuracy = 0.01

/** H8 — Погрешность весов, г. */
const H8ScaleAccuracy = 0.01

/** H9 — Предел повторяемости, %. */
const H9RepeatabilityLimit = 0.1

/** E23 — стандартная неопределённость отбора проб (массовая доля), %. */
const E23SamplingStandardUncertaintyMass = 0.025

/** E37 — стандартная неопределённость отбора проб (объёмная доля), %. */
const E37SamplingStandardUncertaintyVolume = 0.025

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
 * H5 — Погрешность приемника-ловушки, см³.
 *
 *         ⎧ 0.025,                           если B13 = 2
 *         ⎪ 0.05,                            если B13 = 5
 *         ⎪ 0.015,                           если B13 = 10 и V ≤ 0.3
 * H5 =    ⎨ 0.05,                            если B13 = 10 и 0.3 < V ≤ 1.0
 *         ⎪ 0.1,                             если B13 = 10 и 1.0 < V ≤ 10.0
 *         ⎪ 0.1,                             если B13 = 25
 *         ⎩ 0,                               в остальных случаях
 */
const resolveReceiverAccuracy = (
  receiverCapacity: Gost2477ReceiverCapacity,
  waterVolume: number,
): number => {
  if (receiverCapacity === 2) return 0.025
  if (receiverCapacity === 5) return 0.05
  if (receiverCapacity === 25) return 0.1

  if (receiverCapacity === 10) {
    if (waterVolume <= 0.3) return 0.015
    if (waterVolume <= 1.0) return 0.05
    if (waterVolume <= 10.0) return 0.1
  }

  return 0
}

/**
 * H6 — Цена деления шкалы приемника-ловушки, см³.
 *
 *         ⎧ 0.05,                            если B13 = 2
 *         ⎪ 0.1,                             если B13 = 5
 *         ⎪ 0.03,                            если B13 = 10 и V ≤ 0.3
 * H6 =    ⎨ 0.1,                             если B13 = 10 и 0.3 < V ≤ 1.0
 *         ⎪ 0.2,                             если B13 = 10 и 1.0 < V ≤ 10.0
 *         ⎪ 0.2,                             если B13 = 25
 *         ⎩ 0,                               в остальных случаях
 */
const resolveReceiverDivision = (
  receiverCapacity: Gost2477ReceiverCapacity,
  waterVolume: number,
): number => {
  if (receiverCapacity === 2) return 0.05
  if (receiverCapacity === 5) return 0.1
  if (receiverCapacity === 25) return 0.2

  if (receiverCapacity === 10) {
    if (waterVolume <= 0.3) return 0.03
    if (waterVolume <= 1.0) return 0.1
    if (waterVolume <= 10.0) return 0.2
  }

  return 0
}

/**
 * E21 / E35 — стандартная неопределённость объёма воды, см³.
 *
 *         ⎧ √( (H5²/6) + (H6²/12) + (H9² / 2.8²) ),              если V ≤ 1
 * u(V) =  ⎨
 *         ⎩ √( (H5²/6) + (H6²/12) + ((V · 0.02)² / 2.8²) ),     если V > 1
 */
const resolveWaterVolumeStandardUncertainty = (
  receiverAccuracy: number,
  receiverDivision: number,
  waterVolume: number,
): number => {
  const accuracyTerm = receiverAccuracy ** 2 / 6
  const divisionTerm = receiverDivision ** 2 / 12
  const repeatabilityTerm =
    waterVolume <= 1
      ? H9RepeatabilityLimit ** 2 / 2.8 ** 2
      : (waterVolume * 0.02) ** 2 / 2.8 ** 2

  return Math.sqrt(accuracyTerm + divisionTerm + repeatabilityTerm)
}

/**
 * Возвращает бюджет неопределённости и расширенную неопределённость U
 * при k = 2. Расчёт зависит от выбранной доли воды (массовая / объёмная).
 * Если входные данные некорректны, расчёт невозможен.
 */
export const calculateGost2477Uncertainty = ({
  waterShare,
  receiverCapacity,
  waterVolume,
  sampleAmount,
}: Gost2477UncertaintyInput): Gost2477UncertaintyResult | null => {
  const parsedWaterVolume = parseNumericValue(waterVolume)
  const parsedSampleAmount = parseNumericValue(sampleAmount)

  if (parsedWaterVolume === null || parsedSampleAmount === null || parsedSampleAmount === 0) {
    return null
  }

  /**
   * H5, H6 — зависят от вместимости приемника-ловушки и объёма воды.
   */
  const H5ReceiverAccuracy = resolveReceiverAccuracy(receiverCapacity, parsedWaterVolume)
  const H6ReceiverDivision = resolveReceiverDivision(receiverCapacity, parsedWaterVolume)

  /**
   * E21 / E35 — стандартная неопределённость объёма воды, см³.
   */
  const waterVolumeStandardUncertainty = resolveWaterVolumeStandardUncertainty(
    H5ReceiverAccuracy,
    H6ReceiverDivision,
    parsedWaterVolume,
  )

  if (waterShare === "mass") {
    /**
     * E22 — стандартная неопределённость массы испытуемого образца, г.
     *
     * Формула:
     *   E22 = H8 / √3
     */
    const E22SampleAmountStandardUncertainty = H8ScaleAccuracy / Math.sqrt(3)

    /**
     * E23 — стандартная неопределённость отбора проб, %.
     */
    const E23SamplingStandardUncertainty = E23SamplingStandardUncertaintyMass

    /**
     * C1 — частная производная по объёму воды.
     *
     * Формула:
     *   C1 = 1 / D13
     */
    const C1VolumeSensitivity = 1 / parsedSampleAmount

    /**
     * C2 — частная производная по массе образца.
     *
     * Формула:
     *   C2 = C13 / D13²
     */
    const C2SampleSensitivity = parsedWaterVolume / parsedSampleAmount ** 2

    /**
     * Знаменатель для суммарной неопределённости и вкладов.
     *
     * Формула:
     *   varianceSum = E21²·C1² + E22²·C2² + E23²
     */
    const varianceSum =
      waterVolumeStandardUncertainty ** 2 * C1VolumeSensitivity ** 2 +
      E22SampleAmountStandardUncertainty ** 2 * C2SampleSensitivity ** 2 +
      E23SamplingStandardUncertainty ** 2

    /**
     * E24 — суммарная стандартная неопределённость массовой доли, %.
     *
     * Формула:
     *   E24 = √varianceSum
     */
    const E24CombinedStandardUncertainty = Math.sqrt(varianceSum)

    /**
     * H21 — процентный вклад объёма воды.
     *
     * Формула:
     *   H21 = (E21²·C1² / varianceSum) · 100
     */
    const H21WaterVolumeContribution =
      ((waterVolumeStandardUncertainty ** 2 * C1VolumeSensitivity ** 2) / varianceSum) * 100

    /**
     * H22 — процентный вклад массы образца.
     *
     * Формула:
     *   H22 = (E22²·C2² / varianceSum) · 100
     */
    const H22SampleAmountContribution =
      ((E22SampleAmountStandardUncertainty ** 2 * C2SampleSensitivity ** 2) / varianceSum) * 100

    /**
     * H23 — процентный вклад отбора проб.
     *
     * Формула:
     *   H23 = (E23² / varianceSum) · 100
     */
    const H23SamplingContribution = (E23SamplingStandardUncertainty ** 2 / varianceSum) * 100

    /**
     * H24 — сумма процентных вкладов.
     *
     * Формула:
     *   H24 = H21 + H22 + H23
     */
    const H24TotalContribution =
      H21WaterVolumeContribution + H22SampleAmountContribution + H23SamplingContribution

    /**
     * E42 — расширенная неопределённость массовой доли при k = 2, %.
     * Округление до 2 знаков после запятой.
     *
     * Формула:
     *   E42 = round(E24 · 2, 2)
     */
    const E42ExpandedUncertainty =
      Math.round(E24CombinedStandardUncertainty * COVERAGE_FACTOR * 100) / 100

    return {
      WaterVolumeStandardUncertainty: waterVolumeStandardUncertainty,
      SampleAmountStandardUncertainty: E22SampleAmountStandardUncertainty,
      SamplingStandardUncertainty: E23SamplingStandardUncertainty,
      CombinedStandardUncertainty: E24CombinedStandardUncertainty,
      WaterVolumeContribution: H21WaterVolumeContribution,
      SampleAmountContribution: H22SampleAmountContribution,
      SamplingContribution: H23SamplingContribution,
      TotalContribution: H24TotalContribution,
      ExpandedUncertainty: E42ExpandedUncertainty,
    }
  }

  /**
   * E36 — стандартная неопределённость объёма образца, см³.
   *
   * Формула:
   *   E36 = H7 / √6
   */
  const E36SampleAmountStandardUncertainty = H7CylinderAccuracy / Math.sqrt(6)

  /**
   * E37 — стандартная неопределённость отбора проб, %.
   */
  const E37SamplingStandardUncertainty = E37SamplingStandardUncertaintyVolume

  /**
   * C1 — частная производная по объёму воды.
   *
   * Формула:
   *   C1 = 1 / D17
   */
  const C1VolumeSensitivity = 1 / parsedSampleAmount

  /**
   * C2 — частная производная по объёму образца.
   *
   * Формула:
   *   C2 = C17 / D17²
   */
  const C2SampleSensitivity = parsedWaterVolume / parsedSampleAmount ** 2

  /**
   * Знаменатель для суммарной неопределённости и вкладов.
   *
   * Формула:
   *   varianceSum = E35²·C1² + E36²·C2² + E37²
   */
  const varianceSum =
    waterVolumeStandardUncertainty ** 2 * C1VolumeSensitivity ** 2 +
    E36SampleAmountStandardUncertainty ** 2 * C2SampleSensitivity ** 2 +
    E37SamplingStandardUncertainty ** 2

  /**
   * E38 — суммарная стандартная неопределённость объёмной доли, %.
   *
   * Формула:
   *   E38 = √varianceSum
   */
  const E38CombinedStandardUncertainty = Math.sqrt(varianceSum)

  /**
   * H35 — процентный вклад объёма воды.
   *
   * Формула:
   *   H35 = (E35²·C1² / varianceSum) · 100
   */
  const H35WaterVolumeContribution =
    ((waterVolumeStandardUncertainty ** 2 * C1VolumeSensitivity ** 2) / varianceSum) * 100

  /**
   * H36 — процентный вклад объёма образца.
   *
   * Формула:
   *   H36 = (E36²·C2² / varianceSum) · 100
   */
  const H36SampleAmountContribution =
    ((E36SampleAmountStandardUncertainty ** 2 * C2SampleSensitivity ** 2) / varianceSum) * 100

  /**
   * H37 — процентный вклад отбора проб.
   *
   * Формула:
   *   H37 = (E37² / varianceSum) · 100
   */
  const H37SamplingContribution = (E37SamplingStandardUncertainty ** 2 / varianceSum) * 100

  /**
   * H38 — сумма процентных вкладов.
   *
   * Формула:
   *   H38 = H35 + H36 + H37
   */
  const H38TotalContribution =
    H35WaterVolumeContribution + H36SampleAmountContribution + H37SamplingContribution

  /**
   * E38 (расш.) — расширенная неопределённость объёмной доли при k = 2, %.
   * Округление до 2 знаков после запятой.
   *
   * Формула:
   *   E38_расш = round(E38 · 2, 2)
   */
  const E38ExpandedUncertainty =
    Math.round(E38CombinedStandardUncertainty * COVERAGE_FACTOR * 100) / 100

  return {
    WaterVolumeStandardUncertainty: waterVolumeStandardUncertainty,
    SampleAmountStandardUncertainty: E36SampleAmountStandardUncertainty,
    SamplingStandardUncertainty: E37SamplingStandardUncertainty,
    CombinedStandardUncertainty: E38CombinedStandardUncertainty,
    WaterVolumeContribution: H35WaterVolumeContribution,
    SampleAmountContribution: H36SampleAmountContribution,
    SamplingContribution: H37SamplingContribution,
    TotalContribution: H38TotalContribution,
    ExpandedUncertainty: E38ExpandedUncertainty,
  }
}
