import { create } from "zustand"

type CrystallizationStore = {
  /** Среднее значение tк.ср. — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useCrystallizationStore = create<CrystallizationStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
