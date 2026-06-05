// viscosity.ts

import { constansIV } from "../constans"

// замена , на .
export const normalizeNumber = (value: string): number => {
  if (!value || value.trim() === "") return NaN
  const normalized = value.replace(",", ".")
  const parsed = Number(normalized)
  return isNaN(parsed) ? NaN : parsed
}

// перевод времени в секунды
export const convertToSeconds = (timeString: string): number => {
  if (!timeString || timeString.trim() === "") return NaN
  
  const normalized = timeString.replace(",", ".")
  const parts = normalized.split(":")

  if (parts.length === 1) {
    const parsed = parseFloat(parts[0])
    return isNaN(parsed) ? NaN : parsed
  }

  const minutes = parseInt(parts[0])
  const seconds = parseInt(parts[1])
  const fraction = parts[2] ?? "0"
  const milliseconds = Number(fraction) / Math.pow(10, fraction.length)

  if (isNaN(minutes) || isNaN(seconds) || isNaN(milliseconds)) {
    return NaN
  }

  const result = minutes * 60 + seconds + milliseconds
  return isNaN(result) ? NaN : result
}

// округление IV
export const roundIV = (value: number): number => {
  if (isNaN(value) || !isFinite(value)) return 0
  
  let rounded = Number(value.toFixed(1))
  const temp = rounded * 10

  if (temp % 5 === 0) {
    const base = temp / 10
    return Math.floor(base) % 2 === 0
      ? Math.floor(base)
      : Math.ceil(base)
  }

  return Math.round(rounded)
}

// формула IV <= 100
const calcIV = (L: number, H: number, U: number) => {
  if (isNaN(L) || isNaN(H) || isNaN(U)) return 0
  if (L - H === 0) return 0
  return roundIV(((L - U) / (L - H)) * 100)
}

// формула IV > 100
const calcIVMore100 = (H: number, Y: number, U: number) => {
  if (isNaN(H) || isNaN(Y) || isNaN(U)) return 0
  if (Y <= 0 || H <= 0) return 0
  
  const n = (Math.log10(H) - Math.log10(U)) / Math.log10(Y)
  
  if (isNaN(n) || !isFinite(n)) return 0
  
  const iv = ((Math.pow(10, n) - 1) / 0.00715) + 100
  
  return roundIV(iv)
}

// поиск в таблице
const findTableValues = (Y: number) => {
  if (isNaN(Y)) return null
  
  const key = Number(Y.toFixed(2))

  if (constansIV[key as keyof typeof constansIV]) {
    const [L, H] = constansIV[key as keyof typeof constansIV]
    return { L, H }
  }

  return null
}

// интерполяция
const interpolate = (
  Y: number,
  getIndex: 0 | 1
) => {
  if (isNaN(Y)) return 0
  
  const keys = Object.keys(constansIV)
    .map(Number)
    .sort((a, b) => a - b)

  let lower = keys[0]
  let upper = keys[keys.length - 1]

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] <= Y) lower = keys[i]
    if (keys[i] >= Y) {
      upper = keys[i]
      break
    }
  }

  const lowerValue = constansIV[lower as keyof typeof constansIV][getIndex]
  const upperValue = constansIV[upper as keyof typeof constansIV][getIndex]

  if (upper === lower) return lowerValue

  return (
    lowerValue +
    (upperValue - lowerValue) *
      (Y - lower) /
      (upper - lower)
  )
}

// главный расчет IV
export const calculateIV = (
  viscosity100: number,
  viscosity40: number
): number => {
  if (isNaN(viscosity100) || isNaN(viscosity40)) return NaN
  if (viscosity100 <= 0 || viscosity40 <= 0) return NaN
  
  const Y = viscosity100
  const U = viscosity40

  if (Y >= 2 && Y <= 70) {
    const table = findTableValues(Y)

    let L: number
    let H: number

    if (table) {
      L = table.L
      H = table.H
    } else {
      L = interpolate(Y, 0)
      H = interpolate(Y, 1)
    }

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  if (Y > 70) {
    const L = 0.8353 * Y * Y + 14.67 * Y - 216
    const H = 0.1684 * Y * Y + 11.85 * Y - 97

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  if (Y < 2) {
    const L = Y * (1.5215 + 0.7092 * Y)
    const H = Y * (1.35017 + 0.59482 * Y)

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  return NaN
}

export const VISCOSITY_RESULT_SIGNIFICANT_DIGITS = 6
export const VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS = 4

export const roundToSignificantFigures = (
  value: number,
  significantDigits: number
): number => {
  if (isNaN(value) || !isFinite(value)) return value
  if (value === 0) return 0

  const safeDigits = Math.max(1, Math.floor(significantDigits))
  const log10 = Math.log10(Math.abs(value))
  let digits = safeDigits - 1 - Math.floor(log10)

  digits = Math.max(0, Math.min(100, digits))

  return Number(value.toFixed(digits))
}

// расчет вязкости
export const calculateViscosity = (
  time: number,
  constant: number
): number => {
  // Валидация входных данных
  if (isNaN(time) || isNaN(constant)) return NaN
  if (time <= 0 || constant <= 0) return NaN
  
  const raw = time * constant
  
  // Проверка на валидность результата
  if (isNaN(raw) || !isFinite(raw)) return NaN
  if (raw === 0) return 0

  return roundToSignificantFigures(raw, VISCOSITY_RESULT_SIGNIFICANT_DIGITS)
}

/* // viscosity.ts

import { constansIV } from "../constans"



// замена , на .
export const normalizeNumber = (value: string): number => {
  return Number(value.replace(",", "."))
}

// перевод времени в секунды
export const convertToSeconds = (timeString: string): number => {
  const normalized = timeString.replace(",", ".")
  const parts = normalized.split(":")

  if (parts.length === 1) {
    return parseFloat(parts[0])
  }

  const minutes = parseInt(parts[0])
  const seconds = parseInt(parts[1])
  let milliseconds = parseFloat(parts[2] ?? "0")

  if (milliseconds < 10) {
    milliseconds = milliseconds / 10
  } else {
    milliseconds = milliseconds / 100
  }

  return minutes * 60 + seconds + milliseconds
}

// округление IV
export const roundIV = (value: number): number => {
  let rounded = Number(value.toFixed(1))
  const temp = rounded * 10

  if (temp % 5 === 0) {
    const base = temp / 10
    return Math.floor(base) % 2 === 0
      ? Math.floor(base)
      : Math.ceil(base)
  }

  return Math.round(rounded)
}

// формула IV <= 100
const calcIV = (L: number, H: number, U: number) => {
  return roundIV(((L - U) / (L - H)) * 100)
}

// формула IV > 100
const calcIVMore100 = (H: number, Y: number, U: number) => {
  const n =
    (Math.log10(H) - Math.log10(U)) /
    Math.log10(Y)

  const iv = ((Math.pow(10, n) - 1) / 0.00715) + 100

  return roundIV(iv)
}

// поиск в таблице
const findTableValues = (Y: number) => {
  //const key = Y.toFixed(2)
  const key = Number(Y.toFixed(2))

  if (constansIV[key as keyof typeof constansIV]) {
    const [L, H] = constansIV[key as keyof typeof constansIV]
    return { L, H }
  }

  return null
}

// интерполяция
const interpolate = (
  Y: number,
  getIndex: 0 | 1
) => {
  const keys = Object.keys(constansIV)
    .map(Number)
    .sort((a, b) => a - b)

  let lower = keys[0]
  let upper = keys[keys.length - 1]

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] <= Y) lower = keys[i]
    if (keys[i] >= Y) {
      upper = keys[i]
      break
    }
  }


  // lower.toFixed(2) as keyof typeof constansIV
  const lowerValue =
    constansIV[lower as keyof typeof constansIV][getIndex]

  const upperValue =
    constansIV[upper as keyof typeof constansIV][getIndex]

  return (
    lowerValue +
    (upperValue - lowerValue) *
      (Y - lower) /
      (upper - lower)
  )
}

// главный расчет IV
export const calculateIV = (
  viscosity100: number,
  viscosity40: number
): number => {
  const Y = viscosity100
  const U = viscosity40

  if (Y >= 2 && Y <= 70) {
    const table = findTableValues(Y)

    let L: number
    let H: number

    if (table) {
      L = table.L
      H = table.H
    } else {
      L = interpolate(Y, 0)
      H = interpolate(Y, 1)
    }

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  if (Y > 70) {
    const L =
      0.8353 * Y * Y +
      14.67 * Y -
      216

    const H =
      0.1684 * Y * Y +
      11.85 * Y -
      97

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  if (Y < 2) {
    const L =
      Y * (1.5215 + 0.7092 * Y)

    const H =
      Y * (1.35017 + 0.59482 * Y)

    const iv = calcIV(L, H, U)

    if (iv <= 100) return iv

    return calcIVMore100(H, Y, U)
  }

  return 0
}

// расчет вязкости
export const calculateViscosity = (
  time: number,
  constant: number
) => {
  const raw = time * constant

  const digits =
    3 - Math.floor(Math.log10(raw))

  return Number(raw.toFixed(digits))
} */