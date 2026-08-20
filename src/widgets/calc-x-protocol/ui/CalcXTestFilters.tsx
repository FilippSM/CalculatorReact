import { Checkbox } from "@/shared/components/Checkbox"
import styles from "./CalcXProtocol.module.scss"
import { testVisibilityConfig, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"

type Props = {
  visibleTests: Record<TestVisibilityKey, boolean>
  onChangeVisibleTest: (testId: TestVisibilityKey, checked: boolean) => void
}

export const CalcXTestFilters = ({ visibleTests, onChangeVisibleTest }: Props) => {
  return (
    <div className={styles.section}>
      <h2>Показатели</h2>
      <div className={styles.testFilters}>
        {testVisibilityConfig.map(({ id, label }) => (
          <Checkbox
            key={id}
            checked={visibleTests[id]}
            className={styles.testFilterItem}
            label={label}
            onValueChange={(checked) => onChangeVisibleTest(id, checked)}
          />
        ))}
      </div>
    </div>
  )
}
