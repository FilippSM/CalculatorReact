import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import type { ProtocolDocument } from "../model/protocolDocument"

const templateNames = ["calc-x-protocol.docx", "calc-x-protocol.docx.docx"]

const loadTemplate = async () => {
  for (const templateName of templateNames) {
    const response = await fetch(`${import.meta.env.BASE_URL}templates/${templateName}`)

    if (response.ok) {
      const template = await response.arrayBuffer()
      const signature = new Uint8Array(template, 0, 2)

      if (signature[0] === 0x50 && signature[1] === 0x4b) {
        return template
      }
    }
  }

  throw new Error("Шаблон протокола Word не найден в public/templates")
}

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const safeFileName = (value: string) => value.replace(/[<>:"/\\|?*]/gu, "_")

export const exportProtocolDocx = async (data: ProtocolDocument) => {
  const template = await loadTemplate()
  const zip = new PizZip(template)
  const document = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  })

  document.render({
    ...data,
    equipment: data.equipment.map((item, index) => ({
      ...item,
      number: index + 1,
    })),
    results: data.results.map((item, index) => ({
      ...item,
      number: index + 1,
    })),
  })

  downloadBlob(document.toBlob(), safeFileName(`Протокол_${data.protocolNumber}.docx`))
}
