import { protocolTestsTitle } from "../model/calcXProtocolConfig"
import { getVisibleProtocolTests } from "../model/calcXTestConfig"
import type { TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocol.module.scss"
import { CalcXTestItem } from "./tests/CalcXTestItem"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const CalcXTestsSection = ({ formData, visibleTests, updateTestData }: Props) => {
  const visibleProtocolTests = getVisibleProtocolTests(visibleTests)

  return (
    <div className={styles.section}>
      <h2>{protocolTestsTitle}</h2>

      {visibleProtocolTests.map((test, index) => (
        <CalcXTestItem
          key={test.id}
          number={index + 1}
          test={test}
          formData={formData}
          updateTestData={updateTestData}
        />
      ))}
    </div>
  )
}
