import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import type { Content, TableCell, TDocumentDefinitions } from "pdfmake/interfaces"
import type { ProtocolDocument } from "../model/protocolDocument"

pdfMake.addVirtualFileSystem(pdfFonts)

const safeFileName = (value: string) => value.replace(/[<>:"/\\|?*]/gu, "_")

const metaLine = (label: string, value: string): Content => ({
  columns: [
    { text: `${label}:`, bold: true, width: "auto" },
    { text: value, width: "*" },
  ],
  columnGap: 4,
  margin: [0, 0, 0, 3],
})

const headerCell = (text: string): TableCell => ({
  text,
  bold: true,
  alignment: "center",
  margin: [2, 4, 2, 4],
})

const bodyCell = (text: string, alignment: "left" | "center" = "left"): TableCell => ({
  text,
  alignment,
  margin: [2, 3, 2, 3],
})

export const exportProtocolPdf = (data: ProtocolDocument) => {
  const equipmentBody: TableCell[][] = [
    [
      headerCell("№ п/п"),
      headerCell("Наименование и тип (марка) испытательного оборудования и средств измерения"),
      headerCell("Номер свидетельства о поверке/аттестации/калибровке и срок действия"),
      headerCell("Инвентарный (заводской) номер"),
    ],
    ...data.equipment.map((item, index) => [
      bodyCell(`${index + 1}.`, "center"),
      bodyCell(item.name),
      bodyCell(item.certificate),
      bodyCell(item.inventoryNumber, "center"),
    ]),
  ]

  const resultsBody: TableCell[][] = [
    [
      headerCell("№ п/п"),
      headerCell("Наименование показателя, единицы измерения"),
      headerCell("ТНПА на метод испытаний"),
      headerCell("Результаты испытаний"),
      headerCell("Расширенная неопределённость k=2, P=95%"),
    ],
    ...data.results.map((item, index) => [
      bodyCell(`${index + 1}.`, "center"),
      bodyCell(item.name),
      bodyCell(item.method, "center"),
      bodyCell(item.result, "center"),
      bodyCell(item.uncertainty, "center"),
    ]),
  ]

  const definition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [48, 42, 48, 52],
    defaultStyle: {
      font: "Roboto",
      fontSize: 9,
      lineHeight: 1.12,
    },
    footer: (currentPage, pageCount) => ({
      columns: [
        { text: "НИЛ ООО «Евразия Лубрикант»", alignment: "left" },
        { text: `Лист ${currentPage} из ${pageCount}`, alignment: "right" },
      ],
      fontSize: 7,
      margin: [48, 10, 48, 0],
    }),
    content: [
      {
        columns: [
          { text: "", width: "*" },
          {
            width: 215,
            stack: [
              { text: "УТВЕРЖДАЮ", bold: true, margin: [0, 0, 0, 5] },
              { text: "Заведующий НИЛ", margin: [0, 0, 0, 14] },
              { text: "________________  Ф.А. Самсонов", margin: [0, 0, 0, 12] },
              { text: `«____» __________________ ${data.approvalDate.slice(-4)} г.` },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
      { text: "ПРОТОКОЛ ИСПЫТАНИЙ", style: "documentTitle" },
      {
        text: `№ ${data.protocolNumber} от ${data.protocolDate}`,
        alignment: "center",
        margin: [0, 0, 0, 15],
      },
      metaLine("Наименование заказчика", data.customerName),
      metaLine("Адрес заказчика", data.customerAddress),
      metaLine("Наименование продукции", data.productName),
      metaLine("Вид испытаний", data.testType),
      metaLine("ТНПА, устанавливающий требования к испытываемой продукции", data.requirementsDocument),
      metaLine("Дата проведения испытаний (начало-окончание)", data.testPeriod),
      metaLine("Акт отбора проб", data.samplingAct),
      metaLine("Регистрационный номер пробы", data.sampleRegistrationNumber),
      metaLine("Номер пробы из акта отбора проб", data.sampleNumber),
      metaLine("Организация, производившая отбор проб", data.samplingOrganization),
      metaLine("ТНПА, устанавливающий требования к отбору проб", data.samplingMethod),
      metaLine("Количество пробы", data.sampleQuantity),
      metaLine("Дата получения пробы", data.sampleReceivedAt),
      {
        text: "Испытательное оборудование и средства измерений, применяемые при проведении испытаний",
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, 5],
      },
      {
        table: {
          headerRows: 1,
          widths: [28, "*", 155, 75],
          body: equipmentBody,
        },
      },
      {
        text: `Протокол испытаний № ${data.protocolNumber}`,
        pageBreak: "before",
        margin: [0, 0, 0, 10],
      },
      { text: "Условия проведения испытаний:", bold: true, margin: [0, 0, 0, 5] },
      { text: data.conditions, margin: [0, 0, 0, 10] },
      { text: "Результаты испытаний", bold: true, margin: [0, 0, 0, 6] },
      {
        table: {
          headerRows: 1,
          widths: [25, "*", 90, 70, 90],
          body: resultsBody,
        },
        margin: [0, 0, 0, 12],
      },
      { text: "Испытания провёл:", bold: true, margin: [0, 0, 0, 8] },
      { text: "Заведующий НИЛ  __________________  Самсонов Ф.А.", margin: [0, 0, 0, 12] },
      { text: "Результаты испытаний распространяются только на испытанные пробы.", margin: [0, 0, 0, 12] },
      { text: "Протокол проверил:", bold: true, margin: [0, 0, 0, 8] },
      { text: "Заведующий НИЛ  __________________  Самсонов Ф.А.", margin: [0, 0, 0, 12] },
      { text: "Данный протокол оформлен в 2-х экземплярах и направлен:", margin: [0, 0, 0, 6] },
      { text: "1. Научно-исследовательская лаборатория ООО «Евразия Лубрикант»;" },
      { text: `2. ${data.customerName}`, margin: [0, 0, 0, 16] },
      {
        text: "Протокол испытаний не должен быть воспроизведён не в полном объёме без разрешения заведующего НИЛ.",
        margin: [0, 0, 0, 5],
      },
      { text: "Конец протокола испытаний." },
    ],
    styles: {
      documentTitle: {
        fontSize: 13,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 4],
      },
    },
  }

  pdfMake.createPdf(definition).download(safeFileName(`Протокол_${data.protocolNumber}.pdf`))
}
