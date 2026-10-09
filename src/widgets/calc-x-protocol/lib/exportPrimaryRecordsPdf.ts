import { resolveDensityAt20FieldValue } from "@/features/density"
import { resolveDensityAt20Gost18995FieldValue } from "@/features/density-at-20-gost-18995"
import { resolvePhFieldValue } from "@/features/ph"
import { resolveCrystallizationStartFieldValue } from "@/features/crystallization-start"
import { resolveCrystallizationFieldValue } from "@/features/crystallization"
import { resolveBoilingPointFieldValue } from "@/features/boiling-point"
import { resolveFlashPointFieldValue } from "@/features/flash-point"
import { resolveMechanicalImpuritiesFieldValue } from "@/features/mechanical-impurities"
import { resolveMechanicalImpuritiesGost6479FieldValue } from "@/features/mechanical-impurities-gost-6479"
import { resolvePourPointFieldValue } from "@/features/pour-point"
import { resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { resolveNoackLossFieldValue } from "@/features/noack-loss"
import { resolveDynamicViscosity30FieldValue } from "@/features/dynamic-viscosity-30"
import { resolveColorCntFieldValue } from "@/features/color-cnt"
import { resolveBaseNumberFieldValue } from "@/features/base-number"
import { resolveAutoIgnitionFieldValue } from "@/features/auto-ignition"
import { resolveKinematicViscosityFieldValue } from "@/features/viscosity"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import type { Content, TableCell, TDocumentDefinitions } from "pdfmake/interfaces"
import {
  protocolDataTitle,
  protocolDocumentTitle,
  protocolEquipmentTitle,
  protocolMetaSections,
  protocolTestsTitle,
} from "../model/calcXProtocolConfig"
import {
  getPrintTableSections,
  getVisibleProtocolTests,
  type CalcXTestConfig,
} from "../model/calcXTestConfig"
import type { TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import { buildCalcXUncertaintyRows } from "../model/calcXUncertaintyRows"
import type { InitialTestData } from "../model/initialTestData"

pdfMake.addVirtualFileSystem(pdfFonts)

type ExportPrimaryRecordsPdfParams = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
  showUncertainty: boolean
}

const safeFileName = (value: string) => value.replace(/[<>:"/\\|?*]/gu, "_")

const headerCell = (text: string): TableCell => ({
  text,
  bold: true,
  alignment: "center",
  margin: [2, 3, 2, 3],
})

const bodyCell = (text: string, alignment: "left" | "center" = "center"): TableCell => ({
  text,
  alignment,
  margin: [2, 2, 2, 2],
})

const resolveTestFieldValue = (
  test: CalcXTestConfig,
  formData: InitialTestData,
  field: keyof InitialTestData,
) => {
  if (test.id === "flashPoint") return resolveFlashPointFieldValue(formData, field)
  if (test.id === "mechanicalImpurities") return resolveMechanicalImpuritiesFieldValue(formData, field)
  if (test.id === "mechanicalImpuritiesGost6479") {
    return resolveMechanicalImpuritiesGost6479FieldValue(formData, field)
  }
  if (test.id === "densityAt20") return resolveDensityAt20FieldValue(formData, field)
  if (test.id === "densityAt20Gost18995") return resolveDensityAt20Gost18995FieldValue(formData, field)
  if (test.id === "ph") return resolvePhFieldValue(formData, field)
  if (test.id === "crystallizationStart") return resolveCrystallizationStartFieldValue(formData, field)
  if (test.id === "crystallization") return resolveCrystallizationFieldValue(formData, field)
  if (test.id === "boilingPoint") return resolveBoilingPointFieldValue(formData, field)
  if (test.id === "kinematicViscosity100" || test.id === "kinematicViscosity40") {
    return resolveKinematicViscosityFieldValue(formData, field)
  }
  if (test.id === "pourPoint") return resolvePourPointFieldValue(formData, field)
  if (test.id === "freezingPoint") return resolveFreezingPointFieldValue(formData, field)
  if (test.id === "noackLoss") return resolveNoackLossFieldValue(formData, field)
  if (test.id === "dynamicViscosity30") return resolveDynamicViscosity30FieldValue(formData, field)
  if (test.id === "colorCnt") return resolveColorCntFieldValue(formData, field)
  if (test.id === "baseNumber") return resolveBaseNumberFieldValue(formData, field)
  if (test.id === "autoIgnition") return resolveAutoIgnitionFieldValue(formData, field)
  return formData[field]
}

const buildTestTables = (test: CalcXTestConfig, formData: InitialTestData): Content[] =>
  getPrintTableSections(test)
    .filter((section) => section.columnHeaders.length > 0)
    .map((section) => {
      const body: TableCell[][] = []

      if (section.groupHeaders) {
        body.push(
          section.groupHeaders.flatMap((group) => [
            {
              text: group.label,
              bold: true,
              alignment: "center",
              margin: [2, 3, 2, 3],
              colSpan: group.colSpan,
            },
            ...Array.from({ length: group.colSpan - 1 }, () => ({})),
          ]),
        )
      }

      body.push(section.columnHeaders.map(headerCell))
      body.push(
        section.valueFields.map((field) => bodyCell(String(resolveTestFieldValue(test, formData, field)))),
      )

      return {
        table: {
          headerRows: section.groupHeaders ? 2 : 1,
          dontBreakRows: true,
          keepWithHeaderRows: 1,
          widths: section.columnHeaders.map(() => "*"),
          body,
        },
        fontSize: section.columnHeaders.length > 10 ? 5 : 7,
        margin: [0, 0, 0, 6],
      }
    })

const corrosionMetals = [
  { key: "Copper", label: "Медь" },
  { key: "Solder", label: "Припой" },
  { key: "Brass", label: "Латунь" },
  { key: "Steel", label: "Сталь" },
  { key: "CastIron", label: "Чугун" },
  { key: "Aluminum", label: "Аллюминий" },
] as const

const buildCorrosionTables = (formData: InitialTestData): Content[] => {
  const measurementTables = (["First", "Second", "Third"] as const).flatMap<Content>((measurement) => [
    {
      text:
        measurement === "First"
          ? "Первое измерение"
          : measurement === "Second"
            ? "Второе измерение"
            : "Третье измерение",
      bold: true,
      margin: [0, 2, 0, 3],
    },
    {
      table: {
        headerRows: 1,
        dontBreakRows: true,
        keepWithHeaderRows: 1,
        widths: ["*", 36, 34, 34, 34, 40, 40, 32, 54],
        body: [
          [
            "Образец металла",
            "Время испытания, ч",
            "Длина l, мм",
            "Ширина a, мм",
            "Толщина b, мм",
            "Масса до m₁, г",
            "Масса после m₂, г",
            "Δ, г",
            "Скорость коррозии I, г/м²·сут",
          ].map(headerCell),
          ...corrosionMetals.map((metal) => [
            bodyCell(metal.label, "left"),
            bodyCell(formData[`corrosion${measurement}${metal.key}Time`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}Length`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}Width`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}Thickness`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}MassBefore`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}MassAfter`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}Delta`]),
            bodyCell(formData[`corrosion${measurement}${metal.key}Rate`]),
          ]),
        ],
      },
      fontSize: 6,
      margin: [0, 0, 0, 6],
    },
  ])

  return [
    ...measurementTables,
    { text: "Результаты", bold: true, margin: [0, 2, 0, 3] },
    {
      table: {
        headerRows: 1,
        dontBreakRows: true,
        keepWithHeaderRows: 1,
        widths: ["*", 90, 120, 120],
        body: [
          [
            "Образец металла",
            "Время испытания, ч",
            "Повторяемость, г/м²·сут",
            "Среднее значение I, г/м²·сут",
          ].map(headerCell),
          ...corrosionMetals.map((metal) => [
            bodyCell(metal.label, "left"),
            bodyCell(formData[`corrosionFirst${metal.key}Time`]),
            bodyCell(formData[`corrosionResults${metal.key}Repeatability`]),
            bodyCell(formData[`corrosionResults${metal.key}Average`]),
          ]),
        ],
      },
      fontSize: 7,
      margin: [0, 0, 0, 6],
    },
  ]
}

export const exportPrimaryRecordsPdf = ({
  formData,
  visibleTests,
  showUncertainty,
}: ExportPrimaryRecordsPdfParams) => {
  const visibleTestsConfig = getVisibleProtocolTests(visibleTests)
  const content: Content[] = [{ text: protocolDocumentTitle, style: "documentTitle" }]

  protocolMetaSections.forEach((section) => {
    if (section.title) {
      content.push({ text: section.title, style: "sectionTitle" })
    }

    if (section.layout === "row") {
      content.push({
        columns: section.fields.map(({ field, label }) => ({
          text: [{ text: `${label}: `, bold: true }, formData[field]],
        })),
        columnGap: 12,
        margin: [0, 0, 0, 6],
      })
      return
    }

    content.push({
      table: {
        dontBreakRows: true,
        widths: [190, "*"],
        body: section.fields.map(({ field, label }) => [
          { text: label, bold: true },
          { text: formData[field] },
        ]),
      },
      layout: "noBorders",
      margin: [0, 0, 0, 6],
    })
  })

  content.push({ text: protocolTestsTitle, style: "sectionTitle" })

  visibleTestsConfig.forEach((test, index) => {
    const equipment = test.equipmentFields.map((field) => formData[field]).filter((value) => value.trim())
    const testContent: Content[] = [
      {
        text: `${index + 1}. ${formData[test.nameField]}`,
        style: "testTitle",
      },
    ]

    if (equipment.length > 0) {
      testContent.push({ text: protocolEquipmentTitle, bold: true, margin: [0, 0, 0, 2] })
      testContent.push({ ul: equipment, margin: [10, 0, 0, 5] })
    }

    testContent.push({ text: protocolDataTitle, bold: true, margin: [0, 0, 0, 3] })
    testContent.push(...buildTestTables(test, formData))

    if (test.id === "corrosion") {
      testContent.push(...buildCorrosionTables(formData))
    }

    content.push({
      stack: testContent,
      unbreakable: test.id !== "corrosion",
      margin: [0, index === 0 ? 0 : 8, 0, 4],
    })
  })

  if (showUncertainty) {
    const rows = buildCalcXUncertaintyRows(formData, visibleTests)
    content.push(
      { text: "Результаты испытаний", style: "sectionTitle" },
      { text: `${formData.objectName}:`, margin: [0, 0, 0, 5] },
      {
        table: {
          headerRows: 1,
          dontBreakRows: true,
          keepWithHeaderRows: 1,
          widths: [30, "*", 90, 110],
          body: [
            [
              "№ п/п",
              "Наименование показателя, единицы измерения, ТНПА на метод испытания",
              "Значение показателя",
              "Расширенная неопределённость",
            ].map(headerCell),
            ...rows.map((row, index) => [
              bodyCell(`${index + 1}.`),
              bodyCell(row.name, "left"),
              bodyCell(row.result),
              bodyCell(row.uncertainty),
            ]),
          ],
        },
        fontSize: 8,
      },
    )
  }

  const definition: TDocumentDefinitions = {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [36, 55, 36, 38],
    defaultStyle: {
      font: "Roboto",
      fontSize: 8,
      lineHeight: 1.1,
    },
    header: {
      columns: [
        { text: "Приложение 35 РК-04-2024 Редакция 4 от 16.02.2024", alignment: "left" },
        { text: formData.registrationNumber, alignment: "right" },
      ],
      fontSize: 7,
      margin: [36, 20, 36, 0],
    },
    footer: (currentPage, pageCount) => ({
      text: `Лист ${currentPage} из ${pageCount}`,
      alignment: "left",
      fontSize: 7,
      margin: [36, 8, 36, 0],
    }),
    content,
    styles: {
      documentTitle: {
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      sectionTitle: {
        fontSize: 11,
        bold: true,
        margin: [0, 8, 0, 5],
      },
      testTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 5],
      },
    },
  }

  pdfMake
    .createPdf(definition)
    .download(safeFileName(`Первичные_записи_${formData.registrationNumber}.pdf`))
}
