import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const ColorCntTestItem = ({ number, formData, updateTestData }: Props) => (
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
                            className={styles.tableInput}
                            value={formData.colorCntRepeatability}
                            placeholder={initialTestData.colorCntRepeatability}
                            onValueChange={(value) => updateTestData("colorCntRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntAverage}
                            placeholder={initialTestData.colorCntAverage}
                            onValueChange={(value) => updateTestData("colorCntAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
