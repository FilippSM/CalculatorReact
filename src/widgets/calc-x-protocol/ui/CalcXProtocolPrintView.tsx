import {
  calculateDensity,
  calculateDensityRepeatability,
  DENSITY_AT20_CORRECTION,
  DENSITY_AT20_UNIT,
  resolveDensityAt20FieldValue,
} from "@/features/density"
import { calculateFlashPointRepeatability, resolveFlashPointFieldValue } from "@/features/flash-point"
import {
  calculateMechanicalImpuritiesRepeatability,
  resolveMechanicalImpuritiesFieldValue,
} from "@/features/mechanical-impurities"
import { calculatePourPointRepeatability, resolvePourPointFieldValue } from "@/features/pour-point"
import { calculateFreezingPointRepeatability, resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { calculateNoackLossRepeatability, resolveNoackLossFieldValue } from "@/features/noack-loss"
import {
  calculateDynamicViscosity30Repeatability,
  resolveDynamicViscosity30FieldValue,
} from "@/features/dynamic-viscosity-30"
import {
  calculateColorCntRepeatability,
  resolveColorCntFieldValue,
} from "@/features/color-cnt"
import {
  calculateBaseNumberRepeatability,
  resolveBaseNumberFieldValue,
} from "@/features/base-number"
import {
  calculateAutoIgnitionRepeatability,
  resolveAutoIgnitionFieldValue,
} from "@/features/auto-ignition"
import { Fragment } from "react"
import clsx from "clsx"
import {
  protocolDataTitle,
  protocolDocumentTitle,
  protocolEquipmentTitle,
  protocolMetaSections,
  protocolTestsTitle,
} from "../model/calcXProtocolConfig"
import { getPrintTableSections, getVisibleProtocolTests } from "../model/calcXTestConfig"
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
          const tableSections = getPrintTableSections(test)

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
              <div className={styles.tableBlocks}>
                {tableSections.map((section, sectionIndex) => (
                  <table
                    key={`${test.id}-table-${sectionIndex}`}
                    className={clsx(styles.testTable, sectionIndex > 0 && styles.testTableResults)}
                  >
                    <thead>
                      {section.groupHeaders && (
                        <tr>
                          {section.groupHeaders.map((group, groupIndex) => (
                            <th key={`${test.id}-group-${sectionIndex}-${groupIndex}`} colSpan={group.colSpan}>
                              {group.label}
                            </th>
                          ))}
                        </tr>
                      )}
                      <tr>
                        {section.columnHeaders.map((header, headerIndex) => (
                          <th key={`${test.id}-column-${sectionIndex}-${headerIndex}`}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {section.valueFields.map((field) => {
                          const value =
                            test.id === "flashPoint"
                              ? resolveFlashPointFieldValue(formData, field)
                              : test.id === "mechanicalImpurities"
                                ? resolveMechanicalImpuritiesFieldValue(formData, field)
                                : test.id === "densityAt20"
                                  ? resolveDensityAt20FieldValue(formData, field)
                                  : test.id === "pourPoint"
                                    ? resolvePourPointFieldValue(formData, field)
                                    : test.id === "freezingPoint"
                                      ? resolveFreezingPointFieldValue(formData, field)
                                      : test.id === "noackLoss"
                                        ? resolveNoackLossFieldValue(formData, field)
                                        : test.id === "dynamicViscosity30"
                                          ? resolveDynamicViscosity30FieldValue(formData, field)
                                          : test.id === "colorCnt"
                                            ? resolveColorCntFieldValue(formData, field)
                                            : test.id === "baseNumber"
                                              ? resolveBaseNumberFieldValue(formData, field)
                                              : test.id === "autoIgnition"
                                                ? resolveAutoIgnitionFieldValue(formData, field)
                                                : formData[field]
                          const isRepeatabilityError =
                            (test.id === "flashPoint" &&
                              field === "repeatability" &&
                              calculateFlashPointRepeatability(
                                resolveFlashPointFieldValue(formData, "firstMeasurementCorrectedTemperature"),
                                resolveFlashPointFieldValue(formData, "secondMeasurementCorrectedTemperature"),
                              ).isError) ||
                            (test.id === "mechanicalImpurities" &&
                              field === "mechanicalImpuritiesRepeatability" &&
                              calculateMechanicalImpuritiesRepeatability(
                                resolveMechanicalImpuritiesFieldValue(formData, "mechanicalImpuritiesFirstX1"),
                                resolveMechanicalImpuritiesFieldValue(formData, "mechanicalImpuritiesSecondX2"),
                                resolveMechanicalImpuritiesFieldValue(formData, "mechanicalImpuritiesAverage"),
                              ).isError) ||
                            (test.id === "densityAt20" &&
                              field === "densityAt20Repeatability" &&
                              calculateDensityRepeatability(
                                calculateDensity(
                                  formData.densityAt20FirstRho,
                                  formData.densityAt20FirstT,
                                  DENSITY_AT20_UNIT,
                                  DENSITY_AT20_CORRECTION,
                                ),
                                calculateDensity(
                                  formData.densityAt20SecondRho,
                                  formData.densityAt20SecondT,
                                  DENSITY_AT20_UNIT,
                                  DENSITY_AT20_CORRECTION,
                                ),
                              ).isError) ||
                            (test.id === "pourPoint" &&
                              field === "pourPointRepeatability" &&
                              calculatePourPointRepeatability(formData.pourPointFirstT1, formData.pourPointSecondT2)
                                .isError) ||
                            (test.id === "freezingPoint" &&
                              field === "freezingPointRepeatability" &&
                              calculateFreezingPointRepeatability(
                                formData.freezingPointFirstT1,
                                formData.freezingPointSecondT2,
                              ).isError) ||
                            (test.id === "noackLoss" &&
                              field === "noackLossRepeatability" &&
                              calculateNoackLossRepeatability(
                                resolveNoackLossFieldValue(formData, "noackLossFirstEvaporationLoss"),
                                resolveNoackLossFieldValue(formData, "noackLossSecondEvaporationLoss"),
                              ).isError) ||
                            (test.id === "dynamicViscosity30" &&
                              field === "dynamicViscosity30Repeatability" &&
                              calculateDynamicViscosity30Repeatability(
                                formData.dynamicViscosity30FirstEta1,
                                formData.dynamicViscosity30SecondEta2,
                              ).isError) ||
                            (test.id === "colorCnt" &&
                              field === "colorCntRepeatability" &&
                              calculateColorCntRepeatability(
                                formData.colorCntFirstX1,
                                formData.colorCntSecondX2,
                              ).isError) ||
                            (test.id === "baseNumber" &&
                              field === "baseNumberRepeatability" &&
                              calculateBaseNumberRepeatability(
                                formData.baseNumberFirstValue,
                                formData.baseNumberSecondValue,
                              ).isError) ||
                            (test.id === "autoIgnition" &&
                              field === "autoIgnitionRepeatability" &&
                              calculateAutoIgnitionRepeatability(
                                formData.autoIgnitionFirstT1,
                                formData.autoIgnitionSecondT2,
                              ).isError)

                          return (
                            <td key={field} className={clsx(isRepeatabilityError && styles.errorValue)}>
                              {value}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
