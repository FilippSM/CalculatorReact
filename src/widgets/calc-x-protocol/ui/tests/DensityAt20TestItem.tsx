import { useDensityAt20Calculations } from "@/features/density"
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

const TEST_ID = "densityAt20"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

const thermometerOptions = [
  { value: "ЛТ-300", label: "Термометр ЛТ-300 № 302322" },
  { value: "другой", label: "Термометр другой" },
] as const

const hydrometerOptions = [
  { value: "АНТ-2", label: "Ареометр АНТ-2 № 42335" },
  { value: "АНТ-1", label: "Ареометр АНТ-1 № 1278" },
] as const

export const DensityAt20TestItem = ({ number, formData, updateTestData }: Props) => {
  const { firstRhoAt20, secondRhoAt20, firstRhoAt20Corrected, secondRhoAt20Corrected, average, repeatability } =
    useDensityAt20Calculations({
    firstRho: formData.densityAt20FirstRho,
    firstT: formData.densityAt20FirstT,
    secondRho: formData.densityAt20SecondRho,
    secondT: formData.densityAt20SecondT,
  })

  const selectedThermometer =
    thermometerOptions.find((option) => option.label === formData.densityAt20EquipmentThermometer)?.value ??
    thermometerOptions[0].value

  const selectedHydrometer =
    hydrometerOptions.find((option) => option.label === formData.densityAt20EquipmentHydrometer)?.value ??
    hydrometerOptions[0].value

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.densityAt20TestName}
          placeholder={initialTestData.densityAt20TestName}
          onValueChange={(value) => updateTestData("densityAt20TestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Select
          value={selectedThermometer}
          onValueChange={(value) => {
            const option = thermometerOptions.find((item) => item.value === value)
            if (option) {
              updateTestData("densityAt20EquipmentThermometer", option.label)
            }
          }}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue placeholder={initialTestData.densityAt20EquipmentThermometer} />
          </SelectTrigger>
          <SelectContent>
            {thermometerOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedHydrometer}
          onValueChange={(value) => {
            const option = hydrometerOptions.find((item) => item.value === value)
            if (option) {
              updateTestData("densityAt20EquipmentHydrometer", option.label)
            }
          }}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue placeholder={initialTestData.densityAt20EquipmentHydrometer} />
          </SelectTrigger>
          <SelectContent>
            {hydrometerOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                    value={formData.densityAt20FirstRho}
                    placeholder={initialTestData.densityAt20FirstRho}
                    onValueChange={(value) => updateTestData("densityAt20FirstRho", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.densityAt20FirstT}
                    placeholder={initialTestData.densityAt20FirstT}
                    onValueChange={(value) => updateTestData("densityAt20FirstT", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={firstRhoAt20}
                    placeholder={initialTestData.densityAt20FirstRhoAt20}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={firstRhoAt20Corrected}
                    placeholder={initialTestData.densityAt20FirstRhoAt20Corrected}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.densityAt20SecondRho}
                    placeholder={initialTestData.densityAt20SecondRho}
                    onValueChange={(value) => updateTestData("densityAt20SecondRho", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.densityAt20SecondT}
                    placeholder={initialTestData.densityAt20SecondT}
                    onValueChange={(value) => updateTestData("densityAt20SecondT", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={secondRhoAt20}
                    placeholder={initialTestData.densityAt20SecondRhoAt20}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={secondRhoAt20Corrected}
                    placeholder={initialTestData.densityAt20SecondRhoAt20Corrected}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.densityAt20Repeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    placeholder={initialTestData.densityAt20Average}
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
