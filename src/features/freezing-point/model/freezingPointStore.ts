import { create } from "zustand"

type FreezingPointStore = {
  /** Среднее значение tср — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useFreezingPointStore = create<FreezingPointStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
