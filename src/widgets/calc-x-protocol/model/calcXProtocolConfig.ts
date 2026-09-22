import type { InitialTestData } from "./initialTestData"

export type ProtocolFieldWidth = "default" | "wide" | "full"

export type ProtocolField = {
  field: keyof InitialTestData
  label: string
  width?: ProtocolFieldWidth
}

export type ProtocolFieldSection = {
  title?: string
  layout: "stack" | "row"
  fields: ProtocolField[]
}

export const protocolDocumentTitle = "Протокол испытаний"
export const protocolTestsTitle = "Испытания"
export const protocolTestNameLabel = "Наименование испытания"
export const protocolEquipmentTitle = "Оборудование:"
export const protocolDataTitle = "Данные:"

export const protocolMetaSections: ProtocolFieldSection[] = [
  {
    layout: "stack",
    fields: [
      { field: "testDate", label: "Дата испытаний" },
      { field: "customerName", label: "Наименование заказчика", width: "wide" },
      { field: "objectName", label: "Наименование объекта испытаний", width: "wide" },
      { field: "registrationNumber", label: "Регистрационный номер объекта испытаний" },
    ],
  },
  {
    title: "Условия проведения испытаний",
    layout: "stack",
    fields: [{ field: "equipment", label: "Применяемое оборудование", width: "wide" }],
  },
  {
    title: "Параметры",
    layout: "row",
    fields: [
      { field: "temperature", label: "t, °C" },
      { field: "pressure", label: "p, кПа" },
      { field: "humidity", label: "φ, %" },
    ],
  },
]
