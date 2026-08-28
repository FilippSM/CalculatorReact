export const formatDensityValue = (value: number, unit: string): string => {
  const formatted = unit === "кг/м³" ? value.toFixed(1) : value.toFixed(4)
  return formatted.replace(".", ",")
}
