import { resolveAutoIgnitionFieldValue } from "@/features/auto-ignition"
import { resolveBaseNumberFieldValue } from "@/features/base-number"
import { resolveBoilingPointFieldValue } from "@/features/boiling-point"
import { resolveColorCntFieldValue } from "@/features/color-cnt"
import { resolveCrystallizationFieldValue } from "@/features/crystallization"
import { resolveCrystallizationStartFieldValue } from "@/features/crystallization-start"
import { calculateGost3900Uncertainty, resolveDensityAt20FieldValue } from "@/features/density"
import { resolveDensityAt20Gost18995FieldValue } from "@/features/density-at-20-gost-18995"
import { resolveDynamicViscosity30FieldValue } from "@/features/dynamic-viscosity-30"
import { resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { calculateViscosityIndexForStrings } from "@/features/index-viscosity/lib/viscositycalculateIV"
import { resolveMechanicalImpuritiesFieldValue } from "@/features/mechanical-impurities"
import { resolveMechanicalImpuritiesGost6479FieldValue } from "@/features/mechanical-impurities-gost-6479"
import { resolveNoackLossFieldValue } from "@/features/noack-loss"
import { resolvePhFieldValue } from "@/features/ph"
import { resolvePourPointFieldValue } from "@/features/pour-point"
import { resolveKinematicViscosityFieldValue } from "@/features/viscosity"
import { calculateWaterContent, calculateWaterContentAverage } from "@/features/water-content"
import { getVisibleProtocolTests } from "./calcXTestConfig"
import type { TestVisibilityKey } from "./calcXTestVisibilityConfig"
import type { InitialTestData } from "./initialTestData"

export type CalcXUncertaintyRow = {
  id: TestVisibilityKey
  name: string
  result: string
  uncertainty: string
}

const resolveWaterContentAverage = (formData: InitialTestData) => {
  const firstValue = calculateWaterContent(
    formData.waterContentFirstSampleMass,
    formData.waterContentFirstWaterVolume,
    2,
  )
  const secondValue = calculateWaterContent(
    formData.waterContentSecondSampleMass,
    formData.waterContentSecondWaterVolume,
    2,
  )

  return calculateWaterContentAverage(firstValue, secondValue)
}

const resolveViscosityIndex = (formData: InitialTestData) => {
  const viscosity100 = resolveKinematicViscosityFieldValue(formData, "kinematicViscosity100Average")
  const viscosity40 = resolveKinematicViscosityFieldValue(formData, "kinematicViscosity40Average")
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

const resolveTestResult = (id: TestVisibilityKey, formData: InitialTestData): string => {
  switch (id) {
    case "flashPoint":
      return formData.averageCorrectedTemperature
    case "mechanicalImpurities":
      return resolveMechanicalImpuritiesFieldValue(formData, "mechanicalImpuritiesAverage")
    case "mechanicalImpuritiesGost6479":
      return resolveMechanicalImpuritiesGost6479FieldValue(formData, "mechanicalImpuritiesGost6479Average")
    case "densityAt20":
      return resolveDensityAt20FieldValue(formData, "densityAt20Average")
    case "densityAt20Gost18995":
      return resolveDensityAt20Gost18995FieldValue(formData, "densityAt20Gost18995Average")
    case "ph":
      return resolvePhFieldValue(formData, "phAverage")
    case "crystallizationStart":
      return resolveCrystallizationStartFieldValue(formData, "crystallizationStartAverage")
    case "crystallization":
      return resolveCrystallizationFieldValue(formData, "crystallizationAverage")
    case "boilingPoint":
      return resolveBoilingPointFieldValue(formData, "boilingPointAverage")
    case "corrosion":
      return formData.corrosionResultsCopperAverage
    case "kinematicViscosity100":
      return resolveKinematicViscosityFieldValue(formData, "kinematicViscosity100Average")
    case "kinematicViscosity40":
      return resolveKinematicViscosityFieldValue(formData, "kinematicViscosity40Average")
    case "viscosityIndex":
      return resolveViscosityIndex(formData)
    case "waterContent":
      return resolveWaterContentAverage(formData)
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
  if (id === "densityAt20") {
    return resolveDensityAt20Uncertainty(formData)
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
