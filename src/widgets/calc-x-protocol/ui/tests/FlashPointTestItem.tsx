import { useFlashPointCalculations, useFlashPointStore } from "@/features/flash-point"
import { Input } from "@/shared/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { calcXTestConfig } from "../../model/calcXTestConfig"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const TEST_ID = "flashPoint"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const deviceOptions = [
  {
    value: "manual",
    label: "Аппарат для определения температуры вспышки в открытом тигле ТВО-ПХП № 1052",
  },
  {
    value: "automatic",
    label: "Автоматический прибор",
  },
] as const

export const FlashPointTestItem = ({ number, formData, updateTestData }: Props) => {
  const selectedDevice =
    deviceOptions.find((option) => option.label === formData.flashPointEquipmentDevice)?.value ??
    deviceOptions[0].value

  const {
    correction,
    firstCorrectedTemperature,
    secondCorrectedTemperature,
    repeatability,
  } = useFlashPointCalculations({
    pressure: formData.pressure,
    firstMeasurementTemperature: formData.firstMeasurementTemperature,
    secondMeasurementTemperature: formData.secondMeasurementTemperature,
    device: selectedDevice,
  })
  const average = useFlashPointStore((state) => state.averageCorrectedTemperature)

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.flashPointTestName}
          onValueChange={(value) => updateTestData("flashPointTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Select
          value={selectedDevice}
          onValueChange={(value) => {
            const option = deviceOptions.find((item) => item.value === value)
            if (option) {
              updateTestData("flashPointEquipmentDevice", option.label)
            }
          }}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue placeholder={initialTestData.flashPointEquipmentDevice} />
          </SelectTrigger>
          <SelectContent>
            {deviceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentThermometer}
          onValueChange={(value) => updateTestData("flashPointEquipmentThermometer", value)}
        />
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentStopwatch}
          onValueChange={(value) => updateTestData("flashPointEquipmentStopwatch", value)}
        />
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentThermohygrometer}
          onValueChange={(value) => updateTestData("flashPointEquipmentThermohygrometer", value)}
        />
      </div>

      <div className={styles.tableSection}>
        <h3>Данные:</h3>
        <div className={styles.tableScroll}>
          <table className={styles.testTable}>
            <thead>
              <tr>
                {testConfig.groupHeaders?.map((group, index) => (
                  <th key={index} colSpan={group.colSpan}>
                    {group.label}
                  </th>
                ))}
              </tr>
              <tr>
                {testConfig.columnHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.firstMeasurementTemperature}
                    onValueChange={(value) => updateTestData("firstMeasurementTemperature", value)}
                  />
                </td>
                <td>
                  <Input className={styles.tableInput} value={formData.pressure} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={correction} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={firstCorrectedTemperature} readOnly />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.secondMeasurementTemperature}
                    onValueChange={(value) => updateTestData("secondMeasurementTemperature", value)}
                  />
                </td>
                <td>
                  <Input className={styles.tableInput} value={formData.pressure} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={correction} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={secondCorrectedTemperature} readOnly />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
