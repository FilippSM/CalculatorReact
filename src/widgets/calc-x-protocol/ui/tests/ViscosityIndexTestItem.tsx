import { calculateViscosityIndexForStrings } from "@/features/index-viscosity/lib/viscositycalculateIV"
import { useKinematicViscosityCalculations } from "@/features/viscosity"
import { Input } from "@/shared/components/Input"
import styles from "../CalcXProtocol.module.scss"
import { initialTestData, type InitialTestData } from "../../model/initialTestData"

type Props = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const defaultPrecisionName = "Компаундированные масла при 40 °С и 100 °С"

export const ViscosityIndexTestItem = ({ number, formData, updateTestData }: Props) => {
  const { average: viscosityIndexV100 } = useKinematicViscosityCalculations({
    firstT1: formData.kinematicViscosity100FirstT1,
    firstT2: formData.kinematicViscosity100FirstT2,
    secondT1: formData.kinematicViscosity100SecondT1,
    secondT2: formData.kinematicViscosity100SecondT2,
    firstConstant: formData.kinematicViscosity100FirstViscometerConstant,
    secondConstant: formData.kinematicViscosity100SecondViscometerConstant,
    precisionName: defaultPrecisionName,
  })

  const { average: viscosityIndexV40 } = useKinematicViscosityCalculations({
    firstT1: formData.kinematicViscosity40FirstT1,
    firstT2: formData.kinematicViscosity40FirstT2,
    secondT1: formData.kinematicViscosity40SecondT1,
    secondT2: formData.kinematicViscosity40SecondT2,
    firstConstant: formData.kinematicViscosity40FirstViscometerConstant,
    secondConstant: formData.kinematicViscosity40SecondViscometerConstant,
    precisionName: defaultPrecisionName,
  })

  const calculatedIV = calculateViscosityIndexForStrings(viscosityIndexV100, viscosityIndexV40)
  const viscosityIndexIV = calculatedIV === null ? "" : String(calculatedIV)

  return (
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
                    value={viscosityIndexV100}
                    placeholder={initialTestData.viscosityIndexV100}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={viscosityIndexV40}
                    placeholder={initialTestData.viscosityIndexV40}
                    readOnly
                  />
                </td>
                <td>
                  <Input
                    className={styles.tableInput}
                    value={viscosityIndexIV}
                    placeholder={initialTestData.viscosityIndexIV}
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
