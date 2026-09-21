import {
  calculateDensity,
  calculateDensityRepeatability,
  DENSITY_AT20_CORRECTION,
  DENSITY_AT20_UNIT,
  resolveDensityAt20FieldValue,
} from "@/features/density"
import {
  resolveDensityAt20Gost18995FieldValue,
  calculateDensityAt20Gost18995Repeatability,
} from "@/features/density-at-20-gost-18995"
import { resolvePhFieldValue, calculatePhRepeatability } from "@/features/ph"
import {
  resolveCrystallizationStartFieldValue,
  calculateCrystallizationStartRepeatability,
} from "@/features/crystallization-start"
import { resolveCrystallizationFieldValue, calculateCrystallizationRepeatability } from "@/features/crystallization"
import {
  resolveBoilingPointFieldValue,
  calculateBoilingPointRepeatability,
} from "@/features/boiling-point"
import { calculateFlashPointRepeatability, resolveFlashPointFieldValue } from "@/features/flash-point"
import {
  calculateMechanicalImpuritiesRepeatability,
  resolveMechanicalImpuritiesFieldValue,
} from "@/features/mechanical-impurities"
import {
  calculateMechanicalImpuritiesGost6479Repeatability,
  resolveMechanicalImpuritiesGost6479FieldValue,
} from "@/features/mechanical-impurities-gost-6479"
import { calculatePourPointRepeatability, resolvePourPointFieldValue } from "@/features/pour-point"
import { calculateFreezingPointRepeatability, resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { calculateNoackLossRepeatability, resolveNoackLossFieldValue } from "@/features/noack-loss"
import {
  calculateDynamicViscosity30Repeatability,
  resolveDynamicViscosity30FieldValue,
} from "@/features/dynamic-viscosity-30"
import { calculateColorCntRepeatability, resolveColorCntFieldValue } from "@/features/color-cnt"
import { calculateBaseNumberRepeatability, resolveBaseNumberFieldValue } from "@/features/base-number"
import { calculateAutoIgnitionRepeatability, resolveAutoIgnitionFieldValue } from "@/features/auto-ignition"
import { resolveKinematicViscosityFieldValue, calculateKinematicViscosityRepeatability } from "@/features/viscosity"
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
                                : test.id === "mechanicalImpuritiesGost6479"
                                  ? resolveMechanicalImpuritiesGost6479FieldValue(formData, field)
                                  : test.id === "densityAt20"
                                    ? resolveDensityAt20FieldValue(formData, field)
                                    : test.id === "densityAt20Gost18995"
                                      ? resolveDensityAt20Gost18995FieldValue(formData, field)
                                      : test.id === "ph"
                                        ? resolvePhFieldValue(formData, field)
                                        : test.id === "crystallizationStart"
                                          ? resolveCrystallizationStartFieldValue(formData, field)
                                          : test.id === "crystallization"
                                            ? resolveCrystallizationFieldValue(formData, field)
                                            : test.id === "boilingPoint"
                                              ? resolveBoilingPointFieldValue(formData, field)
                                              : test.id === "corrosion"
                                                ? formData[field]
                                              : test.id === "kinematicViscosity100" ||
                                                  test.id === "kinematicViscosity40"
                                                ? resolveKinematicViscosityFieldValue(formData, field)
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
                            (test.id === "mechanicalImpuritiesGost6479" &&
                              field === "mechanicalImpuritiesGost6479Repeatability" &&
                              calculateMechanicalImpuritiesGost6479Repeatability(
                                resolveMechanicalImpuritiesGost6479FieldValue(
                                  formData,
                                  "mechanicalImpuritiesGost6479FirstX1",
                                ),
                                resolveMechanicalImpuritiesGost6479FieldValue(
                                  formData,
                                  "mechanicalImpuritiesGost6479SecondX2",
                                ),
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
                            (test.id === "densityAt20Gost18995" &&
                              field === "densityAt20Gost18995Repeatability" &&
                              calculateDensityAt20Gost18995Repeatability(
                                formData.densityAt20Gost18995FirstRho,
                                formData.densityAt20Gost18995SecondRho,
                              ).isError) ||
                            (test.id === "ph" &&
                              field === "phRepeatability" &&
                              calculatePhRepeatability(formData.phFirstPh, formData.phSecondPh).isError) ||
                            (test.id === "crystallizationStart" &&
                              field === "crystallizationStartRepeatability" &&
                              calculateCrystallizationStartRepeatability(
                                formData.crystallizationStartFirstT,
                                formData.crystallizationStartSecondT,
                              ).isError) ||
                            (test.id === "crystallization" &&
                              field === "crystallizationRepeatability" &&
                              calculateCrystallizationRepeatability(
                                formData.crystallizationFirstT,
                                formData.crystallizationSecondT,
                              ).isError) ||
                            (test.id === "boilingPoint" &&
                              field === "boilingPointRepeatability" &&
                              calculateBoilingPointRepeatability(
                                formData.boilingPointFirstX0,
                                formData.boilingPointSecondX0,
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
                              calculateColorCntRepeatability(formData.colorCntFirstX1, formData.colorCntSecondX2)
                                .isError) ||
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
                              ).isError) ||
                            ((test.id === "kinematicViscosity100" || test.id === "kinematicViscosity40") &&
                              field === `${test.id}Repeatability` &&
                              calculateKinematicViscosityRepeatability(
                                resolveKinematicViscosityFieldValue(
                                  formData,
                                  `${test.id}FirstV1` as keyof typeof formData,
                                ),
                                resolveKinematicViscosityFieldValue(
                                  formData,
                                  `${test.id}SecondV2` as keyof typeof formData,
                                ),
                                resolveKinematicViscosityFieldValue(
                                  formData,
                                  `${test.id}Average` as keyof typeof formData,
                                ),
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

              {test.id === "corrosion" && (
                <>
                  {(["First", "Second", "Third"] as const).map((measurement) => (
                    <div key={measurement} className={styles.tableBlocks}>
                      <p className={styles.dataTitle}>
                        {measurement === "First"
                          ? "Первое измерение"
                          : measurement === "Second"
                            ? "Второе измерение"
                            : "Третье измерение"}
                      </p>
                      <table className={styles.testTable}>
                        <thead>
                          <tr>
                            <th>Образец металла</th>
                            <th>Время испытания, ч</th>
                            <th>Длина l, мм</th>
                            <th>Ширина a, мм</th>
                            <th>Толщина b, мм</th>
                            <th>Масса до m₁, г</th>
                            <th>Масса после m₂, г</th>
                            <th>Δ, г</th>
                            <th>Скорость коррозии I, г/м²·сут</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            [
                              { key: "Copper", label: "Медь" },
                              { key: "Solder", label: "Припой" },
                              { key: "Brass", label: "Латунь" },
                              { key: "Steel", label: "Сталь" },
                              { key: "CastIron", label: "Чугун" },
                              { key: "Aluminum", label: "Аллюминий" },
                            ] as const
                          ).map((metal) => (
                            <tr key={metal.key}>
                              <td>{metal.label}</td>
                              <td>
                                {formData[`corrosion${measurement}${metal.key}Time` as keyof typeof formData] as string}
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}Length` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}Width` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}Thickness` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}MassBefore` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}MassAfter` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {
                                  formData[
                                    `corrosion${measurement}${metal.key}Delta` as keyof typeof formData
                                  ] as string
                                }
                              </td>
                              <td>
                                {formData[`corrosion${measurement}${metal.key}Rate` as keyof typeof formData] as string}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                  <div className={styles.tableBlocks}>
                    <p className={styles.dataTitle}>Результаты</p>
                    <table className={styles.testTable}>
                      <thead>
                        <tr>
                          <th>Образец металла</th>
                          <th>Время испытания, ч</th>
                          <th>Повторяемость, г/м²·сут</th>
                          <th>Среднее значение I, г/м²·сут</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(
                          [
                            { key: "Copper", label: "Медь" },
                            { key: "Solder", label: "Припой" },
                            { key: "Brass", label: "Латунь" },
                            { key: "Steel", label: "Сталь" },
                            { key: "CastIron", label: "Чугун" },
                            { key: "Aluminum", label: "Аллюминий" },
                          ] as const
                        ).map((metal) => (
                          <tr key={metal.key}>
                            <td>{metal.label}</td>
                            <td>{formData[`corrosionFirst${metal.key}Time` as keyof typeof formData] as string}</td>
                            <td>
                              {formData[`corrosionResults${metal.key}Repeatability` as keyof typeof formData] as string}
                            </td>
                            <td>
                              {formData[`corrosionResults${metal.key}Average` as keyof typeof formData] as string}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
