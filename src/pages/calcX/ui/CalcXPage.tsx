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
  mechanicalImpuritiesTestName: "Содержание механических примесей, % по ГОСТ 6370",
  mechanicalImpuritiesEquipmentBalance1: "Весы лабораторные электронные Radwag AS 220/C/2 № 376438/12",
  mechanicalImpuritiesEquipmentBalance2: "Весы лабораторные электронные Radwag PS 10100/C/2/MS № 698940",
  mechanicalImpuritiesEquipmentFurnace: "Электропечь низкотемпературная лабораторная SNOL 58/350 № 11766",
  mechanicalImpuritiesFirstM1: "47,0329",
  mechanicalImpuritiesFirstM2: "47,0315",
  mechanicalImpuritiesFirstM3: "100,00",
  mechanicalImpuritiesFirstX1: "0,0014",
  mechanicalImpuritiesSecondM1: "46,4218",
  mechanicalImpuritiesSecondM2: "46,4194",
  mechanicalImpuritiesSecondM3: "100,00",
  mechanicalImpuritiesSecondX2: "0,0024",
  mechanicalImpuritiesRepeatability: "0,0010",
  mechanicalImpuritiesAverage: "0,0019",
  densityAt20TestName: "Плотность при 20°С, кг/м³ по ГОСТ 3900",
  densityAt20EquipmentThermometer: "Термометр ЛТ-300 № 302322",
  densityAt20EquipmentHydrometer: "Ареометр АНТ-2 № 42335",
  densityAt20FirstRho: "863,0",
  densityAt20FirstT: "21,0",
  densityAt20FirstRhoAt20: "863,7",
  densityAt20FirstRhoAt20Corrected: "865,1",
  densityAt20SecondRho: "875,0",
  densityAt20SecondT: "22,0",
  densityAt20SecondRhoAt20: "876,3",
  densityAt20SecondRhoAt20Corrected: "877,7",
  densityAt20Repeatability: "> r, Error",
  densityAt20Average: "871,4",
  kinematicViscosity100TestName: "Кинематическая вязкость при 100°C, мм²/с по ГОСТ 33",
  kinematicViscosity100EquipmentViscometer: "Вискозиметр ВПЖ-1 № 847",
  kinematicViscosity100EquipmentThermostat: "Термостат КВ-ПХП № 1060",
  kinematicViscosity100EquipmentStopwatch: "Секундомер электронный «Интеграл С-01» № 411295",
  kinematicViscosity100FirstT1: "239,77",
  kinematicViscosity100FirstT2: "239,52",
  kinematicViscosity100FirstViscometerNumber: "847",
  kinematicViscosity100FirstViscometerConstant: "0,030584",
  kinematicViscosity100FirstDeterminability: "0,10",
  kinematicViscosity100FirstTAverage: "239,64",
  kinematicViscosity100FirstV1: "7,32915",
  kinematicViscosity100SecondT1: "239,94",
  kinematicViscosity100SecondT2: "239,78",
  kinematicViscosity100SecondViscometerNumber: "847",
  kinematicViscosity100SecondViscometerConstant: "0,030584",
  kinematicViscosity100SecondDeterminability: "0,07",
  kinematicViscosity100SecondTAverage: "239,86",
  kinematicViscosity100SecondV2: "7,33588",
  kinematicViscosity100Repeatability: "0,09",
  kinematicViscosity100Average: "7,333",
  kinematicViscosity40TestName: "Кинематическая вязкость при 40°С, мм²/с по ГОСТ 33",
  kinematicViscosity40EquipmentViscometer: "Вискозиметр ВПЖ-1 № 3389",
  kinematicViscosity40EquipmentThermostat: "Термостат КВ-ПХП № 1060",
  kinematicViscosity40EquipmentStopwatch: "Секундомер электронный «Интеграл С-01» № 433939",
  kinematicViscosity40FirstT1: "327,90",
  kinematicViscosity40FirstT2: "327,91",
  kinematicViscosity40FirstViscometerNumber: "3389",
  kinematicViscosity40FirstViscometerConstant: "0,112311",
  kinematicViscosity40FirstDeterminability: "0,00",
  kinematicViscosity40FirstTAverage: "327,91",
  kinematicViscosity40FirstV1: "36,8279",
  kinematicViscosity40SecondT1: "327,81",
  kinematicViscosity40SecondT2: "328,02",
  kinematicViscosity40SecondViscometerNumber: "3389",
  kinematicViscosity40SecondViscometerConstant: "0,112311",
  kinematicViscosity40SecondDeterminability: "0,06",
  kinematicViscosity40SecondTAverage: "327,92",
  kinematicViscosity40SecondV2: "36,8290",
  kinematicViscosity40Repeatability: "0,00",
  kinematicViscosity40Average: "36,83",
  viscosityIndexTestName: "Индекс вязкости по ГОСТ 25371",
  viscosityIndexV100: "7,333",
  viscosityIndexV40: "36,83",
  viscosityIndexIV: "169",
  pourPointTestName: "Температура текучести,°С по ГОСТ 20287 (Метод А)",
  pourPointEquipment: "Автоматический аппарат для определения температуры текучести нефтепродуктов ТПЗ-ЛАБ-22",
  pourPointFirstT1: "-21",
  pourPointSecondT2: "-21",
  pourPointRepeatability: "0",
  pourPointAverage: "-21",
  freezingPointTestName: "Температура застывания,°С по ГОСТ 20287 (Метод Б)",
  freezingPointEquipment: "Автоматический аппарат для определения температуры текучести нефтепродуктов ТПЗ-ЛАБ-22",
  freezingPointFirstT1: "-24",
  freezingPointSecondT2: "-24",
  freezingPointRepeatability: "0",
  freezingPointAverage: "-24",
  noackLossTestName: "Потери от испарения методом Ноак, % по ГОСТ 32330",
  noackLossEquipmentBalance: "Весы лабораторные электронные Radwag PS 10100/C/2/MS № 698940",
  noackLossEquipmentApparatus: "Автоматический аппарат НК-0059В для определения потерь от испарения масел методом Ноак № 200201",
  noackLossFirstCrucibleA: "353,23",
  noackLossFirstCrucibleB: "418,97",
  noackLossFirstCrucibleC: "411,80",
  noackLossFirstEvaporationLoss: "10,907",
  noackLossSecondCrucibleA: "353,23",
  noackLossSecondCrucibleB: "418,55",
  noackLossSecondCrucibleC: "411,41",
  noackLossSecondEvaporationLoss: "10,931",
  noackLossRepeatability: "0,2",
  noackLossAverage: "10,9",
  dynamicViscosity30TestName: "Вязкость динамическая, при -30°С макс., мПа · с по ГОСТ 33111-2014",
  dynamicViscosity30Equipment: "Автоматический аппарат НК-6538 имитатор холодной прокрутки (CCS) № 2302158",
  dynamicViscosity30FirstEta1: "3861",
  dynamicViscosity30SecondEta2: "3982",
  dynamicViscosity30Repeatability: "3,1",
  dynamicViscosity30Average: "3922",
  colorCntTestName: "Цвет, ед. ЦНТ по ГОСТ 20284",
  colorCntEquipment: "Колориметр нефтепродуктов BLS-1500 № 01",
  colorCntFirstX1: "1,5",
  colorCntSecondX2: "2,5",
  colorCntRepeatability: "> r, Error",
  colorCntAverage: "2,0",
  baseNumberTestName: "Щелочное число, мг·KOH/г по ГОСТ 11362",
  baseNumberEquipment: "Автоматический титратор Metrohm 799 GP Titrino",
  baseNumberFirstSampleMass: "0,9854",
  baseNumberFirstTitrantConcentration: "0,103",
  baseNumberFirstTitrantVolume: "1,37",
  baseNumberFirstValue: "8,04",
  baseNumberSecondSampleMass: "0,9856",
  baseNumberSecondTitrantConcentration: "0,10",
  baseNumberSecondTitrantVolume: "1,37",
  baseNumberSecondValue: "8,00",
  baseNumberRepeatability: "0,04",
  baseNumberAverage: "8,0",
  autoIgnitionTestName: "Температура самовоспламенения, °С по ГОСТ 12.1.044 п. 31",
  autoIgnitionEquipmentDevice: "Аппарат определения температуры самовоспламенения жидкостей СВ-10 № 91",
  autoIgnitionEquipmentStopwatch: "Секундомер электронный «Интеграл С-01» № 433939",
  autoIgnitionEquipmentBalance: "Весы лабораторные электронные Radwag AS 220/C/2 № 376438/12",
  autoIgnitionFirstT1: "350",
  autoIgnitionFirstM1: "0,6",
  autoIgnitionFirstInductionT1: "106",
  autoIgnitionSecondT2: "352",
  autoIgnitionSecondM2: "0,6",
  autoIgnitionSecondInductionT2: "123",
  autoIgnitionRepeatability: "2",
  autoIgnitionAverage: "351",
}

export const CalcX = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)
  const formData = { ...initialTestData, ...testData }

  const updateTestData = (field: keyof typeof initialTestData, value: string) => {
    setTestData((current) => ({
      ...initialTestData,
      ...current,
      [field]: value,
    }))
  }

  return (
    <Container className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Calculation protocol data</h1>
        </div>

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
          <div className={styles.section}>
            <h2>Испытания</h2>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>1.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.flashPointTestName}
                  onValueChange={(value) => updateTestData("flashPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.flashPointEquipmentDevice}
                  onValueChange={(value) => updateTestData("flashPointEquipmentDevice", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={formData.flashPointEquipmentThermometer}
                  onValueChange={(value) => updateTestData("flashPointEquipmentThermometer", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={formData.flashPointEquipmentStopwatch}
                  onValueChange={(value) => updateTestData("flashPointEquipmentStopwatch", value)}
                />
                <Input
                  className={styles.wideInput}
                  value={formData.flashPointEquipmentThermohygrometer}
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
                            value={formData.firstMeasurementTemperature}
                            onValueChange={(value) => updateTestData("firstMeasurementTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.firstMeasurementPressure}
                            onValueChange={(value) => updateTestData("firstMeasurementPressure", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.firstMeasurementCorrection}
                            onValueChange={(value) => updateTestData("firstMeasurementCorrection", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.firstMeasurementCorrectedTemperature}
                            onValueChange={(value) => updateTestData("firstMeasurementCorrectedTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.secondMeasurementTemperature}
                            onValueChange={(value) => updateTestData("secondMeasurementTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.secondMeasurementPressure}
                            onValueChange={(value) => updateTestData("secondMeasurementPressure", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.secondMeasurementCorrection}
                            onValueChange={(value) => updateTestData("secondMeasurementCorrection", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.secondMeasurementCorrectedTemperature}
                            onValueChange={(value) => updateTestData("secondMeasurementCorrectedTemperature", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.repeatability}
                            onValueChange={(value) => updateTestData("repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.averageCorrectedTemperature}
                            onValueChange={(value) => updateTestData("averageCorrectedTemperature", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>2.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.mechanicalImpuritiesTestName}
                  placeholder={initialTestData.mechanicalImpuritiesTestName}
                  onValueChange={(value) => updateTestData("mechanicalImpuritiesTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.mechanicalImpuritiesEquipmentBalance1}
                  placeholder={initialTestData.mechanicalImpuritiesEquipmentBalance1}
                  onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentBalance1", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.mechanicalImpuritiesEquipmentBalance2}
                  placeholder={initialTestData.mechanicalImpuritiesEquipmentBalance2}
                  onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentBalance2", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.mechanicalImpuritiesEquipmentFurnace}
                  placeholder={initialTestData.mechanicalImpuritiesEquipmentFurnace}
                  onValueChange={(value) => updateTestData("mechanicalImpuritiesEquipmentFurnace", value)}
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
                        <th>Масса стакана + ф-тр + мех. примеси m₁, г</th>
                        <th>Масса стакана + фильтр m₂, г</th>
                        <th>Масса пробы m₃, г</th>
                        <th>Содержание мех. примесей X₁, %</th>
                        <th>Масса стакана + ф-тр + мех. примеси m₁, г</th>
                        <th>Масса стакана + фильтр m₂, г</th>
                        <th>Масса пробы m₃, г</th>
                        <th>Содержание мех. примесей X₂, %</th>
                        <th>Повторяемость r, %</th>
                        <th>Среднее значение Xср, %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesFirstM1}
                            placeholder={initialTestData.mechanicalImpuritiesFirstM1}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesFirstM2}
                            placeholder={initialTestData.mechanicalImpuritiesFirstM2}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesFirstM3}
                            placeholder={initialTestData.mechanicalImpuritiesFirstM3}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstM3", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesFirstX1}
                            placeholder={initialTestData.mechanicalImpuritiesFirstX1}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesFirstX1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesSecondM1}
                            placeholder={initialTestData.mechanicalImpuritiesSecondM1}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesSecondM2}
                            placeholder={initialTestData.mechanicalImpuritiesSecondM2}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesSecondM3}
                            placeholder={initialTestData.mechanicalImpuritiesSecondM3}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondM3", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesSecondX2}
                            placeholder={initialTestData.mechanicalImpuritiesSecondX2}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesSecondX2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesRepeatability}
                            placeholder={initialTestData.mechanicalImpuritiesRepeatability}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.mechanicalImpuritiesAverage}
                            placeholder={initialTestData.mechanicalImpuritiesAverage}
                            onValueChange={(value) => updateTestData("mechanicalImpuritiesAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>3.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.densityAt20TestName}
                  placeholder={initialTestData.densityAt20TestName}
                  onValueChange={(value) => updateTestData("densityAt20TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.densityAt20EquipmentThermometer}
                  placeholder={initialTestData.densityAt20EquipmentThermometer}
                  onValueChange={(value) => updateTestData("densityAt20EquipmentThermometer", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.densityAt20EquipmentHydrometer}
                  placeholder={initialTestData.densityAt20EquipmentHydrometer}
                  onValueChange={(value) => updateTestData("densityAt20EquipmentHydrometer", value)}
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
                        <th>ρ₁, кг/м³</th>
                        <th>t₁, °С</th>
                        <th>ρ₁ при 20°С, кг/м³</th>
                        <th>ρ₁ при 20°С с поправкой, кг/м³</th>
                        <th>ρ₂, кг/м³</th>
                        <th>t₂, °С</th>
                        <th>ρ₂ при 20°С, кг/м³</th>
                        <th>ρ₂ при 20°С с поправкой, кг/м³</th>
                        <th>Повторяемость r, кг/м³</th>
                        <th>Среднее значение ρср, кг/м³</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRho}
                            placeholder={initialTestData.densityAt20FirstRho}
                            onValueChange={(value) => updateTestData("densityAt20FirstRho", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstT}
                            placeholder={initialTestData.densityAt20FirstT}
                            onValueChange={(value) => updateTestData("densityAt20FirstT", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRhoAt20}
                            placeholder={initialTestData.densityAt20FirstRhoAt20}
                            onValueChange={(value) => updateTestData("densityAt20FirstRhoAt20", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20FirstRhoAt20Corrected}
                            placeholder={initialTestData.densityAt20FirstRhoAt20Corrected}
                            onValueChange={(value) => updateTestData("densityAt20FirstRhoAt20Corrected", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRho}
                            placeholder={initialTestData.densityAt20SecondRho}
                            onValueChange={(value) => updateTestData("densityAt20SecondRho", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondT}
                            placeholder={initialTestData.densityAt20SecondT}
                            onValueChange={(value) => updateTestData("densityAt20SecondT", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRhoAt20}
                            placeholder={initialTestData.densityAt20SecondRhoAt20}
                            onValueChange={(value) => updateTestData("densityAt20SecondRhoAt20", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20SecondRhoAt20Corrected}
                            placeholder={initialTestData.densityAt20SecondRhoAt20Corrected}
                            onValueChange={(value) => updateTestData("densityAt20SecondRhoAt20Corrected", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20Repeatability}
                            placeholder={initialTestData.densityAt20Repeatability}
                            onValueChange={(value) => updateTestData("densityAt20Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.densityAt20Average}
                            placeholder={initialTestData.densityAt20Average}
                            onValueChange={(value) => updateTestData("densityAt20Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>4.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.kinematicViscosity100TestName}
                  placeholder={initialTestData.kinematicViscosity100TestName}
                  onValueChange={(value) => updateTestData("kinematicViscosity100TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentViscometer}
                  placeholder={initialTestData.kinematicViscosity100EquipmentViscometer}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentViscometer", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentThermostat}
                  placeholder={initialTestData.kinematicViscosity100EquipmentThermostat}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentThermostat", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity100EquipmentStopwatch}
                  placeholder={initialTestData.kinematicViscosity100EquipmentStopwatch}
                  onValueChange={(value) => updateTestData("kinematicViscosity100EquipmentStopwatch", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th colSpan={7}>Первое измерение</th>
                        <th colSpan={7}>Второе измерение</th>
                        <th colSpan={2}>Результаты</th>
                      </tr>
                      <tr>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₁, мм²/с</th>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₂, мм²/с</th>
                        <th>Повторяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение νср, мм²/с</th>
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
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity100FirstViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstDeterminability}
                            placeholder={initialTestData.kinematicViscosity100FirstDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstTAverage}
                            placeholder={initialTestData.kinematicViscosity100FirstTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100FirstV1}
                            placeholder={initialTestData.kinematicViscosity100FirstV1}
                            onValueChange={(value) => updateTestData("kinematicViscosity100FirstV1", value)}
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
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity100SecondViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondDeterminability}
                            placeholder={initialTestData.kinematicViscosity100SecondDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondTAverage}
                            placeholder={initialTestData.kinematicViscosity100SecondTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100SecondV2}
                            placeholder={initialTestData.kinematicViscosity100SecondV2}
                            onValueChange={(value) => updateTestData("kinematicViscosity100SecondV2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100Repeatability}
                            placeholder={initialTestData.kinematicViscosity100Repeatability}
                            onValueChange={(value) => updateTestData("kinematicViscosity100Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity100Average}
                            placeholder={initialTestData.kinematicViscosity100Average}
                            onValueChange={(value) => updateTestData("kinematicViscosity100Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>5.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.kinematicViscosity40TestName}
                  placeholder={initialTestData.kinematicViscosity40TestName}
                  onValueChange={(value) => updateTestData("kinematicViscosity40TestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity40EquipmentViscometer}
                  placeholder={initialTestData.kinematicViscosity40EquipmentViscometer}
                  onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentViscometer", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity40EquipmentThermostat}
                  placeholder={initialTestData.kinematicViscosity40EquipmentThermostat}
                  onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentThermostat", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.kinematicViscosity40EquipmentStopwatch}
                  placeholder={initialTestData.kinematicViscosity40EquipmentStopwatch}
                  onValueChange={(value) => updateTestData("kinematicViscosity40EquipmentStopwatch", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th colSpan={7}>Первое измерение</th>
                        <th colSpan={7}>Второе измерение</th>
                        <th colSpan={2}>Результаты</th>
                      </tr>
                      <tr>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₁, мм²/с</th>
                        <th>Время истечения t₁, с</th>
                        <th>Время истечения t₂, с</th>
                        <th>Номер вискозиметра</th>
                        <th>Постоянная вискозиметра</th>
                        <th>Определяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение tср, с</th>
                        <th>Кинематическая вязкость ν₂, мм²/с</th>
                        <th>Повторяемость d, % (компаундированные масла)</th>
                        <th>Среднее значение νср, мм²/с</th>
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
                            onValueChange={(value) => updateTestData("kinematicViscosity40FirstViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40FirstViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity40FirstViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity40FirstViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40FirstDeterminability}
                            placeholder={initialTestData.kinematicViscosity40FirstDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity40FirstDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40FirstTAverage}
                            placeholder={initialTestData.kinematicViscosity40FirstTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity40FirstTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40FirstV1}
                            placeholder={initialTestData.kinematicViscosity40FirstV1}
                            onValueChange={(value) => updateTestData("kinematicViscosity40FirstV1", value)}
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
                            onValueChange={(value) => updateTestData("kinematicViscosity40SecondViscometerNumber", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40SecondViscometerConstant}
                            placeholder={initialTestData.kinematicViscosity40SecondViscometerConstant}
                            onValueChange={(value) => updateTestData("kinematicViscosity40SecondViscometerConstant", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40SecondDeterminability}
                            placeholder={initialTestData.kinematicViscosity40SecondDeterminability}
                            onValueChange={(value) => updateTestData("kinematicViscosity40SecondDeterminability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40SecondTAverage}
                            placeholder={initialTestData.kinematicViscosity40SecondTAverage}
                            onValueChange={(value) => updateTestData("kinematicViscosity40SecondTAverage", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40SecondV2}
                            placeholder={initialTestData.kinematicViscosity40SecondV2}
                            onValueChange={(value) => updateTestData("kinematicViscosity40SecondV2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40Repeatability}
                            placeholder={initialTestData.kinematicViscosity40Repeatability}
                            onValueChange={(value) => updateTestData("kinematicViscosity40Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.kinematicViscosity40Average}
                            placeholder={initialTestData.kinematicViscosity40Average}
                            onValueChange={(value) => updateTestData("kinematicViscosity40Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>6.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.viscosityIndexTestName}
                  placeholder={initialTestData.viscosityIndexTestName}
                  onValueChange={(value) => updateTestData("viscosityIndexTestName", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th>ν₁₀₀</th>
                        <th>ν₄₀</th>
                        <th>ИВ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexV100}
                            placeholder={initialTestData.viscosityIndexV100}
                            onValueChange={(value) => updateTestData("viscosityIndexV100", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexV40}
                            placeholder={initialTestData.viscosityIndexV40}
                            onValueChange={(value) => updateTestData("viscosityIndexV40", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexIV}
                            placeholder={initialTestData.viscosityIndexIV}
                            onValueChange={(value) => updateTestData("viscosityIndexIV", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>7.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.pourPointTestName}
                  placeholder={initialTestData.pourPointTestName}
                  onValueChange={(value) => updateTestData("pourPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.pourPointEquipment}
                  placeholder={initialTestData.pourPointEquipment}
                  onValueChange={(value) => updateTestData("pourPointEquipment", value)}
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
                        <th>t₁, °C</th>
                        <th>t₂, °C</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение tср, °C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointFirstT1}
                            placeholder={initialTestData.pourPointFirstT1}
                            onValueChange={(value) => updateTestData("pourPointFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointSecondT2}
                            placeholder={initialTestData.pourPointSecondT2}
                            onValueChange={(value) => updateTestData("pourPointSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointRepeatability}
                            placeholder={initialTestData.pourPointRepeatability}
                            onValueChange={(value) => updateTestData("pourPointRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.pourPointAverage}
                            placeholder={initialTestData.pourPointAverage}
                            onValueChange={(value) => updateTestData("pourPointAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>8.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.freezingPointTestName}
                  placeholder={initialTestData.freezingPointTestName}
                  onValueChange={(value) => updateTestData("freezingPointTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.freezingPointEquipment}
                  placeholder={initialTestData.freezingPointEquipment}
                  onValueChange={(value) => updateTestData("freezingPointEquipment", value)}
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
                        <th>t₁, °C</th>
                        <th>t₂, °C</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение tср, °C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointFirstT1}
                            placeholder={initialTestData.freezingPointFirstT1}
                            onValueChange={(value) => updateTestData("freezingPointFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointSecondT2}
                            placeholder={initialTestData.freezingPointSecondT2}
                            onValueChange={(value) => updateTestData("freezingPointSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointRepeatability}
                            placeholder={initialTestData.freezingPointRepeatability}
                            onValueChange={(value) => updateTestData("freezingPointRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.freezingPointAverage}
                            placeholder={initialTestData.freezingPointAverage}
                            onValueChange={(value) => updateTestData("freezingPointAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>9.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.noackLossTestName}
                  placeholder={initialTestData.noackLossTestName}
                  onValueChange={(value) => updateTestData("noackLossTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.noackLossEquipmentBalance}
                  placeholder={initialTestData.noackLossEquipmentBalance}
                  onValueChange={(value) => updateTestData("noackLossEquipmentBalance", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.noackLossEquipmentApparatus}
                  placeholder={initialTestData.noackLossEquipmentApparatus}
                  onValueChange={(value) => updateTestData("noackLossEquipmentApparatus", value)}
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
                        <th>Масса пустого тигля A, г</th>
                        <th>Масса тигля с образцом B, г</th>
                        <th>Масса тигля с образцом после нагревания 1 ч C, г</th>
                        <th>Потери от испарения, %</th>
                        <th>Масса пустого тигля A, г</th>
                        <th>Масса тигля с образцом B, г</th>
                        <th>Масса тигля с образцом после нагревания 1 ч C, г</th>
                        <th>Потери от испарения, %</th>
                        <th>Повторяемость r, %</th>
                        <th>Среднее значение Xср, %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleA}
                            placeholder={initialTestData.noackLossFirstCrucibleA}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleA", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleB}
                            placeholder={initialTestData.noackLossFirstCrucibleB}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleB", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstCrucibleC}
                            placeholder={initialTestData.noackLossFirstCrucibleC}
                            onValueChange={(value) => updateTestData("noackLossFirstCrucibleC", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossFirstEvaporationLoss}
                            placeholder={initialTestData.noackLossFirstEvaporationLoss}
                            onValueChange={(value) => updateTestData("noackLossFirstEvaporationLoss", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleA}
                            placeholder={initialTestData.noackLossSecondCrucibleA}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleA", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleB}
                            placeholder={initialTestData.noackLossSecondCrucibleB}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleB", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondCrucibleC}
                            placeholder={initialTestData.noackLossSecondCrucibleC}
                            onValueChange={(value) => updateTestData("noackLossSecondCrucibleC", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossSecondEvaporationLoss}
                            placeholder={initialTestData.noackLossSecondEvaporationLoss}
                            onValueChange={(value) => updateTestData("noackLossSecondEvaporationLoss", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossRepeatability}
                            placeholder={initialTestData.noackLossRepeatability}
                            onValueChange={(value) => updateTestData("noackLossRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.noackLossAverage}
                            placeholder={initialTestData.noackLossAverage}
                            onValueChange={(value) => updateTestData("noackLossAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>10.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.dynamicViscosity30TestName}
                  placeholder={initialTestData.dynamicViscosity30TestName}
                  onValueChange={(value) => updateTestData("dynamicViscosity30TestName", value)}
                />
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
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30Repeatability}
                            placeholder={initialTestData.dynamicViscosity30Repeatability}
                            onValueChange={(value) => updateTestData("dynamicViscosity30Repeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.dynamicViscosity30Average}
                            placeholder={initialTestData.dynamicViscosity30Average}
                            onValueChange={(value) => updateTestData("dynamicViscosity30Average", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>11.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.colorCntTestName}
                  placeholder={initialTestData.colorCntTestName}
                  onValueChange={(value) => updateTestData("colorCntTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.colorCntEquipment}
                  placeholder={initialTestData.colorCntEquipment}
                  onValueChange={(value) => updateTestData("colorCntEquipment", value)}
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
                        <th>X₁, ед. ЦНТ</th>
                        <th>X₂, ед. ЦНТ</th>
                        <th>Повторяемость X, ед. ЦНТ</th>
                        <th>Среднее значение Xср</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntFirstX1}
                            placeholder={initialTestData.colorCntFirstX1}
                            onValueChange={(value) => updateTestData("colorCntFirstX1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntSecondX2}
                            placeholder={initialTestData.colorCntSecondX2}
                            onValueChange={(value) => updateTestData("colorCntSecondX2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntRepeatability}
                            placeholder={initialTestData.colorCntRepeatability}
                            onValueChange={(value) => updateTestData("colorCntRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntAverage}
                            placeholder={initialTestData.colorCntAverage}
                            onValueChange={(value) => updateTestData("colorCntAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>12.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.baseNumberTestName}
                  placeholder={initialTestData.baseNumberTestName}
                  onValueChange={(value) => updateTestData("baseNumberTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.baseNumberEquipment}
                  placeholder={initialTestData.baseNumberEquipment}
                  onValueChange={(value) => updateTestData("baseNumberEquipment", value)}
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
                        <th>Масса образца m, г</th>
                        <th>Концентрация титранта C₀₁, моль/л</th>
                        <th>Объем титранта V, мл</th>
                        <th>Щелочное число, мг·KOH/г</th>
                        <th>Масса образца m, г</th>
                        <th>Концентрация титранта C₀₁, моль/л</th>
                        <th>Объем титранта V, мл</th>
                        <th>Щелочное число, мг·KOH/г</th>
                        <th>Повторяемость r, мг·KOH/г</th>
                        <th>Среднее значение X, мг·KOH/г</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstSampleMass}
                            placeholder={initialTestData.baseNumberFirstSampleMass}
                            onValueChange={(value) => updateTestData("baseNumberFirstSampleMass", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstTitrantConcentration}
                            placeholder={initialTestData.baseNumberFirstTitrantConcentration}
                            onValueChange={(value) => updateTestData("baseNumberFirstTitrantConcentration", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstTitrantVolume}
                            placeholder={initialTestData.baseNumberFirstTitrantVolume}
                            onValueChange={(value) => updateTestData("baseNumberFirstTitrantVolume", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberFirstValue}
                            placeholder={initialTestData.baseNumberFirstValue}
                            onValueChange={(value) => updateTestData("baseNumberFirstValue", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondSampleMass}
                            placeholder={initialTestData.baseNumberSecondSampleMass}
                            onValueChange={(value) => updateTestData("baseNumberSecondSampleMass", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondTitrantConcentration}
                            placeholder={initialTestData.baseNumberSecondTitrantConcentration}
                            onValueChange={(value) => updateTestData("baseNumberSecondTitrantConcentration", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondTitrantVolume}
                            placeholder={initialTestData.baseNumberSecondTitrantVolume}
                            onValueChange={(value) => updateTestData("baseNumberSecondTitrantVolume", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberSecondValue}
                            placeholder={initialTestData.baseNumberSecondValue}
                            onValueChange={(value) => updateTestData("baseNumberSecondValue", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberRepeatability}
                            placeholder={initialTestData.baseNumberRepeatability}
                            onValueChange={(value) => updateTestData("baseNumberRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.baseNumberAverage}
                            placeholder={initialTestData.baseNumberAverage}
                            onValueChange={(value) => updateTestData("baseNumberAverage", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>13.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.autoIgnitionTestName}
                  placeholder={initialTestData.autoIgnitionTestName}
                  onValueChange={(value) => updateTestData("autoIgnitionTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentDevice}
                  placeholder={initialTestData.autoIgnitionEquipmentDevice}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentDevice", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentStopwatch}
                  placeholder={initialTestData.autoIgnitionEquipmentStopwatch}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentStopwatch", value)}
                />
                <Input
                  className={styles.fullWidthInput}
                  value={formData.autoIgnitionEquipmentBalance}
                  placeholder={initialTestData.autoIgnitionEquipmentBalance}
                  onValueChange={(value) => updateTestData("autoIgnitionEquipmentBalance", value)}
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
                        <th>t₁, °C</th>
                        <th>Навеска образца m₁, г</th>
                        <th>Период индукции самовоспламенения t₁, с</th>
                        <th>t₂, °C</th>
                        <th>Навеска образца m₂, г</th>
                        <th>Период индукции самовоспламенения t₂, с</th>
                        <th>Повторяемость r, °C</th>
                        <th>Среднее значение tср, °C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstT1}
                            placeholder={initialTestData.autoIgnitionFirstT1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstM1}
                            placeholder={initialTestData.autoIgnitionFirstM1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstM1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionFirstInductionT1}
                            placeholder={initialTestData.autoIgnitionFirstInductionT1}
                            onValueChange={(value) => updateTestData("autoIgnitionFirstInductionT1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondT2}
                            placeholder={initialTestData.autoIgnitionSecondT2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondM2}
                            placeholder={initialTestData.autoIgnitionSecondM2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondM2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionSecondInductionT2}
                            placeholder={initialTestData.autoIgnitionSecondInductionT2}
                            onValueChange={(value) => updateTestData("autoIgnitionSecondInductionT2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionRepeatability}
                            placeholder={initialTestData.autoIgnitionRepeatability}
                            onValueChange={(value) => updateTestData("autoIgnitionRepeatability", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.autoIgnitionAverage}
                            placeholder={initialTestData.autoIgnitionAverage}
                            onValueChange={(value) => updateTestData("autoIgnitionAverage", value)}
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
