import { calcXPrintTestConfig } from "../model/calcXPrintTestConfig"
import type { TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocolPrintView.module.scss"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
}

export const CalcXProtocolPrintView = ({ formData, visibleTests }: Props) => {
  const visiblePrintTests = calcXPrintTestConfig.filter(({ id }) => visibleTests[id])

  return (
    <div className={styles.printRoot}>
      <h1 className={styles.documentTitle}>Протокол испытаний</h1>

      <section className={styles.metaSection}>
        <dl className={styles.metaGrid}>
          <dt>Дата испытаний</dt>
          <dd>{formData.testDate}</dd>
          <dt>Наименование заказчика</dt>
          <dd>{formData.customerName}</dd>
          <dt>Наименование объекта испытаний</dt>
          <dd>{formData.objectName}</dd>
          <dt>Регистрационный номер объекта испытаний</dt>
          <dd>{formData.registrationNumber}</dd>
        </dl>

        <h2 className={styles.sectionTitle}>Условия проведения испытаний</h2>
        <dl className={styles.metaGrid}>
          <dt>Применяемое оборудование</dt>
          <dd>{formData.equipment}</dd>
        </dl>

        <h2 className={styles.sectionTitle}>Параметры</h2>
        <div className={styles.paramsRow}>
          <span>t, °C: {formData.temperature}</span>
          <span>p, кПа: {formData.pressure}</span>
          <span>φ, %: {formData.humidity}</span>
        </div>
      </section>

      <section className={styles.testsSection}>
        <h2 className={styles.sectionTitle}>Испытания</h2>

        {visiblePrintTests.map((test, index) => {
          const equipmentValues = test.equipmentFields
            .map((field) => formData[field])
            .filter((value) => value.trim().length > 0)

          return (
            <article key={test.id} className={styles.testItem}>
              <h3 className={styles.testTitle}>
                {index + 1}. {formData[test.nameField]}
              </h3>

              {equipmentValues.length > 0 && (
                <>
                  <p className={styles.dataTitle}>Оборудование:</p>
                  <ul className={styles.equipmentList}>
                    {equipmentValues.map((value, equipmentIndex) => (
                      <li key={`${test.id}-equipment-${equipmentIndex}`}>{value}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className={styles.dataTitle}>Данные:</p>
              <table className={styles.testTable}>
                <thead>
                  {test.groupHeaders && (
                    <tr>
                      {test.groupHeaders.map((group, groupIndex) => (
                        <th key={`${test.id}-group-${groupIndex}`} colSpan={group.colSpan}>
                          {group.label}
                        </th>
                      ))}
                    </tr>
                  )}
                  <tr>
                    {test.columnHeaders.map((header, headerIndex) => (
                      <th key={`${test.id}-column-${headerIndex}`}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {test.valueFields.map((field) => (
                      <td key={field}>{formData[field]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </article>
          )
        })}
      </section>
    </div>
  )
}
