import { useCrystallizationStore } from "@/features/crystallization"
import { useCrystallizationStartStore } from "@/features/crystallization-start"
import { useFlashPointStore } from "@/features/flash-point"
import { useMechanicalImpuritiesStore } from "@/features/mechanical-impurities"
import { usePhStore } from "@/features/ph"
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
