import { create } from "zustand"

type CrystallizationStartStore = {
  /** Среднее значение tн.к. — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useCrystallizationStartStore = create<CrystallizationStartStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
