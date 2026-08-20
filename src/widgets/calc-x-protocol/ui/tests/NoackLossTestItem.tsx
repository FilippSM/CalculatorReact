import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const NoackLossTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.noackLossTestName}
                  placeholder={initialTestData.noackLossTestName}
                  onValueChange={(value) => updateTestData("noackLossTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.noackLossEquipmentBalance}
                  placeholder={initialTestData.noackLossEquipmentBalance}
                  onValueChange={(value) => updateTestData("noackLossEquipmentBalance", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.noackLossEquipmentApparatus}
                  placeholder={initialTestData.noackLossEquipmentApparatus}
                  onValueChange={(value) => updateTestData("noackLossEquipmentApparatus", value)}
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
                        <th>Масса пустого тигля A, г</th>
                        <th>Масса тигля с образцом B, г</th>
                        <th>Масса тигля с образцом после нагревания 1 ч C, г</th>
                        <th>Потери от испарения, %</th>
                        <th>Масса пустого тигля A, г</th>
                        <th>Масса тигля с образцом B, г</th>
                        <th>Масса тигля с образцом после нагревания 1 ч C, г</th>
                        <th>Потери от испарения, %</th>
                        <th>Повторяемость r, %</th>
                        <th>Среднее значение Xср, %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleA}
                            placeholder={initialTestData.noackLossFirstCrucibleA}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleA", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleB}
                            placeholder={initialTestData.noackLossFirstCrucibleB}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleB", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleC}
                            placeholder={initialTestData.noackLossFirstCrucibleC}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleC", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstEvaporationLoss}
                            placeholder={initialTestData.noackLossFirstEvaporationLoss}
                            onValueChange={(value) => updateTestData("noackLossFirstEvaporationLoss", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleA}
                            placeholder={initialTestData.noackLossSecondCrucibleA}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleA", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleB}
                            placeholder={initialTestData.noackLossSecondCrucibleB}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleB", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleC}
                            placeholder={initialTestData.noackLossSecondCrucibleC}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleC", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondEvaporationLoss}
                            placeholder={initialTestData.noackLossSecondEvaporationLoss}
                            onValueChange={(value) => updateTestData("noackLossSecondEvaporationLoss", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossRepeatability}
                            placeholder={initialTestData.noackLossRepeatability}
                            onValueChange={(value) => updateTestData("noackLossRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossAverage}
                            placeholder={initialTestData.noackLossAverage}
                            onValueChange={(value) => updateTestData("noackLossAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
