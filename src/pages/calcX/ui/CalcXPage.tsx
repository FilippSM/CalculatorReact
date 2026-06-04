import { useThemeStore } from "@/app/store"
import { Container } from "@/shared/components/Container"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import { useState } from "react"
import styles from "./CalcXPage.module.scss"

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

export const CalcX = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)

  const updateTestData = (field: keyof typeof initialTestData, value: string) => {
    setTestData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Calculation protocol data</h1>
        </div>

        <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
          <div className={styles.inputsGroup}>
            <Input label="Дата испытаний" value={testData.testDate} onValueChange={(value) => updateTestData("testDate", value)} />
            <Input
              label="Наименование заказчика"
              className={styles.wideInput}
              value={testData.customerName}
              onValueChange={(value) => updateTestData("customerName", value)}
            />
            <Input
              label="Наименование объекта испытаний"
              className={styles.wideInput}
              value={testData.objectName}
              onValueChange={(value) => updateTestData("objectName", value)}
            />
            <Input
              label="Регистрационный номер объекта испытаний"
              value={testData.registrationNumber}
              onValueChange={(value) => updateTestData("registrationNumber", value)}
            />
          </div>

          <div className={styles.section}>
            <h2>Условия проведения испытаний</h2>
            <Input
              label="Применяемое оборудование"
              className={styles.wideInput}
              value={testData.equipment}
              onValueChange={(value) => updateTestData("equipment", value)}
            />
          </div>

          <div className={styles.section}>
            <h2>Параметры</h2>
            <div className={styles.paramsRow}>
              <Input label="t, °C" value={testData.temperature} onValueChange={(value) => updateTestData("temperature", value)} />
              <Input label="p, кПа" value={testData.pressure} onValueChange={(value) => updateTestData("pressure", value)} />
              <Input label="φ, %" value={testData.humidity} onValueChange={(value) => updateTestData("humidity", value)} />
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}
