const REPEATABILITY_LIMIT = 0.001

type DensityAt20Gost18995FormSlice = {
  densityAt20Gost18995FirstRho: string
  densityAt20Gost18995SecondRho: string
} & Record<string, string>

const calculateAverage = (first: string, second: string): string => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return ""

  const average = (firstNum + secondNum) / 2
  return average.toFixed(3).replace(".", ",")
}

const calculateRepeatability = (first: string, second: string): string => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return ""

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 1000) / 1000
  const formattedDifference = roundedDifference.toFixed(3).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return `${formattedDifference} > r=0,001 (Error)`
  }

  return formattedDifference
}

/** Resolves stored density-at-20-gost-18995 table fields from live calculated values. */
export const resolveDensityAt20Gost18995FieldValue = <T extends DensityAt20Gost18995FormSlice>(
  formData: T,
  field: keyof T & string,
): string => {
  if (field === "densityAt20Gost18995Average") {
    return calculateAverage(formData.densityAt20Gost18995FirstRho, formData.densityAt20Gost18995SecondRho)
  }

  if (field === "densityAt20Gost18995Repeatability") {
    return calculateRepeatability(formData.densityAt20Gost18995FirstRho, formData.densityAt20Gost18995SecondRho)
  }

  return formData[field]
}

export const calculateDensityAt20Gost18995Repeatability = (
  first: string,
  second: string,
): { value: string; isError: boolean } => {
  const firstNum = parseFloat(first.replace(",", "."))
  const secondNum = parseFloat(second.replace(",", "."))

  if (isNaN(firstNum) || isNaN(secondNum)) return { value: "", isError: false }

  const difference = Math.abs(firstNum - secondNum)
  const roundedDifference = Math.round(difference * 1000) / 1000
  const formattedDifference = roundedDifference.toFixed(3).replace(".", ",")

  if (roundedDifference > REPEATABILITY_LIMIT) {
    return {
      value: `${formattedDifference} > r=0,001 (Error)`,
      isError: true,
    }
  }

  return { value: formattedDifference, isError: false }
}
