const REPEATABILITY_LIMIT = 2

type CrystallizationStartFormSlice = {
  crystallizationStartFirstT: string
  crystallizationStartSecondT: string
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
    return `${formattedDifference} > r=2 (Error)`
  }

  return formattedDifference
}

/** Resolves stored crystallization-start table fields from live calculated values. */
export const resolveCrystallizationStartFieldValue = <T extends CrystallizationStartFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "crystallizationStartAverage") {
    return calculateAverage(formData.crystallizationStartFirstT, formData.crystallizationStartSecondT)
  }

  if (field === "crystallizationStartRepeatability") {
    return calculateRepeatability(formData.crystallizationStartFirstT, formData.crystallizationStartSecondT)
  }

  return formData[field]
}

export const calculateCrystallizationStartRepeatability = (
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
      value: `${formattedDifference} > r=2 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}
