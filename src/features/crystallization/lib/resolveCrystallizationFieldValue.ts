const REPEATABILITY_LIMIT = 0.2

type CrystallizationFormSlice = {
  crystallizationFirstT: string
  crystallizationSecondT: string
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
  const roundedDifference = Math.round(difference * 10) / 10
  const formattedDifference = roundedDifference.toFixed(1).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return `${formattedDifference} > r=0,2 (Error)`
  }

  return formattedDifference
}

/** Resolves stored crystallization table fields from live calculated values. */
export const resolveCrystallizationFieldValue = <T extends CrystallizationFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "crystallizationAverage") {
    return calculateAverage(formData.crystallizationFirstT, formData.crystallizationSecondT)
  }

  if (field === "crystallizationRepeatability") {
    return calculateRepeatability(formData.crystallizationFirstT, formData.crystallizationSecondT)
  }

  return formData[field]
}

export const calculateCrystallizationRepeatability = (
  first: string,
  second: string,
): { value: string; isError: boolean } => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return { value: "", isError: false }

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 10) / 10
  const formattedDifference = roundedDifference.toFixed(1).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=0,2 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}
