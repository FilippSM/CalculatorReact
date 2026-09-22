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

const TEST_ID = "ph"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const REPEATABILITY_LIMIT = 0.1

const calculateAverage = (first: string, second: string): string => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return ""

  const average = (firstNum + secondNum) / 2
  return average.toFixed(1).replace(".", ",")
}

const calculateRepeatability = (first: string, second: string): { value: string; isError: boolean } => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return { value: "", isError: false }

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 100) / 100
  const formattedDifference = roundedDifference.toFixed(2).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=0,1 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}

export const PhTestItem = ({ number, formData, updateTestData }: Props) => {
  const repeatability = calculateRepeatability(formData.phFirstPh, formData.phSecondPh)
  const average = calculateAverage(formData.phFirstPh, formData.phSecondPh)

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.phTestName}
          placeholder={initialTestData.phTestName}
          onValueChange={(value) => updateTestData("phTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.phEquipmentMeter}
          placeholder={initialTestData.phEquipmentMeter}
          onValueChange={(value) => updateTestData("phEquipmentMeter", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.phEquipmentThermometer}
          placeholder={initialTestData.phEquipmentThermometer}
          onValueChange={(value) => updateTestData("phEquipmentThermometer", value)}
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
                    value={formData.phFirstPh}
                    placeholder={initialTestData.phFirstPh}
                    onValueChange={(value) => updateTestData("phFirstPh", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.phSecondPh}
                    placeholder={initialTestData.phSecondPh}
                    onValueChange={(value) => updateTestData("phSecondPh", value)}
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.phRepeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, styles.tableInputCalculated)}
                    value={average}
                    placeholder={initialTestData.phAverage}
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
