import { useMechanicalImpuritiesCalculations } from "@/features/mechanical-impurities"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const MechanicalImpuritiesTestItem = ({ number, formData, updateTestData }: Props) => {
  const { firstX1, secondX2, average, repeatability } = useMechanicalImpuritiesCalculations({
    firstM1: formData.mechanicalImpuritiesFirstM1,
    firstM2: formData.mechanicalImpuritiesFirstM2,
    firstM3: formData.mechanicalImpuritiesFirstM3,
    secondM1: formData.mechanicalImpuritiesSecondM1,
    secondM2: formData.mechanicalImpuritiesSecondM2,
    secondM3: formData.mechanicalImpuritiesSecondM3,
  })

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.mechanicalImpuritiesTestName}
          placeholder={initialTestData.mechanicalImpuritiesTestName}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesEquipmentBalance1}
          placeholder={initialTestData.mechanicalImpuritiesEquipmentBalance1}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentBalance1", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesEquipmentBalance2}
          placeholder={initialTestData.mechanicalImpuritiesEquipmentBalance2}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentBalance2", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.mechanicalImpuritiesEquipmentFurnace}
          placeholder={initialTestData.mechanicalImpuritiesEquipmentFurnace}
          onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentFurnace", value)}
        />
      </div>

      <div className={styles.tableSection}>
        <h3>Данные:</h3>
        <div className={styles.tableScroll}>
          <table className={styles.testTable}>
            <thead>
              <tr>
                <th colSpan={4}>Первое измерение</th>
                <th colSpan={4}>Второе измерение</th>
                <th colSpan={2}>Результаты</th>
              </tr>
              <tr>
                <th>Масса стакана + ф-тр + мех. примеси m₁, г</th>
                <th>Масса стакана + фильтр m₂, г</th>
                <th>Масса пробы m₃, г</th>
                <th>Содержание мех. примесей X₁, %</th>
                <th>Масса стакана + ф-тр + мех. примеси m₁, г</th>
                <th>Масса стакана + фильтр m₂, г</th>
                <th>Масса пробы m₃, г</th>
                <th>Содержание мех. примесей X₂, %</th>
                <th>Повторяемость r, %</th>
                <th>Среднее значение Xср, %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesFirstM1}
                    placeholder={initialTestData.mechanicalImpuritiesFirstM1}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM1", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesFirstM2}
                    placeholder={initialTestData.mechanicalImpuritiesFirstM2}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM2", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesFirstM3}
                    placeholder={initialTestData.mechanicalImpuritiesFirstM3}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM3", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={firstX1}
                    placeholder={initialTestData.mechanicalImpuritiesFirstX1}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesSecondM1}
                    placeholder={initialTestData.mechanicalImpuritiesSecondM1}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM1", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesSecondM2}
                    placeholder={initialTestData.mechanicalImpuritiesSecondM2}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM2", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.mechanicalImpuritiesSecondM3}
                    placeholder={initialTestData.mechanicalImpuritiesSecondM3}
                    onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM3", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={secondX2}
                    placeholder={initialTestData.mechanicalImpuritiesSecondX2}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.mechanicalImpuritiesRepeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    placeholder={initialTestData.mechanicalImpuritiesAverage}
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
