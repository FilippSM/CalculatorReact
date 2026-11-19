import { usePhCalculations, usePhStore } from "@/features/ph"
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

const TEST_ID = "ph"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const phMeterOptions = [
  { value: "J0088992", label: "Портативный pH/мВ/°C-метр HI8424 № J0088992" },
  { value: "other", label: "ph-метр" },
] as const

export const PhTestItem = ({ number, formData, updateTestData }: Props) => {
  const { repeatability } = usePhCalculations({
    firstPh: formData.phFirstPh,
    secondPh: formData.phSecondPh,
  })
  const average = usePhStore((state) => state.average)

  const selectedPhMeter =
    phMeterOptions.find((option) => option.label === formData.phEquipmentMeter)?.value ?? phMeterOptions[0].value

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
        <Select
          value={selectedPhMeter}
          onValueChange={(value) => {
            const option = phMeterOptions.find((item) => item.value === value)
            if (option) {
              updateTestData("phEquipmentMeter", option.label)
            }
          }}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue placeholder={initialTestData.phEquipmentMeter} />
          </SelectTrigger>
          <SelectContent>
            {phMeterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
