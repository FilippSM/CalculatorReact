import { useMechanicalImpuritiesGost6479Calculations } from "@/features/mechanical-impurities-gost-6479"
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

const TEST_ID = "mechanicalImpuritiesGost6479"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)

if (!testConfig) {
  throw new Error(`Test config not found for id: ${TEST_ID}`)
}

export const MechanicalImpuritiesGost6479TestItem = ({ number, formData, updateTestData }: Props) => {
  const { firstX1, secondX2, average, repeatability } = useMechanicalImpuritiesGost6479Calculations({
    firstM1: formData.mechanicalImpuritiesGost6479FirstM1,
    firstM2: formData.mechanicalImpuritiesGost6479FirstM2,
    firstM3: formData.mechanicalImpuritiesGost6479FirstM3,
    secondM1: formData.mechanicalImpuritiesGost6479SecondM1,
    secondM2: formData.mechanicalImpuritiesGost6479SecondM2,
    secondM3: formData.mechanicalImpuritiesGost6479SecondM3,
  })

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.mechanicalImpuritiesGost6479TestName}
          placeholder={initialTestData.mechanicalImpuritiesGost6479TestName}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479TestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesGost6479EquipmentBalance1}
          placeholder={initialTestData.mechanicalImpuritiesGost6479EquipmentBalance1}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479EquipmentBalance1", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesGost6479EquipmentBalance2}
          placeholder={initialTestData.mechanicalImpuritiesGost6479EquipmentBalance2}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479EquipmentBalance2", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesGost6479EquipmentFurnace}
          placeholder={initialTestData.mechanicalImpuritiesGost6479EquipmentFurnace}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479EquipmentFurnace", value)}
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
                    value={formData.mechanicalImpuritiesGost6479FirstM1}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479FirstM1}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479FirstM1", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesGost6479FirstM2}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479FirstM2}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479FirstM2", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesGost6479FirstM3}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479FirstM3}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479FirstM3", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={firstX1}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479FirstX1}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesGost6479SecondM1}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479SecondM1}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479SecondM1", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesGost6479SecondM2}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479SecondM2}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479SecondM2", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesGost6479SecondM3}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479SecondM3}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesGost6479SecondM3", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={secondX2}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479SecondX2}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479Repeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    placeholder={initialTestData.mechanicalImpuritiesGost6479Average}
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
