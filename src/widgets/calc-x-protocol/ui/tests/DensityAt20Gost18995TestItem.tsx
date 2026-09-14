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

const TEST_ID = "densityAt20Gost18995"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

export const DensityAt20Gost18995TestItem = ({ number, formData, updateTestData }: Props) => {
  const calculateAverage = (): string => {
    const first = formData.densityAt20Gost18995FirstRho.replace(",", ".")
    const second = formData.densityAt20Gost18995SecondRho.replace(",", ".")

    if (!first || !second) return ""

    const firstNum = parseFloat(first)
    const secondNum = parseFloat(second)

    if (isNaN(firstNum) || isNaN(secondNum)) return ""

    const average = (firstNum + secondNum) / 2
    return average.toFixed(3).replace(".", ",")
  }

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.densityAt20Gost18995TestName}
          placeholder={initialTestData.densityAt20Gost18995TestName}
          onValueChange={(value) => updateTestData("densityAt20Gost18995TestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.densityAt20Gost18995EquipmentThermometer}
          placeholder={initialTestData.densityAt20Gost18995EquipmentThermometer}
          onValueChange={(value) => updateTestData("densityAt20Gost18995EquipmentThermometer", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.densityAt20Gost18995EquipmentHydrometer}
          placeholder={initialTestData.densityAt20Gost18995EquipmentHydrometer}
          onValueChange={(value) => updateTestData("densityAt20Gost18995EquipmentHydrometer", value)}
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
                    value={formData.densityAt20Gost18995FirstRho}
                    placeholder={initialTestData.densityAt20Gost18995FirstRho}
                    onValueChange={(value) => updateTestData("densityAt20Gost18995FirstRho", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.densityAt20Gost18995SecondRho}
                    placeholder={initialTestData.densityAt20Gost18995SecondRho}
                    onValueChange={(value) => updateTestData("densityAt20Gost18995SecondRho", value)}
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, styles.tableInputCalculated)}
                    value=""
                    placeholder={initialTestData.densityAt20Gost18995Repeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, styles.tableInputCalculated)}
                    value={calculateAverage()}
                    placeholder={initialTestData.densityAt20Gost18995Average}
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
