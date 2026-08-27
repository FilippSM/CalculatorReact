import { useFlashPointCalculations } from "@/features/flash-point"
import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import type { InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const FlashPointTestItem = ({ number, formData, updateTestData }: Props) => {
  const { correction } = useFlashPointCalculations(formData.pressure)

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.flashPointTestName}
          onValueChange={(value) => updateTestData("flashPointTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.flashPointEquipmentDevice}
          onValueChange={(value) => updateTestData("flashPointEquipmentDevice", value)}
        />
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentThermometer}
          onValueChange={(value) => updateTestData("flashPointEquipmentThermometer", value)}
        />
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentStopwatch}
          onValueChange={(value) => updateTestData("flashPointEquipmentStopwatch", value)}
        />
        <Input
          className={styles.wideInput}
          value={formData.flashPointEquipmentThermohygrometer}
          onValueChange={(value) => updateTestData("flashPointEquipmentThermohygrometer", value)}
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
                <th>t₀, °C</th>
                <th>p, кПа</th>
                <th>Поправка, °C</th>
                <th>t₀ скорректированное, °C</th>
                <th>t₀, °C</th>
                <th>p, кПа</th>
                <th>Поправка, °C</th>
                <th>t₀ скорректированное, °C</th>
                <th>Повторяемость r, °C</th>
                <th>Среднее значение tср, °C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.firstMeasurementTemperature}
                    onValueChange={(value) => updateTestData("firstMeasurementTemperature", value)}
                  />
                </td>
                <td>
                  <Input className={styles.tableInput} value={formData.pressure} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={correction} readOnly />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.firstMeasurementCorrectedTemperature}
                    onValueChange={(value) => updateTestData("firstMeasurementCorrectedTemperature", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.secondMeasurementTemperature}
                    onValueChange={(value) => updateTestData("secondMeasurementTemperature", value)}
                  />
                </td>
                <td>
                  <Input className={styles.tableInput} value={formData.pressure} readOnly />
                </td>
                <td>
                  <Input className={styles.tableInput} value={correction} readOnly />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.secondMeasurementCorrectedTemperature}
                    onValueChange={(value) => updateTestData("secondMeasurementCorrectedTemperature", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.repeatability}
                    onValueChange={(value) => updateTestData("repeatability", value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData.averageCorrectedTemperature}
                    onValueChange={(value) => updateTestData("averageCorrectedTemperature", value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
