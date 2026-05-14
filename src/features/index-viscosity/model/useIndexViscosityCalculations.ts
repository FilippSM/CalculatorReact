import { useMemo } from "react"
import {
  calculateEntityViscosityIndexFromGroups,
  calculateViscosityIndexForStrings,
} from "../lib/viscositycalculateIV"
import type { IndexViscosityGroup } from "./indexViscosityStore"

export const useIndexViscosityCalculations = (groups: IndexViscosityGroup[]) => {
  const calcIVForGroup = (v100: string, v40: string) => calculateViscosityIndexForStrings(v100, v40)

  const entityIV = useMemo(() => calculateEntityViscosityIndexFromGroups(groups), [groups])

  return { calcIVForGroup, entityIV }
}
