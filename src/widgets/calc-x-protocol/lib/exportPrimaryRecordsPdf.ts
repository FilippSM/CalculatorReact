import { resolveAutoIgnitionFieldValue } from "@/features/auto-ignition"
import { resolveBaseNumberFieldValue } from "@/features/base-number"
import { resolveBoilingPointFieldValue } from "@/features/boiling-point"
import { resolveColorCntFieldValue } from "@/features/color-cnt"
import { resolveCrystallizationFieldValue } from "@/features/crystallization"
import { resolveCrystallizationStartFieldValue } from "@/features/crystallization-start"
import { resolveDensityAt20FieldValue } from "@/features/density"
import { resolveDensityAt20Gost18995FieldValue } from "@/features/density-at-20-gost-18995"
import { resolveDynamicViscosity30FieldValue } from "@/features/dynamic-viscosity-30"
import { resolveFlashPointFieldValue } from "@/features/flash-point"
import { resolveFreezingPointFieldValue } from "@/features/freezing-point"
import { resolveMechanicalImpuritiesFieldValue } from "@/features/mechanical-impurities"
import { resolveMechanicalImpuritiesGost6479FieldValue } from "@/features/mechanical-impurities-gost-6479"
import { resolveNoackLossFieldValue } from "@/features/noack-loss"
import { resolvePhFieldValue } from "@/features/ph"
import { resolvePourPointFieldValue } from "@/features/pour-point"
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

const HEADER_LEFT = "Приложение 35 РК-04-2024 Редакция 4 от 16.02.2024"

const safeFileName = (value: string) => value.replace(/[<>:"/\\|?*]/gu, "_")

const headerCell = (text: string): TableCell => ({
  text,
  bold: true,
  alignment: "center",
  margin: [1, 2, 1, 2],
})

const bodyCell = (text: string, alignment: "left" | "center" = "center"): TableCell => ({
  text,
  alignment,
  margin: [1, 1, 1, 1],
})

const thinTableLayout = {
  hLineWidth: () => 0.5,
  vLineWidth: () => 0.5,
  hLineColor: () => "#000000",
  vLineColor: () => "#000000",
  paddingLeft: () => 1,
  paddingRight: () => 1,
  paddingTop: () => 1,
  paddingBottom: () => 1,
}

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
              colSpan: group.colSpan,
              margin: [1, 1, 1, 1],
            },
            ...Array.from({ length: group.colSpan - 1 }, () => ({})),
          ]),
        )
      }

      body.push(section.columnHeaders.map(headerCell))
      body.push(
        section.valueFields.map((field) =>
          bodyCell(String(resolveTestFieldValue(test, formData, field))),
        ),
      )

      return {
        table: {
          headerRows: section.groupHeaders ? 2 : 1,
          dontBreakRows: true,
          keepWithHeaderRows: 1,
          widths: section.columnHeaders.map(() => "*"),
          body,
        },
        layout: thinTableLayout,
        fontSize: section.columnHeaders.length >= 10 ? 5.2 : 6,
        lineHeight: 1,
        margin: [0, 0, 0, 5],
      }
    })

const corrosionMetals = [
  { key: "Copper", label: "Медь" },
  { key: "Solder", label: "Припой" },
  { key: "Brass", label: "Латунь" },
  { key: "Steel", label: "Сталь" },
  { key: "CastIron", label: "Чугун" },
  { key: "Aluminum", label: "Алюминий" },
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
      margin: [0, 2, 0, 2],
    },
    {
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: ["*", 38, 34, 34, 34, 42, 42, 32, 58],
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
      layout: thinTableLayout,
      fontSize: 5.2,
      margin: [0, 0, 0, 4],
    },
  ])

  return [
    ...measurementTables,
    { text: "Результаты", bold: true, margin: [0, 2, 0, 2] },
    {
      table: {
        headerRows: 1,
        dontBreakRows: true,
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
      layout: thinTableLayout,
      fontSize: 5.5,
    },
  ]
}

const buildTestBlock = (
  test: CalcXTestConfig,
  index: number,
  formData: InitialTestData,
): Content => {
  const equipment = test.equipmentFields
    .map((field) => formData[field])
    .filter((value) => value.trim().length > 0)
  const stack: Content[] = [
    {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 760, y2: 0, lineWidth: 0.5, lineColor: "#999999" }],
      margin: [0, 3, 0, 5],
    },
    {
      text: `${index + 1}. ${formData[test.nameField]}`,
      bold: true,
      fontSize: 8,
      margin: [0, 0, 0, 3],
    },
  ]

  if (equipment.length > 0) {
    stack.push(
      { text: protocolEquipmentTitle, bold: true, margin: [0, 0, 0, 1] },
      { ul: equipment, margin: [9, 0, 0, 3], fontSize: 6.5, lineHeight: 1 },
    )
  }

  stack.push(
    { text: protocolDataTitle, bold: true, margin: [0, 0, 0, 2] },
    ...buildTestTables(test, formData),
  )

  if (test.id === "corrosion") {
    stack.push(...buildCorrosionTables(formData))
  }

  return {
    stack,
    unbreakable: test.id !== "corrosion",
    margin: [0, 0, 0, 2],
  }
}

export const exportPrimaryRecordsPdf = ({
  formData,
  visibleTests,
  showUncertainty,
}: ExportPrimaryRecordsPdfParams) => {
  const content: Content[] = [{ text: protocolDocumentTitle, style: "documentTitle" }]

  protocolMetaSections.forEach((section) => {
    if (section.title) {
      content.push({ text: section.title, style: "sectionTitle" })
    }

    if (section.layout === "row") {
      content.push({
        text: section.fields.flatMap(({ field, label }, index) => [
          ...(index > 0 ? [{ text: "    " }] : []),
          { text: `${label}: `, bold: true },
          { text: formData[field] },
        ]),
        fontSize: 7.5,
        margin: [0, 0, 0, 3],
      })
      return
    }

    content.push({
      table: {
        widths: [170, "*"],
        body: section.fields.map(({ field, label }) => [
          { text: label, bold: true },
          { text: formData[field] },
        ]),
      },
      layout: "noBorders",
      fontSize: 7.5,
      margin: [0, 0, 0, 3],
    })
  })

  content.push({ text: protocolTestsTitle, style: "sectionTitle" })
  content.push(
    ...getVisibleProtocolTests(visibleTests).map((test, index) =>
      buildTestBlock(test, index, formData),
    ),
  )

  if (showUncertainty) {
    const rows = buildCalcXUncertaintyRows(formData, visibleTests)
    content.push({
      stack: [
        {
          canvas: [
            { type: "line", x1: 0, y1: 0, x2: 760, y2: 0, lineWidth: 0.5, lineColor: "#999999" },
          ],
          margin: [0, 5, 0, 7],
        },
        { text: "Результаты испытаний", style: "sectionTitle" },
        { text: `${formData.objectName}:`, margin: [0, 0, 0, 4] },
        {
          table: {
            headerRows: 1,
            dontBreakRows: true,
            widths: [28, "*", 94, 100],
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
          layout: thinTableLayout,
          fontSize: 6.5,
        },
      ],
      unbreakable: true,
    })
  }

  const definition: TDocumentDefinitions = {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [36, 42, 36, 34],
    defaultStyle: {
      font: "Roboto",
      fontSize: 7,
      lineHeight: 1.05,
    },
    header: {
      columns: [
        { text: HEADER_LEFT, alignment: "left" },
        { text: formData.registrationNumber, alignment: "right" },
      ],
      fontSize: 7,
      margin: [36, 18, 36, 0],
    },
    footer: (currentPage, pageCount) => ({
      text: `Лист ${currentPage} из ${pageCount}`,
      alignment: "left",
      fontSize: 7,
      margin: [36, 7, 36, 0],
    }),
    content,
    styles: {
      documentTitle: {
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 7],
      },
      sectionTitle: {
        fontSize: 9,
        bold: true,
        margin: [0, 4, 0, 3],
      },
    },
  }

  pdfMake
    .createPdf(definition)
    .download(safeFileName(`Первичные_записи_${formData.registrationNumber}.pdf`))
}
