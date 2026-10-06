import { create } from "zustand"

type MechanicalImpuritiesStore = {
  /** Среднее значение Xср, % — единый источник для UI, неопределённости и экспорта */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useMechanicalImpuritiesStore = create<MechanicalImpuritiesStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
