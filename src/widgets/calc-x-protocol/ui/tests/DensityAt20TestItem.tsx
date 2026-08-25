import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const DensityAt20TestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.densityAt20TestName}
                  placeholder={initialTestData.densityAt20TestName}
                  onValueChange={(value) => updateTestData("densityAt20TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.densityAt20EquipmentThermometer}
                  placeholder={initialTestData.densityAt20EquipmentThermometer}
                  onValueChange={(value) => updateTestData("densityAt20EquipmentThermometer", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.densityAt20EquipmentHydrometer}
                  placeholder={initialTestData.densityAt20EquipmentHydrometer}
                  onValueChange={(value) => updateTestData("densityAt20EquipmentHydrometer", value)}
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
                        <th>ρ₁, кг/м³</th>
                        <th>t₁, °С</th>
                        <th>ρ₁ при 20°С, кг/м³</th>
                        <th>ρ₁ при 20°С с поправкой, кг/м³</th>
                        <th>ρ₂, кг/м³</th>
                        <th>t₂, °С</th>
                        <th>ρ₂ при 20°С, кг/м³</th>
                        <th>ρ₂ при 20°С с поправкой, кг/м³</th>
                        <th>Повторяемость r, кг/м³</th>
                        <th>Среднее значение ρср, кг/м³</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRho}
                            placeholder={initialTestData.densityAt20FirstRho}
                            onValueChange={(value) => updateTestData("densityAt20FirstRho", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstT}
                            placeholder={initialTestData.densityAt20FirstT}
                            onValueChange={(value) => updateTestData("densityAt20FirstT", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRhoAt20}
                            placeholder={initialTestData.densityAt20FirstRhoAt20}
                            onValueChange={(value) => updateTestData("densityAt20FirstRhoAt20", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRhoAt20Corrected}
                            placeholder={initialTestData.densityAt20FirstRhoAt20Corrected}
                            onValueChange={(value) => updateTestData("densityAt20FirstRhoAt20Corrected", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRho}
                            placeholder={initialTestData.densityAt20SecondRho}
                            onValueChange={(value) => updateTestData("densityAt20SecondRho", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondT}
                            placeholder={initialTestData.densityAt20SecondT}
                            onValueChange={(value) => updateTestData("densityAt20SecondT", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRhoAt20}
                            placeholder={initialTestData.densityAt20SecondRhoAt20}
                            onValueChange={(value) => updateTestData("densityAt20SecondRhoAt20", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRhoAt20Corrected}
                            placeholder={initialTestData.densityAt20SecondRhoAt20Corrected}
                            onValueChange={(value) => updateTestData("densityAt20SecondRhoAt20Corrected", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20Repeatability}
                            placeholder={initialTestData.densityAt20Repeatability}
                            onValueChange={(value) => updateTestData("densityAt20Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20Average}
                            placeholder={initialTestData.densityAt20Average}
                            onValueChange={(value) => updateTestData("densityAt20Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
