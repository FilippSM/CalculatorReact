import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const KinematicViscosity100TestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.kinematicViscosity100TestName}
                  placeholder={initialTestData.kinematicViscosity100TestName}
                  onValueChange={(value) => updateTestData("kinematicViscosity100TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentViscometer}
                  placeholder={initialTestData.kinematicViscosity100EquipmentViscometer}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentViscometer", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentThermostat}
                  placeholder={initialTestData.kinematicViscosity100EquipmentThermostat}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentThermostat", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentStopwatch}
                  placeholder={initialTestData.kinematicViscosity100EquipmentStopwatch}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentStopwatch", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th colSpan={7}>Первое измерение</th>
                        <th colSpan={7}>Второе измерение</th>
                        <th colSpan={2}>Результаты</th>
                      </tr>
                      <tr>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₁, мм²/с</th>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₂, мм²/с</th>
                        <th>Повторяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение νср, мм²/с</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstT1}
                            placeholder={initialTestData.kinematicViscosity100FirstT1}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstT2}
                            placeholder={initialTestData.kinematicViscosity100FirstT2}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstViscometerNumber}
                            placeholder={initialTestData.kinematicViscosity100FirstViscometerNumber}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity100FirstViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstDeterminability}
                            placeholder={initialTestData.kinematicViscosity100FirstDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstTAverage}
                            placeholder={initialTestData.kinematicViscosity100FirstTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstV1}
                            placeholder={initialTestData.kinematicViscosity100FirstV1}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstV1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondT1}
                            placeholder={initialTestData.kinematicViscosity100SecondT1}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondT2}
                            placeholder={initialTestData.kinematicViscosity100SecondT2}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondViscometerNumber}
                            placeholder={initialTestData.kinematicViscosity100SecondViscometerNumber}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity100SecondViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondDeterminability}
                            placeholder={initialTestData.kinematicViscosity100SecondDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondTAverage}
                            placeholder={initialTestData.kinematicViscosity100SecondTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondV2}
                            placeholder={initialTestData.kinematicViscosity100SecondV2}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondV2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100Repeatability}
                            placeholder={initialTestData.kinematicViscosity100Repeatability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100Average}
                            placeholder={initialTestData.kinematicViscosity100Average}
                            onValueChange={(value) => updateTestData("kinematicViscosity100Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
