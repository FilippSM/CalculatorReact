import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const DynamicViscosity30TestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.dynamicViscosity30TestName}
                  placeholder={initialTestData.dynamicViscosity30TestName}
                  onValueChange={(value) => updateTestData("dynamicViscosity30TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.dynamicViscosity30Equipment}
                  placeholder={initialTestData.dynamicViscosity30Equipment}
                  onValueChange={(value) => updateTestData("dynamicViscosity30Equipment", value)}
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
                        <th>η₁, °C</th>
                        <th>η₂, °C</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение ηср</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30FirstEta1}
                            placeholder={initialTestData.dynamicViscosity30FirstEta1}
                            onValueChange={(value) => updateTestData("dynamicViscosity30FirstEta1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30SecondEta2}
                            placeholder={initialTestData.dynamicViscosity30SecondEta2}
                            onValueChange={(value) => updateTestData("dynamicViscosity30SecondEta2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30Repeatability}
                            placeholder={initialTestData.dynamicViscosity30Repeatability}
                            onValueChange={(value) => updateTestData("dynamicViscosity30Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30Average}
                            placeholder={initialTestData.dynamicViscosity30Average}
                            onValueChange={(value) => updateTestData("dynamicViscosity30Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
