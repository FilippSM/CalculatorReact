import type { TestVisibilityKey } from "./calcXTestVisibilityConfig"
import type { InitialTestData } from "./initialTestData"

export type ProtocolTableGroupHeader = {
  label: string
  colSpan: number
}

export type CalcXTestConfig = {
  id: TestVisibilityKey
  nameField: keyof InitialTestData
  equipmentFields: (keyof InitialTestData)[]
  groupHeaders?: ProtocolTableGroupHeader[]
  columnHeaders: string[]
  valueFields: (keyof InitialTestData)[]
}

export const calcXTestConfig: CalcXTestConfig[] = [
  {
    id: "flashPoint",
    nameField: "flashPointTestName",
    equipmentFields: [
      "flashPointEquipmentDevice",
      "flashPointEquipmentThermometer",
      "flashPointEquipmentStopwatch",
      "flashPointEquipmentThermohygrometer",
    ],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 4 },
      { label: "Второе измерение", colSpan: 4 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "t₀, °C",
      "p, кПа",
      "Поправка, °C",
      "t₀ скорректированное, °C",
      "t₀, °C",
      "p, кПа",
      "Поправка, °C",
      "t₀ скорректированное, °C",
      "Повторяемость r, °C",
      "Среднее значение tср, °C",
    ],
    valueFields: [
      "firstMeasurementTemperature",
      "firstMeasurementPressure",
      "firstMeasurementCorrection",
      "firstMeasurementCorrectedTemperature",
      "secondMeasurementTemperature",
      "secondMeasurementPressure",
      "secondMeasurementCorrection",
      "secondMeasurementCorrectedTemperature",
      "repeatability",
      "averageCorrectedTemperature",
    ],
  },
  {
    id: "mechanicalImpurities",
    nameField: "mechanicalImpuritiesTestName",
    equipmentFields: [
      "mechanicalImpuritiesEquipmentBalance1",
      "mechanicalImpuritiesEquipmentBalance2",
      "mechanicalImpuritiesEquipmentFurnace",
    ],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 4 },
      { label: "Второе измерение", colSpan: 4 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Масса стакана + ф-тр + мех. примеси m₁, г",
      "Масса стакана + фильтр m₂, г",
      "Масса пробы m₃, г",
      "Содержание мех. примесей X₁, %",
      "Масса стакана + ф-тр + мех. примеси m₁, г",
      "Масса стакана + фильтр m₂, г",
      "Масса пробы m₃, г",
      "Содержание мех. примесей X₂, %",
      "Повторяемость r, %",
      "Среднее значение Xср, %",
    ],
    valueFields: [
      "mechanicalImpuritiesFirstM1",
      "mechanicalImpuritiesFirstM2",
      "mechanicalImpuritiesFirstM3",
      "mechanicalImpuritiesFirstX1",
      "mechanicalImpuritiesSecondM1",
      "mechanicalImpuritiesSecondM2",
      "mechanicalImpuritiesSecondM3",
      "mechanicalImpuritiesSecondX2",
      "mechanicalImpuritiesRepeatability",
      "mechanicalImpuritiesAverage",
    ],
  },
  {
    id: "densityAt20",
    nameField: "densityAt20TestName",
    equipmentFields: ["densityAt20EquipmentThermometer", "densityAt20EquipmentHydrometer"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 4 },
      { label: "Второе измерение", colSpan: 4 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "ρ₁, кг/м³",
      "t₁, °С",
      "ρ₁ при 20°С, кг/м³",
      "ρ₁ при 20°С с поправкой, кг/м³",
      "ρ₂, кг/м³",
      "t₂, °С",
      "ρ₂ при 20°С, кг/м³",
      "ρ₂ при 20°С с поправкой, кг/м³",
      "Повторяемость r, кг/м³",
      "Среднее значение ρср, кг/м³",
    ],
    valueFields: [
      "densityAt20FirstRho",
      "densityAt20FirstT",
      "densityAt20FirstRhoAt20",
      "densityAt20FirstRhoAt20Corrected",
      "densityAt20SecondRho",
      "densityAt20SecondT",
      "densityAt20SecondRhoAt20",
      "densityAt20SecondRhoAt20Corrected",
      "densityAt20Repeatability",
      "densityAt20Average",
    ],
  },
  {
    id: "kinematicViscosity100",
    nameField: "kinematicViscosity100TestName",
    equipmentFields: [
      "kinematicViscosity100EquipmentViscometer",
      "kinematicViscosity100EquipmentThermostat",
      "kinematicViscosity100EquipmentStopwatch",
    ],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 7 },
      { label: "Второе измерение", colSpan: 7 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Время истечения t₁, с",
      "Время истечения t₂, с",
      "Номер вискозиметра",
      "Постоянная вискозиметра",
      "Определяемость d, с (компаундированные масла)",
      "Среднее значение tср, с",
      "Кинематическая вязкость ν₁, мм²/с",
      "Время истечения t₁, с",
      "Время истечения t₂, с",
      "Номер вискозиметра",
      "Постоянная вискозиметра",
      "Определяемость d, с (компаундированные масла)",
      "Среднее значение tср, с",
      "Кинематическая вязкость ν₂, мм²/с",
      "Повторяемость d, % (компаундированные масла)",
      "Среднее значение νср, мм²/с",
    ],
    valueFields: [
      "kinematicViscosity100FirstT1",
      "kinematicViscosity100FirstT2",
      "kinematicViscosity100FirstViscometerNumber",
      "kinematicViscosity100FirstViscometerConstant",
      "kinematicViscosity100FirstDeterminability",
      "kinematicViscosity100FirstTAverage",
      "kinematicViscosity100FirstV1",
      "kinematicViscosity100SecondT1",
      "kinematicViscosity100SecondT2",
      "kinematicViscosity100SecondViscometerNumber",
      "kinematicViscosity100SecondViscometerConstant",
      "kinematicViscosity100SecondDeterminability",
      "kinematicViscosity100SecondTAverage",
      "kinematicViscosity100SecondV2",
      "kinematicViscosity100Repeatability",
      "kinematicViscosity100Average",
    ],
  },
  {
    id: "kinematicViscosity40",
    nameField: "kinematicViscosity40TestName",
    equipmentFields: [
      "kinematicViscosity40EquipmentViscometer",
      "kinematicViscosity40EquipmentThermostat",
      "kinematicViscosity40EquipmentStopwatch",
    ],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 7 },
      { label: "Второе измерение", colSpan: 7 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Время истечения t₁, с",
      "Время истечения t₂, с",
      "Номер вискозиметра",
      "Постоянная вискозиметра",
      "Определяемость d, с (компаундированные масла)",
      "Среднее значение tср, с",
      "Кинематическая вязкость ν₁, мм²/с",
      "Время истечения t₁, с",
      "Время истечения t₂, с",
      "Номер вискозиметра",
      "Постоянная вискозиметра",
      "Определяемость d, с (компаундированные масла)",
      "Среднее значение tср, с",
      "Кинематическая вязкость ν₂, мм²/с",
      "Повторяемость d, % (компаундированные масла)",
      "Среднее значение νср, мм²/с",
    ],
    valueFields: [
      "kinematicViscosity40FirstT1",
      "kinematicViscosity40FirstT2",
      "kinematicViscosity40FirstViscometerNumber",
      "kinematicViscosity40FirstViscometerConstant",
      "kinematicViscosity40FirstDeterminability",
      "kinematicViscosity40FirstTAverage",
      "kinematicViscosity40FirstV1",
      "kinematicViscosity40SecondT1",
      "kinematicViscosity40SecondT2",
      "kinematicViscosity40SecondViscometerNumber",
      "kinematicViscosity40SecondViscometerConstant",
      "kinematicViscosity40SecondDeterminability",
      "kinematicViscosity40SecondTAverage",
      "kinematicViscosity40SecondV2",
      "kinematicViscosity40Repeatability",
      "kinematicViscosity40Average",
    ],
  },
  {
    id: "viscosityIndex",
    nameField: "viscosityIndexTestName",
    equipmentFields: [],
    columnHeaders: ["ν₁₀₀", "ν₄₀", "ИВ"],
    valueFields: ["viscosityIndexV100", "viscosityIndexV40", "viscosityIndexIV"],
  },
  {
    id: "waterContent",
    nameField: "waterContentTestName",
    equipmentFields: [
      "waterContentEquipmentBalance",
      "waterContentEquipmentReceiver",
      "waterContentEquipmentStopwatch",
    ],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 3 },
      { label: "Второе измерение", colSpan: 3 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Масса образца m, г",
      "Объем воды в пр.-ловушке V₀, см³",
      "Содержание воды, %",
      "Масса образца m, г",
      "Объем воды в пр.-ловушке V₀, см³",
      "Содержание воды, %",
      "Повторяемость r, см³",
      "Среднее значение Xср, %",
    ],
    valueFields: [
      "waterContentFirstSampleMass",
      "waterContentFirstWaterVolume",
      "waterContentFirstValue",
      "waterContentSecondSampleMass",
      "waterContentSecondWaterVolume",
      "waterContentSecondValue",
      "waterContentRepeatability",
      "waterContentAverage",
    ],
  },
  {
    id: "pourPoint",
    nameField: "pourPointTestName",
    equipmentFields: ["pourPointEquipment"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 1 },
      { label: "Второе измерение", colSpan: 1 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: ["t₁, °C", "t₂, °C", "Повторяемость r, °C", "Среднее значение tср, °C"],
    valueFields: ["pourPointFirstT1", "pourPointSecondT2", "pourPointRepeatability", "pourPointAverage"],
  },
  {
    id: "freezingPoint",
    nameField: "freezingPointTestName",
    equipmentFields: ["freezingPointEquipment"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 1 },
      { label: "Второе измерение", colSpan: 1 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: ["t₁, °C", "t₂, °C", "Повторяемость r, °C", "Среднее значение tср, °C"],
    valueFields: [
      "freezingPointFirstT1",
      "freezingPointSecondT2",
      "freezingPointRepeatability",
      "freezingPointAverage",
    ],
  },
  {
    id: "noackLoss",
    nameField: "noackLossTestName",
    equipmentFields: ["noackLossEquipmentBalance", "noackLossEquipmentApparatus"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 4 },
      { label: "Второе измерение", colSpan: 4 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Масса пустого тигля A, г",
      "Масса тигля с образцом B, г",
      "Масса тигля с образцом после нагревания 1 ч C, г",
      "Потери от испарения, %",
      "Масса пустого тигля A, г",
      "Масса тигля с образцом B, г",
      "Масса тигля с образцом после нагревания 1 ч C, г",
      "Потери от испарения, %",
      "Повторяемость r, %",
      "Среднее значение Xср, %",
    ],
    valueFields: [
      "noackLossFirstCrucibleA",
      "noackLossFirstCrucibleB",
      "noackLossFirstCrucibleC",
      "noackLossFirstEvaporationLoss",
      "noackLossSecondCrucibleA",
      "noackLossSecondCrucibleB",
      "noackLossSecondCrucibleC",
      "noackLossSecondEvaporationLoss",
      "noackLossRepeatability",
      "noackLossAverage",
    ],
  },
  {
    id: "dynamicViscosity30",
    nameField: "dynamicViscosity30TestName",
    equipmentFields: ["dynamicViscosity30Equipment"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 1 },
      { label: "Второе измерение", colSpan: 1 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: ["η₁, °C", "η₂, °C", "Повторяемость r, °C", "Среднее значение ηср"],
    valueFields: [
      "dynamicViscosity30FirstEta1",
      "dynamicViscosity30SecondEta2",
      "dynamicViscosity30Repeatability",
      "dynamicViscosity30Average",
    ],
  },
  {
    id: "colorCnt",
    nameField: "colorCntTestName",
    equipmentFields: ["colorCntEquipment"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 1 },
      { label: "Второе измерение", colSpan: 1 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: ["X₁, ед. ЦНТ", "X₂, ед. ЦНТ", "Повторяемость X, ед. ЦНТ", "Среднее значение Xср"],
    valueFields: ["colorCntFirstX1", "colorCntSecondX2", "colorCntRepeatability", "colorCntAverage"],
  },
  {
    id: "baseNumber",
    nameField: "baseNumberTestName",
    equipmentFields: ["baseNumberEquipment"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 4 },
      { label: "Второе измерение", colSpan: 4 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "Масса образца m, г",
      "Концентрация титранта C₀₁, моль/л",
      "Объем титранта V, мл",
      "Щелочное число, мг·KOH/г",
      "Масса образца m, г",
      "Концентрация титранта C₀₁, моль/л",
      "Объем титранта V, мл",
      "Щелочное число, мг·KOH/г",
      "Повторяемость r, мг·KOH/г",
      "Среднее значение X, мг·KOH/г",
    ],
    valueFields: [
      "baseNumberFirstSampleMass",
      "baseNumberFirstTitrantConcentration",
      "baseNumberFirstTitrantVolume",
      "baseNumberFirstValue",
      "baseNumberSecondSampleMass",
      "baseNumberSecondTitrantConcentration",
      "baseNumberSecondTitrantVolume",
      "baseNumberSecondValue",
      "baseNumberRepeatability",
      "baseNumberAverage",
    ],
  },
  {
    id: "autoIgnition",
    nameField: "autoIgnitionTestName",
    equipmentFields: ["autoIgnitionEquipmentDevice", "autoIgnitionEquipmentStopwatch", "autoIgnitionEquipmentBalance"],
    groupHeaders: [
      { label: "Первое измерение", colSpan: 3 },
      { label: "Второе измерение", colSpan: 3 },
      { label: "Результаты", colSpan: 2 },
    ],
    columnHeaders: [
      "t₁, °C",
      "Навеска образца m₁, г",
      "Период индукции самовоспламенения t₁, с",
      "t₂, °C",
      "Навеска образца m₂, г",
      "Период индукции самовоспламенения t₂, с",
      "Повторяемость r, °C",
      "Среднее значение tср, °C",
    ],
    valueFields: [
      "autoIgnitionFirstT1",
      "autoIgnitionFirstM1",
      "autoIgnitionFirstInductionT1",
      "autoIgnitionSecondT2",
      "autoIgnitionSecondM2",
      "autoIgnitionSecondInductionT2",
      "autoIgnitionRepeatability",
      "autoIgnitionAverage",
    ],
  },
]

export const getVisibleProtocolTests = (visibleTests: Record<TestVisibilityKey, boolean>) =>
  calcXTestConfig.filter(({ id }) => visibleTests[id])

export type ProtocolPrintTableSection = {
  groupHeaders?: ProtocolTableGroupHeader[]
  columnHeaders: string[]
  valueFields: (keyof InitialTestData)[]
}

/** Splits trailing "Результаты" group onto its own table for wide kinematic viscosity tests. */
export const getPrintTableSections = (test: CalcXTestConfig): ProtocolPrintTableSection[] => {
  const shouldSplitResults = test.id === "kinematicViscosity100" || test.id === "kinematicViscosity40"
  const groupHeaders = test.groupHeaders
  const lastGroup = groupHeaders?.at(-1)

  if (
    !shouldSplitResults ||
    !groupHeaders ||
    groupHeaders.length < 2 ||
    lastGroup?.label !== "Результаты"
  ) {
    return [
      {
        groupHeaders,
        columnHeaders: test.columnHeaders,
        valueFields: test.valueFields,
      },
    ]
  }

  const measurementGroups = groupHeaders.slice(0, -1)
  const measurementColumns = measurementGroups.reduce((sum, group) => sum + group.colSpan, 0)

  return [
    {
      groupHeaders: measurementGroups,
      columnHeaders: test.columnHeaders.slice(0, measurementColumns),
      valueFields: test.valueFields.slice(0, measurementColumns),
    },
    {
      groupHeaders: [lastGroup],
      columnHeaders: test.columnHeaders.slice(measurementColumns),
      valueFields: test.valueFields.slice(measurementColumns),
    },
  ]
}
