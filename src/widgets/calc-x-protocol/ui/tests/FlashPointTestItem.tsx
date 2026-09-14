import { useFlashPointCalculations } from "@/features/flash-point"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { calcXTestConfig } from "../../model/calcXTestConfig"
import type { InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const TEST_ID = "flashPoint"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)!

export const FlashPointTestItem = ({ number, formData, updateTestData }: Props) => {
  const {
    correction,
    firstCorrectedTemperature,
    secondCorrectedTemperature,
    repeatability,
  } = useFlashPointCalculations({
    pressure: formData.pressure,
    firstMeasurementTemperature: formData.firstMeasurementTemperature,
    secondMeasurementTemperature: formData.secondMeasurementTemperature,
  })

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
        <Input
          className={styles.fullWidthInput}
          value={formData.flashPointEquipmentDevice}
          onValueChange={(value) => updateTestData("flashPointEquipmentDevice", value)}
        />
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
                    value={formData.averageCorrectedTemperature}
                    onValueChange={(value) => updateTestData("averageCorrectedTemperature", value)}
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
