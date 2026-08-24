export const testVisibilityConfig = [
  { id: "flashPoint", label: "Температура вспышки в открытом тигле, °C по ГОСТ 4333" },
  { id: "mechanicalImpurities", label: "Содержание механических примесей, % по ГОСТ 6370" },
  { id: "densityAt20", label: "Плотность при 20°С, кг/м³ по ГОСТ 3900" },
  { id: "kinematicViscosity100", label: "Кинематическая вязкость при 100°C, мм²/с по ГОСТ 33" },
  { id: "kinematicViscosity40", label: "Кинематическая вязкость при 40°С, мм²/с по ГОСТ 33" },
  { id: "viscosityIndex", label: "Индекс вязкости по ГОСТ 25371" },
  { id: "waterContent", label: "Содержание воды, % по ГОСТ 2477" },
  { id: "pourPoint", label: "Температура текучести,°С по ГОСТ 20287 (Метод А)" },
  { id: "freezingPoint", label: "Температура застывания,°С по ГОСТ 20287 (Метод Б)" },
  { id: "noackLoss", label: "Потери от испарения методом Ноак, % по ГОСТ 32330" },
  { id: "dynamicViscosity30", label: "Вязкость динамическая, при -30°С макс., мПа · с по ГОСТ 33111-2014" },
  { id: "colorCnt", label: "Цвет, ед. ЦНТ по ГОСТ 20284" },
  { id: "baseNumber", label: "Щелочное число, мг·KOH/г по ГОСТ 11362" },
  { id: "autoIgnition", label: "Температура самовоспламенения, °С по ГОСТ 12.1.044 п. 31" },
] as const

export type TestVisibilityKey = (typeof testVisibilityConfig)[number]["id"]

export const initialVisibleTests = testVisibilityConfig.reduce<Record<TestVisibilityKey, boolean>>(
  (accumulator, { id }) => ({
    ...accumulator,
    [id]: true,
  }),
  {} as Record<TestVisibilityKey, boolean>,
)

