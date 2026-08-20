import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const BaseNumberTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.baseNumberTestName}
                  placeholder={initialTestData.baseNumberTestName}
                  onValueChange={(value) => updateTestData("baseNumberTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.baseNumberEquipment}
                  placeholder={initialTestData.baseNumberEquipment}
                  onValueChange={(value) => updateTestData("baseNumberEquipment", value)}
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
                        <th>Масса образца m, г</th>
                        <th>Концентрация титранта C₀₁, моль/л</th>
                        <th>Объем титранта V, мл</th>
                        <th>Щелочное число, мг·KOH/г</th>
                        <th>Масса образца m, г</th>
                        <th>Концентрация титранта C₀₁, моль/л</th>
                        <th>Объем титранта V, мл</th>
                        <th>Щелочное число, мг·KOH/г</th>
                        <th>Повторяемость r, мг·KOH/г</th>
                        <th>Среднее значение X, мг·KOH/г</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstSampleMass}
                            placeholder={initialTestData.baseNumberFirstSampleMass}
                            onValueChange={(value) => updateTestData("baseNumberFirstSampleMass", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstTitrantConcentration}
                            placeholder={initialTestData.baseNumberFirstTitrantConcentration}
                            onValueChange={(value) => updateTestData("baseNumberFirstTitrantConcentration", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstTitrantVolume}
                            placeholder={initialTestData.baseNumberFirstTitrantVolume}
                            onValueChange={(value) => updateTestData("baseNumberFirstTitrantVolume", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstValue}
                            placeholder={initialTestData.baseNumberFirstValue}
                            onValueChange={(value) => updateTestData("baseNumberFirstValue", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondSampleMass}
                            placeholder={initialTestData.baseNumberSecondSampleMass}
                            onValueChange={(value) => updateTestData("baseNumberSecondSampleMass", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondTitrantConcentration}
                            placeholder={initialTestData.baseNumberSecondTitrantConcentration}
                            onValueChange={(value) => updateTestData("baseNumberSecondTitrantConcentration", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondTitrantVolume}
                            placeholder={initialTestData.baseNumberSecondTitrantVolume}
                            onValueChange={(value) => updateTestData("baseNumberSecondTitrantVolume", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondValue}
                            placeholder={initialTestData.baseNumberSecondValue}
                            onValueChange={(value) => updateTestData("baseNumberSecondValue", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberRepeatability}
                            placeholder={initialTestData.baseNumberRepeatability}
                            onValueChange={(value) => updateTestData("baseNumberRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberAverage}
                            placeholder={initialTestData.baseNumberAverage}
                            onValueChange={(value) => updateTestData("baseNumberAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
