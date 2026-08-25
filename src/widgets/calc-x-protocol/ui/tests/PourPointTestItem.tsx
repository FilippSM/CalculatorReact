import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const PourPointTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.pourPointTestName}
                  placeholder={initialTestData.pourPointTestName}
                  onValueChange={(value) => updateTestData("pourPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.pourPointEquipment}
                  placeholder={initialTestData.pourPointEquipment}
                  onValueChange={(value) => updateTestData("pourPointEquipment", value)}
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
                        <th>t₁, °C</th>
                        <th>t₂, °C</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение tср, °C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointFirstT1}
                            placeholder={initialTestData.pourPointFirstT1}
                            onValueChange={(value) => updateTestData("pourPointFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointSecondT2}
                            placeholder={initialTestData.pourPointSecondT2}
                            onValueChange={(value) => updateTestData("pourPointSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointRepeatability}
                            placeholder={initialTestData.pourPointRepeatability}
                            onValueChange={(value) => updateTestData("pourPointRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointAverage}
                            placeholder={initialTestData.pourPointAverage}
                            onValueChange={(value) => updateTestData("pourPointAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
