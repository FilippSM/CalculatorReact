import { useThemeStore } from "@/app/store"
import { Button } from "@/shared/components/Button"
import clsx from "clsx"
import { useState } from "react"
import { initialVisibleTests, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import { initialTestData } from "../model/initialTestData"
import { buildProtocolDocument } from "../model/protocolDocument"
import { CalcXProtocolMetaSection } from "./CalcXProtocolMetaSection"
import { CalcXProtocolPrintView } from "./CalcXProtocolPrintView"
import { CalcXTestFilters } from "./CalcXTestFilters"
import { CalcXTestsSection } from "./CalcXTestsSection"
import styles from "./CalcXProtocol.module.scss"

export const CalcXProtocol = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)
  const [visibleTests, setVisibleTests] = useState(initialVisibleTests)
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null)
  const formData = { ...initialTestData, ...testData }

  const updateTestData = (field: keyof typeof initialTestData, value: string) => {
    setTestData((current) => ({
      ...initialTestData,
      ...current,
      [field]: value,
    }))
  }

  const updateVisibleTest = (testId: TestVisibilityKey, checked: boolean) => {
    setVisibleTests((current) => ({
      ...current,
      [testId]: checked,
    }))
  }

  const exportPdf = async () => {
    setExporting("pdf")

    try {
      const { exportProtocolPdf } = await import("../lib/exportProtocolPdf")
      exportProtocolPdf(buildProtocolDocument(formData, visibleTests))
    } finally {
      setExporting(null)
    }
  }

  const exportDocx = async () => {
    setExporting("docx")

    try {
      const { exportProtocolDocx } = await import("../lib/exportProtocolDocx")
      await exportProtocolDocx(buildProtocolDocument(formData, visibleTests))
    } finally {
      setExporting(null)
    }
  }

  return (
    <>
      <div className={styles.toolbar}>
        <Button variant="outlined" themeMode={theme} type="button" onClick={() => window.print()}>
          Печать
        </Button>
        <Button
          className={styles.exportButton}
          variant="outlined"
          themeMode={theme}
          type="button"
          disabled={exporting !== null}
          aria-busy={exporting === "pdf"}
          aria-label="Скачать PDF"
          onClick={exportPdf}
        >
          <span className={clsx(exporting === "pdf" && styles.hiddenButtonLabel)}>Скачать PDF</span>
          {exporting === "pdf" && <span className={styles.buttonSpinner} aria-hidden="true" />}
        </Button>
        <Button
          className={styles.exportButton}
          variant="outlined"
          themeMode={theme}
          type="button"
          disabled={exporting !== null}
          aria-busy={exporting === "docx"}
          aria-label="Скачать Word"
          onClick={exportDocx}
        >
          <span className={clsx(exporting === "docx" && styles.hiddenButtonLabel)}>Скачать Word</span>
          {exporting === "docx" && <span className={styles.buttonSpinner} aria-hidden="true" />}
        </Button>
      </div>

      <div className={styles.screenOnly}>
        <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
          <CalcXTestFilters visibleTests={visibleTests} onChangeVisibleTest={updateVisibleTest} />
        </section>

        <CalcXProtocolMetaSection formData={formData} updateTestData={updateTestData} theme={theme} />

        <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
          <CalcXTestsSection formData={formData} visibleTests={visibleTests} updateTestData={updateTestData} />
        </section>
      </div>

      <CalcXProtocolPrintView formData={formData} visibleTests={visibleTests} />
    </>
  )
}
