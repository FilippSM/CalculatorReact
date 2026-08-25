import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const WaterContentTestItem = ({ number, formData, updateTestData }: Props) => (
  <div className={styles.testItem}>
    <div className={styles.testTitleRow}>
      <span className={styles.testNumber}>{number}.</span>
      <Input
        label="Наименование испытания"
        className={styles.testNameInput}
        value={formData.waterContentTestName}
        placeholder={initialTestData.waterContentTestName}
        onValueChange={(value) => updateTestData("waterContentTestName", value)}
      />
    </div>

    <div className={styles.equipmentBlock}>
      <h3>Оборудование:</h3>
      <Input
        className={styles.fullWidthInput}
        value={formData.waterContentEquipmentBalance}
        placeholder={initialTestData.waterContentEquipmentBalance}
        onValueChange={(value) => updateTestData("waterContentEquipmentBalance", value)}
      />
      <Input
        className={styles.fullWidthInput}
        value={formData.waterContentEquipmentReceiver}
        placeholder={initialTestData.waterContentEquipmentReceiver}
        onValueChange={(value) => updateTestData("waterContentEquipmentReceiver", value)}
      />
      <Input
        className={styles.fullWidthInput}
        value={formData.waterContentEquipmentStopwatch}
        placeholder={initialTestData.waterContentEquipmentStopwatch}
        onValueChange={(value) => updateTestData("waterContentEquipmentStopwatch", value)}
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
              <th>Масса образца m, г</th>
              <th>Объем воды в пр.-ловушке V₀, см³</th>
              <th>Содержание воды, %</th>
              <th>Масса образца m, г</th>
              <th>Объем воды в пр.-ловушке V₀, см³</th>
              <th>Содержание воды, %</th>
              <th>Повторяемость r, см³</th>
              <th>Среднее значение Xср, %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentFirstSampleMass}
                  placeholder={initialTestData.waterContentFirstSampleMass}
                  onValueChange={(value) => updateTestData("waterContentFirstSampleMass", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentFirstWaterVolume}
                  placeholder={initialTestData.waterContentFirstWaterVolume}
                  onValueChange={(value) => updateTestData("waterContentFirstWaterVolume", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentFirstValue}
                  placeholder={initialTestData.waterContentFirstValue}
                  onValueChange={(value) => updateTestData("waterContentFirstValue", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentSecondSampleMass}
                  placeholder={initialTestData.waterContentSecondSampleMass}
                  onValueChange={(value) => updateTestData("waterContentSecondSampleMass", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentSecondWaterVolume}
                  placeholder={initialTestData.waterContentSecondWaterVolume}
                  onValueChange={(value) => updateTestData("waterContentSecondWaterVolume", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentSecondValue}
                  placeholder={initialTestData.waterContentSecondValue}
                  onValueChange={(value) => updateTestData("waterContentSecondValue", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentRepeatability}
                  placeholder={initialTestData.waterContentRepeatability}
                  onValueChange={(value) => updateTestData("waterContentRepeatability", value)}
                />
              </td>
              <td>
                <Input
                  className={styles.tableInput}
                  value={formData.waterContentAverage}
                  placeholder={initialTestData.waterContentAverage}
                  onValueChange={(value) => updateTestData("waterContentAverage", value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
