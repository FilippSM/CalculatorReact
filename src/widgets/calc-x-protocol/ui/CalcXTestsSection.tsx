import type { ComponentType } from "react"
import { protocolTestsTitle } from "../model/calcXProtocolConfig"
import { getCalcXTestElementId } from "../model/calcXTestAnchor"
import { testVisibilityConfig, type TestVisibilityKey } from "../model/calcXTestVisibilityConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocol.module.scss"
import { AutoIgnitionTestItem } from "./tests/AutoIgnitionTestItem"
import { BaseNumberTestItem } from "./tests/BaseNumberTestItem"
import { BoilingPointTestItem } from "./tests/BoilingPointTestItem"
import { ColorCntTestItem } from "./tests/ColorCntTestItem"
import { CorrosionTestItem } from "./tests/CorrosionTestItem"
import { CrystallizationStartTestItem } from "./tests/CrystallizationStartTestItem"
import { CrystallizationTestItem } from "./tests/CrystallizationTestItem"
import { DensityAt20TestItem } from "./tests/DensityAt20TestItem"
import { DensityAt20Gost18995TestItem } from "./tests/DensityAt20Gost18995TestItem"
import { DynamicViscosity30TestItem } from "./tests/DynamicViscosity30TestItem"
import { FlashPointTestItem } from "./tests/FlashPointTestItem"
import { FreezingPointTestItem } from "./tests/FreezingPointTestItem"
import { KinematicViscosity100TestItem } from "./tests/KinematicViscosity100TestItem"
import { KinematicViscosity40TestItem } from "./tests/KinematicViscosity40TestItem"
import { MechanicalImpuritiesTestItem } from "./tests/MechanicalImpuritiesTestItem"
import { MechanicalImpuritiesGost6479TestItem } from "./tests/MechanicalImpuritiesGost6479TestItem"
import { NoackLossTestItem } from "./tests/NoackLossTestItem"
import { PhTestItem } from "./tests/PhTestItem"
import { PourPointTestItem } from "./tests/PourPointTestItem"
import { ViscosityIndexTestItem } from "./tests/ViscosityIndexTestItem"
import { WaterContentTestItem } from "./tests/WaterContentTestItem"

type Props = {
  formData: InitialTestData
  visibleTests: Record<TestVisibilityKey, boolean>
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

type TestItemProps = {
  number: number
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
}

const testItemComponents = {
  flashPoint: FlashPointTestItem,
  mechanicalImpurities: MechanicalImpuritiesTestItem,
  mechanicalImpuritiesGost6479: MechanicalImpuritiesGost6479TestItem,
  densityAt20: DensityAt20TestItem,
  densityAt20Gost18995: DensityAt20Gost18995TestItem,
  ph: PhTestItem,
  crystallizationStart: CrystallizationStartTestItem,
  crystallization: CrystallizationTestItem,
  boilingPoint: BoilingPointTestItem,
  corrosion: CorrosionTestItem,
  kinematicViscosity100: KinematicViscosity100TestItem,
  kinematicViscosity40: KinematicViscosity40TestItem,
  viscosityIndex: ViscosityIndexTestItem,
  waterContent: WaterContentTestItem,
  pourPoint: PourPointTestItem,
  freezingPoint: FreezingPointTestItem,
  noackLoss: NoackLossTestItem,
  dynamicViscosity30: DynamicViscosity30TestItem,
  colorCnt: ColorCntTestItem,
  baseNumber: BaseNumberTestItem,
  autoIgnition: AutoIgnitionTestItem,
} satisfies Record<TestVisibilityKey, ComponentType<TestItemProps>>

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
      <h2>{protocolTestsTitle}</h2>

      {testVisibilityConfig.map(({ id }) => {
        const number = visibleTestNumbers[id]
        if (!visibleTests[id] || number === undefined) return null

        const TestItem = testItemComponents[id]

        return (
          <div key={id} id={getCalcXTestElementId(id)}>
            <TestItem number={number} formData={formData} updateTestData={updateTestData} />
          </div>
        )
      })}
    </div>
  )
}
