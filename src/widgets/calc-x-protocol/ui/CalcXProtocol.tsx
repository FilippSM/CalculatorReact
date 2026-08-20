import { useThemeStore } from "@/app/store"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import { useState } from "react"
import { initialVisibleTests, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import { initialTestData } from "../model/initialTestData"
import { CalcXTestFilters } from "./CalcXTestFilters"
import { CalcXTestsSection } from "./CalcXTestsSection"
import styles from "./CalcXProtocol.module.scss"

export const CalcXProtocol = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)
  const [visibleTests, setVisibleTests] = useState(initialVisibleTests)
  const formData = { ...initialTestData, ...testData }

  const updateTestData = (field: keyof typeof initialTestData, value: string) => {
    setTestData((current) => ({
      ...initialTestData,
      ...current,
      [field]: value,
    }))
  }

  const updateVisibleTest = (testId: TestVisibilityKey, checked: boolean) => {
    setVisibleTests((current) => ({
      ...current,
      [testId]: checked,
    }))
  }

  return (
    <>
      <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <CalcXTestFilters visibleTests={visibleTests} onChangeVisibleTest={updateVisibleTest} />
      </section>

      <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <div className={styles.inputsGroup}>
          <Input
            label="Дата испытаний"
            value={formData.testDate}
            onValueChange={(value) => updateTestData("testDate", value)}
          />
          <Input
            label="Наименование заказчика"
            className={styles.wideInput}
            value={formData.customerName}
            onValueChange={(value) => updateTestData("customerName", value)}
          />
          <Input
            label="Наименование объекта испытаний"
            className={styles.wideInput}
            value={formData.objectName}
            onValueChange={(value) => updateTestData("objectName", value)}
          />
          <Input
            label="Регистрационный номер объекта испытаний"
            value={formData.registrationNumber}
            onValueChange={(value) => updateTestData("registrationNumber", value)}
          />
        </div>

        <div className={styles.section}>
          <h2>Условия проведения испытаний</h2>
          <Input
            label="Применяемое оборудование"
            className={styles.wideInput}
            value={formData.equipment}
            onValueChange={(value) => updateTestData("equipment", value)}
          />
        </div>

        <div className={styles.section}>
          <h2>Параметры</h2>
          <div className={styles.paramsRow}>
            <Input
              label="t, °C"
              value={formData.temperature}
              onValueChange={(value) => updateTestData("temperature", value)}
            />
            <Input
              label="p, кПа"
              value={formData.pressure}
              onValueChange={(value) => updateTestData("pressure", value)}
            />
            <Input
              label="φ, %"
              value={formData.humidity}
              onValueChange={(value) => updateTestData("humidity", value)}
            />
          </div>
        </div>
      </section>

      <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <CalcXTestsSection formData={formData} visibleTests={visibleTests} updateTestData={updateTestData} />
      </section>
    </>
  )
}
