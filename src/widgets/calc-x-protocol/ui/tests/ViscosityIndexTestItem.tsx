import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const ViscosityIndexTestItem = ({ number, formData, updateTestData }: Props) => (
            <div className={styles.testItem}>
              <div className={styles.testTitleRow}>
                <span className={styles.testNumber}>{number}.</span>
                <Input
                  label="Наименование испытания"
                  className={styles.testNameInput}
                  value={formData.viscosityIndexTestName}
                  placeholder={initialTestData.viscosityIndexTestName}
                  onValueChange={(value) => updateTestData("viscosityIndexTestName", value)}
                />
              </div>

              <div className={styles.tableSection}>
                <h3>Данные:</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.testTable}>
                    <thead>
                      <tr>
                        <th>ν₁₀₀</th>
                        <th>ν₄₀</th>
                        <th>ИВ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexV100}
                            placeholder={initialTestData.viscosityIndexV100}
                            onValueChange={(value) => updateTestData("viscosityIndexV100", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexV40}
                            placeholder={initialTestData.viscosityIndexV40}
                            onValueChange={(value) => updateTestData("viscosityIndexV40", value)}
                          />
                        </td>
                        <td>
                          <Input
                            className={styles.tableInput}
                            value={formData.viscosityIndexIV}
                            placeholder={initialTestData.viscosityIndexIV}
                            onValueChange={(value) => updateTestData("viscosityIndexIV", value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
)
