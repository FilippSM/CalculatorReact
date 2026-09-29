import { useFlashPointStore } from "@/features/flash-point"
import { beforeEach, describe, expect, test } from "vitest"
import { initialVisibleTests } from "./calcXTestVisibilityConfig"
import { buildCalcXUncertaintyRows } from "./calcXUncertaintyRows"
import { initialTestData } from "./initialTestData"
import { buildProtocolDocument } from "./protocolDocument"

beforeEach(() => {
  useFlashPointStore.getState().setAverageCorrectedTemperature("243")
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
