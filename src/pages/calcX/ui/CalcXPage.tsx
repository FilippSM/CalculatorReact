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
  flashPointTestName: "Температура вспышки в открытом тигле, °C по ГОСТ 4333",
  flashPointEquipmentDevice: "Аппарат для определения температуры вспышки в открытом тигле ТВО-ПХП № 1052",
  flashPointEquipmentThermometer: "Термометр ASTM 11c № 30",
  flashPointEquipmentStopwatch: "Секундомер электронный «Интеграл С-01» № 433939",
  flashPointEquipmentThermohygrometer: "Термогигрометр ИВА-6Н-КП-Д № 22506",
  firstMeasurementTemperature: "242",
  firstMeasurementPressure: "98,6",
  firstMeasurementCorrection: "1",
  firstMeasurementCorrectedTemperature: "243",
  secondMeasurementTemperature: "241",
  secondMeasurementPressure: "98,6",
  secondMeasurementCorrection: "1",
  secondMeasurementCorrectedTemperature: "242",
  repeatability: "1",
  averageCorrectedTemperature: "243",
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
            <Input
              label="Дата испытаний"
              value={testData.testDate}
              onValueChange={(value) => updateTestData("testDate", value)}
            />
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
              <Input
                label="t, °C"
                value={testData.temperature}
                onValueChange={(value) => updateTestData("temperature", value)}
              />
              <Input
                label="p, кПа"
                value={testData.pressure}
                onValueChange={(value) => updateTestData("pressure", value)}
              />
              <Input
                label="φ, %"
                value={testData.humidity}
                onValueChange={(value) => updateTestData("humidity", value)}
              />
            </div>
          </div>
        </section>
        <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
          <div className={styles.section}>
            <h2>Испытания</h2>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>1.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={testData.flashPointTestName}
                  onValueChange={(value) => updateTestData("flashPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={testData.flashPointEquipmentDevice}
                  onValueChange={(value) => updateTestData("flashPointEquipmentDevice", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={testData.flashPointEquipmentThermometer}
                  onValueChange={(value) => updateTestData("flashPointEquipmentThermometer", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={testData.flashPointEquipmentStopwatch}
                  onValueChange={(value) => updateTestData("flashPointEquipmentStopwatch", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={testData.flashPointEquipmentThermohygrometer}
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
                            value={testData.firstMeasurementTemperature}
                            onValueChange={(value) => updateTestData("firstMeasurementTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.firstMeasurementPressure}
                            onValueChange={(value) => updateTestData("firstMeasurementPressure", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.firstMeasurementCorrection}
                            onValueChange={(value) => updateTestData("firstMeasurementCorrection", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.firstMeasurementCorrectedTemperature}
                            onValueChange={(value) => updateTestData("firstMeasurementCorrectedTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.secondMeasurementTemperature}
                            onValueChange={(value) => updateTestData("secondMeasurementTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.secondMeasurementPressure}
                            onValueChange={(value) => updateTestData("secondMeasurementPressure", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.secondMeasurementCorrection}
                            onValueChange={(value) => updateTestData("secondMeasurementCorrection", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.secondMeasurementCorrectedTemperature}
                            onValueChange={(value) => updateTestData("secondMeasurementCorrectedTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.repeatability}
                            onValueChange={(value) => updateTestData("repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={testData.averageCorrectedTemperature}
                            onValueChange={(value) => updateTestData("averageCorrectedTemperature", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}
