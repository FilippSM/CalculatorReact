import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const AutoIgnitionTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.autoIgnitionTestName}
                  placeholder={initialTestData.autoIgnitionTestName}
                  onValueChange={(value) => updateTestData("autoIgnitionTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentDevice}
                  placeholder={initialTestData.autoIgnitionEquipmentDevice}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentDevice", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentStopwatch}
                  placeholder={initialTestData.autoIgnitionEquipmentStopwatch}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentStopwatch", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentBalance}
                  placeholder={initialTestData.autoIgnitionEquipmentBalance}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentBalance", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th colSpan={3}>Первое измерение</th>
                        <th colSpan={3}>Второе измерение</th>
                        <th colSpan={2}>Результаты</th>
                      </tr>
                      <tr>
                        <th>t₁, °C</th>
                        <th>Навеска образца m₁, г</th>
                        <th>Период индукции самовоспламенения t₁, с</th>
                        <th>t₂, °C</th>
                        <th>Навеска образца m₂, г</th>
                        <th>Период индукции самовоспламенения t₂, с</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение tср, °C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstT1}
                            placeholder={initialTestData.autoIgnitionFirstT1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstM1}
                            placeholder={initialTestData.autoIgnitionFirstM1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstM1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstInductionT1}
                            placeholder={initialTestData.autoIgnitionFirstInductionT1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstInductionT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondT2}
                            placeholder={initialTestData.autoIgnitionSecondT2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondM2}
                            placeholder={initialTestData.autoIgnitionSecondM2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondM2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondInductionT2}
                            placeholder={initialTestData.autoIgnitionSecondInductionT2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondInductionT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionRepeatability}
                            placeholder={initialTestData.autoIgnitionRepeatability}
                            onValueChange={(value) => updateTestData("autoIgnitionRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionAverage}
                            placeholder={initialTestData.autoIgnitionAverage}
                            onValueChange={(value) => updateTestData("autoIgnitionAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
