import {
  calculateBoilingPointAverage,
  calculateBoilingPointRepeatability,
} from "@/features/boiling-point"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { calcXTestConfig } from "../../model/calcXTestConfig"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const TEST_ID = "boilingPoint"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const renderHeader = (header: string) => {
  const match = header.match(/^(X)(₀)(,?\s*°C)$/)
  if (match) {
    return (
      <>
        {match[1]}
        <sub>0</sub>
        {match[3]}
      </>
    )
  }

  const matchAvg = header.match(/^(Среднее значение t)(ср)(,?\s*°C)$/)
  if (matchAvg) {
    return (
      <>
        {matchAvg[1]}
        <sub>{matchAvg[2]}</sub>
        {matchAvg[3]}
      </>
    )
  }

  return header
}

export const BoilingPointTestItem = ({ number, formData, updateTestData }: Props) => {
  const repeatability = calculateBoilingPointRepeatability(
    formData.boilingPointFirstX0,
    formData.boilingPointSecondX0,
  )
  const average = calculateBoilingPointAverage(formData.boilingPointFirstX0, formData.boilingPointSecondX0)

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.boilingPointTestName}
          placeholder={initialTestData.boilingPointTestName}
          onValueChange={(value) => updateTestData("boilingPointTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.boilingPointEquipmentThermometer}
          placeholder={initialTestData.boilingPointEquipmentThermometer}
          onValueChange={(value) => updateTestData("boilingPointEquipmentThermometer", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.boilingPointEquipmentStopwatch}
          placeholder={initialTestData.boilingPointEquipmentStopwatch}
          onValueChange={(value) => updateTestData("boilingPointEquipmentStopwatch", value)}
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
                  <th key={index}>{renderHeader(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.boilingPointFirstX0}
                    placeholder={initialTestData.boilingPointFirstX0}
                    onValueChange={(value) => updateTestData("boilingPointFirstX0", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.boilingPointSecondX0}
                    placeholder={initialTestData.boilingPointSecondX0}
                    onValueChange={(value) => updateTestData("boilingPointSecondX0", value)}
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.boilingPointRepeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, styles.tableInputCalculated)}
                    value={average}
                    placeholder={initialTestData.boilingPointAverage}
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
