import { create } from "zustand"

type PourPointStore = {
  /** Среднее значение tср — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const usePourPointStore = create<PourPointStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
