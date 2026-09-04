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

  updateTestData("kinematicViscosity40FirstViscometerNumber", viscometerNumber)
  updateTestData("kinematicViscosity40FirstViscometerConstant", constant)
  updateTestData("kinematicViscosity40SecondViscometerNumber", viscometerNumber)
  updateTestData("kinematicViscosity40SecondViscometerConstant", constant)
}

export const KinematicViscosity40TestItem = ({ number, formData, updateTestData }: Props) => {
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
    firstT1: formData.kinematicViscosity40FirstT1,
    firstT2: formData.kinematicViscosity40FirstT2,
    secondT1: formData.kinematicViscosity40SecondT1,
    secondT2: formData.kinematicViscosity40SecondT2,
    firstConstant: formData.kinematicViscosity40FirstViscometerConstant,
    secondConstant: formData.kinematicViscosity40SecondViscometerConstant,
    precisionName: selectedPrecisionName,
  })

  return (
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
          value={formData.kinematicViscosity40EquipmentViscometer}
          placeholder={initialTestData.kinematicViscosity40EquipmentViscometer}
          onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentViscometer", value)}
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
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={formData.kinematicViscosity40FirstViscometerConstant}
                        placeholder={initialTestData.kinematicViscosity40FirstViscometerConstant}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, firstDeterminability.isError && styles.tableInputError)}
                        value={firstDeterminability.value}
                        placeholder={initialTestData.kinematicViscosity40FirstDeterminability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={firstTAverage}
                        placeholder={initialTestData.kinematicViscosity40FirstTAverage}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={firstV1}
                        placeholder={initialTestData.kinematicViscosity40FirstV1}
                        readOnly
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
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={formData.kinematicViscosity40SecondViscometerConstant}
                        placeholder={initialTestData.kinematicViscosity40SecondViscometerConstant}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, secondDeterminability.isError && styles.tableInputError)}
                        value={secondDeterminability.value}
                        placeholder={initialTestData.kinematicViscosity40SecondDeterminability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={secondTAverage}
                        placeholder={initialTestData.kinematicViscosity40SecondTAverage}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={secondV2}
                        placeholder={initialTestData.kinematicViscosity40SecondV2}
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
                        placeholder={initialTestData.kinematicViscosity40Repeatability}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={average}
                        placeholder={initialTestData.kinematicViscosity40Average}
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
