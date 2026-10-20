import { create } from "zustand"

const DEFAULT_PRECISION_NAME = "Компаундированные масла при 40 °С и 100 °С"

type KinematicViscosity100Results = {
  /** Среднее значение νср, мм²/с — для UI, неопределённости и экспорта. */
  average: string
  /** Среднее время истечения tср первого измерения, с — C17 для неопределённости. */
  firstTAverage: string
  /** Выбранная прецизионность — H8/H9 для неопределённости. */
  precisionName: string
}

type KinematicViscosity100Store = KinematicViscosity100Results & {
  setResults: (results: KinematicViscosity100Results) => void
  clearStore: () => void
}

const initialState: KinematicViscosity100Results = {
  average: "",
  firstTAverage: "",
  precisionName: DEFAULT_PRECISION_NAME,
}

export const useKinematicViscosity100Store = create<KinematicViscosity100Store>((set) => ({
  ...initialState,
  setResults: (results) => set(results),
  clearStore: () => set(initialState),
}))

export { DEFAULT_PRECISION_NAME as DEFAULT_KINEMATIC_VISCOSITY_PRECISION_NAME }
