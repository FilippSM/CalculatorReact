import { Input } from "@/shared/components/Input"
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
            {metals.map((metal) => (
              <tr key={metal.key}>
                <td>{metal.label}</td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Time` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Time` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Time` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Length` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Length` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Length` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Width` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Width` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Width` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Thickness` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Thickness` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Thickness` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}MassBefore` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}MassBefore` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}MassBefore` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}MassAfter` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}MassAfter` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}MassAfter` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Delta` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Delta` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Delta` as keyof InitialTestData, value)}
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={formData[`corrosion${measurement}${metal.key}Rate` as keyof InitialTestData] as string}
                    placeholder={initialTestData[`corrosion${measurement}${metal.key}Rate` as keyof typeof initialTestData] as string}
                    onValueChange={(value) => updateTestData(`corrosion${measurement}${metal.key}Rate` as keyof InitialTestData, value)}
                  />
                </td>
              </tr>
            ))}
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
              {metals.map((metal) => (
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
                      className={styles.tableInput}
                      value={formData[`corrosionResults${metal.key}Repeatability` as keyof InitialTestData] as string}
                      placeholder={initialTestData[`corrosionResults${metal.key}Repeatability` as keyof typeof initialTestData] as string}
                      readOnly
                    />
                  </td>
                  <td>
                    <Input
                      className={styles.tableInput}
                      value={formData[`corrosionResults${metal.key}Average` as keyof InitialTestData] as string}
                      placeholder={initialTestData[`corrosionResults${metal.key}Average` as keyof typeof initialTestData] as string}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
