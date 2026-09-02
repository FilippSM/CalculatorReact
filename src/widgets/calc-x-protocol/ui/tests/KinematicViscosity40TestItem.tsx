import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const KinematicViscosity40TestItem = ({ number, formData, updateTestData }: Props) => (
  <div className={styles.testItem}>
    <div className={styles.testTitleRow}>
      <span className={styles.testNumber}>{number}.</span>
      <Input
        label="Наименование испытания"
        className={styles.testNameInput}
        value={formData.kinematicViscosity40TestName}
        placeholder={initialTestData.kinematicViscosity40TestName}
        onValueChange={(value) => updateTestData("kinematicViscosity40TestName", value)}
      />
    </div>

    <div className={styles.equipmentBlock}>
      <h3>Оборудование:</h3>
      <Input
        className={styles.fullWidthInput}
        value={formData.kinematicViscosity40EquipmentViscometer}
        placeholder={initialTestData.kinematicViscosity40EquipmentViscometer}
        onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentViscometer", value)}
      />
      <Input
        className={styles.fullWidthInput}
        value={formData.kinematicViscosity40EquipmentThermostat}
        placeholder={initialTestData.kinematicViscosity40EquipmentThermostat}
        onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentThermostat", value)}
      />
      <Input
        className={styles.fullWidthInput}
        value={formData.kinematicViscosity40EquipmentStopwatch}
        placeholder={initialTestData.kinematicViscosity40EquipmentStopwatch}
        onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentStopwatch", value)}
      />
    </div>

    <div className={styles.tableSection}>
      <h3>Данные:</h3>
      <div className={styles.tableBlocks}>
        <div className={styles.tableBlock}>
          <div className={styles.tableScroll}>
            <table className={styles.testTable}>
              <thead>
                <tr>
                  <th colSpan={7}>Первое измерение</th>
                  <th colSpan={7}>Второе измерение</th>
                </tr>
                <tr>
                  <th>Время истечения t₁, с</th>
                  <th>Время истечения t₂, с</th>
                  <th>Номер вискозиметра</th>
                  <th>Постоянная вискозиметра</th>
                  <th>Определяемость d, с (компаундированные масла)</th>
                  <th>Среднее значение tср, с</th>
                  <th>Кинематическая вязкость ν₁, мм²/с</th>
                  <th>Время истечения t₁, с</th>
                  <th>Время истечения t₂, с</th>
                  <th>Номер вискозиметра</th>
                  <th>Постоянная вискозиметра</th>
                  <th>Определяемость d, с (компаундированные масла)</th>
                  <th>Среднее значение tср, с</th>
                  <th>Кинематическая вязкость ν₂, мм²/с</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstT1}
                      placeholder={initialTestData.kinematicViscosity40FirstT1}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstT1", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstT2}
                      placeholder={initialTestData.kinematicViscosity40FirstT2}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstT2", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstViscometerNumber}
                      placeholder={initialTestData.kinematicViscosity40FirstViscometerNumber}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstViscometerNumber", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstViscometerConstant}
                      placeholder={initialTestData.kinematicViscosity40FirstViscometerConstant}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstViscometerConstant", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstDeterminability}
                      placeholder={initialTestData.kinematicViscosity40FirstDeterminability}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstDeterminability", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstTAverage}
                      placeholder={initialTestData.kinematicViscosity40FirstTAverage}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstTAverage", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40FirstV1}
                      placeholder={initialTestData.kinematicViscosity40FirstV1}
                      onValueChange={(value) => updateTestData("kinematicViscosity40FirstV1", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondT1}
                      placeholder={initialTestData.kinematicViscosity40SecondT1}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondT1", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondT2}
                      placeholder={initialTestData.kinematicViscosity40SecondT2}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondT2", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondViscometerNumber}
                      placeholder={initialTestData.kinematicViscosity40SecondViscometerNumber}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondViscometerNumber", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondViscometerConstant}
                      placeholder={initialTestData.kinematicViscosity40SecondViscometerConstant}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondViscometerConstant", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondDeterminability}
                      placeholder={initialTestData.kinematicViscosity40SecondDeterminability}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondDeterminability", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondTAverage}
                      placeholder={initialTestData.kinematicViscosity40SecondTAverage}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondTAverage", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40SecondV2}
                      placeholder={initialTestData.kinematicViscosity40SecondV2}
                      onValueChange={(value) => updateTestData("kinematicViscosity40SecondV2", value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={clsx(styles.tableBlock, styles.tableBlockFull)}>
          <div className={styles.tableScroll}>
            <table className={clsx(styles.testTable, styles.testTableNarrow)}>
              <thead>
                <tr>
                  <th colSpan={2}>Результаты</th>
                </tr>
                <tr>
                  <th>Повторяемость d, % (компаундированные масла)</th>
                  <th>Среднее значение νср, мм²/с</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40Repeatability}
                      placeholder={initialTestData.kinematicViscosity40Repeatability}
                      onValueChange={(value) => updateTestData("kinematicViscosity40Repeatability", value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData.kinematicViscosity40Average}
                      placeholder={initialTestData.kinematicViscosity40Average}
                      onValueChange={(value) => updateTestData("kinematicViscosity40Average", value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)
