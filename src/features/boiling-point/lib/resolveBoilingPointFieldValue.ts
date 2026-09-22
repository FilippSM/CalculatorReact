const REPEATABILITY_LIMIT = 0.2

type BoilingPointFormSlice = {
  boilingPointFirstX0: string
  boilingPointSecondX0: string
} & Record<string, string>

const calculateAverage = (first: string, second: string): string => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return ""

  const average = (firstNum + secondNum) / 2
  return average.toFixed(1).replace(".", ",")
}

const calculateRepeatability = (first: string, second: string): string => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return ""

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 100) / 100
  const formattedDifference = roundedDifference.toFixed(2).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return `${formattedDifference} > r=0,2 (Error)`
  }

  return formattedDifference
}

/** Resolves stored boiling-point table fields from live calculated values. */
export const resolveBoilingPointFieldValue = <T extends BoilingPointFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "boilingPointAverage") {
    return calculateAverage(formData.boilingPointFirstX0, formData.boilingPointSecondX0)
  }

  if (field === "boilingPointRepeatability") {
    return calculateRepeatability(formData.boilingPointFirstX0, formData.boilingPointSecondX0)
  }

  return formData[field]
}

export const calculateBoilingPointRepeatability = (
  first: string,
  second: string,
): { value: string; isError: boolean } => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return { value: "", isError: false }

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 100) / 100
  const formattedDifference = roundedDifference.toFixed(2).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=0,2 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}

export const calculateBoilingPointAverage = calculateAverage
