/**
 * Оценивание неопределённости определения водородного показателя (pH)
 * (по аналогии с ГОСТ 6370, на основе данных электронной таблицы).
 *
 * Таблица 1 — Исходные данные:
 *   E5 — Погрешность pH-метра, ед. pH
 *   E6 — Разрешающая способность pH-метра, ед. pH
 *   E7 — Предел повторяемости, ед. pH
 *
 * Таблица 2 — Результаты измерений:
 *   H5 — Водородный показатель (pH) - это среднее значение из Среднее значение pH, ед. pH из Показатель концентрации водородных ионов (pH), ед. pH по ГОСТ 28084 по п.4.8 (ГОСТ 22567.5)
 *
 * Таблица 3 — Бюджет суммарной стандартной неопределённости:
 *   E12 — стандартная неопределённость поправки на погрешность pH-метра, ед. pH
 *   E13 — стандартная неопределённость поправки на разрешающую способность, ед. pH
 *   E14 — стандартная неопределённость повторяемости, ед. pH
 *   E15 — стандартная неопределённость отбора проб, ед. pH
 *   E16 — суммарная стандартная неопределённость, ед. pH
 *
 *   G12 — процентный вклад погрешности pH-метра
 *   G13 — процентный вклад разрешающей способности
 *   G14 — процентный вклад повторяемости
 *   G15 — процентный вклад отбора проб
 *   G16 — сумма вкладов
 *
 *   E21 — расширенная неопределённость (k = 2), ед. pH
 */

// ============================================================
// Таблица 1 — Исходные данные
// ============================================================

/**
 * E5 — Погрешность pH-метра, ед. pH.
 * если value для селекта выбора ph-метра = "J0088992" то E5 = 0,1 если "other" то E5 = 0,05
 */
const E5_phMeterAccuracy = 0.05;

/**
 * E6 — Разрешающая способность pH-метра, ед. pH.
 */
const E6_phMeterResolution = 0.01;

/**
 * E7 — Предел повторяемости, ед. pH.
 */
const E7_repeatability = 0.1;

// ============================================================
// Таблица 2 — Результаты измерений
// ============================================================

/**
 * H5 — Водородный показатель (pH).
 H5 — Водородный показатель (pH) - это среднее значение из Среднее значение pH, ед. pH из Показатель концентрации водородных ионов (pH), ед. pH по ГОСТ 28084 по п.4.8 (ГОСТ 22567.5)
 */
const H5_measuredPH = 7.0;

// ============================================================
// Таблица 3 — Бюджет суммарной стандартной неопределённости
// ============================================================

// ------------------------------------------------------------
// Стандартные неопределённости
// ------------------------------------------------------------

/**
 * E12 — стандартная неопределённость поправки на погрешность pH-метра, ед. pH.
 * Формула: E12 = E5 / √3
 */
const E12_uPhMeterAccuracy = E5_phMeterAccuracy / Math.sqrt(3);

/**
 * E13 — стандартная неопределённость поправки на разрешающую способность, ед. pH.
 * Формула: E13 = E6 / (2·√3)
 */
const E13_uPhMeterResolution = E6_phMeterResolution / (2 * Math.sqrt(3));

/**
 * E14 — стандартная неопределённость повторяемости, ед. pH.
 * Формула: E14 = E7 / 2,8
 */
const E14_uRepeatability = E7_repeatability / 2.8;

/**
 * E15 — стандартная неопределённость отбора проб, ед. pH.
 * Задана числом в электронной таблице.
 */
const E15_uSampling = 0.0342782730020049;

// ------------------------------------------------------------
// Суммарная стандартная неопределённость
// ------------------------------------------------------------

/**
 * E16 — суммарная стандартная неопределённость, ед. pH.
 *
 * Формула (из таблицы):
 *   E16 = √( E12² + E13² + E14² + E15²)
 *
 * Примечание: отбор проб (E15) в суммарную стандартную
 * неопределённость по данной формуле не входит.
 */
const E16_uCombined = Math.sqrt(
  E12_uPhMeterAccuracy ** 2 +
  E13_uPhMeterResolution ** 2 +
  E14_uRepeatability ** 2 +
  E15_uSampling ** 2
);

// ------------------------------------------------------------
// Процентные вклады
// ------------------------------------------------------------

/**
 * Знаменатель для процентных вкладов.
 *
 * Формула:
 *   denom = E12² + E13² + E14² + E15²
 */
const contributionDenominator =
  E12_uPhMeterAccuracy ** 2 +
  E13_uPhMeterResolution ** 2 +
  E14_uRepeatability ** 2 +
  E15_uSampling ** 2;

/**
 * G12 — процентный вклад погрешности pH-метра.
 * Формула: G12 = (E12² / (E12²+E13²+E14²+E15²)) · 100
 */
const G12_contributionPhMeterAccuracy =
  (E12_uPhMeterAccuracy ** 2 / contributionDenominator) * 100;

/**
 * G13 — процентный вклад разрешающей способности.
 * Формула: G13 = (E13² / (E12²+E13²+E14²+E15²)) · 100
 */
const G13_contributionPhMeterResolution =
  (E13_uPhMeterResolution ** 2 / contributionDenominator) * 100;

/**
 * G14 — процентный вклад повторяемости.
 * Формула: G14 = (E14² / (E12²+E13²+E14²+E15²)) · 100
 */
const G14_contributionRepeatability =
  (E14_uRepeatability ** 2 / contributionDenominator) * 100;

/**
 * G15 — процентный вклад отбора проб.
 * Формула: G15 = (E15² / (E12²+E13²+E14²+E15²)) · 100
 */
const G15_contributionSampling =
  (E15_uSampling ** 2 / contributionDenominator) * 100;

/**
 * G16 — сумма процентных вкладов.
 * Формула: G16 = СУММ(G12:G15)
 */
const G16_contributionTotal =
  G12_contributionPhMeterAccuracy +
  G13_contributionPhMeterResolution +
  G14_contributionRepeatability +
  G15_contributionSampling;

// ------------------------------------------------------------
// Расширенная неопределённость
// ------------------------------------------------------------

/**
 * E21 — расширенная неопределённость при k = 2, ед. pH.
 * Округление до 1 знака после запятой.
 *
 * Формула:
 *   E21 = ОКРУГЛ( √( E12² + E13² + E14² + E15² ) · 2 ; 1 )
 *
 * Примечание: в отличие от суммарной стандартной неопределённости,
 * здесь отбор проб (E15) уже учитывается.
 */
const E21_expandedUncertainty =
  Math.round(Math.sqrt(contributionDenominator) * 2 * 10) / 10;

export type Gost28084PhMeter = "J0088992" | "other"

export type Gost28084UncertaintyInput = {
  measuredPh: string | number
  phMeter: Gost28084PhMeter
}

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
 * Рассчитывает бюджет неопределённости определения pH по ГОСТ 28084.
 * Среднее значение pH проверяется как обязательный результат измерения,
 * но не входит в формулы абсолютной неопределённости из исходной таблицы.
 */
export const calculateGost28084Uncertainty = ({
  measuredPh,
  phMeter,
}: Gost28084UncertaintyInput): Gost28084UncertaintyResult | null => {
  if (parseNumericValue(measuredPh) === null) return null

  const phMeterAccuracy = phMeter === "J0088992" ? 0.1 : 0.05
  const phMeterAccuracyStandardUncertainty = phMeterAccuracy / Math.sqrt(3)
  const phMeterResolutionStandardUncertainty = E6_phMeterResolution / (2 * Math.sqrt(3))
  const repeatabilityStandardUncertainty = E7_repeatability / 2.8
  const samplingStandardUncertainty = E15_uSampling

  const varianceSum =
    phMeterAccuracyStandardUncertainty ** 2 +
    phMeterResolutionStandardUncertainty ** 2 +
    repeatabilityStandardUncertainty ** 2 +
    samplingStandardUncertainty ** 2

  const combinedStandardUncertainty = Math.sqrt(varianceSum)
  const phMeterAccuracyContribution =
    (phMeterAccuracyStandardUncertainty ** 2 / varianceSum) * 100
  const phMeterResolutionContribution =
    (phMeterResolutionStandardUncertainty ** 2 / varianceSum) * 100
  const repeatabilityContribution =
    (repeatabilityStandardUncertainty ** 2 / varianceSum) * 100
  const samplingContribution =
    (samplingStandardUncertainty ** 2 / varianceSum) * 100

  return {
    PhMeterAccuracyStandardUncertainty: phMeterAccuracyStandardUncertainty,
    PhMeterResolutionStandardUncertainty: phMeterResolutionStandardUncertainty,
    RepeatabilityStandardUncertainty: repeatabilityStandardUncertainty,
    SamplingStandardUncertainty: samplingStandardUncertainty,
    CombinedStandardUncertainty: combinedStandardUncertainty,
    PhMeterAccuracyContribution: phMeterAccuracyContribution,
    PhMeterResolutionContribution: phMeterResolutionContribution,
    RepeatabilityContribution: repeatabilityContribution,
    SamplingContribution: samplingContribution,
    TotalContribution:
      phMeterAccuracyContribution +
      phMeterResolutionContribution +
      repeatabilityContribution +
      samplingContribution,
    ExpandedUncertainty: Math.round(combinedStandardUncertainty * 2 * 10) / 10,
  }
}

// ============================================================
// Экспорт
// ============================================================

export {
  E5_phMeterAccuracy,
  E6_phMeterResolution,
  E7_repeatability,
  H5_measuredPH,
  E12_uPhMeterAccuracy,
  E13_uPhMeterResolution,
  E14_uRepeatability,
  E15_uSampling,
  E16_uCombined,
  G12_contributionPhMeterAccuracy,
  G13_contributionPhMeterResolution,
  G14_contributionRepeatability,
  G15_contributionSampling,
  G16_contributionTotal,
  E21_expandedUncertainty,
};