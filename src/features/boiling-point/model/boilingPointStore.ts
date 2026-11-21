import { create } from "zustand"

type BoilingPointStore = {
  /** Среднее значение tср — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useBoilingPointStore = create<BoilingPointStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
