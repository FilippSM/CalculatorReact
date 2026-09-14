import { useColorCntCalculations } from "@/features/color-cnt"
import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import styles from "../CalcXProtocol.module.scss"
import { calcXTestConfig } from "../../model/calcXTestConfig"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const TEST_ID = "colorCnt"
const testConfig = calcXTestConfig.find((t) => t.id === TEST_ID)!

export const ColorCntTestItem = ({ number, formData, updateTestData }: Props) => {
  const { average, repeatability } = useColorCntCalculations({
    firstX1: formData.colorCntFirstX1,
    secondX2: formData.colorCntSecondX2,
  })

  return (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.colorCntTestName}
                  placeholder={initialTestData.colorCntTestName}
                  onValueChange={(value) => updateTestData("colorCntTestName", value)}
                />
              </div>

              <div className={styles.equipmentBlock}>
                <h3>Оборудование:</h3>
                <Input
                  className={styles.fullWidthInput}
                  value={formData.colorCntEquipment}
                  placeholder={initialTestData.colorCntEquipment}
                  onValueChange={(value) => updateTestData("colorCntEquipment", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        {testConfig.groupHeaders?.map((group, index) => (
                          <th key={index} colSpan={group.colSpan}>
                            {group.label}
                          </th>
                        ))}
                      </tr>
                      <tr>
                        {testConfig.columnHeaders.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntFirstX1}
                            placeholder={initialTestData.colorCntFirstX1}
                            onValueChange={(value) => updateTestData("colorCntFirstX1", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.colorCntSecondX2}
                            placeholder={initialTestData.colorCntSecondX2}
                            onValueChange={(value) => updateTestData("colorCntSecondX2", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={clsx(styles.tableInput, repeatability.isError && styles.tableInputError)}
                            value={repeatability.value}
                            placeholder={initialTestData.colorCntRepeatability}
                            readOnly
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={average}
                            placeholder={initialTestData.colorCntAverage}
                            readOnly
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  )
}
