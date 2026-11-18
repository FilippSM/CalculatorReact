import { useFlashPointStore } from "@/features/flash-point"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { initialTestData, type InitialTestData } from "../../../model/initialTestData"
import { FlashPointTestItem } from "../FlashPointTestItem"

const MANUAL_DEVICE =
  "Аппарат для определения температуры вспышки в открытом тигле ТВО-ПХП № 1052"
const AUTOMATIC_DEVICE = "Автоматический прибор"

/** 
 * Рендерит FlashPointTestItem с управляемым formData для RTL-тестов. 
 * Renders FlashPointTestItem with controlled formData for RTL tests.
*/
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

/** 
 * Таблица секции «Данные» по aria-label. 
 * Data section table by aria-label.
*/
const getDataTable = () =>
  screen.getByRole("table", { name: "Данные температуры вспышки" })

describe("FlashPointTestItem", () => {
  beforeEach(() => {
    useFlashPointStore.getState().clearStore()
  })

  /** 
   * Рендерит название испытания и блоки оборудования/данных. 
   * Renders the test name and equipment/data sections.
   * */
  test("renders flash point form sections", () => {
    renderFlashPoint()

    expect(screen.getByText("Наименование испытания")).toBeInTheDocument()
    expect(screen.getByDisplayValue(initialTestData.flashPointTestName)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Оборудование:" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Данные:" })).toBeInTheDocument()
  })

  /** Показывает поправку, повторяемость и среднее для ручного прибора при давлении 99.5. */
  test("shows correction, repeatability and average for manual at pressure 99.5", async () => {
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

  /** Показывает поправку, скорректированные температуры и среднее для ручного прибора при давлении 99.2. */
  test("shows correction, corrected temperatures and average for manual at pressure 99.2", async () => {
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

  /** Показывает поправку и среднее для автоматического прибора при давлении 99.5. */
  test("shows dash correction and average for automatic at pressure 99.5", async () => {
    renderFlashPoint({
      pressure: "99.5",
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

  /** Показывает поправку и среднее для автоматического прибора при давлении 99.2. */
  test("shows dash correction and average for automatic at pressure 99.2", async () => {
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

  /** Показывает ошибку повторяемости, если разница температур превышает 8. */
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

  /** Сохраняет поля давления только для чтения в таблице данных. */
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

  /** Обновляет данные формы и среднее после ввода температур измерений. */
  test("updates form data and average after typing measurement temperatures", async () => {
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
