import { Input } from "@/shared/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { Label } from "@/shared/components/Label/Label"
import { useDynamicViscosity30Calculations } from "@/features/dynamic-viscosity-30"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

const dynamicViscosity30TestNameOptions = [
  "Вязкость динамическая, при -15°С макс., мПа · с по ГОСТ 33111-2014",
  "Вязкость динамическая, при -20°С макс., мПа · с по ГОСТ 33111-2014",
  "Вязкость динамическая, при -25°С макс., мПа · с по ГОСТ 33111-2014",
  "Вязкость динамическая, при -30°С макс., мПа · с по ГОСТ 33111-2014",
  "Вязкость динамическая, при -35°С макс., мПа · с по ГОСТ 33111-2014",
] as const

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const DynamicViscosity30TestItem = ({ number, formData, updateTestData }: Props) => {
  const { average, repeatability } = useDynamicViscosity30Calculations({
    firstEta1: formData.dynamicViscosity30FirstEta1,
    secondEta2: formData.dynamicViscosity30SecondEta2,
  })

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <div className={styles.testNameSelectWrapper}>
          <Label>Наименование испытания</Label>
          <Select
            value={formData.dynamicViscosity30TestName}
            onValueChange={(value) => updateTestData("dynamicViscosity30TestName", value)}
          >
            <SelectTrigger className={styles.testNameSelect}>
              <SelectValue placeholder={initialTestData.dynamicViscosity30TestName} />
            </SelectTrigger>
            <SelectContent>
              {dynamicViscosity30TestNameOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                    className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                    value={repeatability.value}
                    placeholder={initialTestData.dynamicViscosity30Repeatability}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={average}
                    placeholder={initialTestData.dynamicViscosity30Average}
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
