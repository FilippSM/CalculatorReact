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

const TEST_ID = "crystallizationStart"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const REPEATABILITY_LIMIT = 2

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
  const roundedDifference = Math.round(difference * 10) / 10
  const formattedDifference = roundedDifference.toFixed(1).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=2 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}

const renderHeader = (header: string) => {
  const match = header.match(/^(t)(н\.к\.\d)(,?\s*°C)$/)
  if (match) {
    return (
      <>
        {match[1]}
        <sub>{match[2]}</sub>
        {match[3]}
      </>
    )
  }

  const matchAvg = header.match(/^(Среднее значение t)(н\.к\.)(,?\s*°C)$/)
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

export const CrystallizationStartTestItem = ({ number, formData, updateTestData }: Props) => {
  const repeatability = calculateRepeatability(formData.crystallizationStartFirstT, formData.crystallizationStartSecondT)
  const average = calculateAverage(formData.crystallizationStartFirstT, formData.crystallizationStartSecondT)

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.crystallizationStartTestName}
          placeholder={initialTestData.crystallizationStartTestName}
          onValueChange={(value) => updateTestData("crystallizationStartTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.crystallizationStartEquipmentCryostat}
          placeholder={initialTestData.crystallizationStartEquipmentCryostat}
          onValueChange={(value) => updateTestData("crystallizationStartEquipmentCryostat", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.crystallizationStartEquipmentThermometer}
          placeholder={initialTestData.crystallizationStartEquipmentThermometer}
          onValueChange={(value) => updateTestData("crystallizationStartEquipmentThermometer", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.crystallizationStartEquipmentStopwatch}
          placeholder={initialTestData.crystallizationStartEquipmentStopwatch}
          onValueChange={(value) => updateTestData("crystallizationStartEquipmentStopwatch", value)}
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
                    value={formData.crystallizationStartFirstT}
                    placeholder={initialTestData.crystallizationStartFirstT}
                    onValueChange={(value) => updateTestData("crystallizationStartFirstT", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.crystallizationStartSecondT}
                    placeholder={initialTestData.crystallizationStartSecondT}
                    onValueChange={(value) => updateTestData("crystallizationStartSecondT", value)}
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.crystallizationStartRepeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, styles.tableInputCalculated)}
                    value={average}
                    placeholder={initialTestData.crystallizationStartAverage}
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
