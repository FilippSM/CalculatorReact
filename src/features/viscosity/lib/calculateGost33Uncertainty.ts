/**
 * Оценивание неопределённости определения кинематической вязкости
 * в нефтепродуктах при 100°C по ГОСТ 33.
 *
 *   Таблица 1 — Средства измерений и исходные данные:
 *     H5  — Погрешность секундомера, с (динамическая формула)
 *     H6  — Дискретность секундомера, с
 *     H7  — Погрешность термостата, °C
 *     H8  — Предел определяемости, %
 *     H9  — Предел повторяемости, %
 *     H10 — Погрешность вискозиметра, %
 *
 *   Таблица 2 — Результаты измерений:
 *     C17 — Среднее время истечения, с
 *     E17 — Постоянная вискозиметра, мм²/с²
 *     G17 — Температура испытания, °C
 *     B23 — Значение кинематической вязкости, мм²/с
 *
 *   Таблица 4 — Бюджет суммарной стандартной неопределённости:
 *     E37…E41 — стандартные неопределённости вкладов
 *     G37…G41 — относительные стандартные неопределённости
 *     G42 / E42 — суммарная относительная / абсолютная неопределённость
 *     D44 — расширенная неопределённость (k = 2), мм²/с
 */

/**
 * Входные данные для расчёта неопределённости по ГОСТ 33.
 * Значения берутся из испытания
 * «Кинематическая вязкость при 100°C, мм²/с по ГОСТ 33».
 *
 * @property averageFlowTime C17 — среднее время истечения tср первого измерения, с.
 * @property viscometerConstant E17 — постоянная вискозиметра, мм²/с².
 * @property kinematicViscosity B23 — среднее значение νср, мм²/с.
 * @property detectionLimitPercent H8 — предел определяемости из прецизионности, %.
 * @property repeatabilityLimitPercent H9 — предел повторяемости из прецизионности, %.
 */
export type Gost33UncertaintyInput = {
  averageFlowTime: string | number
  viscometerConstant: string | number
  kinematicViscosity: string | number
  detectionLimitPercent: string | number
  repeatabilityLimitPercent: string | number
}

/**
 * Бюджет и итоговый результат расчёта неопределённости по ГОСТ 33.
 * @property StopwatchAccuracy H5 — погрешность секундомера, с.
 * @property TimeStandardUncertainty E37 — стандартная неопределённость времени истечения, с.
 * @property ViscometerStandardUncertainty E38 — стандартная неопределённость вискозиметра, мм²/с.
 * @property TemperatureStandardUncertainty E39 — стандартная неопределённость температуры, °C.
 * @property RepeatabilityStandardUncertainty E40 — стандартная неопределённость повторяемости, мм²/с.
 * @property SamplingStandardUncertainty E41 — стандартная неопределённость отбора проб, мм²/с.
 * @property RelativeTimeStandardUncertainty G37 — относительная неопределённость времени.
 * @property RelativeViscometerStandardUncertainty G38 — относительная неопределённость вискозиметра.
 * @property RelativeTemperatureStandardUncertainty G39 — относительная неопределённость температуры.
 * @property RelativeRepeatabilityStandardUncertainty G40 — относительная неопределённость повторяемости.
 * @property RelativeSamplingStandardUncertainty G41 — относительная неопределённость отбора проб.
 * @property RelativeCombinedStandardUncertainty G42 — суммарная относительная неопределённость.
 * @property CombinedStandardUncertainty E42 — суммарная стандартная неопределённость, мм²/с.
 * @property TimeContribution H37 — процентный вклад времени истечения.
 * @property ViscometerContribution H38 — процентный вклад вискозиметра.
 * @property TemperatureContribution H39 — процентный вклад температуры.
 * @property RepeatabilityContribution H40 — процентный вклад повторяемости.
 * @property SamplingContribution H41 — процентный вклад отбора проб.
 * @property TotalContribution H42 — сумма процентных вкладов.
 * @property ExpandedUncertainty D44 — расширенная неопределённость при k = 2, мм²/с.
 */
export type Gost33UncertaintyResult = {
  StopwatchAccuracy: number
  TimeStandardUncertainty: number
  ViscometerStandardUncertainty: number
  TemperatureStandardUncertainty: number
  RepeatabilityStandardUncertainty: number
  SamplingStandardUncertainty: number
  RelativeTimeStandardUncertainty: number
  RelativeViscometerStandardUncertainty: number
  RelativeTemperatureStandardUncertainty: number
  RelativeRepeatabilityStandardUncertainty: number
  RelativeSamplingStandardUncertainty: number
  RelativeCombinedStandardUncertainty: number
  CombinedStandardUncertainty: number
  TimeContribution: number
  ViscometerContribution: number
  TemperatureContribution: number
  RepeatabilityContribution: number
  SamplingContribution: number
  TotalContribution: number
  ExpandedUncertainty: number
}

/** H6 — Дискретность секундомера, с. */
const H6StopwatchResolution = 0.01

/** H7 — Погрешность термостата на 100°C, °C. */
const H7ThermostatAccuracy = 0.01

/** H10 — Погрешность вискозиметра, %. */
const H10ViscometerAccuracy = 0.3

/** G17 — Температура испытания, °C. */
const G17TestTemperature = 100

/** E41 — стандартная неопределённость отбора проб, мм²/с. */
const E41SamplingStandardUncertainty = 0.00176776695811058

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
 * Число знаков после запятой у уже округлённого среднего νср
 * (округление до 4 значащих цифр делается в calculateViscosityAverage).
 */
const getDecimalPlaces = (value: string | number): number => {
  const asString = typeof value === "number" ? String(value) : value.trim().replace(",", ".")
  const [, fraction = ""] = asString.split(".")
  return fraction.length
}

/**
 * Округляет расширенную неопределённость до числа знаков среднего νср.
 *
 * Примеры:
 *   среднее 7,828 → U 0,018756 → 0,019
 *   среднее 10,88 → U 0,075666 → 0,08
 */
const roundExpandedUncertainty = (
  mean: string | number,
  expandedUncertainty: number,
): number => {
  const decimalPlaces = getDecimalPlaces(mean)
  const factor = 10 ** decimalPlaces
  return Math.round(expandedUncertainty * factor) / factor
}

/**
 * Возвращает бюджет неопределённости и расширенную неопределённость U
 * при k = 2. Если входные данные некорректны или равны нулю,
 * расчёт по относительным неопределённостям невозможен.
 */
export const calculateGost33Uncertainty = ({
  averageFlowTime,
  viscometerConstant,
  kinematicViscosity,
  detectionLimitPercent,
  repeatabilityLimitPercent,
}: Gost33UncertaintyInput): Gost33UncertaintyResult | null => {
  /**
   * C17 — Среднее время истечения, с.
   * Берётся из «Среднее значение tср, с» первого измерения.
   */
  const C17AverageFlowTime = parseNumericValue(averageFlowTime)

  /**
   * E17 — Постоянная вискозиметра, мм²/с².
   * Берётся из селекта выбора вискозиметра.
   */
  const E17ViscometerConstant = parseNumericValue(viscometerConstant)

  /**
   * B23 — Значение кинематической вязкости, мм²/с.
   * Берётся из «Среднее значение νср, мм²/с».
   */
  const B23KinematicViscosity = parseNumericValue(kinematicViscosity)

  /**
   * H8 — Предел определяемости, %.
   * Берётся из селекта прецизионности.
   */
  const H8DetectionLimit = parseNumericValue(detectionLimitPercent)

  /**
   * H9 — Предел повторяемости, %.
   * Берётся из селекта прецизионности.
   */
  const H9RepeatabilityLimit = parseNumericValue(repeatabilityLimitPercent)

  if (
    C17AverageFlowTime === null ||
    C17AverageFlowTime <= 0 ||
    E17ViscometerConstant === null ||
    E17ViscometerConstant <= 0 ||
    B23KinematicViscosity === null ||
    B23KinematicViscosity <= 0 ||
    H8DetectionLimit === null ||
    H9RepeatabilityLimit === null
  ) {
    return null
  }

  /**
   * H5 — Погрешность секундомера при 100°C, с.
   *
   * Формула:
   *   H5 = C17 · 9,6 · 10⁻⁶ + 0,01
   */
  const H5StopwatchAccuracy = C17AverageFlowTime * 9.6 * 10 ** -6 + 0.01

  /**
   * E37 — стандартная неопределённость времени истечения, с.
   *
   * Формула:
   *   E37 = √( (H5 / √3)² + (H6 / (2 · √3))² + (H8 / 2,8)² )
   */
  const E37TimeStandardUncertainty = Math.sqrt(
    (H5StopwatchAccuracy / Math.sqrt(3)) ** 2 +
      (H6StopwatchResolution / (2 * Math.sqrt(3))) ** 2 +
      (H8DetectionLimit / 2.8) ** 2,
  )

  /**
   * E38 — стандартная неопределённость поправки на погрешность вискозиметра, мм²/с.
   *
   * Формула:
   *   E38 = (H10 · E17) / (100 · √3)
   */
  const E38ViscometerStandardUncertainty =
    (H10ViscometerAccuracy * E17ViscometerConstant) / (100 * Math.sqrt(3))

  /**
   * E39 — стандартная неопределённость поддержания температуры, °C.
   *
   * Формула:
   *   E39 = H7 / √3
   */
  const E39TemperatureStandardUncertainty = H7ThermostatAccuracy / Math.sqrt(3)

  /**
   * E40 — стандартная неопределённость повторяемости метода, мм²/с.
   *
   * Формула:
   *   E40 = (H9 · E17) / (100 · 2,8)
   */
  const E40RepeatabilityStandardUncertainty =
    (H9RepeatabilityLimit * E17ViscometerConstant) / (100 * 2.8)

  /**
   * G37 — относительная стандартная неопределённость времени истечения.
   *
   * Формула:
   *   G37 = E37 / C17
   */
  const G37RelativeTimeStandardUncertainty = E37TimeStandardUncertainty / C17AverageFlowTime

  /**
   * G38 — относительная стандартная неопределённость вискозиметра.
   *
   * Формула:
   *   G38 = E38 / B23
   */
  const G38RelativeViscometerStandardUncertainty =
    E38ViscometerStandardUncertainty / B23KinematicViscosity

  /**
   * G39 — относительная стандартная неопределённость температуры.
   *
   * Формула:
   *   G39 = E39 / G17
   */
  const G39RelativeTemperatureStandardUncertainty =
    E39TemperatureStandardUncertainty / G17TestTemperature

  /**
   * G40 — относительная стандартная неопределённость повторяемости.
   *
   * Формула:
   *   G40 = E40 / B23
   */
  const G40RelativeRepeatabilityStandardUncertainty =
    E40RepeatabilityStandardUncertainty / B23KinematicViscosity

  /**
   * G41 — относительная стандартная неопределённость отбора проб.
   *
   * Формула:
   *   G41 = E41 / B23
   */
  const G41RelativeSamplingStandardUncertainty =
    E41SamplingStandardUncertainty / B23KinematicViscosity

  /**
   * Знаменатель для суммарной неопределённости и процентных вкладов.
   *
   * Формула:
   *   contributionSumSq = G37² + G38² + G39² + G40² + G41²
   */
  const contributionSumSq =
    G37RelativeTimeStandardUncertainty ** 2 +
    G38RelativeViscometerStandardUncertainty ** 2 +
    G39RelativeTemperatureStandardUncertainty ** 2 +
    G40RelativeRepeatabilityStandardUncertainty ** 2 +
    G41RelativeSamplingStandardUncertainty ** 2

  /**
   * G42 — суммарная относительная стандартная неопределённость.
   *
   * Формула:
   *   G42 = √contributionSumSq
   */
  const G42RelativeCombinedStandardUncertainty = Math.sqrt(contributionSumSq)

  /**
   * E42 — суммарная стандартная неопределённость (абсолютная), мм²/с.
   *
   * Формула:
   *   E42 = B23 · G42
   */
  const E42CombinedStandardUncertainty =
    B23KinematicViscosity * G42RelativeCombinedStandardUncertainty

  /**
   * H37 — процентный вклад времени истечения, %.
   *
   * Формула:
   *   H37 = (G37² / contributionSumSq) · 100
   */
  const H37TimeContribution =
    (G37RelativeTimeStandardUncertainty ** 2 / contributionSumSq) * 100

  /**
   * H38 — процентный вклад поправки на погрешность вискозиметра, %.
   *
   * Формула:
   *   H38 = (G38² / contributionSumSq) · 100
   */
  const H38ViscometerContribution =
    (G38RelativeViscometerStandardUncertainty ** 2 / contributionSumSq) * 100

  /**
   * H39 — процентный вклад поддержания температуры термостата, %.
   *
   * Формула:
   *   H39 = (G39² / contributionSumSq) · 100
   */
  const H39TemperatureContribution =
    (G39RelativeTemperatureStandardUncertainty ** 2 / contributionSumSq) * 100

  /**
   * H40 — процентный вклад повторяемости метода, %.
   *
   * Формула:
   *   H40 = (G40² / contributionSumSq) · 100
   */
  const H40RepeatabilityContribution =
    (G40RelativeRepeatabilityStandardUncertainty ** 2 / contributionSumSq) * 100

  /**
   * H41 — процентный вклад отбора проб, %.
   *
   * Формула:
   *   H41 = (G41² / contributionSumSq) · 100
   */
  const H41SamplingContribution =
    (G41RelativeSamplingStandardUncertainty ** 2 / contributionSumSq) * 100

  /**
   * H42 — сумма процентных вкладов, %.
   *
   * Формула:
   *   H42 = H37 + H38 + H39 + H40 + H41
   */
  const H42TotalContribution =
    H37TimeContribution +
    H38ViscometerContribution +
    H39TemperatureContribution +
    H40RepeatabilityContribution +
    H41SamplingContribution

  /**
   * D44 — расширенная неопределённость при k = 2, мм²/с.
   * Округляется до числа знаков уже округлённого среднего νср.
   *
   * Формула:
   *   D44 = round(2 · E42, decimalPlaces(B23))
   */
  const D44ExpandedUncertainty = roundExpandedUncertainty(
    kinematicViscosity,
    COVERAGE_FACTOR * E42CombinedStandardUncertainty,
  )

  return {
    StopwatchAccuracy: H5StopwatchAccuracy,
    TimeStandardUncertainty: E37TimeStandardUncertainty,
    ViscometerStandardUncertainty: E38ViscometerStandardUncertainty,
    TemperatureStandardUncertainty: E39TemperatureStandardUncertainty,
    RepeatabilityStandardUncertainty: E40RepeatabilityStandardUncertainty,
    SamplingStandardUncertainty: E41SamplingStandardUncertainty,
    RelativeTimeStandardUncertainty: G37RelativeTimeStandardUncertainty,
    RelativeViscometerStandardUncertainty: G38RelativeViscometerStandardUncertainty,
    RelativeTemperatureStandardUncertainty: G39RelativeTemperatureStandardUncertainty,
    RelativeRepeatabilityStandardUncertainty: G40RelativeRepeatabilityStandardUncertainty,
    RelativeSamplingStandardUncertainty: G41RelativeSamplingStandardUncertainty,
    RelativeCombinedStandardUncertainty: G42RelativeCombinedStandardUncertainty,
    CombinedStandardUncertainty: E42CombinedStandardUncertainty,
    TimeContribution: H37TimeContribution,
    ViscometerContribution: H38ViscometerContribution,
    TemperatureContribution: H39TemperatureContribution,
    RepeatabilityContribution: H40RepeatabilityContribution,
    SamplingContribution: H41SamplingContribution,
    TotalContribution: H42TotalContribution,
    ExpandedUncertainty: D44ExpandedUncertainty,
  }
}
