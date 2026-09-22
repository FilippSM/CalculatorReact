import { buildCalcXUncertaintyRows } from "../model/calcXUncertaintyRows"
import type { TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocol.module.scss"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
}

export const CalcXUncertaintySection = ({ formData, visibleTests }: Props) => {
  const rows = buildCalcXUncertaintyRows(formData, visibleTests)

  return (
    <div className={styles.section}>
      <h2>Результаты испытаний</h2>
      <p className={styles.uncertaintyObjectName}>{formData.objectName}:</p>

      <div className={styles.tableScroll}>
        <table className={styles.uncertaintyTable}>
          <thead>
            <tr>
              <th>№ п/п</th>
              <th>Наименование показателя, единицы измерения, ТНПА на метод испытания</th>
              <th>Значение показателя</th>
              <th>Расширенная неопределённость</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}.</td>
                <td>{row.name}</td>
                <td>{row.result}</td>
                <td>{row.uncertainty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
