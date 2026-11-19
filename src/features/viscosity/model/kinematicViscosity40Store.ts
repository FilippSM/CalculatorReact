import { create } from "zustand"
import { DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME } from "./kinematicViscosity100Store"

type KinematicViscosity40Results = {
  /** Среднее значение νср, мм²/с — для UI, индекса вязкости и экспорта. */
  average: string
  /** Среднее время истечения tср первого измерения, с. */
  firstTAverage: string
  /** Выбранная прецизионность. */
  precisionName: string
}

type KinematicViscosity40Store = KinematicViscosity40Results & {
  setResults: (results: KinematicViscosity40Results) => void
  clearStore: () => void
}

const initialState: KinematicViscosity40Results = {
  average: "",
  firstTAverage: "",
  precisionName: DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME,
}

export const useKinematicViscosity40Store = create<KinematicViscosity40Store>((set) => ({
  ...initialState,
  setResults: (results) => set(results),
  clearStore: () => set(initialState),
}))
