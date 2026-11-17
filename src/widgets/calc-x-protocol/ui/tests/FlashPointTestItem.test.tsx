import { useFlashPointStore } from "@/features/flash-point"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"
import { FlashPointTestItem } from "./FlashPointTestItem"

const MANUAL_DEVICE =
  "Аппарат для определения температуры вспышки в открытом тигле ТВО-ПХП № 1052"
const AUTOMATIC_DEVICE = "Автоматический прибор"

const renderFlashPoint = (overrides: Partial<InitialTestData> = {}) => {
  const updateTestData = vi.fn()

  const Wrapper = () => {
    const [formData, setFormData] = useState<InitialTestData>({
      ...initialTestData,
      ...overrides,
    })

    return (
      <FlashPointTestItem
        number={1}
        formData={formData}
        updateTestData={(field, value) => {
          updateTestData(field, value)
          setFormData((prev) => ({ ...prev, [field]: value }))
        }}
      />
    )
  }

  return { ...render(<Wrapper />), updateTestData }
}

const getDataTable = () => {
  const heading = screen.getByRole("heading", { name: "Данные:" })
  const section = heading.closest("div")
  if (!section) throw new Error("Data section not found")
  return within(section).getByRole("table")
}

describe("FlashPointTestItem", () => {
  beforeEach(() => {
    useFlashPointStore.getState().clearStore()
  })

  /** Рендерит название испытания и блоки оборудования/данных. */
  test("renders flash point form sections", () => {
    renderFlashPoint()

    expect(screen.getByText("Наименование испытания")).toBeInTheDocument()
    expect(screen.getByDisplayValue(initialTestData.flashPointTestName)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Оборудование:" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Данные:" })).toBeInTheDocument()
  })

  /** Manual: pressure 99.5, 120 и 124 → среднее 122 на экране. */
  test("shows average 122 for manual at pressure 99.5 with 120 and 124", async () => {
    renderFlashPoint({
      pressure: "99.5",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      flashPointEquipmentDevice: MANUAL_DEVICE,
    })

    const table = getDataTable()

    await waitFor(() => {
      expect(within(table).getByDisplayValue("122")).toBeInTheDocument()
    })
    expect(within(table).getAllByDisplayValue("0").length).toBeGreaterThan(0)
    expect(within(table).getByDisplayValue("4")).toBeInTheDocument()
  })

  /** Manual: pressure 99.2, 120 и 124 → поправка 1 и среднее 123. */
  test("shows correction and average 123 for manual at pressure 99.2", async () => {
    renderFlashPoint({
      pressure: "99.2",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      flashPointEquipmentDevice: MANUAL_DEVICE,
    })

    const table = getDataTable()

    await waitFor(() => {
      expect(within(table).getByDisplayValue("123")).toBeInTheDocument()
    })
    expect(within(table).getAllByDisplayValue("1").length).toBeGreaterThanOrEqual(2)
    expect(within(table).getByDisplayValue("121")).toBeInTheDocument()
    expect(within(table).getByDisplayValue("125")).toBeInTheDocument()
  })

  /** Automatic: поправка "-", давление не меняет среднее. */
  test("shows dash correction and average 122 for automatic", async () => {
    renderFlashPoint({
      pressure: "99.2",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
      flashPointEquipmentDevice: AUTOMATIC_DEVICE,
    })

    const table = getDataTable()

    expect(within(table).getAllByDisplayValue("-")).toHaveLength(2)
    await waitFor(() => {
      expect(within(table).getByDisplayValue("122")).toBeInTheDocument()
    })
  })

  /** Повторяемость: разница > 8 показывает ошибку. */
  test("shows repeatability error when temperature difference exceeds 8", () => {
    renderFlashPoint({
      pressure: "99.5",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "130",
      flashPointEquipmentDevice: MANUAL_DEVICE,
    })

    const table = getDataTable()
    expect(within(table).getByDisplayValue("10 > r (Error)")).toBeInTheDocument()
  })

  /** Давление в таблице только для чтения. */
  test("keeps pressure inputs read-only in the data table", () => {
    renderFlashPoint({
      pressure: "99.5",
      firstMeasurementTemperature: "120",
      secondMeasurementTemperature: "124",
    })

    const table = getDataTable()
    const pressureInputs = within(table).getAllByDisplayValue("99.5")

    expect(pressureInputs).toHaveLength(2)
    for (const input of pressureInputs) {
      expect(input).toHaveAttribute("readonly")
    }
  })

  /** Ввод температуры вызывает updateTestData и пересчитывает среднее. */
  test("updates average after typing measurement temperatures", async () => {
    const user = userEvent.setup()
    const { updateTestData } = renderFlashPoint({
      pressure: "99.5",
      firstMeasurementTemperature: "",
      secondMeasurementTemperature: "",
      flashPointEquipmentDevice: MANUAL_DEVICE,
    })

    const table = getDataTable()
    const inputs = within(table).getAllByRole("textbox")
    const firstTemperatureInput = inputs[0]
    const secondTemperatureInput = inputs[4]

    await user.type(firstTemperatureInput, "120")
    await user.type(secondTemperatureInput, "124")

    expect(updateTestData).toHaveBeenCalledWith("firstMeasurementTemperature", expect.any(String))
    expect(updateTestData).toHaveBeenCalledWith("secondMeasurementTemperature", expect.any(String))

    await waitFor(() => {
      expect(within(table).getByDisplayValue("122")).toBeInTheDocument()
    })
  })
})
