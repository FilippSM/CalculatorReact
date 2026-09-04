import { useKinematicViscosityCalculations } from "@/features/viscosity"
import { Input } from "@/shared/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { constansVisc } from "@/features/viscosity/constans/constans-visc"
import { viscosityPrecisionData } from "@/features/viscosity/constans/viscosityPrecisionData"
import clsx from "clsx"
import { useState } from "react"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const updateViscometerFields = (updateTestData: Props["updateTestData"], constant: string) => {
  const viscometer = constansVisc.find((item) => item.constant.toString() === constant)

  if (!viscometer) return

  const viscometerNumber = viscometer.id.toString()

  updateTestData("kinematicViscosity100FirstViscometerNumber", viscometerNumber)
  updateTestData("kinematicViscosity100FirstViscometerConstant", constant)
  updateTestData("kinematicViscosity100SecondViscometerNumber", viscometerNumber)
  updateTestData("kinematicViscosity100SecondViscometerConstant", constant)
}

export const KinematicViscosity100TestItem = ({ number, formData, updateTestData }: Props) => {
  const [selectedViscometerConstant, setSelectedViscometerConstant] = useState("")
  const [selectedPrecisionName, setSelectedPrecisionName] = useState("Компаундированные масла при 40 °С и 100 °С")
  const {
    firstTAverage,
    secondTAverage,
    firstV1,
    secondV2,
    firstDeterminability,
    secondDeterminability,
    average,
    repeatability,
  } = useKinematicViscosityCalculations({
    firstT1: formData.kinematicViscosity100FirstT1,
    firstT2: formData.kinematicViscosity100FirstT2,
    secondT1: formData.kinematicViscosity100SecondT1,
    secondT2: formData.kinematicViscosity100SecondT2,
    firstConstant: formData.kinematicViscosity100FirstViscometerConstant,
    secondConstant: formData.kinematicViscosity100SecondViscometerConstant,
    precisionName: selectedPrecisionName,
  })

  return (
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

      <div className={styles.precisionBlock}>
        <h3>Прецизионность:</h3>
        <Select value={selectedPrecisionName} onValueChange={setSelectedPrecisionName}>
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {viscosityPrecisionData.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.kinematicViscosity100EquipmentViscometer}
          placeholder={initialTestData.kinematicViscosity100EquipmentViscometer}
          onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentViscometer", value)}
        />
        <Select
          value={selectedViscometerConstant}
          onValueChange={(constant) => {
            setSelectedViscometerConstant(constant)
            updateViscometerFields(updateTestData, constant)
          }}
        >
          <SelectTrigger className={styles.fullWidthSelect}>
            <SelectValue placeholder="Select Viscometer" />
          </SelectTrigger>
          <SelectContent>
            {constansVisc.map((item) => (
              <SelectItem key={`${item.id}-${item.diameter}-${item.constant}`} value={item.constant.toString()}>
                {item.id}, диаметр: {item.diameter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className={styles.fullWidthInput}
          value={formData.kinematicViscosity100EquipmentStopwatch}
          placeholder={initialTestData.kinematicViscosity100EquipmentStopwatch}
          onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentStopwatch", value)}
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
                    <th>Определяемость d, с ({selectedPrecisionName})</th>
                    <th>Среднее значение tср, с</th>
                    <th>Кинематическая вязкость ν₁, мм²/с</th>
                    <th>Время истечения t₁, с</th>
                    <th>Время истечения t₂, с</th>
                    <th>Номер вискозиметра</th>
                    <th>Постоянная вискозиметра</th>
                    <th>Определяемость d, с ({selectedPrecisionName})</th>
                    <th>Среднее значение tср, с</th>
                    <th>Кинематическая вязкость ν₂, мм²/с</th>
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
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={formData.kinematicViscosity100FirstViscometerConstant}
                        placeholder={initialTestData.kinematicViscosity100FirstViscometerConstant}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, firstDeterminability.isError && styles.tableInputError)}
                        value={firstDeterminability.value}
                        placeholder={initialTestData.kinematicViscosity100FirstDeterminability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={firstTAverage}
                        placeholder={initialTestData.kinematicViscosity100FirstTAverage}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={firstV1}
                        placeholder={initialTestData.kinematicViscosity100FirstV1}
                        readOnly
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
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={formData.kinematicViscosity100SecondViscometerConstant}
                        placeholder={initialTestData.kinematicViscosity100SecondViscometerConstant}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, secondDeterminability.isError && styles.tableInputError)}
                        value={secondDeterminability.value}
                        placeholder={initialTestData.kinematicViscosity100SecondDeterminability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={secondTAverage}
                        placeholder={initialTestData.kinematicViscosity100SecondTAverage}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={secondV2}
                        placeholder={initialTestData.kinematicViscosity100SecondV2}
                        readOnly
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
                    <th>Повторяемость r, с ({selectedPrecisionName})</th>
                    <th>Среднее значение νср, мм²/с</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                        value={repeatability.value}
                        placeholder={initialTestData.kinematicViscosity100Repeatability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={average}
                        placeholder={initialTestData.kinematicViscosity100Average}
                        readOnly
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
}
