import clsx from "clsx"
import { Checkbox } from "@/shared/components/Checkbox"
import styles from "./CalcXProtocol.module.scss"
import { testVisibilityConfig, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"

type Props = {
  visibleTests: Record<TestVisibilityKey, boolean>
  onChangeVisibleTest: (testId: TestVisibilityKey, checked: boolean) => void
}

export const CalcXTestFilters = ({ visibleTests, onChangeVisibleTest }: Props) => {
  let activeIndex = 0

  return (
    <div className={styles.section}>
      <h2>Показатели</h2>
      <div className={styles.testFilters}>
        {testVisibilityConfig.map(({ id, label }) => {
          const isActive = visibleTests[id]
          const number = isActive ? ++activeIndex : null

          return (
            <Checkbox
              key={id}
              checked={isActive}
              className={clsx(styles.testFilterItem, !isActive && styles.testFilterItemInactive)}
              label={number !== null ? `${number}. ${label}` : label}
              onValueChange={(checked) => onChangeVisibleTest(id, checked)}
            />
          )
        })}
      </div>
    </div>
  )
}
