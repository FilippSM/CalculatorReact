import { Container } from "@/shared/components/Container"
import { Input } from "@/shared/components/Input"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { useState } from "react"
import styles from "./CalcPage.module.scss"

const initialTestData = {
  testDate: "26.05.2026",
  customerName: 'ООО "Евразия Лубрикант"',
  objectName: "Масло моторное минеральное «TURBO M8ДМ-М»",
  registrationNumber: "260526-М-1203",
  equipment: "Термогигрометр ИВА-6Н-КП-Д № 22506",
  temperature: "22,9",
  pressure: "98,6",
  humidity: "33,8",
}

export const Calc = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)

  const updateTestData = (field: keyof typeof initialTestData, value: string) => {
    setTestData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <Container className={styles.container}>
      <h1>Calc</h1>

      <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <div className={styles.testInfoTable}>
          <div className={styles.labelCell}>Дата испытаний:</div>
          <div className={styles.valueCell}>
            <Input className={styles.cellInput} value={testData.testDate} onValueChange={(value) => updateTestData("testDate", value)} />
          </div>

          <div className={styles.labelCell}>Наименование заказчика:</div>
          <div className={styles.valueCell}>
            <Input
              className={styles.cellInput}
              value={testData.customerName}
              onValueChange={(value) => updateTestData("customerName", value)}
            />
          </div>

          <div className={styles.labelCell}>Наименование объекта испытаний:</div>
          <div className={styles.valueCell}>
            <Input className={styles.cellInput} value={testData.objectName} onValueChange={(value) => updateTestData("objectName", value)} />
          </div>

          <div className={styles.labelCell}>Регистрационный номер объекта испытаний:</div>
          <div className={styles.valueCell}>
            <Input
              className={styles.cellInput}
              value={testData.registrationNumber}
              onValueChange={(value) => updateTestData("registrationNumber", value)}
            />
          </div>

          <div className={clsx(styles.labelCell, styles.conditionsLabel)}>Условия проведения испытаний:</div>
          <div className={styles.sectionTitle}>Применяемое оборудование</div>

          <div className={clsx(styles.valueCell, styles.equipmentCell)}>
            <Input className={styles.cellInput} value={testData.equipment} onValueChange={(value) => updateTestData("equipment", value)} />
          </div>

          <div className={styles.sectionTitle}>Параметры</div>

          <div className={styles.parametersRow}>
            <label className={styles.parameterCell}>
              <span>t, °C:</span>
              <Input
                className={styles.parameterInput}
                value={testData.temperature}
                onValueChange={(value) => updateTestData("temperature", value)}
              />
            </label>
            <label className={styles.parameterCell}>
              <span>p, кПа:</span>
              <Input className={styles.parameterInput} value={testData.pressure} onValueChange={(value) => updateTestData("pressure", value)} />
            </label>
            <label className={styles.parameterCell}>
              <span>φ, %:</span>
              <Input className={styles.parameterInput} value={testData.humidity} onValueChange={(value) => updateTestData("humidity", value)} />
            </label>
          </div>
        </div>
      </section>
    </Container>
  )
}
