import { useThemeStore } from "@/app/store"
import { Button } from "@/shared/components/Button"
import clsx from "clsx"
import { useState } from "react"
import { initialVisibleTests, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import { initialTestData } from "../model/initialTestData"
import { CalcXProtocolMetaSection } from "./CalcXProtocolMetaSection"
import { CalcXProtocolPrintView } from "./CalcXProtocolPrintView"
import { CalcXTestFilters } from "./CalcXTestFilters"
import { CalcXTestsSection } from "./CalcXTestsSection"
import styles from "./CalcXProtocol.module.scss"

export const CalcXProtocol = () => {
  const theme = useThemeStore((state) => state.theme)
  const [testData, setTestData] = useState(initialTestData)
  const [visibleTests, setVisibleTests] = useState(initialVisibleTests)
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

  return (
    <>
      <div className={styles.toolbar}>
        <Button variant="outlined" themeMode={theme} type="button" onClick={() => window.print()}>
          Печать / PDF
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
