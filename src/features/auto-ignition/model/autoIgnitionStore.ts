import { create } from "zustand"

type AutoIgnitionStore = {
  /** Среднее значение tср — единый источник для UI, неопределённости и экспорта. */
  average: string
  setAverage: (value: string) => void
  clearStore: () => void
}

export const useAutoIgnitionStore = create<AutoIgnitionStore>((set) => ({
  average: "",
  setAverage: (value) => set({ average: value }),
  clearStore: () => set({ average: "" }),
}))
