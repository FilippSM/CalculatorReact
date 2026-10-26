import { useBoilingPointStore } from "@/features/boiling-point"
import { useCrystallizationStore } from "@/features/crystallization"
import { useCrystallizationStartStore } from "@/features/crystallization-start"
import { useFlashPointStore } from "@/features/flash-point"
import { useMechanicalImpuritiesStore } from "@/features/mechanical-impurities"
import { usePhStore } from "@/features/ph"
import { useAutoIgnitionStore } from "@/features/auto-ignition"
import { useFreezingPointStore } from "@/features/freezing-point"
import { usePourPointStore } from "@/features/pour-point"
import {
  DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME,
  useKinematicViscosity100Store,
  useKinematicViscosity40Store,
} from "@/features/viscosity"
import { useWaterContentStore } from "@/features/water-content"
import { beforeEach, describe, expect, test } from "vitest"
import { initialVisibleTests } from "./calcXTestVisibilityConfig"
import { buildCalcXUncertaintyRows } from "./calcXUncertaintyRows"
import { initialTestData } from "./initialTestData"
import { buildProtocolDocument } from "./protocolDocument"

beforeEach(() => {
  useFlashPointStore.getState().setAverageCorrectedTemperature("243")
  useMechanicalImpuritiesStore.getState().setAverage("0,0019")
  usePhStore.getState().setAverage("8,7")
  useCrystallizationStartStore.getState().setAverage("-20,3")
  useCrystallizationStore.getState().setAverage("-14,8")
  useBoilingPointStore.getState().setAverage("246,3")
  usePourPointStore.getState().setAverage("-21")
  useFreezingPointStore.getState().setAverage("-24")
  useAutoIgnitionStore.getState().setAverage("351")
  useKinematicViscosity100Store.getState().setResults({
    average: "7,333",
    firstTAverage: "239,65",
    precisionName: DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME,
  })
  useKinematicViscosity40Store.getState().setResults({
    average: "36,83",
    firstTAverage: "327,91",
    precisionName: DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME,
  })
  useWaterContentStore.getState().clearStore()
})

describe("ГОСТ 3900 uncertainty in the protocol", () => {
  test("shows the calculated value in results and exported document data", () => {
    const densityRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "densityAt20",
    )
    const densityExportRow = buildProtocolDocument(initialTestData, initialVisibleTests).results.find(
      (row) => row.method.includes("ГОСТ 3900"),
    )

    expect(densityRow?.uncertainty).toBe("2,5")
    expect(densityExportRow?.uncertainty).toBe("2,5")
  })
})

describe("ГОСТ 6370 uncertainty in the protocol", () => {
  test("shows the calculated value in results and exported document data", () => {
    const impuritiesRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "mechanicalImpurities",
    )
    const impuritiesExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 6370"))

    expect(impuritiesRow?.uncertainty).toBe("0,0018")
    expect(impuritiesExportRow?.uncertainty).toBe("0,0018")
  })
})

describe("ГОСТ 28084 uncertainty in the protocol", () => {
  test("shows the calculated pH value and uncertainty in results and exported document data", () => {
    const phRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "ph",
    )
    const phExportRow = buildProtocolDocument(initialTestData, initialVisibleTests).results.find(
      (row) => row.method.includes("ГОСТ 28084 по п.4.8"),
    )

    expect(phRow?.result).toBe("8,7")
    expect(phRow?.uncertainty).toBe("0,2")
    expect(phExportRow?.result).toBe("8,7")
    expect(phExportRow?.uncertainty).toBe("0,2")
  })

  test("shows the crystallization start value and uncertainty in results and exported document data", () => {
    const crystallizationStartRow = buildCalcXUncertaintyRows(
      initialTestData,
      initialVisibleTests,
    ).find((row) => row.id === "crystallizationStart")
    const crystallizationStartExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 28084 по п.4.3"))

    expect(crystallizationStartRow?.result).toBe("-20,3")
    expect(crystallizationStartRow?.uncertainty).toBe("1,8")
    expect(crystallizationStartExportRow?.result).toBe("-20,3")
    expect(crystallizationStartExportRow?.uncertainty).toBe("1,8")
  })
})

describe("ГОСТ 18995.5 uncertainty in the protocol", () => {
  test("shows the crystallization value and uncertainty in results and exported document data", () => {
    const crystallizationRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "crystallization",
    )
    const crystallizationExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 18995.5"))

    expect(crystallizationRow?.result).toBe("-14,8")
    expect(crystallizationRow?.uncertainty).toBe("1,2")
    expect(crystallizationExportRow?.result).toBe("-14,8")
    expect(crystallizationExportRow?.uncertainty).toBe("1,2")
  })
})

describe("ГОСТ 18995.6 uncertainty in the protocol", () => {
  test("shows the boiling point value and uncertainty in results and exported document data", () => {
    const boilingPointRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "boilingPoint",
    )
    const boilingPointExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 18995.6"))

    expect(boilingPointRow?.result).toBe("246,3")
    expect(boilingPointRow?.uncertainty).toBe("1,3")
    expect(boilingPointExportRow?.result).toBe("246,3")
    expect(boilingPointExportRow?.uncertainty).toBe("1,3")
  })
})

describe("ГОСТ 20287 uncertainty in the protocol", () => {
  test("shows the pour point value and uncertainty in results and exported document data", () => {
    const pourPointRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "pourPoint",
    )
    const pourPointExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 20287") && row.name.includes("текучести"))

    expect(pourPointRow?.result).toBe("-21")
    expect(pourPointRow?.uncertainty).toBe("3")
    expect(pourPointExportRow?.result).toBe("-21")
    expect(pourPointExportRow?.uncertainty).toBe("3")
  })

  test("shows the freezing point value and uncertainty in results and exported document data", () => {
    const freezingPointRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "freezingPoint",
    )
    const freezingPointExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 20287") && row.name.includes("застывания"))

    expect(freezingPointRow?.result).toBe("-24")
    expect(freezingPointRow?.uncertainty).toBe("1")
    expect(freezingPointExportRow?.result).toBe("-24")
    expect(freezingPointExportRow?.uncertainty).toBe("1")
  })
})

describe("ГОСТ 12.1.044 uncertainty in the protocol", () => {
  test("shows the auto-ignition value and uncertainty in results and exported document data", () => {
    const autoIgnitionRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "autoIgnition",
    )
    const autoIgnitionExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 12.1.044"))

    expect(autoIgnitionRow?.result).toBe("351")
    expect(autoIgnitionRow?.uncertainty).toBe("8")
    expect(autoIgnitionExportRow?.result).toBe("351")
    expect(autoIgnitionExportRow?.uncertainty).toBe("8")
  })
})

describe("ГОСТ 4333 uncertainty in the protocol", () => {
  test("shows the calculated value in results and exported document data", () => {
    const flashPointRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "flashPoint",
    )
    const flashPointExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.method.includes("ГОСТ 4333"))

    expect(flashPointRow?.uncertainty).toBe("6")
    expect(flashPointExportRow?.uncertainty).toBe("6")
  })
})

describe("ГОСТ 2477 uncertainty in the protocol", () => {
  test("shows Xср and uncertainty in results and exported document data", () => {
    const formData = {
      ...initialTestData,
      waterContentFirstWaterVolume: "1,00",
      waterContentSecondWaterVolume: "1,00",
    }

    const waterContentRow = buildCalcXUncertaintyRows(formData, initialVisibleTests).find(
      (row) => row.id === "waterContent",
    )
    const waterContentExportRow = buildProtocolDocument(formData, initialVisibleTests).results.find(
      (row) => row.method.includes("ГОСТ 2477"),
    )

    expect(waterContentRow?.result).toBe("1,00")
    expect(waterContentRow?.uncertainty).toBe("0,05")
    expect(waterContentExportRow?.result).toBe("1,00")
    expect(waterContentExportRow?.uncertainty).toBe("0,05")
  })
})

describe("ГОСТ 33 uncertainty in the protocol", () => {
  test("shows the kinematic viscosity 100 value and uncertainty in results and exported document data", () => {
    const viscosityRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "kinematicViscosity100",
    )
    const viscosityExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.name.includes("100°C") && row.method.includes("ГОСТ 33"))

    expect(viscosityRow?.result).toBe("7,333")
    expect(viscosityRow?.uncertainty).toBe("0,03")
    expect(viscosityExportRow?.result).toBe("7,333")
    expect(viscosityExportRow?.uncertainty).toBe("0,03")
  })

  test("shows the kinematic viscosity 40 value and uncertainty in results and exported document data", () => {
    const viscosityRow = buildCalcXUncertaintyRows(initialTestData, initialVisibleTests).find(
      (row) => row.id === "kinematicViscosity40",
    )
    const viscosityExportRow = buildProtocolDocument(
      initialTestData,
      initialVisibleTests,
    ).results.find((row) => row.name.includes("40°С") && row.method.includes("ГОСТ 33"))

    expect(viscosityRow?.result).toBe("36,83")
    expect(viscosityRow?.uncertainty).toBe("0,15")
    expect(viscosityExportRow?.result).toBe("36,83")
    expect(viscosityExportRow?.uncertainty).toBe("0,15")
  })
})
