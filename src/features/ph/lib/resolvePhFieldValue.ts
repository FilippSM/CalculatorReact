const REPEATABILITY_LIMIT = 0.1

type PhFormSlice = {
  phFirstPh: string
  phSecondPh: string
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
    return `${formattedDifference} > r=0,1 (Error)`
  }

  return formattedDifference
}

/** Resolves stored ph table fields from live calculated values. */
export const resolvePhFieldValue = <T extends PhFormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "phAverage") {
    return calculateAverage(formData.phFirstPh, formData.phSecondPh)
  }

  if (field === "phRepeatability") {
    return calculateRepeatability(formData.phFirstPh, formData.phSecondPh)
  }

  return formData[field]
}

export const calculatePhRepeatability = (
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
      value: `${formattedDifference} > r=0,1 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}
