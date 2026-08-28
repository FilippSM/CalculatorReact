import { resolveDensityAt20FieldValue } from "@/features/density"
import { resolveMechanicalImpuritiesFieldValue } from "@/features/mechanical-impurities"
import { getVisibleProtocolTests } from "./calcXTestConfig"
import type { TestVisibilityKey } from "./calcXTestVisibilityConfig"
import type { InitialTestData } from "./initialTestData"

export type ProtocolEquipmentRow = {
  name: string
  certificate: string
  inventoryNumber: string
}

export type ProtocolResultRow = {
  name: string
  method: string
  result: string
  uncertainty: string
}

export type ProtocolDocument = {
  protocolNumber: string
  protocolDate: string
  approvalDate: string
  customerName: string
  customerAddress: string
  productName: string
  testType: string
  requirementsDocument: string
  testPeriod: string
  samplingAct: string
  sampleRegistrationNumber: string
  sampleNumber: string
  samplingOrganization: string
  samplingMethod: string
  sampleQuantity: string
  sampleReceivedAt: string
  conditions: string
  equipment: ProtocolEquipmentRow[]
  results: ProtocolResultRow[]
}

type ResultFieldMap = Record<TestVisibilityKey, keyof InitialTestData>

const resultFields: ResultFieldMap = {
  flashPoint: "averageCorrectedTemperature",
  mechanicalImpurities: "mechanicalImpuritiesAverage",
  densityAt20: "densityAt20Average",
  kinematicViscosity100: "kinematicViscosity100Average",
  kinematicViscosity40: "kinematicViscosity40Average",
  viscosityIndex: "viscosityIndexIV",
  waterContent: "waterContentAverage",
  pourPoint: "pourPointAverage",
  freezingPoint: "freezingPointAverage",
  noackLoss: "noackLossAverage",
  dynamicViscosity30: "dynamicViscosity30Average",
  colorCnt: "colorCntAverage",
  baseNumber: "baseNumberAverage",
  autoIgnition: "autoIgnitionAverage",
}

const splitTestName = (value: string) => {
  const methodIndex = value.toLocaleLowerCase("ru").lastIndexOf(" по гост")

  if (methodIndex === -1) {
    return { name: value, method: "—" }
  }

  return {
    name: value.slice(0, methodIndex).trim(),
    method: value.slice(methodIndex + 1).trim(),
  }
}

const extractInventoryNumber = (equipment: string) => {
  const match = equipment.match(/№\s*([^\s,;]+)/u)
  return match ? `№ ${match[1]}` : "—"
}

const formatLongDate = (date: string) => {
  const [day, month, year] = date.split(".").map(Number)
  const parsedDate = new Date(year, month - 1, day)

  if ([day, month, year].some(Number.isNaN) || Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(parsedDate)
    .replace(" г.", " года")
}

export const buildProtocolDocument = (
  formData: InitialTestData,
  visibleTests: Record<TestVisibilityKey, boolean>,
): ProtocolDocument => {
  const tests = getVisibleProtocolTests(visibleTests)
  const equipmentNames = [
    formData.equipment,
    ...tests.flatMap((test) => test.equipmentFields.map((field) => formData[field])),
  ].filter((value, index, values) => value.trim().length > 0 && values.indexOf(value) === index)

  return {
    protocolNumber: `${formData.registrationNumber}-П`,
    protocolDate: formatLongDate(formData.testDate),
    approvalDate: formData.testDate,
    customerName: formData.customerName,
    customerAddress: "Республика Беларусь",
    productName: formData.objectName,
    testType: "контрольные (по показателям без ссылки на ТНПА)",
    requirementsDocument: "—",
    testPeriod: formData.testDate,
    samplingAct: `№ 1 от ${formData.testDate}`,
    sampleRegistrationNumber: formData.registrationNumber,
    sampleNumber: "1",
    samplingOrganization: formData.customerName,
    samplingMethod: "ГОСТ 2517-2012",
    sampleQuantity: "2,0 дм³",
    sampleReceivedAt: formData.testDate,
    conditions: `Температура: ${formData.temperature} °C; давление: ${formData.pressure} кПа; относительная влажность: ${formData.humidity} %`,
    equipment: equipmentNames.map((name) => ({
      name,
      certificate: "Сведения о поверке/аттестации предоставляются лабораторией",
      inventoryNumber: extractInventoryNumber(name),
    })),
    results: tests.map((test) => {
      const { name, method } = splitTestName(formData[test.nameField])

      return {
        name,
        method,
        result:
          test.id === "mechanicalImpurities"
            ? resolveMechanicalImpuritiesFieldValue(formData, "mechanicalImpuritiesAverage")
            : test.id === "densityAt20"
              ? resolveDensityAt20FieldValue(formData, "densityAt20Average")
              : formData[resultFields[test.id]],
        uncertainty: "—",
      }
    }),
  }
}
