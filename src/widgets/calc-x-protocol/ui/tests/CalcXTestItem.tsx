import { Input } from "@/shared/components/Input"
import {
  protocolDataTitle,
  protocolEquipmentTitle,
  protocolTestNameLabel,
} from "../../model/calcXProtocolConfig"
import type { CalcXTestConfig } from "../../model/calcXTestConfig"
import type { InitialTestData } from "../../model/initialTestData"
import styles from "../CalcXProtocol.module.scss"

type Props = {
  number: number
  test: CalcXTestConfig
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const CalcXTestItem = ({ number, test, formData, updateTestData }: Props) => (
  <div className={styles.testItem}>
    <div className={styles.testTitleRow}>
      <span className={styles.testNumber}>{number}.</span>
      <Input
        label={protocolTestNameLabel}
        className={styles.testNameInput}
        value={formData[test.nameField]}
        onValueChange={(value) => updateTestData(test.nameField, value)}
      />
    </div>

    {test.equipmentFields.length > 0 && (
      <div className={styles.equipmentBlock}>
        <h3>{protocolEquipmentTitle}</h3>
        {test.equipmentFields.map((field) => (
          <Input
            key={field}
            className={styles.fullWidthInput}
            value={formData[field]}
            onValueChange={(value) => updateTestData(field, value)}
          />
        ))}
      </div>
    )}

    <div className={styles.tableSection}>
      <h3>{protocolDataTitle}</h3>
      <div className={styles.tableScroll}>
        <table className={styles.testTable}>
          <thead>
            {test.groupHeaders && (
              <tr>
                {test.groupHeaders.map((group, groupIndex) => (
                  <th key={`${test.id}-group-${groupIndex}`} colSpan={group.colSpan}>
                    {group.label}
                  </th>
                ))}
              </tr>
            )}
            <tr>
              {test.columnHeaders.map((header, headerIndex) => (
                <th key={`${test.id}-column-${headerIndex}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {test.valueFields.map((field) => (
                <td key={field}>
                  <Input
                    className={styles.tableInput}
                    value={formData[field]}
                    onValueChange={(value) => updateTestData(field, value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
