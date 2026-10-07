import { create } from "zustand"

type FlashPointStore = {
  /** Среднее значение tср, °C — единый источник для UI, неопределённости и экспорта */
  averageCorrectedTemperature: string
  setAverageCorrectedTemperature: (value: string) => void
  clearStore: () => void
}

export const useFlashPointStore = create<FlashPointStore>((set) => ({
  averageCorrectedTemperature: "",
  setAverageCorrectedTemperature: (value) => set({ averageCorrectedTemperature: value }),
  clearStore: () => set({ averageCorrectedTemperature: "" }),
}))
