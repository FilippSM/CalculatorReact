import { resolveAutoIgnitionFieldValue } from "@/features/auto-ignition"
import { resolveBaseNumberFieldValue } from "@/features/base-number"
import {
  calculateGost18995Uncertainty as calculateGost189956BoilingPointUncertainty,
  useBoilingPointStore,
} from "@/features/boiling-point"
import { resolveColorCntFieldValue } from "@/features/color-cnt"
import {
  calculateGost18995Uncertainty as calculateGost18995CrystallizationUncertainty,
  useCrystallizationStore,
} from "@/features/crystallization"
import {
  calculateGost28084Uncertainty as calculateGost28084CrystallizationStartUncertainty,
  useCrystallizationStartStore,
} from "@/features/crystallization-start"
import { calculateGost3900Uncertainty, resolveDensityAt20FieldValue } from "@/features/density"
import {
  calculateGost18995Uncertainty,
  resolveDensityAt20Gost18995FieldValue,
} from "@/features/density-at-20-gost-18995"
import { resolveDynamicViscosity30FieldValue } from "@/features/dynamic-viscosity-30"
import {
  calculateGost4333Uncertainty,
  useFlashPointStore,
} from "@/features/flash-point"
import { resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { calculateViscosityIndexForStrings } from "@/features/index-viscosity/lib/viscositycalculateIV"
import {
  calculateGost6370Uncertainty,
  formatToSignificantDigits,
  useMechanicalImpuritiesStore,
} from "@/features/mechanical-impurities"
import { resolveMechanicalImpuritiesGost6479FieldValue } from "@/features/mechanical-impurities-gost-6479"
import { resolveNoackLossFieldValue } from "@/features/noack-loss"
import { calculateGost28084Uncertainty, usePhStore } from "@/features/ph"
import { resolvePourPointFieldValue } from "@/features/pour-point"
import {
  calculateGost33Uncertainty,
  useKinematicViscosity100Store,
  useKinematicViscosity40Store,
} from "@/features/viscosity"
import { viscosityPrecisionData } from "@/features/viscosity/constans/viscosityPrecisionData"
import {
  calculateGost2477Uncertainty,
  resolveWaterContentAverage,
  type Gost2477ReceiverCapacity,
  type Gost2477WaterShareType,
} from "@/features/water-content"
import { getVisibleProtocolTests } from "./calcXTestConfig"
import type { TestVisibilityKey } from "./calcXTestVisibilityConfig"
import type { InitialTestData } from "./initialTestData"

const parseNumeric = (value: string): number | null => {
  const normalized = value.trim().replace(",", ".")
  if (normalized === "") return null
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

const resolveViscosityPrecisionPercents = (
  precisionName: string,
  averageFlowTime: string,
  kinematicViscosity: string,
): { detectionLimitPercent: number; repeatabilityLimitPercent: number } | null => {
  const precision = viscosityPrecisionData.find((item) => item.name === precisionName)
  const flowTime = parseNumeric(averageFlowTime)
  const viscosity = parseNumeric(kinematicViscosity)

  if (!precision || flowTime === null || flowTime <= 0 || viscosity === null || viscosity <= 0) {
    return null
  }

  return {
    detectionLimitPercent: (precision.d(flowTime) / flowTime) * 100,
    repeatabilityLimitPercent: (precision.r(viscosity) / viscosity) * 100,
  }
}

export type CalcXUncertaintyRow = {
  id: TestVisibilityKey
  name: string
  result: string
  uncertainty: string
}

const resolveWaterContentResult = (formData: InitialTestData) =>
  resolveWaterContentAverage({
    firstSample: formData.waterContentFirstSampleMass,
    firstWaterVolume: formData.waterContentFirstWaterVolume,
    secondSample: formData.waterContentSecondSampleMass,
    secondWaterVolume: formData.waterContentSecondWaterVolume,
    receiverTrap: formData.waterContentReceiverTrap,
  })

const resolveWaterContentWaterShare = (formData: InitialTestData): Gost2477WaterShareType =>
  formData.waterContentWaterShare === "Массовая доля воды" ? "mass" : "volume"

const resolveWaterContentReceiverCapacity = (
  formData: InitialTestData,
): Gost2477ReceiverCapacity => (formData.waterContentReceiverTrap.includes("5 см") ? 5 : 10)

const resolveWaterContentUncertainty = (formData: InitialTestData): string => {
  const result = calculateGost2477Uncertainty({
    waterShare: resolveWaterContentWaterShare(formData),
    receiverCapacity: resolveWaterContentReceiverCapacity(formData),
    waterVolume: formData.waterContentFirstWaterVolume,
    sampleAmount: formData.waterContentFirstSampleMass,
  })

  return result === null ? "" : String(result.ExpandedUncertainty).replace(".", ",")
}

const resolveViscosityIndex = () => {
  const viscosity100 = useKinematicViscosity100Store.getState().average
  const viscosity40 = useKinematicViscosity40Store.getState().average
  const result = calculateViscosityIndexForStrings(viscosity100, viscosity40)

  return result === null ? "" : String(result)
}

const resolveDensityAt20Uncertainty = (formData: InitialTestData): string => {
  const meanDensityAt20 = resolveDensityAt20FieldValue(formData, "densityAt20Average")
  const result = calculateGost3900Uncertainty({
    densityAtTestTemperature: formData.densityAt20FirstRho,
    sampleTemperature: formData.densityAt20FirstT,
    meanDensityAt20,
    hydrometer: formData.densityAt20EquipmentHydrometer.includes("АНТ-1") ? "ANT-1" : "ANT-2",
    thermometer: formData.densityAt20EquipmentThermometer.includes("ЛТ-300") ? "LT-300" : "other",
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(1).replace(".", ",")
}

const resolveDensityAt20Gost18995Uncertainty = (formData: InitialTestData): string => {
  const meanDensity = resolveDensityAt20Gost18995FieldValue(
    formData,
    "densityAt20Gost18995Average",
  )
  const result = calculateGost18995Uncertainty({
    meanDensity,
    thermometer: formData.densityAt20Gost18995EquipmentThermometer.includes("ЛТ-300")
      ? "LT-300"
      : "other",
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(3).replace(".", ",")
}

const resolveMechanicalImpuritiesUncertainty = (formData: InitialTestData): string => {
  const result = calculateGost6370Uncertainty({
    filterWithImpuritiesMass: formData.mechanicalImpuritiesFirstM1,
    cleanFilterMass: formData.mechanicalImpuritiesFirstM2,
    sampleMass: formData.mechanicalImpuritiesFirstM3,
  })

  return result === null ? "" : formatToSignificantDigits(result.ExpandedUncertainty, 2)
}

const resolvePhUncertainty = (formData: InitialTestData): string => {
  const result = calculateGost28084Uncertainty({
    measuredPh: usePhStore.getState().average,
    phMeter: formData.phEquipmentMeter.includes("J0088992") ? "J0088992" : "other",
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(1).replace(".", ",")
}

const resolveCrystallizationStartUncertainty = (): string => {
  const result = calculateGost28084CrystallizationStartUncertainty({
    measuredTemperature: useCrystallizationStartStore.getState().average,
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(1).replace(".", ",")
}

const resolveCrystallizationUncertainty = (): string => {
  const result = calculateGost18995CrystallizationUncertainty({
    measuredTemperature: useCrystallizationStore.getState().average,
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(1).replace(".", ",")
}

const resolveBoilingPointUncertainty = (): string => {
  const result = calculateGost189956BoilingPointUncertainty({
    measuredTemperature: useBoilingPointStore.getState().average,
  })

  return result === null ? "" : result.ExpandedUncertainty.toFixed(1).replace(".", ",")
}

const resolveFlashPointUncertainty = (formData: InitialTestData): string => {
  const correctedFlashPoint = useFlashPointStore.getState().averageCorrectedTemperature
  const result = calculateGost4333Uncertainty({
    correctedFlashPoint,
    device: formData.flashPointEquipmentDevice.includes("Автоматический")
      ? "automatic"
      : "manual",
  })

  return result === null ? "" : String(result.ExpandedUncertainty)
}

const resolveKinematicViscosity100Uncertainty = (formData: InitialTestData): string => {
  const { average, firstTAverage, precisionName } = useKinematicViscosity100Store.getState()
  const percents = resolveViscosityPrecisionPercents(precisionName, firstTAverage, average)

  if (percents === null) return ""

  const result = calculateGost33Uncertainty({
    averageFlowTime: firstTAverage,
    viscometerConstant: formData.kinematicViscosity100FirstViscometerConstant,
    kinematicViscosity: average,
    detectionLimitPercent: percents.detectionLimitPercent,
    repeatabilityLimitPercent: percents.repeatabilityLimitPercent,
    testTemperature: 100,
  })

  return result === null ? "" : String(result.ExpandedUncertainty).replace(".", ",")
}

const resolveKinematicViscosity40Uncertainty = (formData: InitialTestData): string => {
  const { average, firstTAverage, precisionName } = useKinematicViscosity40Store.getState()
  const percents = resolveViscosityPrecisionPercents(precisionName, firstTAverage, average)

  if (percents === null) return ""

  const result = calculateGost33Uncertainty({
    averageFlowTime: firstTAverage,
    viscometerConstant: formData.kinematicViscosity40FirstViscometerConstant,
    kinematicViscosity: average,
    detectionLimitPercent: percents.detectionLimitPercent,
    repeatabilityLimitPercent: percents.repeatabilityLimitPercent,
    testTemperature: 40,
    samplingStandardUncertainty: 0,
  })

  return result === null ? "" : String(result.ExpandedUncertainty).replace(".", ",")
}

const resolveTestResult = (id: TestVisibilityKey, formData: InitialTestData): string => {
  switch (id) {
    case "flashPoint":
      return useFlashPointStore.getState().averageCorrectedTemperature
    case "mechanicalImpurities":
      return useMechanicalImpuritiesStore.getState().average
    case "mechanicalImpuritiesGost6479":
      return resolveMechanicalImpuritiesGost6479FieldValue(formData, "mechanicalImpuritiesGost6479Average")
    case "densityAt20":
      return resolveDensityAt20FieldValue(formData, "densityAt20Average")
    case "densityAt20Gost18995":
      return resolveDensityAt20Gost18995FieldValue(formData, "densityAt20Gost18995Average")
    case "ph":
      return usePhStore.getState().average
    case "crystallizationStart":
      return useCrystallizationStartStore.getState().average
    case "crystallization":
      return useCrystallizationStore.getState().average
    case "boilingPoint":
      return useBoilingPointStore.getState().average
    case "corrosion":
      return formData.corrosionResultsCopperAverage
    case "kinematicViscosity100":
      return useKinematicViscosity100Store.getState().average
    case "kinematicViscosity40":
      return useKinematicViscosity40Store.getState().average
    case "viscosityIndex":
      return resolveViscosityIndex()
    case "waterContent":
      return resolveWaterContentResult(formData)
    case "pourPoint":
      return resolvePourPointFieldValue(formData, "pourPointAverage")
    case "freezingPoint":
      return resolveFreezingPointFieldValue(formData, "freezingPointAverage")
    case "noackLoss":
      return resolveNoackLossFieldValue(formData, "noackLossAverage")
    case "dynamicViscosity30":
      return resolveDynamicViscosity30FieldValue(formData, "dynamicViscosity30Average")
    case "colorCnt":
      return resolveColorCntFieldValue(formData, "colorCntAverage")
    case "baseNumber":
      return resolveBaseNumberFieldValue(formData, "baseNumberAverage")
    case "autoIgnition":
      return resolveAutoIgnitionFieldValue(formData, "autoIgnitionAverage")
  }
}

const resolveTestUncertainty = (id: TestVisibilityKey, formData: InitialTestData): string => {
  if (id === "flashPoint") {
    return resolveFlashPointUncertainty(formData)
  }

  if (id === "mechanicalImpurities") {
    return resolveMechanicalImpuritiesUncertainty(formData)
  }

  if (id === "densityAt20") {
    return resolveDensityAt20Uncertainty(formData)
  }

  if (id === "densityAt20Gost18995") {
    return resolveDensityAt20Gost18995Uncertainty(formData)
  }

  if (id === "ph") {
    return resolvePhUncertainty(formData)
  }

  if (id === "crystallizationStart") {
    return resolveCrystallizationStartUncertainty()
  }

  if (id === "crystallization") {
    return resolveCrystallizationUncertainty()
  }

  if (id === "boilingPoint") {
    return resolveBoilingPointUncertainty()
  }

  if (id === "kinematicViscosity100") {
    return resolveKinematicViscosity100Uncertainty(formData)
  }

  if (id === "kinematicViscosity40") {
    return resolveKinematicViscosity40Uncertainty(formData)
  }

  if (id === "waterContent") {
    return resolveWaterContentUncertainty(formData)
  }

  return "0"
}

export const buildCalcXUncertaintyRows = (
  formData: InitialTestData,
  visibleTests: Record<TestVisibilityKey, boolean>,
): CalcXUncertaintyRow[] =>
  getVisibleProtocolTests(visibleTests).map((test) => ({
    id: test.id,
    name: formData[test.nameField],
    result: resolveTestResult(test.id, formData),
    uncertainty: resolveTestUncertainty(test.id, formData),
  }))
