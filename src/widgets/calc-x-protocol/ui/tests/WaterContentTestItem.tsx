import { useWaterContentCalculations } from "@/features/water-content"
import { Input } from "@/shared/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import clsx from "clsx"
import { useState } from "react"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const waterShareOptions = ["Объемная доля воды", "Массовая доля воды"] as const
type WaterShareOption = (typeof waterShareOptions)[number]

const receiverTrapOptions = ["Приемник-ловушка 5 см³", "Приемник-ловушка 10 см³"] as const
type ReceiverTrapOption = (typeof receiverTrapOptions)[number]

export const WaterContentTestItem = ({ number, formData, updateTestData }: Props) => {
  const [selectedWaterShare, setSelectedWaterShare] = useState<WaterShareOption>("Объемная доля воды")
  const [selectedReceiverTrap, setSelectedReceiverTrap] =
    useState<ReceiverTrapOption>("Приемник-ловушка 10 см³")
  const sampleColumnLabel =
    selectedWaterShare === "Массовая доля воды" ? "Масса образца m, г" : "Объем образца V, см³"
  const { firstValue, secondValue, average, repeatability } = useWaterContentCalculations({
    firstSample: formData.waterContentFirstSampleMass,
    firstWaterVolume: formData.waterContentFirstWaterVolume,
    secondSample: formData.waterContentSecondSampleMass,
    secondWaterVolume: formData.waterContentSecondWaterVolume,
    receiverTrap: selectedReceiverTrap,
  })

  return (
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

      <div className={styles.precisionBlock}>
        <h3>Доля воды:</h3>
        <Select
          value={selectedWaterShare}
          onValueChange={(value) => setSelectedWaterShare(value as WaterShareOption)}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {waterShareOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.precisionBlock}>
        <h3>Приемник-ловушка:</h3>
        <Select
          value={selectedReceiverTrap}
          onValueChange={(value) => setSelectedReceiverTrap(value as ReceiverTrapOption)}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {receiverTrapOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        {selectedWaterShare === "Массовая доля воды" && (
          <Input
            className={styles.fullWidthInput}
            value={formData.waterContentEquipmentBalance}
            placeholder={initialTestData.waterContentEquipmentBalance}
            onValueChange={(value) => updateTestData("waterContentEquipmentBalance", value)}
          />
        )}
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
                <th>{sampleColumnLabel}</th>
                <th>Объем воды в пр.-ловушке V₀, см³</th>
                <th>Содержание воды, %</th>
                <th>{sampleColumnLabel}</th>
                <th>Объем воды в пр.-ловушке V₀, см³</th>
                <th>Содержание воды, %</th>
                <th>Повторяемость r, %</th>
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
                    value={firstValue}
                    placeholder={initialTestData.waterContentFirstValue}
                    readOnly
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
                    value={secondValue}
                    placeholder={initialTestData.waterContentSecondValue}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.waterContentRepeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    placeholder={initialTestData.waterContentAverage}
                    readOnly
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
