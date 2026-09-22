import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const metals = [
  { key: "Copper", label: "Медь" },
  { key: "Solder", label: "Припой" },
  { key: "Brass", label: "Латунь" },
  { key: "Steel", label: "Сталь" },
  { key: "CastIron", label: "Чугун" },
  { key: "Aluminum", label: "Аллюминий" },
] as const

const measurementColumns = [
  "Образец металла",
  "Время испытания, ч",
  "Длина l, мм",
  "Ширина a, мм",
  "Толщина b, мм",
  "Масса до m₁, г",
  "Масса после m₂, г",
  "Δ, г",
  "Скорость коррозии I, г/м²·сут",
]

const resultColumns = ["Образец металла", "Время испытания, ч", "Повторяемость, г/м²·сут", "Среднее значение I, г/м²·сут"]

const calculateDelta = (massBefore: string, massAfter: string): string => {
  const before = parseFloat(massBefore.replace(",", "."))
  const after = parseFloat(massAfter.replace(",", "."))

  if (isNaN(before) || isNaN(after)) return ""

  const delta = after - before
  return delta.toFixed(4).replace(".", ",")
}

const calculateCorrosionRate = (
  time: string,
  length: string,
  width: string,
  thickness: string,
  massBefore: string,
  massAfter: string,
): string => {
  const timeNum = parseFloat(time.replace(",", "."))
  const lengthNum = parseFloat(length.replace(",", "."))
  const widthNum = parseFloat(width.replace(",", "."))
  const thicknessNum = parseFloat(thickness.replace(",", "."))
  const massBeforeNum = parseFloat(massBefore.replace(",", "."))
  const massAfterNum = parseFloat(massAfter.replace(",", "."))

  if (isNaN(timeNum) || isNaN(lengthNum) || isNaN(widthNum) || isNaN(thicknessNum) || isNaN(massBeforeNum) || isNaN(massAfterNum)) {
    return ""
  }

  if (timeNum === 0 || lengthNum === 0 || widthNum === 0 || thicknessNum === 0) return ""

  const massDifference = massBeforeNum - massAfterNum
  const denominator = timeNum * 2 * (lengthNum + lengthNum + widthNum * thicknessNum)
  const rate = (24 * Math.pow(10, 6) * massDifference) / denominator

  return rate.toFixed(1).replace(".", ",")
}

const calculateRepeatability = (rate1: string, rate2: string, rate3: string): { value: string; limit: string; isError: boolean } => {
  const r1 = parseFloat(rate1.replace(",", "."))
  const r2 = parseFloat(rate2.replace(",", "."))
  const r3 = parseFloat(rate3.replace(",", "."))

  if (isNaN(r1) || isNaN(r2) || isNaN(r3)) return { value: "", limit: "", isError: false }

  const rates = [r1, r2, r3]
  const max = Math.max(...rates)
  const min = Math.min(...rates)
  const average = (r1 + r2 + r3) / 3
  const repeatability = Math.abs(max - min)
  const limit = average * 0.5

  const formattedRepeatability = repeatability.toFixed(1).replace(".", ",")
  const formattedLimit = limit.toFixed(1).replace(".", ",")

  if (repeatability > limit) {
    return {
      value: `${formattedRepeatability} > r=${formattedLimit} (Error)`,
      limit: formattedLimit,
      isError: true,
    }
  }

  return { value: formattedRepeatability, limit: formattedLimit, isError: false }
}

const calculateAverage = (rate1: string, rate2: string, rate3: string): string => {
  const r1 = parseFloat(rate1.replace(",", "."))
  const r2 = parseFloat(rate2.replace(",", "."))
  const r3 = parseFloat(rate3.replace(",", "."))

  if (isNaN(r1) || isNaN(r2) || isNaN(r3)) return ""

  const average = (r1 + r2 + r3) / 3
  return average.toFixed(1).replace(".", ",")
}

export const CorrosionTestItem = ({ number, formData, updateTestData }: Props) => {
  const renderMeasurementTable = (measurement: "First" | "Second" | "Third", title: string) => (
    <div className={styles.tableBlock}>
      <p>{title}</p>
      <div className={styles.tableScroll}>
        <table className={styles.testTable}>
          <thead>
            <tr>
              {measurementColumns.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metals.map((metal) => {
              const time = formData[`corrosion${measurement}${metal.key}Time` as keyof InitialTestData] as string
              const length = formData[`corrosion${measurement}${metal.key}Length` as keyof InitialTestData] as string
              const width = formData[`corrosion${measurement}${metal.key}Width` as keyof InitialTestData] as string
              const thickness = formData[`corrosion${measurement}${metal.key}Thickness` as keyof InitialTestData] as string
              const massBefore = formData[`corrosion${measurement}${metal.key}MassBefore` as keyof InitialTestData] as string
              const massAfter = formData[`corrosion${measurement}${metal.key}MassAfter` as keyof InitialTestData] as string

              const delta = calculateDelta(massBefore, massAfter)
              const rate = calculateCorrosionRate(time, length, width, thickness, massBefore, massAfter)

              return (
                <tr key={metal.key}>
                  <td>{metal.label}</td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={time}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Time` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Time` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={length}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Length` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Length` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={width}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Width` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Width` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={thickness}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Thickness` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Thickness` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={massBefore}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}MassBefore` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}MassBefore` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={massAfter}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}MassAfter` as keyof typeof initialTestData] as string}
                      onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}MassAfter` as keyof InitialTestData, value)}
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={delta}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Delta` as keyof typeof initialTestData] as string}
                      readOnly
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={rate}
                      placeholder={initialTestData[`corrosion${measurement}${metal.key}Rate` as keyof typeof initialTestData] as string}
                      readOnly
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className={styles.testItem}>
      <div className={styles.testTitleRow}>
        <span className={styles.testNumber}>{number}.</span>
        <Input
          label="Наименование испытания"
          className={styles.testNameInput}
          value={formData.corrosionTestName}
          placeholder={initialTestData.corrosionTestName}
          onValueChange={(value) => updateTestData("corrosionTestName", value)}
        />
      </div>

      <div className={styles.equipmentBlock}>
        <h3>Оборудование:</h3>
        <Input
          className={styles.fullWidthInput}
          value={formData.corrosionEquipmentBalance}
          placeholder={initialTestData.corrosionEquipmentBalance}
          onValueChange={(value) => updateTestData("corrosionEquipmentBalance", value)}
        />
        <Input
          className={styles.fullWidthInput}
          value={formData.corrosionEquipmentThermometer}
          placeholder={initialTestData.corrosionEquipmentThermometer}
          onValueChange={(value) => updateTestData("corrosionEquipmentThermometer", value)}
        />
      </div>

      <div className={styles.tableSection}>
        <h3>Данные:</h3>
        {renderMeasurementTable("First", "Первое измерение")}
        {renderMeasurementTable("Second", "Второе измерение")}
        {renderMeasurementTable("Third", "Третье измерение")}
      </div>

      <div className={styles.tableSection}>
        <h3>Результаты:</h3>
        <div className={styles.tableScroll}>
          <table className={styles.testTable}>
            <thead>
              <tr>
                {resultColumns.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metals.map((metal) => {
                const rate1 = calculateCorrosionRate(
                  formData[`corrosionFirst${metal.key}Time` as keyof InitialTestData] as string,
                  formData[`corrosionFirst${metal.key}Length` as keyof InitialTestData] as string,
                  formData[`corrosionFirst${metal.key}Width` as keyof InitialTestData] as string,
                  formData[`corrosionFirst${metal.key}Thickness` as keyof InitialTestData] as string,
                  formData[`corrosionFirst${metal.key}MassBefore` as keyof InitialTestData] as string,
                  formData[`corrosionFirst${metal.key}MassAfter` as keyof InitialTestData] as string,
                )
                const rate2 = calculateCorrosionRate(
                  formData[`corrosionSecond${metal.key}Time` as keyof InitialTestData] as string,
                  formData[`corrosionSecond${metal.key}Length` as keyof InitialTestData] as string,
                  formData[`corrosionSecond${metal.key}Width` as keyof InitialTestData] as string,
                  formData[`corrosionSecond${metal.key}Thickness` as keyof InitialTestData] as string,
                  formData[`corrosionSecond${metal.key}MassBefore` as keyof InitialTestData] as string,
                  formData[`corrosionSecond${metal.key}MassAfter` as keyof InitialTestData] as string,
                )
                const rate3 = calculateCorrosionRate(
                  formData[`corrosionThird${metal.key}Time` as keyof InitialTestData] as string,
                  formData[`corrosionThird${metal.key}Length` as keyof InitialTestData] as string,
                  formData[`corrosionThird${metal.key}Width` as keyof InitialTestData] as string,
                  formData[`corrosionThird${metal.key}Thickness` as keyof InitialTestData] as string,
                  formData[`corrosionThird${metal.key}MassBefore` as keyof InitialTestData] as string,
                  formData[`corrosionThird${metal.key}MassAfter` as keyof InitialTestData] as string,
                )

                const repeatability = calculateRepeatability(rate1, rate2, rate3)
                const average = calculateAverage(rate1, rate2, rate3)

                return (
                  <tr key={metal.key}>
                    <td>{metal.label}</td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={formData[`corrosionFirst${metal.key}Time` as keyof InitialTestData] as string}
                        placeholder={initialTestData[`corrosionFirst${metal.key}Time` as keyof typeof initialTestData] as string}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                        value={repeatability.value}
                        placeholder={initialTestData[`corrosionResults${metal.key}Repeatability` as keyof typeof initialTestData] as string}
                        readOnly
                      />
                    </td>
                    <td>
                      <Input
                        className={styles.tableInput}
                        value={average}
                        placeholder={initialTestData[`corrosionResults${metal.key}Average` as keyof typeof initialTestData] as string}
                        readOnly
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
