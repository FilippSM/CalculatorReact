import styles from "./CalcXProtocol.module.scss"
import { testVisibilityConfig, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import { type InitialTestData } from "../model/initialTestData"
import { AutoIgnitionTestItem } from "./tests/AutoIgnitionTestItem"
import { BaseNumberTestItem } from "./tests/BaseNumberTestItem"
import { ColorCntTestItem } from "./tests/ColorCntTestItem"
import { DensityAt20TestItem } from "./tests/DensityAt20TestItem"
import { DynamicViscosity30TestItem } from "./tests/DynamicViscosity30TestItem"
import { FlashPointTestItem } from "./tests/FlashPointTestItem"
import { FreezingPointTestItem } from "./tests/FreezingPointTestItem"
import { KinematicViscosity100TestItem } from "./tests/KinematicViscosity100TestItem"
import { KinematicViscosity40TestItem } from "./tests/KinematicViscosity40TestItem"
import { MechanicalImpuritiesTestItem } from "./tests/MechanicalImpuritiesTestItem"
import { NoackLossTestItem } from "./tests/NoackLossTestItem"
import { PourPointTestItem } from "./tests/PourPointTestItem"
import { ViscosityIndexTestItem } from "./tests/ViscosityIndexTestItem"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

export const CalcXTestsSection = ({ formData, visibleTests, updateTestData }: Props) => {
  const visibleTestNumbers = testVisibilityConfig.reduce<Partial<Record<TestVisibilityKey, number>>>(
    (accumulator, { id }) => {
      if (visibleTests[id]) {
        accumulator[id] = Object.keys(accumulator).length + 1
      }

      return accumulator
    },
    {},
  )

  return (
    <div className={styles.section}>
      <h2>Испытания</h2>

      {visibleTests.flashPoint && visibleTestNumbers.flashPoint !== undefined && (
        <FlashPointTestItem
          number={visibleTestNumbers.flashPoint}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.mechanicalImpurities && visibleTestNumbers.mechanicalImpurities !== undefined && (
        <MechanicalImpuritiesTestItem
          number={visibleTestNumbers.mechanicalImpurities}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.densityAt20 && visibleTestNumbers.densityAt20 !== undefined && (
        <DensityAt20TestItem
          number={visibleTestNumbers.densityAt20}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.kinematicViscosity100 && visibleTestNumbers.kinematicViscosity100 !== undefined && (
        <KinematicViscosity100TestItem
          number={visibleTestNumbers.kinematicViscosity100}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.kinematicViscosity40 && visibleTestNumbers.kinematicViscosity40 !== undefined && (
        <KinematicViscosity40TestItem
          number={visibleTestNumbers.kinematicViscosity40}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.viscosityIndex && visibleTestNumbers.viscosityIndex !== undefined && (
        <ViscosityIndexTestItem
          number={visibleTestNumbers.viscosityIndex}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.pourPoint && visibleTestNumbers.pourPoint !== undefined && (
        <PourPointTestItem
          number={visibleTestNumbers.pourPoint}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.freezingPoint && visibleTestNumbers.freezingPoint !== undefined && (
        <FreezingPointTestItem
          number={visibleTestNumbers.freezingPoint}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.noackLoss && visibleTestNumbers.noackLoss !== undefined && (
        <NoackLossTestItem
          number={visibleTestNumbers.noackLoss}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.dynamicViscosity30 && visibleTestNumbers.dynamicViscosity30 !== undefined && (
        <DynamicViscosity30TestItem
          number={visibleTestNumbers.dynamicViscosity30}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.colorCnt && visibleTestNumbers.colorCnt !== undefined && (
        <ColorCntTestItem
          number={visibleTestNumbers.colorCnt}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.baseNumber && visibleTestNumbers.baseNumber !== undefined && (
        <BaseNumberTestItem
          number={visibleTestNumbers.baseNumber}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}

      {visibleTests.autoIgnition && visibleTestNumbers.autoIgnition !== undefined && (
        <AutoIgnitionTestItem
          number={visibleTestNumbers.autoIgnition}
          formData={formData}
          updateTestData={updateTestData}
        />
      )}
    </div>
  )
}
