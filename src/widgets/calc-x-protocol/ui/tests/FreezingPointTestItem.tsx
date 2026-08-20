import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const FreezingPointTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.freezingPointTestName}
                  placeholder={initialTestData.freezingPointTestName}
                  onValueChange={(value) => updateTestData("freezingPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.freezingPointEquipment}
                  placeholder={initialTestData.freezingPointEquipment}
                  onValueChange={(value) => updateTestData("freezingPointEquipment", value)}
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
                            value={formData.freezingPointFirstT1}
                            placeholder={initialTestData.freezingPointFirstT1}
                            onValueChange={(value) => updateTestData("freezingPointFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointSecondT2}
                            placeholder={initialTestData.freezingPointSecondT2}
                            onValueChange={(value) => updateTestData("freezingPointSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointRepeatability}
                            placeholder={initialTestData.freezingPointRepeatability}
                            onValueChange={(value) => updateTestData("freezingPointRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointAverage}
                            placeholder={initialTestData.freezingPointAverage}
                            onValueChange={(value) => updateTestData("freezingPointAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
