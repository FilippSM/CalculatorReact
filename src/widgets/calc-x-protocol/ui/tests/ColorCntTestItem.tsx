import { useColorCntCalculations } from "@/features/color-cnt"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const ColorCntTestItem = ({ number, formData, updateTestData }: Props) => {
  const { average, repeatability } = useColorCntCalculations({
    firstX1: formData.colorCntFirstX1,
    secondX2: formData.colorCntSecondX2,
  })

  return (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.colorCntTestName}
                  placeholder={initialTestData.colorCntTestName}
                  onValueChange={(value) => updateTestData("colorCntTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.colorCntEquipment}
                  placeholder={initialTestData.colorCntEquipment}
                  onValueChange={(value) => updateTestData("colorCntEquipment", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th colSpan={1}>Первое измерение</th>
                        <th colSpan={1}>Второе измерение</th>
                        <th colSpan={2}>Результаты</th>
                      </tr>
                      <tr>
                        <th>X₁, ед. ЦНТ</th>
                        <th>X₂, ед. ЦНТ</th>
                        <th>Повторяемость X, ед. ЦНТ</th>
                        <th>Среднее значение Xср</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntFirstX1}
                            placeholder={initialTestData.colorCntFirstX1}
                            onValueChange={(value) => updateTestData("colorCntFirstX1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntSecondX2}
                            placeholder={initialTestData.colorCntSecondX2}
                            onValueChange={(value) => updateTestData("colorCntSecondX2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                            value={repeatability.value}
                            placeholder={initialTestData.colorCntRepeatability}
                            readOnly
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={average}
                            placeholder={initialTestData.colorCntAverage}
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
