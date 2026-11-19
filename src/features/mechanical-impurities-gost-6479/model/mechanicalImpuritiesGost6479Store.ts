import { create } from "zustand"

type MechanicalImpuritiesGost6479Results = {
  /** X₁, % — результат первого измерения. */
  firstX1: string
  /** X₂, % — результат второго измерения. */
  secondX2: string
  /** Среднее значение Xср, %. */
  average: string
  /** Текст повторяемости. */
  repeatabilityValue: string
  /** Признак превышения предела повторяемости. */
  repeatabilityIsError: boolean
}

type MechanicalImpuritiesGost6479Store = MechanicalImpuritiesGost6479Results & {
  setResults: (results: MechanicalImpuritiesGost6479Results) => void
  clearStore: () => void
}

const initialState: MechanicalImpuritiesGost6479Results = {
  firstX1: "",
  secondX2: "",
  average: "",
  repeatabilityValue: "",
  repeatabilityIsError: false,
}

export const useMechanicalImpuritiesGost6479Store = create<MechanicalImpuritiesGost6479Store>(
  (set) => ({
    ...initialState,
    setResults: (results) => set(results),
    clearStore: () => set(initialState),
  }),
)
