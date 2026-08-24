import { Fragment } from "react"
import {
  protocolDataTitle,
  protocolDocumentTitle,
  protocolEquipmentTitle,
  protocolMetaSections,
  protocolTestsTitle,
} from "../model/calcXProtocolConfig"
import { getVisibleProtocolTests } from "../model/calcXTestConfig"
import type { TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocolPrintView.module.scss"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
}

export const CalcXProtocolPrintView = ({ formData, visibleTests }: Props) => {
  const visibleProtocolTests = getVisibleProtocolTests(visibleTests)

  return (
    <div className={styles.printRoot}>
      <h1 className={styles.documentTitle}>{protocolDocumentTitle}</h1>

      <section className={styles.metaSection}>
        {protocolMetaSections.map((section, sectionIndex) => {
          if (section.layout === "row") {
            return (
              <div key={section.title ?? `print-meta-${sectionIndex}`}>
                {section.title && <h2 className={styles.sectionTitle}>{section.title}</h2>}
                <div className={styles.paramsRow}>
                  {section.fields.map((fieldConfig) => (
                    <span key={fieldConfig.field}>
                      {fieldConfig.label}: {formData[fieldConfig.field]}
                    </span>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div key={section.title ?? `print-meta-${sectionIndex}`}>
              {section.title && <h2 className={styles.sectionTitle}>{section.title}</h2>}
              <dl className={styles.metaGrid}>
                {section.fields.map((fieldConfig) => (
                  <Fragment key={fieldConfig.field}>
                    <dt>{fieldConfig.label}</dt>
                    <dd>{formData[fieldConfig.field]}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          )
        })}
      </section>

      <section className={styles.testsSection}>
        <h2 className={styles.sectionTitle}>{protocolTestsTitle}</h2>

        {visibleProtocolTests.map((test, index) => {
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
                  <p className={styles.dataTitle}>{protocolEquipmentTitle}</p>
                  <ul className={styles.equipmentList}>
                    {equipmentValues.map((value, equipmentIndex) => (
                      <li key={`${test.id}-equipment-${equipmentIndex}`}>{value}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className={styles.dataTitle}>{protocolDataTitle}</p>
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
